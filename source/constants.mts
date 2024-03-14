export const PLAYER = "X";
export const BOT = "O";
export const EMPTY = " ";

export type Turn = typeof PLAYER | typeof BOT;
export type Tile = Turn | typeof EMPTY;
export type Board = [[Tile, Tile, Tile], [Tile, Tile, Tile], [Tile, Tile, Tile]];
