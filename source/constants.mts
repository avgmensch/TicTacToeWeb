// ==========================
// Symbols
// ==========================

/** Symbol of the player. */
export const PLAYER = "X";

/** Symbol of the computer. */
export const BOT = "O";

/** Symbol of an empty `Tile`. */
export const EMPTY = " ";

/** Rates each filed in `Board`. Higher is better. */
export const fieldWorth = [
  [3, 2, 3],
  [2, 4, 2],
  [3, 2, 3],
];

// ==========================
// Types
// ==========================

/** Either `PLAYER` (X) or `BOT` (O). */
export type Turn = typeof PLAYER | typeof BOT;

/** Either `Turn` (X or O) or `EMPTY` (" "). */
export type Tile = Turn | typeof EMPTY;

/** Row major `Array` representing a TicTacToe-board. */
export type Board = [[Tile, Tile, Tile], [Tile, Tile, Tile], [Tile, Tile, Tile]];
