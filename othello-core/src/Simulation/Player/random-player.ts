import Player from './player';
import Game from '../../Game/game';
import BoardPos from '../../Board/board-pos';

/**
 * An AI player that plays randomly.
 */
export default class RandomPlayer implements Player {
  /** @inheritdoc */
  public getPlayMovement(game: Game): BoardPos {
    const movements = game.getCurrentPossibleMovements();
    const playMovement = movements[Math.floor(Math.random() * movements.length)];
    return playMovement;
  }
}
