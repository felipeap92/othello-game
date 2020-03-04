import BoardPos from '../../Board/board-pos';
import Game from '../../Game/game';

export default class GameMock extends Game {
  getPossibleMovements(): BoardPos[] {
    return [];
  }

  protected checkIfGameIsOver(_play: BoardPos, _currentPlayer: number): boolean {
    return false;
  }
}
