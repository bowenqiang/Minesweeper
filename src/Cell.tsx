import React, { Component } from 'react';
import './Cell.scss';

type TCell = {
    x: number,
    y: number,
    isMine: boolean,
    nearbyMineNum: number,
    isFlipped: boolean;
    isComputed: boolean;
    isFlagged: boolean;
}

interface ICellProps {
    cellData: TCell,
    isGameOver: boolean,
    gameResult: string,
    handleGameResult: Function,
    flipCells: Function,
    flagCell: Function
}

class Cell extends Component<ICellProps, {}> {
    private _debug = false;
    constructor(props: ICellProps) {
        super(props);
    }
    render(){
        const cellData: TCell = this.props.cellData;
        const className: string = `cell ${cellData.isFlipped ? 'show' : 'hidden'} ${this._debug && cellData.isMine ? 'debug-mine' : ''}`;
        const content = cellData.isFlipped ? (cellData.isMine ? 'mine' : (cellData.nearbyMineNum ? cellData.nearbyMineNum : '')) : cellData.isFlagged ? 'flag' : ''
        return (
            <div className={className}
                onClick={this.onClick}
                onContextMenu={this.onContextMenu}
            ><span>{content}</span></div>
        );
    }

    onClick = (): void => {
        if(this.props.isGameOver) {
            this.props.gameResult === 'Lost' ? alert('Game Over') : alert('You Won!');
        } else {
                if(this.props.cellData.isMine) {
                    this.props.handleGameResult(true, 'Lost');
                    alert('Game Over')
                }
                this.props.flipCells(this.props.cellData.x, this.props.cellData.y);
            }
        } 

    onContextMenu = (e: React.MouseEvent<HTMLDivElement>): void => {
        if(this.props.isGameOver) {
            this.props.gameResult === 'Lost' ? alert('Game Over') : alert('You Won!');
        } else {
            this.props.flagCell(this.props.cellData.x, this.props.cellData.y);
        }
        e.preventDefault();
    };
}

export default Cell;