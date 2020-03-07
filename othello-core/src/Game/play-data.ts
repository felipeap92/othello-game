import BoardPos from 'Board/board-pos';

/**
 * Contains information about a play done by one player.
 */
export default class PlayData {
  /**
   *
   * @param board Contains the board data.
   * @param play Play done by the current player.
   * @param currentPlayer Number of the current player.
   */
  constructor(public board: number[][], public play: BoardPos, public currentPlayer: number) {}
}
