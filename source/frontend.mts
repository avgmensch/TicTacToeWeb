import { getTicTacToeWinner, generateBoard } from "./board_fnc.mjs";
import { BOT, Board, EMPTY, PLAYER, Tile, Turn } from "./constants.mjs";
import { getBestBotMove } from "./minimax.mjs";

// ==========================
// Global variables
// ==========================

/** `true` if the player can act now, else `false`. */
let playerCanAct: boolean = true;

/** `false` if there is no winner or its not a tie, else `true`. */
let gameIsOver: boolean = false;

// ==========================
// Get DOM-elements and wrappers
// ==========================

/** HTML-element of the "I start" button. */
const btnPlayerStarts = document.getElementById("btnPlayerStarts")! as HTMLButtonElement;

/** HTML-element of the "Bot starts" button. */
const btnBotStarts = document.getElementById("btnBotStarts")! as HTMLButtonElement;

/** HTML-element of the "Reset" button. */
const btnReset = document.getElementById("btnReset")! as HTMLButtonElement;

/** HTML-elements, that represent the `Board` in the frontend. */
const tttTilesFe = document.getElementById("tttGrid")!.children as HTMLCollectionOf<HTMLButtonElement>;

/** Backend representation of `tttTilesFe`. Can be rendered to the frontend with `renderBoard()`. */
let tttTilesBe: Board = generateBoard();

// ==========================
// Game functions
// ==========================

/** Render `tttTilesBe` to `tttTilesFe`. */
function renderBoard() {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      tttTilesFe[y * 3 + x].innerText = tttTilesBe[y][x];
    }
  }
}

/** Set tile at `x/y` in the backend equal to `s` if its equal to `EMPTY`. */
function setTile(s: Turn, x: number, y: number) {
  if (tttTilesBe[y][x] == EMPTY) tttTilesBe[y][x] = s;
}

/** Await a `Promise`, that resolved after `ms` milliseconds. */
async function sleep(ms: number) {
  // Creates a new promise with a resolve function, that calls setTimeout.
  // After ms has elapsed call the resolve function r of the promise. The await
  // makes the code hold till ms has elapsed and r is called.
  await new Promise((r) => setTimeout(r, ms));
}

/**
 * Get the best move for the bot, wait 0.25 seconds and render the move.
 * Make sure you await this function `await botTurn();`.
 */
async function botTurn() {
  // Get best move with minmax
  const [xBot, yBot] = getBestBotMove(tttTilesBe);
  setTile(BOT, xBot, yBot);
  await sleep(250);
  // Render changes
  renderBoard();
}

// ==========================
// Setup game
// ==========================

// When the "I start" button is clicked,
// say that is button does not do anything.
btnPlayerStarts.onclick = (e) => {
  e.preventDefault();
  alert("I taught, I would need that button, but I didn't. Just click!");
};

// When the "Bot start" button is clicked, reset the
// board and make the bot do the first turn.
btnBotStarts.onclick = async (e) => {
  e.preventDefault();
  // Lock actions
  gameIsOver = false;
  playerCanAct = false;
  // Reset game
  tttTilesBe = generateBoard();
  renderBoard();
  // Bot acts
  await botTurn();
  // Allow player actions
  playerCanAct = true;
};

// When the reset button is clicked and `playerCanAct`, reset the
// board and all variables. Calls `renderBoard()` in the end.
btnReset.onclick = (e) => {
  e.preventDefault();
  // Don't interfere with minimax
  if (!playerCanAct) return;
  // Reset variables and render changes
  tttTilesBe = generateBoard();
  playerCanAct = true;
  gameIsOver = false;
  renderBoard();
};

// When any tile is clicked, the player does its turn and then the bot
// does its turn. While the bot is running, the player is locked.
for (let y = 0; y < 3; y++) {
  for (let x = 0; x < 3; x++) {
    tttTilesFe[y * 3 + x].onclick = async (e) => {
      e.preventDefault();
      if (!playerCanAct || gameIsOver) return;
      let winner: Tile | null = null;

      // Player
      // ======

      // Player turn
      if (tttTilesBe[y][x] == EMPTY) {
        setTile(PLAYER, x, y);
        renderBoard();
      } else {
        playerCanAct = true;
        return;
      }

      // The player won somehow -> exit
      winner = getTicTacToeWinner(tttTilesBe);
      if (winner == PLAYER) {
        alert("You won (somehow...)");
        gameIsOver = true;
        return;
      }

      // Bot
      // ======

      // Start the bot part
      playerCanAct = false;
      await botTurn();

      // Check if the bot has won
      winner = getTicTacToeWinner(tttTilesBe);
      if (winner == BOT) alert("The computer wins!");
      else if (winner == EMPTY) alert("It's a tie...");
      gameIsOver = winner != null;

      // Allow actions from player
      playerCanAct = true;
    };
  }
}
