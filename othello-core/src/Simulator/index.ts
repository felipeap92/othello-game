import TicTacToeGame from '../Game/tic-tac-toe-game';
import RandomPlayer from './Player/random-player';

// tslint:disable: no-console
const ticTacToeGame = new TicTacToeGame();
const randomPlayer = new RandomPlayer();

let movements = ticTacToeGame.getPossibleMovements();
while (movements.length !== 0) {
  const playMovement = randomPlayer.getPlayMovement(ticTacToeGame);

  ticTacToeGame.play(playMovement);

  printBoard(ticTacToeGame.getBoard());

  movements = ticTacToeGame.getPossibleMovements();
}

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
