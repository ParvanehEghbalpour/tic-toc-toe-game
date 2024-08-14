"use strict";

//////////////////////// Elements /////////////////////
const playerX = document.querySelector(".x-player");
const playerO = document.querySelector(".o-player");
const selectPlayerContainer = document.querySelector(".select-player");
const playWithCPUBtn = document.querySelector(".newgame__cpu--btn");
const playWithPlayerBtn = document.querySelector(".newgame__player--btn");
const startGame = document.querySelector(".start-container");
const gameContainer = document.querySelector(".game-container");
const resetBtn = document.querySelector(".reset-btn");
const quitBtn = document.querySelector(".quit-btn");
const nextRoundBtn = document.querySelector(".next-round-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const restartBtn = document.querySelector(".new-game-btn");
const winnerContainer = document.querySelector(".winner-container");
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let options = ["", "", "", "", "", "", "", "", ""];
let running = false;
let player1, player2, cpu;
let activePlayer = false;
let currentPlayer, roundwon;
let cpuEl = false;
let randomNumber;
let select = false;
let playerType;
let xWonCounter, oWonCounter, drawsCounter;
drawsCounter = localStorage.getItem("numberDraw");
oWonCounter = localStorage.getItem("numberOfOWins");
xWonCounter = localStorage.getItem("numberOfXWins");
document.querySelector(".num-x-won").innerHTML =
  localStorage.getItem("numberOfXWins");
document.querySelector(".num-draw").innerHTML =
  localStorage.getItem("numberDraw");
document.querySelector(".num-o-won").innerHTML =
  localStorage.getItem("numberOfOWins");

///////////////////////////// FUNCTIONS //////////////////////////////////////////////////
//////////////// RESET GAME //////////////////////////////
const resetGame = function () {
  document.querySelector(".restart-container").classList.remove("hidden");
};

/////////////// CANCEL RESTART ////////////////////////////
const cancelFunc = function () {
  winnerContainer.classList.add("hidden");
  document.querySelector(".restart-container").classList.add("hidden");
};

////////////////// QUIT GAME ///////////////////////////
const quitFunc = function () {
  winnerContainer.classList.add("hidden");
  document.querySelectorAll(".box").forEach((box) => (box.innerHTML = ""));
  document.querySelector(".turn").innerHTML = `X TURN`;
  startGame.classList.remove("hidden");
  gameContainer.classList.add("hidden");
  options = ["", "", "", "", "", "", "", "", ""];
  roundwon = false;
  running = false;
  activePlayer = false;
  playerType = 0;
  cpuEl = false;
  select = false;
};

/////////////// NEXT ROUND GAME ////////////////////
const nextRoundFunc = function () {
  winnerContainer.classList.add("hidden");
  document.querySelectorAll(".box").forEach((box) => (box.innerHTML = ""));
  document.querySelector(".turn").innerHTML = `X TURN`;
  running = true;
  options = ["", "", "", "", "", "", "", "", ""];
  roundwon = false;
  if (!cpuEl) {
    player1 = "X";
    playerType = 1;
    activePlayer = true;
    console.log("PLAYER");
  }
  if (cpuEl) {
    activePlayer = false;
    console.log("CPU");
    if (cpu === "X") {
      console.log("CPU == X");
      generateRandomNumber();
    } else {
      console.log("CPU == O");
      activePlayer = true;
      playerType = 0;
    }
  }
};
///////////////  STYLING SELECT BOX X OR O BY USER
const pickPlayer = function () {
  if (player1 === "X") {
    playerX.style.backgroundColor = "var(--color-secondary)";
    playerX.style.color = "var(--color-background)";
    playerO.style.backgroundColor = "var(--color-background)";
    playerO.style.color = "var(--color-secondary)";
  }
  if (player1 === "O") {
    playerX.style.backgroundColor = "var(--color-background)";
    playerX.style.color = "var(--color-secondary)";
    playerO.style.backgroundColor = "var(--color-secondary)";
    playerO.style.color = "var(--color-background)";
  }
};

///////////// CHECK WINNER //////////////////////////
const checkWinner = function () {
  roundwon = false;
  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    const cellA = options[condition[0]];
    const cellB = options[condition[1]];
    const cellC = options[condition[2]];
    if (cellA == "" || cellB == "" || cellC == "") {
      continue;
    }
    if (cellA == cellB && cellB == cellC) {
      roundwon = true;
      break;
    }
  }
  /////// IF WINNING HAPPENS
  if (roundwon) {
    running = false;
    winnerContainer.classList.remove("hidden");
    document.querySelector(
      ".result-text"
    ).innerHTML = `${currentPlayer} TAKES THE ROUND`;
    document.querySelector(".result-text").style.color =
      currentPlayer === "X"
        ? "var(--color-player--x)"
        : "var(--color-player--o)";
    // if (currentPlayer === "X" && cpuEl && cpu === "X");
    if (currentPlayer === "X") {
      xWonCounter++;
      localStorage.setItem("numberOfXWins", xWonCounter);
      document.querySelector(".num-x-won").innerHTML =
        localStorage.getItem("numberOfXWins");
    }
    if (currentPlayer === "O") {
      oWonCounter++;
      localStorage.setItem("numberOfOWins", oWonCounter);
      document.querySelector(".num-o-won").innerHTML =
        localStorage.getItem("numberOfOWins");
    }
  } else if (!options.includes("")) {
    running = false;
    winnerContainer.classList.remove("hidden");
    document.querySelector(".result-text").innerHTML = `DRAW!`;
    document.querySelector(".result-text").style.color =
      "var(--color-secondary)";
    drawsCounter++;
    localStorage.setItem("numberDraw", drawsCounter);
    document.querySelector(".num-draw").innerHTML =
      localStorage.getItem("numberDraw");
  }
};
////////////// CPU FUNCTIONS ////////////////////////
const generateRandomNumber = function () {
  console.log("OKKK");
  randomNumber = Math.trunc(Math.random() * 9 + 1);
  setTimeout(playCPUFunc, 1000);
};
const playCPUFunc = function () {
  console.log("Enter");
  if (running && !activePlayer) {
    console.log("ENTER CPU");
    activePlayer = true;
    if (document.querySelector(`.box${randomNumber}`).innerHTML === "") {
      document.querySelector(`.box${randomNumber}`).innerHTML = `${cpu}`;
      console.log(document.querySelector(`.box${randomNumber}`));
      console.log("cpu: ", cpu);
      document
        .querySelector(`.box${randomNumber}`)
        .classList.add(`player-style`);
      document.querySelector(`.box${randomNumber}`).style.color =
        cpu === "X" ? "var(--color-player--x)" : "var(--color-player--o)";
      document.querySelector(".turn").innerHTML = `${
        cpu == "X" ? "O" : "X"
      } TURN`;

      options[randomNumber - 1] = cpu;
      currentPlayer = cpu;
      checkWinner();
    } else {
      activePlayer = false;
      generateRandomNumber();
    }
  }
};

///////// Handlers

//////////// SELECT  x OR O BY USER ///////////////////////

selectPlayerContainer.addEventListener("click", function (e) {
  select = true;
  if (!e.target) return;
  if (e.target.dataset.set === "x") {
    player1 = "X";
    player2 = cpu = "O";
  }
  if (e.target.dataset.set === "o") {
    player1 = "O";
    player2 = cpu = "X";
  }
  pickPlayer();
});

///////////////////// PLAY WITH CPU  ///////////////////////////
playWithCPUBtn.addEventListener("click", function () {
  document.querySelector(".restart-container").classList.add("hidden");
  playerType = 0;
  cpuEl = true;
  options = ["", "", "", "", "", "", "", "", ""];
  running = true;
  startGame.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  if (!select) {
    player2 = cpu = "O";
    player1 = "X";
  }
  if (cpu === "X") {
    player1 = "O";
    generateRandomNumber();
  } else {
    player1 = "X";
    activePlayer = true;
  }
});
//////////////  PLAY
gameContainer.addEventListener("click", function (e) {
  if (!e.target) return;

  const clicked = e.target;
  if (clicked.innerHTML) return;
  ////// if user choose to play with cpu
  if (running && !playerType && activePlayer) {
    cpuEl = true;
    clicked.innerHTML = `${player1}`;
    clicked.classList.add(`player-style`);
    clicked.style.color = `${
      player1 === "X" ? "var(--color-player--x)" : "var(--color-player--o)"
    }`;
    document.querySelector(".turn").innerHTML = `${
      player1 === "X" ? "O" : "X"
    } TURN`;
    options[clicked.dataset.box - 1] = player1;
    currentPlayer = player1;
    activePlayer = false;
    checkWinner();
    generateRandomNumber();
  }
  ////// if user choose to playe with player
  if (running && playerType) {
    clicked.innerHTML = `${player1}`;
    clicked.classList.add(`player-style`);
    clicked.style.color = `${
      player1 === "X" ? "var(--color-player--x)" : "var(--color-player--o)"
    }`;
    document.querySelector(".turn").innerHTML = `${
      player1 === "X" ? "O" : "X"
    } TURN`;
    options[clicked.dataset.box - 1] = player1;
    currentPlayer = player1;
    checkWinner();
    if (!roundwon) player1 = player1 === "X" ? "O" : "X";
  }
});
////////////////// PLAY WITH PLAYER ///////////////////////////////////////////////
playWithPlayerBtn.addEventListener("click", function () {
  document.querySelector(".restart-container").classList.add("hidden");
  options = ["", "", "", "", "", "", "", "", ""];
  cpuEl = false;
  running = true;
  player2 = cpu = "O";
  player1 = "X";
  activePlayer = false;
  startGame.classList.add("hidden");
  gameContainer.classList.remove("hidden");
  playerType = 1;
});

//////////////// HANDLERS
resetBtn.addEventListener("click", resetGame);
quitBtn.addEventListener("click", quitFunc);
nextRoundBtn.addEventListener("click", nextRoundFunc);
restartBtn.addEventListener("click", function () {
  console.log("restart");
  localStorage.removeItem("numberOfXWins");
  localStorage.removeItem("numberOfOWins");
  localStorage.removeItem("numberDraw");
  document.querySelector(".num-x-won").innerHTML = "";
  document.querySelector(".num-o-won").innerHTML = "";
  document.querySelector(".num-draw").innerHTML = "";
  quitFunc();
});
cancelBtn.addEventListener("click", cancelFunc);
