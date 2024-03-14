import { getTicTacToeWinner, generateBoard } from "./board_fnc.mjs";
import { BOT, EMPTY, PLAYER } from "./constants.mjs";
import { getBestBotMove } from "./minimax.mjs";
let playerCanAct = true;
let gameIsOver = false;
const btnPlayerStarts = document.getElementById("btnPlayerStarts");
const btnBotStarts = document.getElementById("btnBotStarts");
const btnReset = document.getElementById("btnReset");
const tttTilesFe = document.getElementById("tttGrid").children;
let tttTilesBe = generateBoard();
function renderBoard() {
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {
            tttTilesFe[y * 3 + x].innerText = tttTilesBe[y][x];
        }
    }
}
function setTile(s, x, y) {
    if (tttTilesBe[y][x] == EMPTY)
        tttTilesBe[y][x] = s;
}
async function sleep(ms) {
    await new Promise((r) => setTimeout(r, ms));
}
async function botTurn() {
    const [xBot, yBot] = getBestBotMove(tttTilesBe);
    setTile(BOT, xBot, yBot);
    await sleep(250);
    renderBoard();
}
btnPlayerStarts.onclick = (e) => {
    e.preventDefault();
    alert("I taught, I would need that button, but I didn't.");
};
btnBotStarts.onclick = async (e) => {
    e.preventDefault();
    gameIsOver = false;
    playerCanAct = false;
    tttTilesBe = generateBoard();
    renderBoard();
    await botTurn();
    playerCanAct = true;
};
btnReset.onclick = (e) => {
    e.preventDefault();
    if (!playerCanAct)
        return;
    tttTilesBe = generateBoard();
    playerCanAct = true;
    gameIsOver = false;
    renderBoard();
};
for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
        tttTilesFe[y * 3 + x].onclick = async (e) => {
            e.preventDefault();
            if (!playerCanAct || gameIsOver)
                return;
            let winner = null;
            if (tttTilesBe[y][x] == EMPTY) {
                setTile(PLAYER, x, y);
                renderBoard();
            }
            else {
                playerCanAct = true;
                return;
            }
            winner = getTicTacToeWinner(tttTilesBe);
            if (winner == PLAYER) {
                alert("You won (somehow...)");
                gameIsOver = true;
                return;
            }
            playerCanAct = false;
            await botTurn();
            winner = getTicTacToeWinner(tttTilesBe);
            if (winner == BOT)
                alert("The computer wins!");
            else if (winner == EMPTY)
                alert("It's a tie...");
            gameIsOver = winner != null;
            playerCanAct = true;
        };
    }
}
