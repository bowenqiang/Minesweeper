import React, { Component } from 'react';
import './Cell.scss';

type TCell = {
    x: number,
    y: number,
    isMine: boolean,
    nearbyMineNum: number,
    isflipped: false;
}

interface ICellProps {
    cellData: TCell

}

class Cell extends Component<ICellProps, {}> {
    constructor(props: ICellProps) {
        super(props);
    }
    render(){
        return (
            <div className='cell'
                onClick={this.onClick}
                onContextMenu={this.onContextMenu}
            >{this.props.cellData.isMine ? 'mine' : this.props.cellData.nearbyMineNum}</div>
        );
    }

    onClick = () => {
        console.log('onclick');
    }

    onContextMenu = (e: any) => {
        console.log('oncontextmenu');
        e.preventDefault();
    };
}

export default Cell;