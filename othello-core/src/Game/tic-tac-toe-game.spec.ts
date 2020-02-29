import TicTacToeGame from './tic-tac-toe-game';

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
