enum Inputs {
    None = 0,
    DownRight = 1,
    Down = 2,
    DownLeft = 3,
    Left = 4,
    Neutral = 5,
    Right = 6,
    UpLeft = 7,
    Up = 8,
    UpRight = 9,
    Attack = 10,
    WeakProjectile = 11,
    StrongProjectile = 12,
    Flight = 13,
}

enum Direction {
    Up = 'Up',
    Down = 'Down',
    Left = 'Left',
    Right = 'Right',
    None = 'None'
};

class Frame {
    x: number; y: number; xOff: number; yOff: number; width: number; height: number;
    constructor(x: number, y: number, xOff: number, yOff: number, width: number, height: number) {
        this.x = x;
        this.y = y;
        this.xOff = xOff;
        this.yOff = yOff;
        this.width = width;
        this.height = height;
    }
}

class Animation {
    frames: Frame[]; speed: number; loop: boolean;
    constructor(frames: Frame[], speed: number, loop: boolean) {
        this.frames = frames;
        this.speed = speed;
        this.loop = loop;
    }
}

interface AnimationTemplate {
    Idle: Animation[];
    Floating: Animation[];
    Walking: Animation[];
    Sitting: Animation[];
    SittingUp: Animation[];
    Falling: Animation[];
    GettingUp: Animation[];
    Dragged: Animation[];
    Crouch: Animation[];
    DashForward: Animation[];
    DashBack: Animation[];
}

export {
    Direction,
    Frame,
    Animation,
    Inputs,
}

export type {
    AnimationTemplate,
}