import BoardPos from '../../Board/board-pos';
import Game from '../../Game/game';

export default class GameMock extends Game {
  getPossibleMovements(): BoardPos[] {
    throw new Error('Method not implemented.');
  }

  play(boardPos: BoardPos): void {
    throw new Error('Method not implemented.' + boardPos);
  }
}
