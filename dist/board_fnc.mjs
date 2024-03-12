import { EMPTY } from "./constants.mjs";
export function generateBoard(s = EMPTY) {
    return [
        [s, s, s],
        [s, s, s],
        [s, s, s],
    ];
}
export function board2dTo1d(b2d) {
    return [b2d[0][0], b2d[0][1], b2d[0][2], b2d[1][0], b2d[1][1], b2d[1][2], b2d[2][0], b2d[2][1], b2d[2][2]];
}
export function isMoveRemaining(board) {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[y][x] == EMPTY) {
                return true;
            }
        }
    }
    return false;
}
export function checkForWinner(b) {
    for (let yx = 0; yx < 3; yx++) {
        if (b[yx][0] != EMPTY && b[yx][0] == b[yx][1] && b[yx][0] == b[yx][2])
            return b[yx][0];
        if (b[0][yx] != EMPTY && b[0][yx] == b[1][yx] && b[0][yx] == b[2][yx])
            return b[0][yx];
    }
    if (b[1][1] != EMPTY &&
        ((b[0][0] == b[1][1] && b[0][0] == b[2][2]) || (b[0][2] == b[1][1] && b[0][2] == b[2][0]))) {
        return b[1][1];
    }
    if (!isMoveRemaining(b)) {
        return EMPTY;
    }
    return null;
}
