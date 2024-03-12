import { board2dTo1d, generateBoard } from "./board_fnc.mjs";
import { Board, PLAYER } from "./constants.mjs";

// ==========================
// Global variables
// ==========================

let playerTurn: boolean | null = null;

// ==========================
// Get DOM-elements and wrappers
// ==========================

const btnPlayerStarts = document.getElementById("btnPlayerStarts")! as HTMLButtonElement;

const btnBotStarts = document.getElementById("btnBotStarts")! as HTMLButtonElement;

const btnReset = document.getElementById("btnReset")! as HTMLButtonElement;

const tttTilesFe = document.getElementById("tttGrid")!.children as HTMLCollectionOf<HTMLButtonElement>;

const tttTilesBe: Board = generateBoard();

// ==========================
// Game functions
// ==========================

function renderBoard(b: Board) {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      console.log(tttTilesFe[y * 3 + x]);
      tttTilesFe[y * 3 + x].innerText = tttTilesBe[y][x];
    }
  }
}

function playerPlaceAttempt(b: Board, x: number, y: number) {
  console.log(`Hello from x=${x} y=${y}`);
}

// ==========================
// Setup game
// ==========================

for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 3; x++) {
    console.log(tttTilesFe[y * 3 + x]);
    tttTilesFe[y * 3 + x].onclick = (e) => {
      e.preventDefault();
      playerPlaceAttempt(tttTilesBe, x, y);
    };
  }
}
