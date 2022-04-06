import { AnimationTemplate, Animation, Direction } from "../Types";

class Patchouli {
    // LMAO
    sheet: HTMLImageElement; // sprite sheet
    animation: Animation[]; // 0 = left, 1 = right
    animationFrame: number; // current frame
    animations: AnimationTemplate; // animation list for each state
    facing: Direction; // direction the character is facing
    canvas: HTMLCanvasElement; // parent canvas
    xpos: number; ypos: number; // position
    ygoal: number;
    xspeed: number; yspeed: number; // pixels per second
    idleTime: number;
    frameTime: number;
    paused: boolean;
    gravity: number;
    dragged: boolean;
    maxY: number; maxX: number; minX: number; minY: number; // constraints of the screen
    mouseX: number; mouseY: number; // Mouse position used in drag calculations
    offset: { x: number, y: number }; // just used to store the offset related to dragging the patchouli
    walking: Direction;

    constructor(sheet: HTMLImageElement, xpos: number, ypos: number, animation: Animation[], animationFrame: number, animations: AnimationTemplate, facing: Direction, canvas: HTMLCanvasElement) {
        this.sheet = sheet;
        this.animation = animation;
        this.animationFrame = animationFrame;
        this.animations = animations;
        this.facing = facing;
        this.canvas = canvas;
        this.xpos = xpos;
        this.ypos = ypos;
        this.ygoal = ypos; // bottom of canvas
        this.xspeed = 0;
        this.yspeed = 0;
        this.idleTime = 0;
        this.frameTime = 0;
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
        };
        this.walking = Direction.None;
    }

    step() {
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
                    this.setIdle();
                }
            }
        }
    }

    evalAction() {
        if (this.ypos != this.ygoal && this.animation != this.animations.Floating && this.paused == false) {
            this.setFloat();
        }
        else if (this.walking != Direction.None || this.animation == this.animations.Walking) {
            if (this.walking != Direction.None) {
                this.setWalk(this.walking);
            }
            else {
                this.setIdle();
            }
        }
        else if (this.animation == this.animations.Idle) {
            this.idleTime++;
        }
        else if (this.animation == this.animations.Floating) {
            if (this.ypos != this.ygoal) {
                return;
            }
            else {
                this.setIdle();
            }
        }
    }

    setSitUp() {
        this.animation = this.animations.SittingUp;
        this.animationFrame = 0;
    }

    setGettingUp() {
        this.animation = this.animations.GettingUp;
        this.animationFrame = 0;
    }

    setFall() {
        this.animation = this.animations.Falling;
        this.animationFrame = 0;
        this.xpos -= 10;
    }

    setSit() {
        this.animationFrame = 0;
        this.animation = this.animations.Sitting;
    }

    setFloat() {
        this.animation = this.animations.Floating;
        this.animationFrame = 0;
    }

    setWalk(direction: Direction) {
        if (this.animationFrame > this.animations.Walking[0].frames.length - 1) {
            this.animationFrame = 0;
        }
        this.animation = this.animations.Walking;
        this.xpos += direction == Direction.Left ? -2 : 2;
        this.facing = direction;
    }

    setIdle() {
        if (this.animation != this.animations.Idle) {
            this.paused = false;
            this.idleTime = 0;
            this.animation = this.animations.Idle;
            this.animationFrame = 0;
        }
    }

    getCurrentFrame() {
        return this.getAnimation().frames[this.animationFrame];
    }

    getDrawPosition() {
        let frame = this.getCurrentFrame();
        console.log(frame);
        return [this.xpos + frame.xOff, this.ypos + frame.yOff];
    }

    getAnimation() {
        return this.facing == Direction.Left ? this.animation[1] : this.animation[0];
    }

    getSheet() {
        return this.sheet;
    }

    getPosition() {
        return [this.xpos, this.ypos];
    }
}

export default Patchouli;