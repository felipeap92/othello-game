import BoardPos from '../../Board/board-pos';

test('When create new model, position must be equal', () => {
  const row = 2;
  const column = 5;
  const boardPos = new BoardPos(row, column);

  expect(boardPos.row).toBe(row);
  expect(boardPos.column).toBe(column);
});

test('When create new board position with invalid row value, throw error', () => {
  for (let row = -5; row < 0; row++) {
    const expectedError = Error(`'${row}' is not a valid row position.`);
    expect(() => new BoardPos(row, 5)).toThrow(expectedError);
  }
});

test('When create new board position with invalid row value, throw error', () => {
  for (let column = -5; column < 0; column++) {
    const expectedError = Error(`'${column}' is not a valid column position.`);
    expect(() => new BoardPos(2, column)).toThrow(expectedError);
  }
});
