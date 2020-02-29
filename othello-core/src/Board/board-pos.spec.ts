import BoardPos from './board-pos';

test('When create new model, position must be equal', () => {
  const row = 1;
  const column = 5;
  const boardPos = new BoardPos(row, column);

  expect(boardPos.row).toBe(row);
  expect(boardPos.column).toBe(column);
});
