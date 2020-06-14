import { type, Schema } from '@colyseus/schema';

export class TicTacToeState extends Schema {
  @type('string') board: string;
  @type('string') currentTurn: string;
  @type('boolean') gameIsOver: boolean = false;
  @type('string') winner: string;
  @type('boolean') oponentDisconnected: boolean = false;
}
