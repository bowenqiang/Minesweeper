import React, { Component } from 'react';
import Cell from './Cell';

type TCell = {
    x: number,
    y: number,
    isMine: boolean,
    nearbyMineNum: number,
    isflipped: false;
}

type TMine = {
    x: number,
    y: number
}

type TGame = {
    board: TCell[][],
    mines: TMine[]
}

interface IBoardProps {
    height: number,
    width: number,
    mines: number
}

interface IBoardState {
    boardData: TGame
}
class Board extends Component<IBoardProps, IBoardState> {
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
                    <Cell cellData={cell} key={j}></Cell>
                );
            });
            cells.push((
                <div key={cells.length}>
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

    componentDidMount(){
        this.initialBoardData(8,6,10);
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
            mines: []
        };

        for(let i = 0; i < height; i++) {
            let temp = new Array(width);
            for(let j = 0; j < width; j++) {
                temp[j] = {
                    x: i,
                    y: j,
                    isMine: false,
                    nearbyMineNum: 0,
                    isflipped: false
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
            }        
        }
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
}

export default Board;