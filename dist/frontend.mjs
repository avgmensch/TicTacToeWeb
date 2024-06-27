import { getTicTacToeWinner, generateBoard } from "./board_fnc.mjs";
import { BOT, EMPTY, PLAYER } from "./constants.mjs";
import { getBestBotMove } from "./minimax.mjs";
let playerCanAct = true;
let gameIsOver = false;
const textWinnerDisplay = document.getElementById("textWinnerDisplay");
const textWinnerDisplayShow = "display: block;";
const textWinnerDisplayHide = "display: none;";
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
function announceWinner(winner) {
    if (winner == null)
        return;
    switch (winner) {
        case BOT:
            textWinnerDisplay.innerHTML = "The Bot Won...";
            break;
        case PLAYER:
            textWinnerDisplay.innerHTML = "You won ...<br/>Tell me how!";
            break;
        case EMPTY:
            textWinnerDisplay.innerHTML = "It's a tie...";
            break;
    }
    textWinnerDisplay.setAttribute("style", textWinnerDisplayShow);
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
    textWinnerDisplay.innerHTML = "";
    textWinnerDisplay.setAttribute("style", textWinnerDisplayHide);
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
                announceWinner(PLAYER);
                gameIsOver = true;
                return;
            }
            playerCanAct = false;
            await botTurn();
            winner = getTicTacToeWinner(tttTilesBe);
            if (winner == BOT)
                announceWinner(BOT);
            else if (winner == EMPTY)
                announceWinner(EMPTY);
            gameIsOver = winner != null;
            playerCanAct = true;
        };
    }
}
