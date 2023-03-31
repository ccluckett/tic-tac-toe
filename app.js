
//State //
const state = {};

const resetState = () => { 
  state.board = ['','','','','','','','',''];
  
  state.players = ["X","O"]; 
  state.score = [0,0]
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
  let playerElemHTML = `<input type = "text" name = "player1" placeholder = " Player 1 Name" />
  <input type = "text" name = "player2" placeholder = " Player 2 Name" />
  <button id = "start"> Play </button>`;
  playerElem.innerHTML = playerElemHTML;
  
  body.appendChild(playerElem);

};




const takeTurn = (index) => {
  const square = nextTurn();
  //console.log(square);
}


// Board Element //

const board = document.createElement('main');
const renderBoard = () => {
  board.id = "board";
  for (let i = 0; i < 9; i++){             // creates the board. //
    const square = state.board[i]
    const cell = document.createElement("div");
    cell.className = 'cell';           // adds className of cell to each element.//
    cell.dataset.index = i;            // adds an index to check againt state. //
    
    cell.innerHTML = takeTurn ();
    board.appendChild(cell);
  }

  body.appendChild(board);  
};

function render() {
  renderPlayer();
  renderBoard();
  console.log('state is: ',state);
};

/*const takeTurn = (index) => {
  const square = nextTurn();
  //console.log(square);
} */


/* Event Listeners */

board.addEventListener('click', (event) => {
  if(!event.target.classList.contains('cell')) return; 
  console.dir(event.target.dataset); 
  cellIdx = event.target.dataset.index;
  takeTurn(cellIdx)

});

playerElem.addEventListener('click', (event) => {
  if(event.target.id === 'start' ){
    const player1Field = document.querySelector ('input[name = "player1"]');
    state.players[0] = player1Field.value;
    //console.log(state.players[0]);
   
    const player2Field = document.querySelector ('input[name = "player2"]');
    state.players[1] = player2Field.value;
   // console.log(state.players[1]);
  }
}); 


const arrGlobal = ["X", "O"];
let index = 0;
function nextTurn() {
  if (index === arrGlobal.length) index = 0;
  const nextElem = arrGlobal[index];
  index++;
  console.log(nextElem);
  return nextElem;
}

/*nextTurn()
nextTurn()
nextTurn()
nextTurn() */




resetState();
render();
