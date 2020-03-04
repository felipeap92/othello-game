import TicTacToeGame from '../../Game/tic-tac-toe-game';
import BoardPos from '../../Board/board-pos';

test('When create new game, board must have size 3', () => {
  const ticTacToeGame = new TicTacToeGame();

  const board = ticTacToeGame.getBoard();

  expect(board.length).toBe(3);
});

test('When get possible movements, returns every possible movements', () => {
  const ticTacToeGame = new TicTacToeGame();

  const movements = ticTacToeGame.getPossibleMovements();

  expect(movements.length).toBe(9);
});

test('When execute a valid play, executes the play', () => {
  const ticTacToeGame = new TicTacToeGame();
  const movements = ticTacToeGame.getPossibleMovements();
  const playMovement = movements[Math.floor(Math.random() * movements.length)];

  ticTacToeGame.play(playMovement);

  const board = ticTacToeGame.getBoard();
  expect(board[playMovement.row][playMovement.column]).toBe(1);
});

test('When execute an invalid play, do nothing', () => {
  const ticTacToeGame = new TicTacToeGame();
  const playMovement = new BoardPos(1, 1);

  ticTacToeGame.play(playMovement);

  const board = ticTacToeGame.getBoard();
  expect(board[playMovement.row][playMovement.column]).toBe(1);
});
