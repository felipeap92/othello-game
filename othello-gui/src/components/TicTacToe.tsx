import React, { Component } from 'react';

import Board from './Board';

import TicTacToeGame from 'othello-core/Game/tic-tac-toe-game';
import BoardPos from 'othello-core/Board/board-pos';

class TicTacToe extends Component {
  ticTacToeGame: TicTacToeGame;

  constructor(props : any) {
    super(props);
    this.ticTacToeGame = new TicTacToeGame();
    this.state = {
      board: this.ticTacToeGame.getBoard()
    };
  }

  render() {
    return (
      <>
        <h1>TicTacToe</h1>
        <br />
        <Board board={this.ticTacToeGame.getBoard()} onBoardSquareClick={(boardPos) => {this.onBoardSquareClick(boardPos)}} />
        <br />
        {this.renderWinner()}
      </>
    );
  }

  renderWinner() {
    if (!this.ticTacToeGame.getGameIsOver())
      return null;

    let winner = this.ticTacToeGame.getWinner();
    let winnerMsg = winner === 1 || winner === 2 ? `Jogador ${winner} ganhou!` : 'Empate!'

    return (
      <>
        <h3>{winnerMsg}</h3>
        <br />
        <button onClick={() => this.onResetButtonClick()}>Reiniciar</button>
      </>
    );
  }

  onBoardSquareClick(boardPos: BoardPos): void {
    this.ticTacToeGame.play(boardPos);
    this.setState({
      board: this.ticTacToeGame.getBoard()
    });
  }

  onResetButtonClick() {
    this.ticTacToeGame = new TicTacToeGame();
    this.setState({
      board: this.ticTacToeGame.getBoard()
    });
  }
}

export default TicTacToe;
