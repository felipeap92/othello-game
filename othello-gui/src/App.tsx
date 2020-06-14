import React, { Component } from 'react';

import './App.css';
import TicTacToeOnline from './components/TicTacToeOnline';

class App extends Component {
  render() {
    return (
      <div className="container">
        <TicTacToeOnline />
      </div>
    );
  }
}

export default App;
