import { getTicTacToeWinner } from "./board_fnc.mjs";
import { BOT, EMPTY, PLAYER, fieldWorth } from "./constants.mjs";
export function getAvailableMoves(board) {
    const remainingMoves = [];
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            if (board[y][x] == EMPTY) {
                remainingMoves.push([x, y]);
            }
        }
    }
    return remainingMoves;
}
export function minimax(board, isBot, depth = 0) {
    const winner = getTicTacToeWinner(board);
    switch (winner) {
        case BOT:
            return 10 - depth;
        case PLAYER:
            return depth - 10;
        case EMPTY:
            return 0;
    }
    const availableMoves = getAvailableMoves(board);
    let bestScore = isBot ? -99 : 99;
    for (const [x, y] of availableMoves) {
        board[y][x] = isBot ? BOT : PLAYER;
        const score = minimax(board, !isBot, depth + 1);
        if ((isBot && score > bestScore) || (!isBot && score < bestScore))
            bestScore = score;
        board[y][x] = EMPTY;
    }
    return bestScore;
}
export function getBestBotMove(board) {
    const availableMoves = getAvailableMoves(board);
    let bestScore = -99;
    let bestX = 0;
    let bestY = 0;
    for (const [x, y] of availableMoves) {
        board[y][x] = BOT;
        const score = minimax(board, false);
        board[y][x] = EMPTY;
        if (score > bestScore ||
            (score == bestScore && fieldWorth[y][x] > fieldWorth[bestY][bestX]) ||
            (score == bestScore && fieldWorth[y][x] == fieldWorth[bestY][bestX] && Math.random() < 0.5)) {
            bestScore = score;
            bestX = x;
            bestY = y;
        }
    }
    return [bestX, bestY];
}
