import { AnimationTemplate, Animation, Frame } from "../Types";

const PatchySet1: AnimationTemplate = {
    Idle: [
        new Animation([
            new Frame(10, 109, 0, -1, 54, 101),
            new Frame(70, 110, 0, 0, 54, 100),
            new Frame(130, 110, 0, 0, 53, 100),
            new Frame(189, 111, 0, 0, 53, 99),
            new Frame(248, 110, 1, -1, 51, 100),
            new Frame(305, 110, 1, -2, 50, 100),
            new Frame(361, 109, 1, -2, 49, 101),
            new Frame(416, 109, 0, -2, 50, 101),
            new Frame(472, 108, 0, -3, 51, 102),
            new Frame(529, 108, 0, -2, 52, 102),
            new Frame(587, 108, 0, -2, 53, 102),
            new Frame(646, 109, 0, -1, 54, 101),
        ], 2, true),
        new Animation([
            new Frame(1354, 109, 0, -1, 54, 101),
            new Frame(1294, 110, 0, 0, 54, 100),
            new Frame(1235, 110, 1, 0, 53, 100),
            new Frame(1176, 111, 1, 0, 53, 99),
            new Frame(1119, 110, 2, -1, 51, 100),
            new Frame(1063, 110, 3, -2, 50, 100),
            new Frame(1008, 109, 4, -2, 49, 101),
            new Frame(952, 109, 4, -2, 50, 101),
            new Frame(895, 108, 3, -3, 51, 102),
            new Frame(837, 108, 2, -2, 52, 102),
            new Frame(778, 108, 1, -2, 53, 102),
            new Frame(719, 109, 1, -1, 54, 101),
        ], 2, true)
    ],
    Floating: [
        new Animation([
            new Frame(19, 517, 0, 0, 92, 88),
        ], 2, true),
        new Animation([
            new Frame(1075, 618, 0, 0, 92, 88),
        ], 2, true)
    ],
    Walking: [
        new Animation([
            new Frame(441, 256, 0, 0, 45, 98),
            new Frame(390, 256, -1, 0, 45, 98),
            new Frame(340, 257, -1, 1, 44, 97),
            new Frame(293, 256, 1, 0, 41, 98),
            new Frame(246, 255, 1, -1, 41, 99),
            new Frame(200, 256, 0, 0, 40, 98),
            new Frame(152, 256, -1, 0, 42, 98),
            new Frame(105, 257, -1, 1, 41, 97),
            new Frame(59, 256, 1, 0, 40, 98),
            new Frame(10, 256, 1, 0, 43, 98),
        ], 2, true),
        new Animation([
            new Frame(540, 256, 0, 0, 45, 98),
            new Frame(591, 256, 1, 0, 45, 98),
            new Frame(642, 257, 2, 1, 44, 97),
            new Frame(692, 256, 3, 0, 41, 98),
            new Frame(739, 255, 3, -1, 41, 99),
            new Frame(786, 256, 5, 0, 40, 98),
            new Frame(832, 256, 4, 0, 42, 98),
            new Frame(880, 257, 5, 1, 41, 97),
            new Frame(927, 256, 4, 0, 40, 98),
            new Frame(973, 256, 1, 0, 43, 98),
        ], 2, true)
    ],
    Sitting: [
        new Animation([
            new Frame(10, 396, 0, 0, 47, 95),
            new Frame(63, 405, 0, 8, 48, 86),
            new Frame(117, 415, 0, 21, 50, 76),
            new Frame(173, 419, 0, 27, 52, 72),
            new Frame(231, 419, 1, 27, 51, 72),
        ], 2, false),
        new Animation([
            new Frame(920, 397, 0, 0, 47, 95),
            new Frame(866, 405, 0, 8, 48, 86),
            new Frame(810, 415, 0, 21, 50, 76),
            new Frame(752, 419, 0, 27, 52, 72),
            new Frame(695, 419, 0, 27, 51, 72),
        ], 2, false)
    ],
    SittingUp: [
        new Animation([
            new Frame(231, 419, 1, 27, 51, 72),
            new Frame(288, 416, 1, 21, 48, 75),
            new Frame(342, 406, 0, 8, 47, 85),
            new Frame(395, 397, 0, 1, 47, 94),
        ], 2, false),
        new Animation([
            new Frame(695, 419, 0, 27, 51, 72),
            new Frame(641, 416, 0, 21, 48, 75),
            new Frame(588, 406, 0, 8, 47, 85),
            new Frame(536, 397, 1, 1, 47, 94),
        ], 2, false)
    ],
    Crouch: [
        new Animation([
            new Frame(10, 396, 0, 0, 47, 95),
            new Frame(63, 405, 0, 8, 48, 86),
            new Frame(117, 415, 0, 21, 50, 76),
            new Frame(173, 419, 0, 27, 52, 72),
            new Frame(231, 419, 1, 27, 51, 72),
            new Frame(231, 419, 1, 27, 51, 72),
            new Frame(288, 416, 1, 21, 48, 75),
            new Frame(342, 406, 0, 8, 47, 85),
            new Frame(395, 397, 0, 1, 47, 94),
        ], 2, false),
        new Animation([
            new Frame(920, 397, 0, 0, 47, 95),
            new Frame(866, 405, 0, 8, 48, 86),
            new Frame(810, 415, 0, 21, 50, 76),
            new Frame(752, 419, 0, 27, 52, 72),
            new Frame(695, 419, 0, 27, 51, 72),
            new Frame(695, 419, 0, 27, 51, 72),
            new Frame(641, 416, 0, 21, 48, 75),
            new Frame(588, 406, 0, 8, 47, 85),
            new Frame(536, 397, 1, 1, 47, 94),
        ], 2, false)
    ],
    Falling: [
        new Animation([
            new Frame(19, 517, 30, 0, 92, 88),
            new Frame(19, 517, 30, 0, 92, 88),
            new Frame(117, 518, 30, 0, 94, 87),
            new Frame(117, 518, 30, 0, 94, 87),
            new Frame(231, 547, 30, 0, 76, 59),
            new Frame(313, 540, 30, 0, 75, 66),
            new Frame(394, 528, 30, 10, 70, 78),
            new Frame(470, 548, 30, 41, 81, 58),
            new Frame(557, 550, 32, 43, 82, 56),
            new Frame(645, 557, 32, 49, 93, 49),
            new Frame(745, 561, 32, 56, 95, 45),
            new Frame(845, 566, 32, 57, 103, 40),
            new Frame(954, 568, 32, 57, 106, 38),
            new Frame(1065, 567, 32, 57, 106, 39),
        ], 2, false),
        new Animation([
            new Frame(1075, 618, -30, 0, 92, 88),
            new Frame(1075, 618, -30, 0, 92, 88),
            new Frame(975, 619, -30, 0, 94, 87),
            new Frame(975, 619, -30, 0, 94, 87),
            new Frame(879, 648, -30, 0, 76, 59),
            new Frame(798, 641, -30, 0, 75, 66),
            new Frame(722, 629, -30, 10, 70, 78),
            new Frame(635, 649, -30, 41, 81, 58),
            new Frame(547, 651, -32, 43, 82, 56),
            new Frame(448, 658, -32, 49, 93, 49),
            new Frame(347, 662, -32, 56, 95, 45),
            new Frame(238, 667, -32, 57, 103, 40),
            new Frame(126, 669, -32, 57, 106, 38),
            new Frame(15, 668, -32, 57, 106, 39),
        ], 2, false)
    ],
    GettingUp: [
        new Animation([
            new Frame(25, 780, 40, 53, 97, 49),
            new Frame(128, 779, 38, 53, 87, 50),
            new Frame(221, 764, 38, 33, 80, 65),
            new Frame(307, 752, 23, 20, 68, 77),
            new Frame(381, 747, 20, 16, 61, 82),
            new Frame(448, 735, 9, 6, 47, 94),
        ], 2, false),
        new Animation([
            new Frame(964, 780, -40, 53, 97, 49),
            new Frame(871, 779, -38, 53, 87, 50),
            new Frame(785, 764, -38, 33, 80, 65),
            new Frame(711, 752, -23, 20, 68, 77),
            new Frame(644, 747, -20, 16, 61, 82),
            new Frame(591, 735, 0, 6, 47, 94),
        ], 2, false)
    ],
    Dragged: [
        new Animation([
            new Frame(19, 517, 0, 0, 92, 88),
        ], 2, true),
        new Animation([
            new Frame(1075, 618, 0, 0, 92, 88),
        ], 2, true)
    ],
}

export default PatchySet1;