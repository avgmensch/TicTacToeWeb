import { Board, EMPTY, Tile } from "./constants.mjs";

/** Generate `Board` with all values set to `s`. Defaults to `EMPTY`. */
export function generateBoard(s: Tile = EMPTY): Board {
  return [
    [s, s, s],
    [s, s, s],
    [s, s, s],
  ];
}

/** Return `true` if at least one `Tile` in `board` is equal to `EMPTY`, else `false`. */
export function isMoveRemaining(board: Board): boolean {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (board[y][x] == EMPTY) {
        return true;
      }
    }
  }
  return false;
}

/**
 * Check for a winner on the TicTacToe-board `b`.
 * - `BOT` if the computer wins.
 * - `PLAYER` if the player wins.
 * - `EMPTY` if it's a tie.
 * - `null` if the game is not over.
 * @param b `Board` to check the winner.
 * @returns Code of the winner. See list above.
 */
export function getTicTacToeWinner(b: Board): Tile | null {
  // Check horizontal and diagonal
  for (let yx = 0; yx < 3; yx++) {
    if (b[yx][0] != EMPTY && b[yx][0] == b[yx][1] && b[yx][0] == b[yx][2]) return b[yx][0];
    if (b[0][yx] != EMPTY && b[0][yx] == b[1][yx] && b[0][yx] == b[2][yx]) return b[0][yx];
  }

  // Check diagonal
  if (
    b[1][1] != EMPTY &&
    ((b[0][0] == b[1][1] && b[0][0] == b[2][2]) || (b[0][2] == b[1][1] && b[0][2] == b[2][0]))
  ) {
    return b[1][1];
  }

  // Check is it's a tie
  if (!isMoveRemaining(b)) {
    return EMPTY;
  }

  // Game is not over
  return null;
}
