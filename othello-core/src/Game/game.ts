import BoardPos from '../Board/board-pos';
import PlayData from './play-data';

/**
 * Contains the default game abastraction logic and implementation.
 */
export default abstract class Game {
  /**
   * Game board size.
   */
  readonly boardSize: number = 0;

  /**
   * Contains the board data.
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
  protected winner: number = -1;

  /**
   * Contains the whole game play history.
   */
  protected playHistory: PlayData[] = [];

  /**
   * Initialize a new game with a pre-determined board size.
   * @param boardSize The board size.
   */
  constructor(boardSize: number) {
    if (boardSize <= 0) throw new Error(`'${boardSize}' is not a valid board size.`);

    this.boardSize = boardSize;
    this.initBoard(boardSize);
    this.currentPossibleMovements = this.getPossibleMovements();
  }

  /**
   * Gets every possible movement from the current player.
   * @returns Returns the game board (matrix of nubmers).
   */
  protected abstract getPossibleMovements(): BoardPos[];

  /**
   * Checks if the game is over or not and who is the winner.
   * @param play Last play done by the current player.
   * @param currentPlayer Number of the current player.
   * @returns Number of the player that won the game (> 0), 0 if the game is over and there is no winner (draw) or -1 if
   * the game is not over yet.
   */
  protected abstract checkIfGameIsOver(play: BoardPos, currentPlayer: number): number;

  /**
   * Returns the game board.
   * @returns Returns the game board.
   */
  public getBoard(): number[][] {
    return this.deepCopy(this.board);
  }

  /**
   * Return the current possible movements of the current player.
   * @returns The current possible movements
   */
  public getCurrentPossibleMovements(): BoardPos[] {
    return this.deepCopy(this.currentPossibleMovements);
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
   * Returns the game play history.
   * @returns The game play history.
   */
  public getPlayHistory(): PlayData[] {
    return this.deepCopy(this.playHistory);
  }

  /**
   * Executes a play movement.
   * @param boardPos The board position of the play movement.
   */
  public play(boardPos: BoardPos): boolean {
    if (this.gameIsOver) return false;

    const isAValidPlay = this.currentPossibleMovements.filter(
      (possibleMovement) =>
        possibleMovement.row === boardPos.row && possibleMovement.column === boardPos.column
    );
    if (isAValidPlay.length <= 0) return false;

    this.playHistory.push(new PlayData(this.deepCopy(this.board), boardPos, this.currentPlayer));
    this.board[boardPos.row][boardPos.column] = this.currentPlayer;

    const winner = this.checkIfGameIsOver(boardPos, this.currentPlayer);
    if (winner !== -1) {
      this.gameIsOver = true;
      this.winner = winner;
      this.currentPossibleMovements = [];
    } else {
      this.currentPlayer = (this.currentPlayer % 2) + 1;
      this.currentPossibleMovements = this.getPossibleMovements();
    }

    return true;
  }

  /**
   * Check if the board is full and there is no more movement available.
   * @returns True if the board is full, false otherwise.
   */
  protected boardIsFull(): boolean {
    return this.getPlayHistory().length === Math.pow(this.boardSize, 2);
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

  /**
   * Creates a deep copy of any object.
   * @param object Copy of the object passed by.
   */
  private deepCopy(object: any) {
    return JSON.parse(JSON.stringify(object));
  }
}
