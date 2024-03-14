import { getTicTacToeWinner, generateBoard } from "./board_fnc.mjs";
import { BOT, Board, EMPTY, PLAYER, Tile, Turn } from "./constants.mjs";
import { getBestBotMove } from "./minimax.mjs";

// ==========================
// Global variables
// ==========================

let playerCanAct: boolean = true;
let gameIsOver: boolean = false;

// ==========================
// Get DOM-elements and wrappers
// ==========================

const btnPlayerStarts = document.getElementById("btnPlayerStarts")! as HTMLButtonElement;

const btnBotStarts = document.getElementById("btnBotStarts")! as HTMLButtonElement;

const btnReset = document.getElementById("btnReset")! as HTMLButtonElement;

const tttTilesFe = document.getElementById("tttGrid")!.children as HTMLCollectionOf<HTMLButtonElement>;

let tttTilesBe: Board = generateBoard();

// ==========================
// Game functions
// ==========================

function renderBoard() {
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      tttTilesFe[y * 3 + x].innerText = tttTilesBe[y][x];
    }
  }
}

function setTile(s: Turn, x: number, y: number) {
  if (tttTilesBe[y][x] == EMPTY) tttTilesBe[y][x] = s;
}

async function sleep(ms: number) {
  // Creates a new promise with a resolve function, that calls setTimeout.
  // After ms has elapsed call the resolve function r of the promise. The await
  // makes the code hold till ms has elapsed and r is called.
  await new Promise((r) => setTimeout(r, ms));
}

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

btnPlayerStarts.onclick = (e) => {
  e.preventDefault();
  alert("I taught, I would need that button, but I didn't.");
};

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
