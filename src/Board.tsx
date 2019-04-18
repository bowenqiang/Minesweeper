import React, { Component } from 'react';
import Cell from './Cell';
import './Board.scss';

type TCell = {
    x: number,
    y: number,
    isMine: boolean,
    nearbyMineNum: number,
    isFlipped: boolean;
    isComputed: boolean;
    isFlagged: boolean;
}

type TMine = {
    x: number,
    y: number
}

type TGame = {
    board: TCell[][],
    mines: TMine[],
}

interface IBoardProps {
    height: number,
    width: number,
    mines: number,
    isGameOver: boolean,
    gameResult: string,
    handleGameResult: Function
}

interface IBoardState {
    boardData: TGame
}
class Board extends Component<IBoardProps, IBoardState> {
    private _mineIndexs: number[] = [];
    private _flagIndexs: number[] = [];
    constructor(props: IBoardProps) {
        super(props);
        this.state = {
            boardData: this.initialBoardData(props.height, props.width, props.mines)
        }
    }

    render(){
        const board = this.state.boardData.board;
        let cells: JSX.Element[] = [];
        for(let i = 0; i < board.length; i++) {
            const cellRow = board[i].map((cell, j) => {
                return (
                    <Cell
                        cellData={cell}
                        isGameOver={this.props.isGameOver}
                        gameResult={this.props.gameResult}
                        handleGameResult={this.props.handleGameResult}
                        flipCells={this.flipCells}
                        flagCell={this.flagCell}
                        key={j}
                    ></Cell>
                );
            });
            cells.push((
                <div className='cell-row' key={cells.length}>
                    {cellRow}
                </div>
            ));
        }
        return (
            <div className='board'>
            {cells}
            </div>
        );
    }

    private initialBoardData = (height: number, width: number, mines: number): TGame => {
        let game: TGame = this.createEmptyBoard(height, width);
        this.plantMines(mines, game);
        this.calcNearbyMines(game);
        return game;
    }

    private createEmptyBoard = (height: number, width: number): TGame => {
        let game: TGame = {
            board: new Array(height),
            mines: [],
        };

        for(let i = 0; i < height; i++) {
            let temp = new Array(width);
            for(let j = 0; j < width; j++) {
                temp[j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    nearbyMineNum: 0,
                    isFlipped: false,
                    isComputed: false,
                    isFlagged: false
                };
            }
            game.board[i] = temp;
        }
        return game;
    }

    private plantMines = (mines: number, game: TGame): void => {
        let height = game.board.length;
        let width = game.board[0].length;
        for(let counter = 0; counter < mines; counter++) {
            let randomX: number = Math.ceil(Math.random() * (height - 1));
            let randomY: number = Math.ceil(Math.random() * (width - 1));
            if(game.board[randomX][randomY].isMine) {
                counter--;
            } else {
                game.board[randomX][randomY].isMine = true;
                game.mines.push({
                    x: randomX,
                    y: randomY
                });
                this._mineIndexs.push(this.props.width * randomX + randomY);
            }        
        }
        this._mineIndexs.sort();
    }

    private calcNearbyMines = (game: TGame): void => {
        let mineNum = game.mines.length;
        for(let i = 0; i < mineNum; i++) {
            let x = game.mines[i].x;
            let y = game.mines[i].y;
            if(this.isValidPosition(x-1,y-1,game.board.length,game.board[0].length) && !game.board[x-1][y-1].isMine){
                game.board[x-1][y-1].nearbyMineNum++;
            }

            if(this.isValidPosition(x-1,y,game.board.length,game.board[0].length) && !game.board[x-1][y].isMine){
                game.board[x-1][y].nearbyMineNum++;
            }

            if(this.isValidPosition(x-1,y+1,game.board.length,game.board[0].length) && !game.board[x-1][y+1].isMine){
                game.board[x-1][y+1].nearbyMineNum++;
            }

            if(this.isValidPosition(x,y-1,game.board.length,game.board[0].length) && !game.board[x][y-1].isMine){
                game.board[x][y-1].nearbyMineNum++;
            }

            if(this.isValidPosition(x,y+1,game.board.length,game.board[0].length) && !game.board[x][y+1].isMine){
                game.board[x][y+1].nearbyMineNum++;
            }

            if(this.isValidPosition(x+1,y-1,game.board.length,game.board[0].length) && !game.board[x+1][y-1].isMine){
                game.board[x+1][y-1].nearbyMineNum++;
            }
            if(this.isValidPosition(x+1,y,game.board.length,game.board[0].length) && !game.board[x+1][y].isMine){
                game.board[x+1][y].nearbyMineNum++;
            }
            if(this.isValidPosition(x+1,y+1,game.board.length,game.board[0].length) && !game.board[x+1][y+1].isMine){
                game.board[x+1][y+1].nearbyMineNum++;
            }
        }
    }

    private isValidPosition = (x: number, y: number, boundX: number, boundY: number): boolean => {
        return x >= 0 && x < boundX && y >=0 && y < boundY ? true : false;
    }

    private flipCells = (x: number, y: number): void => {
        let newBoardData = Object.assign({}, this.state.boardData);
        newBoardData.board[x][y].isFlipped = true;
        this.flipCellsHelper(x, y, newBoardData.board);
        this.setState({
            boardData: newBoardData
        })
    }

    private flipCellsHelper = (x: number, y: number, board: TCell[][]): void => {
        const sizeX: number = board.length;
        const sizeY: number = board[0].length;
        if(x >= 0 && x < sizeX && y >= 0 && y < sizeY) {
            if(!board[x][y].isMine) {
                if(!board[x][y].isComputed) {
                    if(board[x][y].nearbyMineNum !== 0) {
                        board[x][y].isFlipped = true;
                        board[x][y].isComputed = true;
                    } else {
                        board[x][y].isFlipped = true;
                        board[x][y].isComputed = true;
                        this.flipCellsHelper(x-1,y-1,board);
                        this.flipCellsHelper(x-1,y,board);
                        this.flipCellsHelper(x-1,y+1,board);
                        this.flipCellsHelper(x,y-1,board);
                        this.flipCellsHelper(x,y+1,board);
                        this.flipCellsHelper(x+1,y-1,board);
                        this.flipCellsHelper(x+1,y,board);
                        this.flipCellsHelper(x+1,y+1,board);
                    }
                }
            }
        }
    }

    private flagCell = (x: number, y: number): void => {
        let newBoardData = Object.assign({}, this.state.boardData);
        newBoardData.board[x][y].isFlagged = !newBoardData.board[x][y].isFlagged;
        const index = this.props.width * x + y;
        if(newBoardData.board[x][y].isFlagged) {
            this._flagIndexs.push(index);
            this._flagIndexs.sort();
        } else {
            this._flagIndexs = this._flagIndexs.filter((value) => {
                console.log(index);
                console.log(value);
                return value !== index;
            });
            this._flagIndexs.sort();
        }
        this.setState({
            boardData: newBoardData
        });

        if(this.computeResult()) {
            this.props.handleGameResult(true, 'Won');
            alert('You Won');
        }
    }

    private computeResult = (): boolean => {
        return JSON.stringify(this._mineIndexs) === JSON.stringify(this._flagIndexs);
    }
}

export default Board;