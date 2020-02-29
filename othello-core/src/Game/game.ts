import BoardPos from '../Board/board-pos';

/**
 * Contains the default logic and implementation of the game.
 */
export default abstract class Game {
  /**
   * Game board size.
   */
  protected boardSize: number;

  /**
   * Contains the whole board data.
   */
  protected board: number[][] = [];

  /**
   * Gets every possible movement from the current player.
   * @returns Returns the game board (matrix of nubmers).
   */
  abstract getPossibleMovements(): BoardPos[];

  /**
   * Initialize a new game with a pre-determined board size.
   * @param boardSize The board size.
   */
  constructor(boardSize: number) {
    if (boardSize <= 0)
      throw new Error(`'${boardSize}' is not a valid board size.`);

    this.boardSize = boardSize;
    this.initBoard(boardSize);
  }

  /**
   * Returns the game board.
   * @returns Returns the game board (matrix of nubmers).
   */
  public getBoard(): number[][] {
    return this.board;
  }

  /**
   * Initializes the game board with the value passed by.
   * @param boardSize The board size.
   */
  private initBoard(boardSize: number): void {
    this.board = [];
    for (let row = 0; row < boardSize; row++) {
      this.board[row] = [];
      for (let column = 0; column < boardSize; column++) {
        this.board[row][column] = 0;
      }
    }
  }
}
