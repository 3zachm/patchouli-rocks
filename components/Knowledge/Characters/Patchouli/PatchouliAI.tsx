import { RingBuffer } from "ring-buffer-ts";
import { getRandomInt } from "../../Helpers";
import { AnimationTemplate, Animation, Direction, Inputs } from "../../Types";

class PatchouliAI {
    // LMAO
    sheet: HTMLImageElement; // sprite sheet
    animation: Animation[]; // 0 = left, 1 = right
    animationFrame: number; // current frame
    animations: AnimationTemplate; // animation list for each state
    facing: Direction; // direction the character is facing
    canvas: HTMLCanvasElement; // parent canvas
    xpos: number; ypos: number; // position
    xspeed: number; yspeed: number; // pixels per second
    xgoal: number;  ygoal: number; // wandering goal
    idleTime: number;
    frameTime: number;
    waitTime: number;
    paused: boolean;
    gravity: number;
    dragged: boolean;
    maxY: number; maxX: number; minX: number; minY: number; // constraints of the screen
    mouseX: number; mouseY: number; // Mouse position used in drag calculations
    offset: { x: number, y: number }; // just used to store the offset related to dragging the patchouli

    constructor(sheet: HTMLImageElement, xpos: number, ypos: number, animation: Animation[], animationFrame: number, animations: AnimationTemplate, facing: Direction, canvas: HTMLCanvasElement) {
        this.sheet = sheet;
        this.animation = animation;
        this.animationFrame = animationFrame;
        this.animations = animations;
        this.facing = facing;
        this.canvas = canvas;
        this.xpos = xpos;
        this.ypos = ypos;
        this.xspeed = 0;
        this.yspeed = 0;
        this.xgoal = xpos;
        this.ygoal = ypos;
        this.idleTime = 0;
        this.frameTime = 0;
        this.waitTime = getRandomInt(40, 300);
        this.paused = false;
        this.dragged = false;
        this.gravity = 2;
        this.maxY = 0;
        this.maxX = 0;
        this.minY = 0;
        this.minX = 0;
        this.mouseX = 0;
        this.mouseY = 0;
        this.offset = {
            x: 0,
            y: 0,
        }
    }

    step(inputBuffer: RingBuffer<Inputs>) {
        // calculate max/mins for the canvas collision coords
        this.maxY = this.canvas.height - 100;
        this.minY = this.getCurrentFrame().height / 2;
        this.maxX = this.canvas.width - this.getCurrentFrame().width;
        this.minX = 0; // always 0, dont allow negatives

        // if the char is being dragged, dont update
        if (this.dragged) {
            this.animation = this.animations.Dragged;
            return;
        }
        // if the char is in a gravity related animation, calculate gravity
        else if (this.animation == this.animations.Floating || this.animation == this.animations.Falling) {
            this.yspeed += this.gravity;
            this.ypos += this.yspeed;

            if (this.ypos >= this.maxY) {
                this.ypos = this.maxY;
                this.yspeed *= -1.0;
                this.yspeed *= 0.5;
            }
            this.xpos += this.xspeed;
            if (this.xpos <= this.minX) {
                this.xpos = this.minX;
                this.xspeed *= -1.0;
            }
            if (this.xpos >= this.maxX) {
                this.xpos = this.maxX;
                this.xspeed *= -1.0;
            }
            if (this.ypos >= this.maxY - 5) {
                this.xspeed *= 0.79;
            }
            else {
                this.xspeed *= 0.99;
            }

            // if still falling, exit to not eval next action
            if (Math.abs(this.yspeed) > 1) {
                return;
            }
            // else if (Math.abs (this.xspeed) > 1) {
            //     this.setFall();
            //     return;
            // }
        }
        this.evalAction();
        // increase the time between frames
        this.frameTime++;
        // if the time between frames is greater than the speed of the animation, move to the next frame
        if (this.frameTime > this.getAnimation().speed) {
            this.frameTime = 0;
            // if the animation is not paused, move to the next frame
            if (!this.paused) {
                this.animationFrame++;
            }
            if (this.animationFrame > this.getAnimation().frames.length - 1) {
                // if animation loops, reset, if not go to idle state
                if (this.getAnimation().loop) {
                    this.animationFrame = 0;
                }
                else {
                    this.waitIdle();
                }
            }
        }
    }

    evalAction() {
        if (this.ypos != this.ygoal && this.animation != this.animations.Floating && this.paused == false) {
            this.setFloat();
        }
        else if (this.animation == this.animations.Idle) {
            this.idleTime++;
        }
        else if (this.animation == this.animations.Walking) {
            if (this.xpos != this.xgoal || this.ypos != this.ygoal) {
                this.walkTo(this.xgoal, this.ygoal);
            }
            else {
                let r = Math.random();
                if (r < 0.1) {
                    this.setSit();
                }
                else if (r < 0.8) {
                    this.setIdle();
                }
                else {
                    this.setFall();
                }
            }
        }
        else if (this.animation == this.animations.Sitting) {
            this.idleTime++;
            if (this.idleTime > this.waitTime) {
                this.paused = false;
                this.setSitUp();
            }
            else if (this.animationFrame == this.getAnimation().frames.length - 2) {
                this.paused = true;
            }
        }
        else if (this.animation == this.animations.Falling) {
            this.idleTime++;
            if (this.idleTime > this.waitTime) {
                this.paused = false;
                this.setGettingUp();
            }
            else if (this.animationFrame == this.getAnimation().frames.length - 2) {
                this.paused = true;
            }
        }
        else if (this.animation == this.animations.Floating) {
            if (this.ypos != this.ygoal) {
                return;
            }
            else {
                let r = Math.random();
                if (r < 0.1) {
                    this.setSit();
                }
                else if (r < 0.8) {
                    this.setIdle();
                }
                else {
                    this.setFall();
                }
            }
        }

        // if  animation ends and waitTime expires, choose new animation
        if (this.idleTime >= this.waitTime && this.animationFrame == this.getAnimation().frames.length - 1) {
            this.setWaitTime();
            this.idleTime = 0;
            this.chooseAnimation();
        }
    }

    waitIdle() {
        this.setWaitTime();
        this.setIdle();
    }

    floatTo(y: number) {
        if (this.ypos < y) {
            this.ypos++;
        }
        else if (this.ypos > y) {
            this.ypos--;
        }
    }

    walkTo(x: number, y: number) {
        if (this.xpos < x) {
            if (this.xpos > this.canvas.width - this.getCurrentFrame().width) {
                this.xgoal = this.xpos;
            }
            else {
                this.xpos++;
                this.facing = Direction.Right;
            }
        }
        else if (this.xpos > x) {
            if (this.xpos < 0) {
                this.xgoal = this.xpos;
            }
            else {
                this.xpos--;
                this.facing = Direction.Left;
            }
        }
        if (this.ypos < y) {
            this.ypos++;
        }
        else if (this.ypos > y) {
            this.ypos--;
        }
    }

    chooseAnimation() {
        let r = Math.random();
        if (r < 0.2) {
            this.setSit();
        }
        else {
            this.setWalk();
        }
        // else {
        //     this.setFall();
        // }
    }

    setSitUp() {
        this.setWaitTime();
        this.animation = this.animations.SittingUp;
        this.animationFrame = 0;
    }

    setGettingUp() {
        this.setWaitTime();
        this.animation = this.animations.GettingUp;
        this.animationFrame = 0;
    }

    setFall() {
        this.animation = this.animations.Falling;
        this.animationFrame = 0;
        this.xpos -= 10;
    }

    setSit() {
        this.setWaitTime();
        this.animationFrame = 0;
        this.animation = this.animations.Sitting;
    }

    setFloat() {
        this.animation = this.animations.Floating;
        this.animationFrame = 0;
    }

    setWalk() {
        this.animationFrame = 0;
        this.animation = this.animations.Walking;
        let rng = getRandomInt(100, 250);
        if (this.xpos - 100 < 0) {
            rng = rng;
        }
        else if (this.xpos + 100 > this.canvas.width) {
            rng = -rng;
        }
        else if (Math.random() < 0.5) {
            rng = -rng;
        }
        this.xgoal = this.xpos + rng;
        this.walkTo(this.xgoal, this.ygoal);
    }

    setIdle() {
        if (this.animation != this.animations.Idle) {
            this.paused = false;
            this.idleTime = 0;
            this.animation = this.animations.Idle;
            this.animationFrame = 0;
        }
    }

    setWaitTime() {
        this.waitTime = getRandomInt(100, 300);
    }

    getCurrentFrame() {
        return this.getAnimation().frames[this.animationFrame];
    }

    getDrawPosition() {
        let frame = this.getCurrentFrame();
        return [this.xpos + frame.xOff, this.ypos + frame.yOff];
    }

    getAnimation() {
        return this.facing == Direction.Left ? this.animation[1] : this.animation[0];
    }

    getSheet() {
        return this.sheet;
    }

    getGoal() {
        return [this.xgoal, this.ygoal];
    }

    getPosition() {
        return [this.xpos, this.ypos];
    }
}

export default PatchouliAI;