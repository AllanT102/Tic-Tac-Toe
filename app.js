// gameboard

const Gameboard = (function () {
  let _board = [];
  for (let i = 0; i < 9; i++) _board.push(undefined);

  const getBox = (num) => _board[num];

  const setValue = (num, player) => {
    if (player === undefined) _board[num] = undefined;
    else _board[num] = player.getSign();
  };

  const resetBoard = () => {
    _board.forEach((box, index) => {
      _board[index] = undefined;
    });
  };

  const getBoard = () => {
    return _board;
  };

  return {
    getBox,
    setValue,
    resetBoard,
    getBoard,
  };
})();

//player

const Player = (sign, name, image, isAI) => {
  let _sign = sign;
  let _name = name;
  let _image = image;
  let _isAI = false;
  const getSign = () => _sign;
  const setSign = (sign) => (_sign = sign);
  const getName = () => _name;
  const setName = (name) => (_name = name);
  const getImage = () => _image;
  const setImage = (image) => (_image = image);
  const getAI = () => _isAI;
  const setAI = () => (_isAI = true);

  return {
    getSign,
    setSign,
    getName,
    setName,
    getImage,
    setImage,
    getAI,
    setAI,
  };
};

const GameMenu = (function () {
  let _player1 = Player(null, "Player 1", null, false);
  let _player2 = Player(null, "Player 2", null, false);
  let winner;
  const playerSelection = document.querySelectorAll(".player-character");
  const p1options = document.querySelector('[data-poption="p1-op"]');
  const p2options = document.querySelector('[data-poption="p2-op"]');
  const playerCols = document.querySelectorAll(".player-col");
  const p1name = document.querySelector("#p1-name");
  const p2name = document.querySelector("#p2-name");
  const playBtn = document.querySelector(".play-button");
  const aiBtn = document.querySelector(".ai-button");
  const endBtn = document.querySelector(".end-button");
  const gameDisplay = document.querySelector("#game-display");
  const endGameDisplay = document.querySelector("#end-game-display");
  const playerImages = document.querySelectorAll(".picon-img");

  playerSelection.forEach((sel) => {
    sel.addEventListener("click", () => {
      if (sel.classList.contains("pc-active")) {
        _unselectAllOptions(sel.parentElement);
        sel.classList.remove("pc-active");
        sel.classList.add("pchover");
      } else {
        _unselectAllOptions(sel.parentElement);
        sel.classList.add("pc-active");
        sel.classList.remove("pchover");
        _assignPlayerIcon(sel);
      }
    });
  });

  playBtn.addEventListener("click", _switchDisplaysMP);
  aiBtn.addEventListener("click", _switchDisplaysAI);

  endBtn.addEventListener("click", () => {
    Gameboard.resetBoard();
    GameController.clearGrid();
    playerImages.forEach((i) => (i.style.borderColor = "white"));
    _resetDisplay();
    GameController.setFirstPlayer();
    winner = undefined;
  });

  function _unselectAllOptions(parent) {
    const children = parent.getElementsByTagName("img");
    for (let child of children) {
      if (child.classList.contains("pc-active")) {
        child.classList.remove("pc-active");
      }
    }
  }

  function _assignPlayerIcon(sel) {
    if (sel.parentElement === p1options) {
      _player1.setImage(sel.getAttribute("src"));
    } else if (sel.parentElement === p2options)
      _player2.setImage(sel.getAttribute("src"));
  }

  function _checkPlayersReady() {
    return _player1.getImage() != null && _player2.getImage() != null
      ? true
      : false;
  }

  function _switchDisplaysAI() {
    _setRandomPlayers();
    _switchDisplays();
  }

  function _switchDisplaysMP() {
    _setPlayerInfo();
    if (_checkPlayersReady()) _switchDisplays();
  }

  function _switchDisplays() {
    const pregameDisplay = document.querySelector(".pregame-screen");
    pregameDisplay.style.animation = "1s ease-out zoom-out";
    setTimeout(function () {
      pregameDisplay.style.visibility = "hidden";
      gameDisplay.style.animation = "1s ease-out load-zoom";
      gameDisplay.style.visibility = "visible";

      const p1image = document.querySelector('[data-img="p1-img"');
      const p2image = document.querySelector('[data-img="p2-img"');
      p1image.src = _player1.getImage();
      p2image.src = _player2.getImage();

      const p1Name = document.createElement("span");
      const p2Name = document.createElement("span");
      p1name.value === ""
        ? (p1Name.textContent = "Player 1")
        : (p1Name.textContent = p1name.value);
      p2name.value === ""
        ? (p2Name.textContent = "Player 2")
        : (p2Name.textContent = p2name.value);
      p1Name.classList.add("name-text");
      p2Name.classList.add("name-text");
      const [p1, p2] = playerCols;
      p1.appendChild(p1Name);
      p2.appendChild(p2Name);
      if (!GameController.getTurn() && _player2.getAI()) {
        miniMaxAiLogic.bestMove();
        GameController.setTurn(_player1);
      }
    }, 1000);
  }

  function _resetDisplay() {
    endGameDisplay.classList.remove("end-screen");
    gameDisplay.classList.remove("game-display-end");
  }

  function displayEndGame(name) {
    const winnerName = document.querySelector(".winner-text");
    name === "tie"
      ? (winnerName.textContent = "It was a tie")
      : (winnerName.textContent = name + " wins!");
    endGameDisplay.classList.add("end-screen");
    gameDisplay.classList.add("game-display-end");
  }

  function _setPlayerInfo() {
    let rand = Math.random(2);
    if (rand === 1) {
      _player1.setSign("X");
      _player2.setSign("O");
    } else {
      _player1.setSign("O");
      _player2.setSign("X");
    }
    p1name.value === ""
      ? _player1.setName("Player 1")
      : _player1.setName(p1name.value);
    p2name.value === ""
      ? _player2.setName("Player 2")
      : _player2.setName(p2name.value);
  }

  function _setRandomPlayers() {
    let images = [
      "./images/gojo.jpg",
      "./images/nobara.jpg",
      "./images/sukuna.png",
      "./images/yuji.jpg",
    ];
    let p1img = Math.floor(Math.random() * 4);
    let p2img = Math.floor(Math.random() * 4);
    let rand = Math.floor(Math.random(2));
    if (rand === 1) {
      _player1.setSign("X");
      _player2.setSign("O");
    } else {
      _player1.setSign("O");
      _player2.setSign("X");
    }
    _player1.setName("Player 1");
    _player2.setName("AI");
    p2name.value = "AI";
    _player1.setImage(images[p1img]);
    _player2.setImage(images[p2img]);
    _player2.setAI();
  }

  function getPlayers() {
    let players = [];
    players.push(_player1);
    players.push(_player2);
    return players;
  }

  return {
    getPlayers,
    displayEndGame,
  };
})();

const GameController = (function () {
  const gridBoxes = document.querySelectorAll(".grid-box");
  const players = GameMenu.getPlayers();
  const p1image = document.querySelector('[data-img="p1-img"');
  const p2image = document.querySelector('[data-img="p2-img"');
  const gameBoard = Gameboard.getBoard();
  let gameEnded = false;
  let tied = false;
  let winner;
  const winBoards = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [0, 4, 8],
  ];
  let playerTurn; // true means p1 turn false means p2 turn

  function setFirstPlayer() {
    let rand = Math.floor(Math.random() * 2);
    if (rand === 1) {
      playerTurn = true;
      p1image.style.borderColor = "red";
    } else {
      playerTurn = false;
      p2image.style.borderColor = "red";
    }
    if (players[1].getAI() && !playerTurn) {
      miniMaxAiLogic.bestMove();
      setTurn(GameMenu.getPlayers()[0]);
    }
  }

  function checkTie() {
    let allFilled = true;
    gridBoxes.forEach((box) => {
      if (!box.classList.contains("active")) allFilled = false;
    });
    return allFilled;
  }

  function checkWin() {
    let players = GameMenu.getPlayers();
    for (let i = 0; i < winBoards.length; i++) {
      let allSame = true;
      let choice = Gameboard.getBox(winBoards[i][0]);
      for (let x = 0; x < winBoards[0].length; x++) {
        if (
          Gameboard.getBox(winBoards[i][x]) !== choice ||
          Gameboard.getBox(winBoards[i][x]) === undefined
        ) {
          allSame = false;
          break;
        }
      }
      if (allSame) {
        choice === players[0].getSign()
          ? (winner = players[0])
          : (winner = players[1]);
        return allSame;
      }
    }
    return false;
  }

  function endIfWin() {
    if (checkWin()) {
      tied = false;
      gameEnded = true;
      triggerEndGame();
    }
  }

  function endIfTie() {
    if (checkTie()) {
      tied = true;
      gameEnded = true;
      triggerEndGame();
    }
  }

  function triggerEndGame() {
    if (gameEnded) {
      if (tied) GameMenu.displayEndGame("tie");
      else GameMenu.displayEndGame(winner.getName());
      gameEnded = false;
      tie = false;
      winner = undefined;
    }
  }

  function _getPlayerTurn() {
    return playerTurn ? players[0] : players[1];
  }

  function setTurn(player) {
    if (player === players[0]) {
      playerTurn = false;
      p1image.style.borderColor = "red";
      p2image.style.borderColor = null;
    } else {
      playerTurn = true;
      p1image.style.borderColor = null;
      p2image.style.borderColor = "red";
    }
    playerTurn = !playerTurn;
  }

  function _addGridControls() {
    gridBoxes.forEach((box) => {
      box.addEventListener("click", () => {
        if (!box.classList.contains("active")) {
          let player = _getPlayerTurn();
          const span = document.createElement("span");
          player.getSign() === "X"
            ? (span.textContent = "X")
            : (span.textContent = "O");
          box.appendChild(span);
          _setBoardValue(player, box);
          box.classList.add("active");

          if (checkWin()) endIfWin();
          else if (checkTie()) endIfTie();
          else {
            if (playerTurn && players[1].getAI()) {
              miniMaxTurn();
            } else
              player === players[0] ? setTurn(players[1]) : setTurn(players[0]);
          }
          triggerEndGame();
        }
      });
    });
  }

  const miniMaxTurn = function () {
    setTurn(players[1]);
    miniMaxAiLogic.bestMove();
    setTurn(players[0]);
  };

  function _setBoardValue(player, box) {
    const boxNum = box.getAttribute("data-boxnum");
    Gameboard.setValue(boxNum, player);
  }

  function clearGrid() {
    gridBoxes.forEach((box) => {
      if (box.firstChild) box.removeChild(box.firstChild);
      if (box.classList.contains("active")) box.classList.remove("active");
    });
  }

  function init() {
    _addGridControls();
    setFirstPlayer();
  }

  function getTurn() {
    return playerTurn;
  }

  function getWinner() {
    return winner;
  }

  init();

  return {
    init,
    clearGrid,
    setFirstPlayer,
    checkWin,
    setTurn,
    triggerEndGame,
    getTurn,
    miniMaxTurn,
    checkTie,
    endIfTie,
    endIfWin,
    getWinner,
  };
})();

const miniMaxAiLogic = (function () {
  const gridBoxes = document.querySelectorAll(".grid-box");
  const gameBoard = Gameboard.getBoard();

  const bestMove = function () {
    let bestScore = -10000;
    let move;
    for (let i = 0; i < 9; i++) {
      if (gameBoard[i] === undefined) {
        Gameboard.setValue(i, GameMenu.getPlayers()[1]);
        let score = miniMax(
          gameBoard,
          0,
          Number.NEGATIVE_INFINITY,
          Number.POSITIVE_INFINITY,
          false
        );
        Gameboard.setValue(i, undefined);
        if (score > bestScore) {
          bestScore = score;
          move = i;
        }
      }
    }
    const box = gridBoxes[move];
    if (box !== undefined) {
      const span = document.createElement("span");
      span.textContent = GameMenu.getPlayers()[1].getSign();
      box.appendChild(span);
      box.classList.add("active");
    }
    Gameboard.setValue(move, GameMenu.getPlayers()[1]);
    if (GameController.checkWin()) GameController.endIfWin();
    else if (GameController.checkTie()) GameController.endIfTie();
  };

  const miniMax = function (board, depth, alpha, beta, isMaximizing) {
    if (GameController.checkWin() || GameController.checkTie()) {
      let score;
      let players = GameMenu.getPlayers();
      if (GameController.getWinner() === players[1]) score = 10;
      else if (GameController.getWinner() === players[0]) score = -10;
      else score = 0;
      return score;
    }

    if (isMaximizing) {
      let bestScore = -10000;
      for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === undefined) {
          Gameboard.setValue(i, GameMenu.getPlayers()[1]);
          let score = miniMax(gameBoard, depth + 1, alpha, beta, false);
          Gameboard.setValue(i, undefined);
          alpha = Math.max(alpha, bestScore);
          bestScore = Math.max(score, bestScore);
        }
        if (beta <= alpha) break;
      }
      return bestScore;
    } else {
      let bestScore = 10000;
      for (let i = 0; i < 9; i++) {
        if (gameBoard[i] === undefined) {
          Gameboard.setValue(i, GameMenu.getPlayers()[0]);
          let score = miniMax(gameBoard, depth + 1, alpha, beta, true);
          Gameboard.setValue(i, undefined);
          beta = Math.min(beta, bestScore);
          bestScore = Math.min(score, bestScore);
        }
        if (beta <= alpha) break;
      }
      return bestScore;
    }
  };

  return {
    bestMove,
    miniMax,
  };
})();
