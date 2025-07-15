// Gameboard object to store board state
const Gameboard = {
    board : ['','','','','','','','',''],
    winningCombinations : [
        [0, 1, 2], // Top row
        [3, 4, 5], // Middle row
        [6, 7, 8], // Bottom row
        [0, 3, 6], // Left column
        [1, 4, 7], // Middle column
        [2, 5, 8], // Right column
        [0, 4, 8], // Main diagonal
        [2, 4, 6]  // Anti diagonal
    ],
    checkStatus: function() {
        for (const [a,b,c] of this.winningCombinations) {
            if (this.board[a] && 
                this.board[a] === this.board[b] && 
                this.board[a] === this.board[c]){
                    return true;
                }
            }
        return null;
    },
    showBoard: function(){
        const container  = document.querySelector('.container');
        // Clear the current container
        container.innerHTML = '';
        // Display the cell items on the board
        for (let i=0; i<this.board.length; i++){
            const cell = document.createElement('div');
            cell.classList.toggle('cell');
            cell.textContent = this.board[i];
            container.appendChild(cell);
            // Add Event Listener to every cell to get the player selection
            cell.addEventListener('click', () => {
                GameController.playRound(i);
            })
        }
    }
}

// Load the container on page load
document.addEventListener('DOMContentLoaded', () => {
    Gameboard.showBoard();
});

// Player object constructor
function Player(name, marker){
    this.name = name;
    this.marker = marker;
}

let player1 = null;
let player2 = null;

const players = document.querySelectorAll('.player');
players.forEach(player => {
    player.addEventListener('click', () => {
        // Show player name input after button click
        const container = document.querySelector('.buttons');
        const inputBox = document.createElement('input');
        if (player.id === 'p1'){
            inputBox.id = 'player1';
        } else if (player.id === 'p2'){
            inputBox.id = 'player2';
        }
        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';

        container.appendChild(inputBox);
        container.appendChild(submitButton);

        submitButton.addEventListener('click', () => {
            if (inputBox.id === 'player1'){
                player1 = new Player(inputBox.value,'X');
                console.log(player1);
            } else if (inputBox.id === 'player2'){
                player2 = new Player(inputBox.value,'O');
                console.log(player2);
            }

            // Remove the input areas after submit
            container.removeChild(inputBox);
            container.removeChild(submitButton);

            // Start game if both players are defined
            if (player1 && player2) {
                GameController.currentplayer = player1;
                GameController.isGameReady = true;
                console.log("Game is ready. Player 1 starts.");
            }
        })
    })
})

const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', () => {
    player1 = null;
    player2 = null;

    GameController.currentplayer = null;
    GameController.isGameReady = false;

    Gameboard.board = ['','','','','','','','',''];

    Gameboard.showBoard();
})

// Game controller to control game actions
const GameController = {
    isGameReady : false,
    currentplayer: player1,
    switchPlayer() {
        this.currentplayer = this.currentplayer === player1 ? player2 : player1;
    },
    playRound(position){
        if (!this.isGameReady || !this.currentplayer){
            alert('Please enter both player names to begin.');
            return;
        }
        // If the cell selected is empty
        if (!Gameboard.board[position]) {
            Gameboard.board[position] = this.currentplayer.marker;
            Gameboard.showBoard();
            // Check if the game is complete
            if (Gameboard.checkStatus()){
                console.log(this.currentplayer.name + ' is the winner');
            } 
            // Check if the game is a draw
            else if (!Gameboard.board.includes('')){ 
                    console.log('The game is a draw.'); 
            }else {
                this.switchPlayer();
            }
        }
    }
}


