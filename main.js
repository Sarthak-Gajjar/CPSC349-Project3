const player = "O";
const computer = "X";

let complete_board = false;
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const board_container = document.querySelector(".game_area");

const winner_statement = document.getElementById("winner");

check_complete_board = () => {
  let flag = true;
  gameBoard.forEach(element => {
    if (element != player && element != computer) {
      flag = false;
    }
  });
  complete_board = flag;
};


const check_line = (a, b, c) => {
  return (
    gameBoard[a] == gameBoard[b] &&
    gameBoard[b] == gameBoard[c] &&
    (gameBoard[a] == player || gameBoard[a] == computer)
  );
};

const check_match = () => {
  for (i = 0; i < 9; i += 3) {
    if (check_line(i, i + 1, i + 2)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 1}`).classList.add("win");
      document.querySelector(`#block_${i + 2}`).classList.add("win");
      return gameBoard[i];
    }
  }
  for (i = 0; i < 3; i++) {
    if (check_line(i, i + 3, i + 6)) {
      document.querySelector(`#block_${i}`).classList.add("win");
      document.querySelector(`#block_${i + 3}`).classList.add("win");
      document.querySelector(`#block_${i + 6}`).classList.add("win");
      return gameBoard[i];
    }
  }
  if (check_line(0, 4, 8)) {
    document.querySelector("#block_0").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_8").classList.add("win");
    return gameBoard[0];
  }
  if (check_line(2, 4, 6)) {
    document.querySelector("#block_2").classList.add("win");
    document.querySelector("#block_4").classList.add("win");
    document.querySelector("#block_6").classList.add("win");
    return gameBoard[2];
  }
  return "";
};

const check_for_winner = () => {
  let res = check_match()
  if (res == player) {
    winner.innerText = "Player Wins!";
    winner.classList.add("playerWin");
    complete_board = true
  } else if (res == computer) {
    winner.innerText = "Computer Wins!";
    winner.classList.add("computerWin");
    complete_board = true
  } else if (complete_board) {
    winner.innerText = "Tie!";
    winner.classList.add("draw");
  }
};

const render_board = () => {
  board_container.innerHTML = ""
  gameBoard.forEach((e, i) => {
    board_container.innerHTML += `<div id="block_${i}" class="block" onclick="addPlayerMove(${i})">${gameBoard[i]}</div>`
    if (e == player || e == computer) {
      document.querySelector(`#block_${i}`).classList.add("occupied");
    }
  });
};

const game_loop = () => {
  render_board();
  check_complete_board();
  check_for_winner();
}

const addPlayerMove = e => {
  if (!complete_board && gameBoard[e] == "") {
    gameBoard[e] = player;
    game_loop();
    addComputerMove();
  }
};

const addComputerMove = () => {
  if (!complete_board) {
    do {
      selected = Math.floor(Math.random() * 9);
    } while (gameBoard[selected] != "");
    gameBoard[selected] = computer;
    game_loop();
  }
};

const reset_board = () => {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  complete_board = false;
  winner.classList.remove("playerWin");
  winner.classList.remove("computerWin");
  winner.classList.remove("draw");
  winner.innerText = "";
  render_board();
};

//initial render
render_board();
