import GameMock from '../Mocks/game-mock';

test('When create new game with board size > 0, create new game', () => {
  for (let size = 1; size <= 10; size++) {
    const newGame = new GameMock(size);
    const board = newGame.getBoard();
    expect(board.length).toBe(size);
  }
});

test('When create new game with board size <= 0, throw error', () => {
  for (let size = -10; size <= 0; size++) {
    const expectedError = Error(`'${size}' is not a valid board size.`);
    expect(() => new GameMock(size)).toThrow(expectedError);
  }
});
