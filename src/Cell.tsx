import React, { Component } from 'react';
import './Cell.scss';

type TCell = {
    x: number,
    y: number,
    isMine: boolean,
    nearbyMineNum: number,
    isFlipped: boolean;
    isComputed: boolean;
}

interface ICellProps {
    cellData: TCell,
    isGameOver: boolean,
    handleGameResult: Function,
    flipCells: Function
}

interface ICellState {
    // isFlipped: boolean
}

class Cell extends Component<ICellProps, ICellState> {
    // private _isFlipped = false;
    constructor(props: ICellProps) {
        super(props);
        // this.state = {
        //     isFlipped: false
        // }
    }
    render(){
        const cellData = this.props.cellData;
        const className: string = `cell ${this.props.cellData.isFlipped ? 'show' : 'hidden'}`;
        const content = this.props.cellData.isFlipped ? (cellData.isMine ? 'mine' : (cellData.nearbyMineNum ? cellData.nearbyMineNum : '')) : ''
        return (
            <div className={className}
                onClick={this.onClick}
                onContextMenu={this.onContextMenu}
            ><span>{content}</span></div>
        );
    }

    onClick = () => {
        console.log('onclick');
        if(this.props.isGameOver && false) {
            alert('Game Over');
        } else {
                if(this.props.cellData.isMine) {
                    this.props.handleGameResult(true, 'Lost');
                }
                this.props.flipCells(this.props.cellData.x, this.props.cellData.y);
            }
        } 



    onContextMenu = (e: any) => {
        console.log('oncontextmenu');
        e.preventDefault();
    };
}

export default Cell;