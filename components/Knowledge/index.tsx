import { memo, ReactElement, useEffect, useState } from "react";
import PatchySet1 from "./Animations/PatchySet1";
import Patchouli from "./Characters/Patchouli/Patchouli";
import PatchouliAI from "./Characters/Patchouli/PatchouliAI";
import { loadImage } from "./Helpers";
import { Direction, Inputs } from "./Types";
import { RingBuffer } from 'ring-buffer-ts';


let inputBuffer = new RingBuffer<Inputs>(15);
let currentKey: string | null = null;

let chars: (PatchouliAI | Patchouli)[] = [];
interface KnowledgeProps {
    sheet?: string;
    children: ReactElement<HTMLCanvasElement>
}

let frameCount = 1;
let fps = 60;
let fpsInterval: number, startTime: number, now: number, then: number, elapsed: number;
let selectedPatchy: PatchouliAI | Patchouli | null;
let playerPatchy: Patchouli | null = null;
let updateRender = true;
let resetAnimation = false;
let canvas: HTMLCanvasElement;
let ctx: CanvasRenderingContext2D;

function drawFrame(img: HTMLImageElement, frameX: number, frameY: number, width: number, height: number, canvasX: number, canvasY: number) {
    if (img != null) {
        ctx.drawImage(img,
            frameX, frameY, width, height,
            canvasX, canvasY, width * 1, height * 1);
    }
}

// dragging

function getSelectedPatchy(e: { x: any; y: any; }): PatchouliAI | Patchouli | null {
    let selectedPatchy: null | PatchouliAI | Patchouli = null;
    chars.forEach(element => {
        if (e.x >= element.xpos && e.x <= element.xpos + element.getCurrentFrame().width && e.y >= element.ypos && e.y <= element.ypos + element.getCurrentFrame().height) {
            selectedPatchy = element;
        }
    });
    return selectedPatchy;
}

function getMousePos(canvas: HTMLCanvasElement, evt: { clientX: number; clientY: number; }) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
        y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
    };
}

function mousedown(e: { clientX: number; clientY: number; }) {
    let ev = getMousePos(canvas, e);
    selectedPatchy = getSelectedPatchy(ev);
    if (selectedPatchy != null) {
        selectedPatchy.mouseX = ev.x;
        selectedPatchy.mouseY = ev.y;
        selectedPatchy.offset = {
            x: ev.x - selectedPatchy.xpos,
            y: ev.y - selectedPatchy.ypos
        }
    }
}

function mousemove(e: { clientX: number; clientY: number; }) {
    let ev = getMousePos(canvas, e);
    if (selectedPatchy != null) {
        // console.log(selectedPatchy.mouseX, ev.x);
        selectedPatchy.xpos = ev.x - selectedPatchy.offset.x;
        selectedPatchy.ypos = ev.y - selectedPatchy.offset.y;
        selectedPatchy.xspeed = selectedPatchy.xspeed / 2 + (ev.x - selectedPatchy.mouseX);
        selectedPatchy.yspeed = selectedPatchy.yspeed / 2 + (ev.y - selectedPatchy.mouseY);
        if (elapsed > fpsInterval) {
            selectedPatchy.mouseX = ev.x;
            selectedPatchy.mouseY = ev.y;
        }

        selectedPatchy.dragged = true;
        selectedPatchy.paused = false;
        selectedPatchy.animation = selectedPatchy.animations.Dragged;
        selectedPatchy.animationFrame = 0;
    }
}

function mouseup(e: any) {
    if (selectedPatchy != null) {
        selectedPatchy.dragged = false;
        selectedPatchy.animation = selectedPatchy.animations.Idle;
    }
    selectedPatchy = null;
}

function anyClick(e: any) {
    if (e.target.id == "patchouli-thing") {
        spawn_patchy();
    }
}

// player control
function onkeydown(e: KeyboardEvent) { currentKey = e.key; }
function onkeyup(e: KeyboardEvent) { currentKey = null; }
function evalInputKey() {
    if (playerPatchy != null) {
        switch (currentKey) {
            case "Numpad1":
            case "1":
            case "End":
                inputBuffer.add(Inputs.DownRight);
                break;
            case "Numpad2":
            case "ArrowDown":
            case "2":
                inputBuffer.add(Inputs.Down);
                break;
            case "Numpad3":
            case "3":
            case "PageDown":
                inputBuffer.add(Inputs.DownLeft);
                break;
            case "Numpad4":
            case "4":
            case "ArrowLeft":
                inputBuffer.add(Inputs.Left);
                break;
            case "Numpad5":
            case "5":
                inputBuffer.add(Inputs.Neutral);
                break;
            case "Numpad6":
            case "6":
            case "ArrowRight":
                inputBuffer.add(Inputs.Right);
                break;
            case "Numpad7":
            case "7":
            case "Home":
                inputBuffer.add(Inputs.UpLeft);
                break;
            case "Numpad8":
            case "8":
            case "ArrowUp":
                inputBuffer.add(Inputs.Up);
                break;
            case "Numpad9":
            case "9":
            case "PageUp":
                inputBuffer.add(Inputs.UpRight);
                break;
            case "z":
                inputBuffer.add(Inputs.Attack);
                break;
            case "x":
                inputBuffer.add(Inputs.WeakProjectile);
                break;
            case "c":
                inputBuffer.add(Inputs.StrongProjectile);
                break;
            case "a":
                inputBuffer.add(Inputs.Flight);
                break;
            case "s":
                inputBuffer.add(Inputs.Attack);
                inputBuffer.add(Inputs.WeakProjectile);
                break;
            case "d":
                inputBuffer.add(Inputs.WeakProjectile);
                inputBuffer.add(Inputs.StrongProjectile);
                break;
            case "q":
                // pause
                break;
            default:
                inputBuffer.add(Inputs.Neutral);
                break;
        }
    }
}


const spawn_patchy = () => {
    let x = Math.floor(Math.random() * (canvas.width - 100 + 1)) + 100;
    let y = Math.floor(Math.random() * (canvas.height - 100 + 1)) - 150;
    let direction = Math.random() < 0.5 ? Direction.Left : Direction.Right;
    // using chars[0] is shitty but it works, fix later
    let char = new PatchouliAI(chars[0].sheet, x, y, PatchySet1.Idle, 0, PatchySet1, direction, canvas);
    chars.push(char);
}

function step() {
    now = window.performance.now();
    elapsed = now - then;

    if (elapsed > fpsInterval) {
        then = now - (elapsed % fpsInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (ctx.canvas.height != window.innerHeight) { resetAnimation = true; }
        ctx.canvas.width = window.innerWidth;
        ctx.canvas.height = window.innerHeight;

        updateRender = (fps / 30) - frameCount <= 0 ? true : false;

        // set states for controlled patchy
        if (playerPatchy != null) {
            // input handling function
        }

        chars.forEach(element => {
            if (resetAnimation) {
                element.setIdle();
            }
            element.ygoal = canvas.height - 100;
            if (updateRender) {
                if (element == playerPatchy) {
                    evalInputKey();
                }
                element.step(inputBuffer);
                frameCount = 0;
            }
            const [posX, posY] = element.getDrawPosition();
            let frame = element.getCurrentFrame();
            let img = element.getSheet();

            drawFrame(img, frame.x, frame.y, frame.width, frame.height, posX, posY);
        });
        resetAnimation = false;
        frameCount++;
    }
    window.requestAnimationFrame(step);
}

const areEqual = (prevProps: any, nextProps: any) => true;

const Knowledge = memo(({ sheet, children }: KnowledgeProps) => {
    const [patchySheet, setPatchySheet] = useState<HTMLImageElement>(null as any);
    const [patchyLoaded, setPatchyLoaded] = useState(false);
    const dHeight = children.props.height;
    const dWidth = children.props.width;
    let sheetStr = './img/26550t.png';
    const canvasID = children.props.id;

    useEffect(() => {
        if (!patchyLoaded) {
            canvas = document.getElementById(canvasID) as HTMLCanvasElement;
            ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
            then = window.performance.now();
            startCanvas()
            canvas.addEventListener("mousedown", mousedown);
            canvas.addEventListener("mouseup", mouseup);
            canvas.addEventListener("mousemove", mousemove);
            window.addEventListener("click", anyClick);
            window.addEventListener("keydown", onkeydown);
            window.addEventListener("keyup", onkeyup);
            document.onkeydown = function (e) {
                if (e.key == "p") {
                    spawn_patchy();
                }
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (sheet != null) {
        sheetStr = sheet;
    }

    const startCanvas = async () => {
        setPatchySheet(await loadImage(sheetStr));
        window.requestAnimationFrame(step);
    }

    playerPatchy = new Patchouli(patchySheet, dWidth - 1000, dHeight, PatchySet1.Falling, 0, PatchySet1, Direction.Right, canvas)

    chars = [
        playerPatchy,
        // new PatchouliAI(patchySheet, dWidth - 1000, dHeight, PatchySet1.Falling, 0, PatchySet1, Direction.Right, canvas),
    ];

    fpsInterval = 1000 / fps;
    startTime = then;

    return (
        <>
            {children}
        </>
    )
}, areEqual);

Knowledge.displayName = "Knowledge";

export default Knowledge;