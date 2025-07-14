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
        console.log(this.board);
    }
}

// Player object constructor
function Player(name, marker){
    this.name = name;
    this.marker = marker;
}

// Players object creation
const player1 = new Player('A','X');
const player2 = new Player('B','O');

// Game controller to control game actions
const GameController = {
    currentplayer: player1,
    switchPlayer() {
        this.currentplayer = this.currentplayer === player1 ? player2 : player1;
    },
    playRound(position){
        if (!Gameboard.board[position]) {
            Gameboard.board[position] = this.currentplayer.marker;
            Gameboard.showBoard();
            if (Gameboard.checkStatus()){
                console.log(this.currentplayer.name + ' is the winner');
            } else {
                this.switchPlayer();
            }
        }
    }
}

console.log(player1);
console.log(player2);

GameController.playRound(0);
GameController.playRound(3);
GameController.playRound(1);
GameController.playRound(6);
GameController.playRound(2);

