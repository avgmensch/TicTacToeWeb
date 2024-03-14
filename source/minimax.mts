import { getTicTacToeWinner } from "./board_fnc.mjs";
import { BOT, Board, EMPTY, PLAYER } from "./constants.mjs";

export const fieldWorth = [
  [3, 2, 3],
  [2, 4, 2],
  [3, 2, 3],
];

export function getAvailableMoves(board: Board): [number, number][] {
  const remainingMoves: [number, number][] = [];
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] == EMPTY) {
        remainingMoves.push([x, y]);
      }
    }
  }
  return remainingMoves;
}

export function minimax(board: Board, isBot: boolean, depth: number = 0): number {
  // Check if the game is over (base case)
  const winner = getTicTacToeWinner(board);
  switch (winner) {
    case BOT:
      // Bot won. Higher is better.
      return 10 - depth;
    case PLAYER:
      // Player won. Smaller is better.
      return depth - 10;
    case EMPTY:
      // Tie. Neutral result.
      return 0;
  }

  // Define variables for minimax
  const availableMoves = getAvailableMoves(board);
  let bestScore = isBot ? -99 : 99;

  // Check and rate all available moves
  for (const [x, y] of availableMoves) {
    // Simulate a turn (player or bot)
    board[y][x] = isBot ? BOT : PLAYER;
    // Get score for simulated turn 
    const score = minimax(board, !isBot, depth + 1);
    // If score is better, update bestScore
    if ((isBot && score > bestScore) || (!isBot && score < bestScore)) bestScore = score;
    // Reverse simulated turn
    board[y][x] = EMPTY;
  }

  // Return best score
  return bestScore;
}

export function getBestBotMove(board: Board): [number, number] {
  // Define variables required for rating
  const availableMoves = getAvailableMoves(board);
  let bestScore = -99;
  let bestX = 0;
  let bestY = 0;

  // Check and rate all available moves
  for (const [x, y] of availableMoves) {
    // Simulate and rate the turn
    board[y][x] = BOT;
    const score = minimax(board, false);
    board[y][x] = EMPTY;
    // Compare to the found turns
    if (
      // Score is better in general
      score > bestScore ||
      // Score is equal but higher field worth
      (score == bestScore && fieldWorth[y][x] > fieldWorth[bestY][bestX]) ||
      // Score and fieldWorth are equal, so decide random
      (score == bestScore && fieldWorth[y][x] == fieldWorth[bestY][bestX] && Math.random() < 0.5)
    ) {
      // Update variables
      bestScore = score;
      bestX = x;
      bestY = y;
    }
  }

  // Return best move
  return [bestX, bestY];
}
