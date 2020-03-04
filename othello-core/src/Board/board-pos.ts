/**
 * Model containing board row and column position.
 */
export default class BoardPos {
  /**
   * Initializes a new board position.
   * @param row The row position of the board.
   * @param column The column position of the board.
   */
  constructor(public row: number, public column: number) {
    if (row < 0)
      throw new Error(`'${row}' is not a valid row position.`);

    if (column < 0)
      throw new Error(`'${column}' is not a valid column position.`);
  }
}
