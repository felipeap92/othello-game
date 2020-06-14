import React, { Component } from 'react';
import * as Colyseus from 'colyseus.js';
import TicTacToeGame from 'othello-core/Game/tic-tac-toe-game';
import BoardPos from 'othello-core/Board/board-pos';

import Board from './Board';

interface TicTacToeOnlineState {
  board: number[][];
  currentTurn: string | undefined;
  gameIsOver: boolean;
  winner: string | undefined;
  oponentDisconnected: boolean;
}

class TicTacToeOnline extends Component<{}, TicTacToeOnlineState> {
  ticTacToeGame!: TicTacToeGame;
  client!: Colyseus.Client;
  room!: Colyseus.Room;

  constructor(props: any) {
    super(props);
    this.initComponent();
    this.client = new Colyseus.Client('ws://localhost:2567');
    this.findRoom();
  }

  render() {
    return (
      <>
        <h1>TicTacToe</h1>
        <br />
        <Board
          board={this.state.board}
          onBoardSquareClick={(boardPos) => {
            this.onBoardSquareClick(boardPos);
          }}
        />
        <br />
        {this.renderMessage()}
      </>
    );
  }

  private renderMessage() {
    let elements = [];
    if (this.state.currentTurn === undefined) {
      elements.push(<h3>Encontrando um oponente...</h3>);
    } else if (!this.state.gameIsOver) {
      const currentTurnMsg =
        this.state.currentTurn === this.room.sessionId
          ? 'Sua vez de jogar'
          : 'É a vez do seu oponente de jogar';
      elements.push(<h3>{currentTurnMsg}</h3>);
    } else {
      let message = '';
      if (this.state.oponentDisconnected) {
        message = 'O seu oponente abandonou a partida.';
      } else if (this.state.winner === undefined) {
        message = 'O jogo empatou.';
      } else {
        message =
          this.state.winner === this.room.sessionId
            ? `Você ganhou.`
            : 'Você perdeu.';
      }

      elements.push(<h3>{message}</h3>);
      elements.push(<br />);
      elements.push(
        <button onClick={() => this.onResetButtonClick()}>Reiniciar</button>
      );
    }

    return <> {elements} </>;
  }

  private initComponent() {
    this.ticTacToeGame = new TicTacToeGame();
    this.state = {
      board: this.ticTacToeGame.getBoard(),
      currentTurn: undefined,
      gameIsOver: false,
      winner: undefined,
      oponentDisconnected: false,
    };
  }

  private async findRoom() {
    try {
      this.room = await this.client.joinOrCreate('ticTacToeRoom');

      // This event is triggered when the server updates its state.
      this.room.onStateChange((state) => {
        this.setState({
          board: JSON.parse(state.board),
          currentTurn: state.currentTurn,
          gameIsOver: state.gameIsOver,
          winner: state.winner,
          oponentDisconnected: state.oponentDisconnected,
        });
      });
    } catch (e) {
      console.error("couldn't join room:", e);
    }
  }

  private onBoardSquareClick(boardPos: BoardPos): void {
    this.room.send('move', boardPos);
  }

  private async onResetButtonClick() {
    this.room.removeAllListeners();
    this.room.leave();
    this.initComponent();
    await this.findRoom();
  }
}

export default TicTacToeOnline;
