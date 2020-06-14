import { Room, Client } from 'colyseus';

import { TicTacToeState } from './TicTacToeState';
import TicTacToeGame from 'othello-core/Game/tic-tac-toe-game';
import BoardPos from 'othello-core/Board/board-pos';

export class TicTacToeRoom extends Room<TicTacToeState> {
  maxClients = 2;
  //randomMoveTimeout: Delayed;
  ticTacToeGame = new TicTacToeGame();
  winnerMap = new Map<number, string>();

  // When room is initialized
  onCreate(options: any) {
    let state = new TicTacToeState();
    state.board = JSON.stringify(this.ticTacToeGame.getBoard());
    this.setState(state);

    // Called every time this room receives a "move" message
    this.onMessage('move', (client: Client, boardPos: BoardPos) => {
      if (this.state.gameIsOver || client.sessionId !== this.state.currentTurn) return;

      if (this.ticTacToeGame.play(boardPos)) {
        this.state.board = JSON.stringify(this.ticTacToeGame.getBoard());

        if (this.ticTacToeGame.getGameIsOver()) {
          this.state.gameIsOver = this.ticTacToeGame.getGameIsOver();
          this.state.winner = this.winnerMap.get(this.ticTacToeGame.getWinner());
        } else {
          this.state.currentTurn =
            this.clients[0].sessionId !== client.sessionId
              ? this.clients[0].sessionId
              : this.clients[1].sessionId;
        }
      }
    });
  }

  // When client successfully join the room
  onJoin(client: Client, options: any, auth: any) {
    if (this.clients.length === 2) {
      let randomPlayerIndex = Math.floor(Math.random() * this.clients.length);
      this.state.currentTurn = this.clients[randomPlayerIndex].sessionId;
      this.winnerMap.set(1, this.state.currentTurn);
      this.winnerMap.set(
        2,
        this.clients[0].sessionId !== this.state.currentTurn
          ? this.clients[0].sessionId
          : this.clients[1].sessionId
      );

      //this.setAutoMoveTimeout();
      //const playMovement = movements[Math.floor(Math.random() * movements.length)];

      // Lock this room for new users.
      this.lock();
    }
  }

  // When a client leaves the room
  onLeave(client: Client, consented: boolean) {
    if (this.clients.length === 1 && !this.state.gameIsOver) {
      this.state.gameIsOver = true;
      this.state.oponentDisconnected = true;
    }
  }
}
