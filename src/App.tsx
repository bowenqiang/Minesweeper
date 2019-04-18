import React, { Component } from 'react';
import Board from './Board';
import './App.css';

interface IAppState {
  height: number,
  width: number,
  mines: number,
  isGameOver: boolean,
  gameResult: string
}
class App extends Component<{}, IAppState> {
  constructor(props: any) {
    super(props);
    this.state = {
      height: 8,
      width: 8,
      mines: 10,
      isGameOver: false,
      gameResult: 'Lost'
    }
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Minesweeper</p>
          <div><span>Game Result: </span>{this.state.isGameOver ? this.state.gameResult : "In Progress"}</div>
        </header>
        <Board
            height={this.state.height}
            width={this.state.width}
            mines={this.state.mines}
            isGameOver={this.state.isGameOver}
            handleGameResult={this.handleGameResult}
        ></Board>
      </div>
    );
  }

  private handleGameResult = (isGameOver: boolean, gameResult: string): void => {
    this.setState(
      {
        isGameOver: isGameOver,
        gameResult: gameResult
      }
    );
  }
}

export default App;
