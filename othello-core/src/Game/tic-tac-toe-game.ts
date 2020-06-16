import Game from './game';
import BoardPos from '../Board/board-pos';

/**
 * Responsible to manage the Tic Tac Toe game.
 */
export default class TicTacToeGame extends Game {
  private row: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
  ];
  private column: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
  ];
  private diag: number[] = [0, 0];
  private antiDiag: number[] = [0, 0];

  /**
   * Initialize a new Tic Tac Toe game.
   */
  constructor() {
    super(3);
  }

  /** @inheritdoc */
  protected getPossibleMovements(): BoardPos[] {
    const possibleMovements: BoardPos[] = [];

    for (let row = 0; row < this.boardSize; row++) {
      for (let column = 0; column < this.boardSize; column++) {
        if (this.board[row][column] === 0) {
          possibleMovements.push(new BoardPos(row, column));
        }
      }
    }

    return possibleMovements;
  }

  /** @inheritdoc */
  protected checkIfGameIsOver(play: BoardPos, currentPlayer: number): number {
    this.row[currentPlayer - 1][play.row]++;
    this.column[currentPlayer - 1][play.column]++;

    if (play.row === play.column) this.diag[currentPlayer - 1]++;

    if (play.row + play.column === this.boardSize - 1) this.antiDiag[currentPlayer - 1]++;

    if (
      this.row[currentPlayer - 1][play.row] === this.boardSize ||
      this.column[currentPlayer - 1][play.column] === this.boardSize ||
      this.diag[currentPlayer - 1] === this.boardSize ||
      this.antiDiag[currentPlayer - 1] === this.boardSize
    )
      return currentPlayer;

    if (this.boardIsFull()) return 0;

    return -1;
  }
}
