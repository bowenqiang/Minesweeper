import React, { Component } from 'react';
import Board from './Board';
import './App.css';

interface IAppState {
  height: number,
  width: number,
  mines: number
}
class App extends Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      height: 8,
      width: 8,
      mines: 10
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Minesweeper</p>
          <Board height={this.state.height} width={this.state.width} mines={this.state.mines}></Board>
        </header>
      </div>
    );
  }
}

export default App;
