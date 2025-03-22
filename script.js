console.log("Welcome to Tic Tac Toe");

const audioTurn = new Audio("tune.mp3");
let turn = "X";
let isGameOver = false;

// Function to toggle turns
const changeTurn = () => (turn === "X" ? "0" : "X");

// Function to check for a win
const checkWin = () => {
  const boxText = document.getElementsByClassName('boxtext');
  const wins = [
    [0, 1, 2, 5, 5, 0],
    [3, 4, 5, 5, 15, 0],
    [6, 7, 8, 5, 25, 0],
    [0, 3, 6, -5, 15, 90],
    [1, 4, 7, 5, 15, 90],
    [2, 5, 8, 15, 15, 90],
    [0, 4, 8, 5, 15, 45],
    [2, 4, 6, 5, 15, 135]
  ];

  // Check for a win
  wins.forEach(([a, b, c, x, y, angle]) => {
    if (boxText[a].innerText === boxText[b].innerText && 
        boxText[b].innerText === boxText[c].innerText && 
        boxText[a].innerText !== "") {
      document.querySelector('.info').innerText = `${boxText[a].innerText} Won`;
      isGameOver = true;
      document.querySelector('.imgbox img').style.width = "200px";
      document.querySelector(".line").style.transform = `translate(${x}vw, ${y}vw) rotate(${angle}deg)`;
      document.querySelector(".line").style.width = "20vw";
    }
  });

  // Check for a draw
  const isDraw = Array.from(boxText).every(box => box.innerText !== "");
  if (isDraw && !isGameOver) {
    document.querySelector('.info').innerText = "It's a draw";
    isGameOver = true;
  }
};

// Game Logic
const boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element => {
  const boxText = element.querySelector('.boxtext');
  
  element.addEventListener('click', () => {
    if (boxText.innerText === '' && !isGameOver) {
      boxText.innerText = turn;
      audioTurn.play();
      checkWin();
      if (!isGameOver) {
        document.querySelector('.info').innerText = `Turn for ${changeTurn()}`;
        turn = changeTurn();
      }
    }
  });
});

// Reset game
document.getElementById('reset').addEventListener('click', () => {
  const boxTexts = document.querySelectorAll('.boxtext');
  boxTexts.forEach(text => text.innerText = "");
  
  turn = "X";
  isGameOver = false;
  document.querySelector('.line').style.width = "0vw";
  document.querySelector('.info').innerText = `Turn for ${turn}`;
  document.querySelector('.imgbox img').style.width = "0px";
});