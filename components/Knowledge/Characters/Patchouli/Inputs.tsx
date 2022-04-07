import { Inputs } from "../../Types";

function walkLeft(inputs: number[]) {
    let strInput = inputs.join('');
    return strInput.includes(String(Inputs.Left) + String(Inputs.Left));
}

function walkRight(inputs: number[]) {
    let strInput = inputs.join('');
    return strInput.includes(String(Inputs.Right) + String(Inputs.Right));
}

function crouchSit(inputs: number[]) {
    let strInput = inputs.join('');
    return strInput.includes(String(Inputs.Down) + String(Inputs.Down));
}

function dashLeft(inputs: number[]) {
    let strInput = inputs.join('').replace(/(.)\1+/g, '$1')
    return strInput.includes(String(Inputs.Left) + String(Inputs.Neutral) + String(Inputs.Left));
}

function dashRight(inputs: number[]) {
    let strInput = inputs.join('').replace(/(.)\1+/g, '$1')
    return strInput.includes(String(Inputs.Right) + String(Inputs.Neutral) + String(Inputs.Right));
}

export {
    walkLeft,
    walkRight,
    dashLeft,
    dashRight,
    crouchSit
}