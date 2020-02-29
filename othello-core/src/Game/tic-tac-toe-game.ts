import Game from './game';
import BoardPos from '../Board/board-pos';

/**
 * Responsible to manage the Tic Tac Toe game.
 */
export default class TicTacToeGame extends Game {
  /**
   * Initialize a new Tic Tac Toe game.
   */
  constructor() {
    super(3);
  }

  /** @inheritdoc */
  getPossibleMovements(): BoardPos[] {
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
}
