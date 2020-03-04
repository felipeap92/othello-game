import Game from '../../Game/game';
import BoardPos from '../../Board/board-pos';

/**
 * Contains the default player abastraction logic and implementation.
 */
export default interface Player {
  /**
   * Calculates the player play movement and returns it.
   * @param board The board matrix of the game.
   * @returns The player next play movement (board position).
   */
  getPlayMovement(game: Game): BoardPos;
}
