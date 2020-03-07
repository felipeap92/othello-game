import TicTacToeGame from '../../Game/tic-tac-toe-game';
import BoardPos from '../../Board/board-pos';

test('When create new game, board must have size 3', () => {
  const ticTacToeGame = new TicTacToeGame();

  const board = ticTacToeGame.getBoard();

  expect(board.length).toBe(3);
});

test('When get possible movements, returns every possible movements', () => {
  const ticTacToeGame = new TicTacToeGame();

  const movements = ticTacToeGame.getCurrentPossibleMovements();

  expect(movements.length).toBe(9);
});

test('When player wins diagonal, return whole data correctly', () => {
  const ticTacToeGame = new TicTacToeGame();
  ticTacToeGame.play(new BoardPos(0, 0));
  ticTacToeGame.play(new BoardPos(0, 1));
  ticTacToeGame.play(new BoardPos(1, 1));
  ticTacToeGame.play(new BoardPos(0, 2));
  ticTacToeGame.play(new BoardPos(2, 2));

  expect(ticTacToeGame.getGameIsOver()).toBeTruthy();
  expect(ticTacToeGame.getWinner()).toBe(1);
  expect(ticTacToeGame.getPlayHistory().length).toBe(5);
  expect(ticTacToeGame.getCurrentPossibleMovements().length).toBe(0);
});

test('When player wins anti-diagonal, return whole data correctly', () => {
  const ticTacToeGame = new TicTacToeGame();
  ticTacToeGame.play(new BoardPos(0, 0));
  ticTacToeGame.play(new BoardPos(2, 0));
  ticTacToeGame.play(new BoardPos(0, 1));
  ticTacToeGame.play(new BoardPos(1, 1));
  ticTacToeGame.play(new BoardPos(1, 2));
  ticTacToeGame.play(new BoardPos(0, 2));

  expect(ticTacToeGame.getGameIsOver()).toBeTruthy();
  expect(ticTacToeGame.getWinner()).toBe(2);
  expect(ticTacToeGame.getPlayHistory().length).toBe(6);
  expect(ticTacToeGame.getCurrentPossibleMovements().length).toBe(0);
});

test('When draw, return whole data correctly', () => {
  const ticTacToeGame = new TicTacToeGame();
  ticTacToeGame.play(new BoardPos(2, 2));
  ticTacToeGame.play(new BoardPos(2, 1));
  ticTacToeGame.play(new BoardPos(1, 2));
  ticTacToeGame.play(new BoardPos(1, 1));
  ticTacToeGame.play(new BoardPos(2, 0));
  ticTacToeGame.play(new BoardPos(0, 2));
  ticTacToeGame.play(new BoardPos(0, 1));
  ticTacToeGame.play(new BoardPos(0, 0));
  ticTacToeGame.play(new BoardPos(1, 0));

  expect(ticTacToeGame.getGameIsOver()).toBeTruthy();
  expect(ticTacToeGame.getWinner()).toBe(0);
  expect(ticTacToeGame.getPlayHistory().length).toBe(9);
  expect(ticTacToeGame.getCurrentPossibleMovements().length).toBe(0);
});

test('When player wins and try play, do nothing', () => {
  const ticTacToeGame = new TicTacToeGame();
  ticTacToeGame.play(new BoardPos(0, 0));
  ticTacToeGame.play(new BoardPos(0, 1));
  ticTacToeGame.play(new BoardPos(1, 1));
  ticTacToeGame.play(new BoardPos(0, 2));
  ticTacToeGame.play(new BoardPos(2, 2));
  const invalidPlay = new BoardPos(2, 0);

  ticTacToeGame.play(invalidPlay);

  expect(ticTacToeGame.getGameIsOver()).toBeTruthy();
  expect(ticTacToeGame.getWinner()).toBe(1);
  expect(ticTacToeGame.getPlayHistory().length).toBe(5);
  expect(ticTacToeGame.getCurrentPossibleMovements().length).toBe(0);
  expect(ticTacToeGame.getBoard()[invalidPlay.row][invalidPlay.column]).toBe(0);
});
