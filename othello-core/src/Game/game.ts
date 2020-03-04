import BoardPos from '../Board/board-pos';

/**
 * Contains the default game abastraction logic and implementation.
 */
export default abstract class Game {
  /**
   * Game board size.
   */
  protected boardSize: number = 0;

  /**
   * Contains the whole board data.
   */
  protected board: number[][] = [];

  /**
   * Number of the current player that should play the next movement.
   */
  protected currentPlayer: number = 1;

  /**
   * Contains the possible movements which the current player can play.
   */
  protected currentPossibleMovements: BoardPos[] = [];

  /**
   * Contains the current state of the game. True if the game is over, false otherwise.
   */
  protected gameIsOver: boolean = false;

  /**
   * Number of the player that won the match.
   */
  protected winner: number = 0;

  /**
   * Initialize a new game with a pre-determined board size.
   * @param boardSize The board size.
   */
  constructor(boardSize: number) {
    if (boardSize <= 0) throw new Error(`'${boardSize}' is not a valid board size.`);

    this.initBoard(boardSize);
    this.currentPossibleMovements = this.getPossibleMovements();
  }

  /**
   * Gets every possible movement from the current player.
   * @returns Returns the game board (matrix of nubmers).
   */
  abstract getPossibleMovements(): BoardPos[];

  /**
   * Checks if the game is over or not.
   * @param play Last play done by the current player.
   * @param currentPlayer Number of the current player that should play the next movement.
   * @returns True if the game is over, false otherwise.
   */
  protected abstract checkIfGameIsOver(play: BoardPos, currentPlayer: number): boolean;

  /**
   * Returns the game board.
   * @returns Returns the game board.
   */
  public getBoard(): number[][] {
    return this.board;
  }

  /**
   * Returns the number of the player that won the match.
   * @returns Number of the player that won the match.
   */
  public getGameIsOver(): boolean {
    return this.gameIsOver;
  }

  /**
   * Returns if the game is over or not.
   * @returns True if the game is over, false otherwise.
   */
  public getWinner(): number {
    return this.winner;
  }

  /**
   * Executes a play movement.
   * @param boardPos The board position of the play movement.
   */
  public play(boardPos: BoardPos): void {
    if (this.gameIsOver) return;

    const isAValidPlay = this.currentPossibleMovements.filter(
      possibleMovement =>
        possibleMovement.row === boardPos.row && possibleMovement.column === boardPos.column
    );
    if (!isAValidPlay) return;

    this.board[boardPos.row][boardPos.column] = this.currentPlayer;

    if (this.checkIfGameIsOver(boardPos, this.currentPlayer)) {
      this.gameIsOver = true;
      this.winner = this.currentPlayer;
      return;
    }

    this.currentPlayer = (this.currentPlayer % 2) + 1;
  }

  /**
   * Initializes the game board with the value passed by.
   * @param boardSize The board size.
   */
  private initBoard(boardSize: number): void {
    this.boardSize = boardSize;
    this.board = [];

    for (let row = 0; row < boardSize; row++) {
      this.board[row] = [];
      for (let column = 0; column < boardSize; column++) {
        this.board[row][column] = 0;
      }
    }
  }
}
