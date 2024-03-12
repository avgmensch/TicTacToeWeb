import { checkForWinner, generateBoard } from "./board_fnc.mjs";
import { BOT, EMPTY, PLAYER } from "./constants.mjs";
import { getBestBotMove } from "./minimax.mjs";
// ==========================
// Global variables
// ==========================
let playerCanAct = true;
let gameNotStarted = true;
let gameIsOver = false;
// ==========================
// Get DOM-elements and wrappers
// ==========================
const btnPlayerStarts = document.getElementById("btnPlayerStarts");
const btnBotStarts = document.getElementById("btnBotStarts");
const btnReset = document.getElementById("btnReset");
const tttTilesFe = document.getElementById("tttGrid").children;
let tttTilesBe = generateBoard();
// ==========================
// Game functions
// ==========================
async function sleep(ms) {
    await new Promise((r) => setTimeout(r, ms));
}
function renderBoard(b) {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            tttTilesFe[y * 3 + x].innerText = tttTilesBe[y][x];
        }
    }
}
function setTile(b, s, x, y) {
    if (b[y][x] == EMPTY)
        b[y][x] = s;
}
function playerPlaceAttempt(b, x, y) {
    if (b[y][x] == EMPTY && playerCanAct) {
        setTile(tttTilesBe, PLAYER, x, y);
        renderBoard(b);
        return true;
    }
    return false;
}
// ==========================
// Setup game
// ==========================
btnPlayerStarts.onclick = (e) => {
    e.preventDefault();
    window.open("https://www.youtube.com/watch?v=z2Qe1d4urfw", "_blank");
};
btnBotStarts.onclick = async (e) => {
    if (!gameNotStarted)
        return;
    gameNotStarted = false;
    console.log("Hello World");
    playerCanAct = false;
    const [xBot, yBot] = getBestBotMove(tttTilesBe);
    await sleep(250);
    setTile(tttTilesBe, BOT, xBot, yBot);
    renderBoard(tttTilesBe);
    playerCanAct = true;
};
btnReset.onclick = (e) => {
    e.preventDefault();
    if (!playerCanAct)
        return;
    tttTilesBe = generateBoard();
    renderBoard(tttTilesBe);
    playerCanAct = true;
    gameNotStarted = true;
    gameIsOver = false;
};
for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        tttTilesFe[y * 3 + x].onclick = async (e) => {
            e.preventDefault();
            if (!playerCanAct || gameIsOver)
                return;
            gameNotStarted = false;
            let winner = null;
            // Player Turn
            const playerTurnValid = playerPlaceAttempt(tttTilesBe, x, y);
            if (!playerTurnValid)
                return;
            winner = checkForWinner(tttTilesBe);
            if (winner == PLAYER) {
                alert("You won (somehow...)");
            }
            // Bot turn
            else {
                playerCanAct = false;
                const [xBot, yBot] = getBestBotMove(tttTilesBe);
                await sleep(250);
                setTile(tttTilesBe, BOT, xBot, yBot);
                renderBoard(tttTilesBe);
                winner = checkForWinner(tttTilesBe);
                if (winner == BOT)
                    alert("The computer wins!");
                else if (winner == EMPTY)
                    alert("It's a tie...");
                playerCanAct = true;
            }
            // Lock board
            gameIsOver = winner != null;
        };
    }
}
