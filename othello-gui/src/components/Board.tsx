import React, { Component } from 'react';

import './Board.css';
import BoardPos from 'othello-core/Board/board-pos';

type BoardProps = {
  board: number[][];
  onBoardSquareClick: (boardPos: BoardPos) => void;
};

class Board extends Component<BoardProps> {
  state: BoardProps;

  constructor(props: BoardProps) {
    super(props);
    this.state = {
      board: props.board,
      onBoardSquareClick: props.onBoardSquareClick
    };
  }

  componentWillReceiveProps(newProps: BoardProps) {
    this.setState({
      board: newProps.board
    });
  }

  render() {
    let boardSize = this.state.board.length;
    let rows = [];
    for (let row = 0; row < boardSize; row++) {
      let squares = [];
      for (let column = 0; column < boardSize; column++) {
        let posValue = this.state.board[row][column];
        let simbol = '';
        if (posValue === 1) simbol = 'O';
        else if (posValue === 2) simbol = 'X';

        let square = (
          <div
            className={'square'}
            data-row={row}
            data-column={column}
            key={row + '-' + column}
            onClick={() => this.state.onBoardSquareClick(new BoardPos(row, column))}
          >
            {simbol}
          </div>
        );
        squares.push(square);
      }

      let rowElement = <div className="board-row" key={row}> {squares} </div>;
      rows.push(rowElement);
    }

    return <div className="board">{rows}</div>;
  }
}

export default Board;
