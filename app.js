
//State //
const state = {};

const resetState = () => { 
  
  
  
  
  
  state.board = ['','','','','','','','',''];
  
  
  state.currentPlayerIdx = 0;
  state.getCurrentCharacter = nextTurn();
  state.getCurrentPlayer = () => state.players[state.currentPlayerIdx];
  state.players = ["",""]; 
};


// DOM Selectors //
const body = document.querySelector('body');


// Title Element //

const titleH1 = document.createElement('h1');
titleH1.id = "title";
titleH1.innerText = "Let's Play Tic-Tac-Toe!";

body.appendChild(titleH1);

//Player Element //

const playerElem= document.createElement('p');

const renderPlayer = () => {
  playerElem.id = "playerNameElem";
  let playerElemHTML;
  if (!state.players[0] || !state.players[1]) {
    playerElemHTML = `<input type = "text" name = "player1" placeholder = " Player 1 Name" />
    <input type = "text" name = "player2" placeholder = " Player 2 Name" />
    <button id = "start"> Play </button>`;
  } else {
    playerElemHTML = `Its currently ${state.players[state.currentPlayerIdx]}'s turn.`;
    // state.currentPlayerIdx = Math.abs(state.currentPlayerIdx -1);
    //console.log(state.players[state.currentPlayerIdx]);
  }
  
  playerElem.innerHTML = playerElemHTML;
  
  body.appendChild(playerElem);
  
};



function removeChildNodes(parent){
  while (parent.firstChild) { 
    parent.removeChild(parent.firstChild)
  }
}
const characterArr = ["X","O"];
let index = 0;
function nextTurn() {
  if (index === characterArr.length) index = 0;
  const nextElem = characterArr[index];
  index++;
  // console.log(nextElem);
  return nextElem;
}



/*const playersArr = [state.players];
let i = 0;
function currentPlayer() {
  if (i === playersArr.length) i = 0;
  const nextElem = playersArr[i];
  i++;
  console.log(nextElem);
  return nextElem; 
} */

// Board Element //

const board = document.createElement('main');
const renderBoard = () => {
  removeChildNodes(board);
  
  board.id = "board";
  for (let i = 0; i < state.board.length; i++){             // creates the board. //
    const cellElem = document.createElement('div');
    cellElem.className = 'cell';           // adds className of cell to each element.//
    cellElem.innerText = state.board[i];     // adds an index to check againt state. //
    cellElem.dataset.index = i;     
    state.currentPlayerIdx = Math.abs(state.currentPlayerIdx);
    
    board.appendChild(cellElem);
    
  }
  
  body.appendChild(board);  
};

const waysToWin = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6],

];

function findWinner() {
  let gameOver = false;

  for (let i = 0; i < waysToWin.length; i++){
    const winCondition = waysToWin[i];
    const a = state.board[winCondition[0]];
    const b = state.board[winCondition[1]];
    const c = state.board[winCondition[2]];

    if (a == "" || b == "" || c == "" ) {
         continue;
    } 
     if (a == b && b == c){
        alert (`${state.players[state.currentPlayerIdx]} has won !`);
        resetState();
        render();
      }
    }
    
    if (!state.board.includes("")) {
      alert (`Draw!`);
      resetState();
      render();
    }
    else{
         nextTurn();
    } 
   
}

function checkBoard() {
  state.winner = findWinner();
}

function render() {
  renderPlayer();
  renderBoard();
  console.log('state is: ',state);
};

/* Event Listeners */

board.addEventListener('click', (event) => {
  if(!event.target.classList.contains('cell')) return; 
 const cellIndx = event.target.dataset.index; 
  if(state.board[cellIndx] === '' ){
    state.board[cellIndx] = characterArr[state.currentPlayerIdx]; 
    event.target.innerText = characterArr[state.currentPlayerIdx];
    state.currentPlayerIdx = 1 - state.currentPlayerIdx;
    //state.getCurrentCharacter = nextTurn();
    renderPlayer();
    findWinner();
  }

}); 

playerElem.addEventListener('click', (event) => {
  if(event.target.id === 'start' ){
    const player1Field = document.querySelector ('input[name = "player1"]');
    state.players[0] = player1Field.value;
   // console.log(state.players[0]);
   
    const player2Field = document.querySelector ('input[name = "player2"]');
    state.players[1] = player2Field.value;
    //state.getCurrentPlayer = currentPlayer();
    renderPlayer();
  }
}); 





resetState();
render();
