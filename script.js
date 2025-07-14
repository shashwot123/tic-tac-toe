const Gameboard = {
    board : ['','','','','','','','','']
}

// Player object constructor
function Player(name, marker){
    this.name = name;
    this.marker = marker;
}

const player1 = new Player('A','X');
const player2 = new Player('B','O');

const GameController = {
    currentplayer: player1,
    switchPlayer() {
        this.currentplayer = this.currentplayer === player1 ? player2 : player1;
    },
    playRound(position){
        if (!Gameboard.board[position]) {
            Gameboard.board[position] = this.currentplayer.marker;
        }
        this.switchPlayer();
    }
}