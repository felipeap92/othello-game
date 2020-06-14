import GameMock from '../Mocks/game-mock';
import BoardPos from '../../Board/board-pos';

test('When create new game with board size > 0, create new game', () => {
  for (let size = 1; size <= 10; size++) {
    const game = new GameMock(size);
    const board = game.getBoard();
    expect(board.length).toBe(size);
  }
});

test('When create new game with board size <= 0, throw error', () => {
  for (let size = -10; size <= 0; size++) {
    const expectedError = Error(`'${size}' is not a valid board size.`);
    expect(() => new GameMock(size)).toThrow(expectedError);
  }
});

test('When execute a valid play, executes the play', () => {
  const game = new GameMock(3);
  const movements = game.getPossibleMovements();
  const playMovement = movements[Math.floor(Math.random() * movements.length)];

  expect(game.play(playMovement)).toBeTruthy();
  expect(game.getBoard()[playMovement.row][playMovement.column]).toBe(1);
  expect(game.getGameIsOver()).toBeFalsy();
  expect(game.getWinner()).toBe(-1);
  expect(game.getPlayHistory().length).toBe(1);
});

test('When execute an invalid play, return false and do nothing', () => {
  const game = new GameMock(3);
  const playMovement = new BoardPos(2, 2);

  expect(game.play(playMovement)).toBeFalsy();
  expect(game.getBoard()[playMovement.row][playMovement.column]).toBe(0);
  expect(game.getGameIsOver()).toBeFalsy();
  expect(game.getWinner()).toBe(-1);
  expect(game.getPlayHistory().length).toBe(0);
});

test('When game is over and try play, return false and do nothing', () => {
  const game = new GameMock(1);
  const playMovement = new BoardPos(0, 0);

  expect(game.play(playMovement)).toBeTruthy();
  expect(game.play(playMovement)).toBeFalsy();
  expect(game.getBoard()[playMovement.row][playMovement.column]).toBe(1);
  expect(game.getGameIsOver()).toBeTruthy();
  expect(game.getWinner()).toBe(0);
  expect(game.getPlayHistory().length).toBe(1);
});
