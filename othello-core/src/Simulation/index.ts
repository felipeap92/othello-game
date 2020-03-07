import TicTacToeGame from '../Game/tic-tac-toe-game';
import RandomPlayer from './Player/random-player';

// tslint:disable: no-console
const ticTacToeGame = new TicTacToeGame();
const randomPlayer = new RandomPlayer();

while (!ticTacToeGame.getGameIsOver()) {
  const playMovement = randomPlayer.getPlayMovement(ticTacToeGame);

  ticTacToeGame.play(playMovement);
  printBoard(ticTacToeGame.getBoard());
}

console.log(`GAME IS OVER = ${ticTacToeGame.getGameIsOver()}`);
console.log(`WINNER = ${ticTacToeGame.getWinner()}`);
console.log(`PLAY HISTORY = ${JSON.stringify(ticTacToeGame.getPlayHistory())}`);

function printBoard(board: number[][]): void {
  console.log('-----');

  let boardAsText = '';
  for (const boardRow of board) {
    for (const boardValue of boardRow) {
      boardAsText += boardValue + ' ';
    }

    console.log(boardAsText);
    boardAsText = '';
  }
}
