import { generateBoard } from "./board_fnc.mjs";
// ==========================
// Global variables
// ==========================
let playerTurn = null;
// ==========================
// Get DOM-elements and wrappers
// ==========================
const btnPlayerStarts = document.getElementById("btnPlayerStarts");
const btnBotStarts = document.getElementById("btnBotStarts");
const btnReset = document.getElementById("btnReset");
const tttTilesFe = document.getElementById("tttGrid").children;
const tttTilesBe = generateBoard();
// ==========================
// Game functions
// ==========================
function renderBoard(b) {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            console.log(tttTilesFe[y * 3 + x]);
            tttTilesFe[y * 3 + x].innerText = tttTilesBe[y][x];
        }
    }
}
function playerPlaceAttempt(b, x, y) {
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
