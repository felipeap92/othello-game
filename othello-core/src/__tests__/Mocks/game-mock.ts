import BoardPos from '../../Board/board-pos';
import Game from '../../Game/game';

export default class GameMock extends Game {
  getPossibleMovements(): BoardPos[] {
    return [new BoardPos(0, 0), new BoardPos(1, 0)];
  }

  protected checkIfGameIsOver(_play: BoardPos, _currentPlayer: number): number {
    return this.boardIsFull() ? 0 : -1;
  }
}
