import React, {Component} from 'react';
import Square from './Square';
import calculateWinner from '../helperFunctions/calculateWinner';


class Board extends Component{
    /*constructor(props){
        super(props);
        this.state={
            squares: Array(9).fill(null),
            xIsNext: true
        }
    }*/

  /*  handleClick(i){
        const squares = this.state.squares.slice();
        //console.log(squares);
        if(calculateWinner(squares)|| squares[i])
            return;
        squares[i] = this.state.xIsNext? 'X':'O';
        this.setState({
            squares:[...squares],
            xIsNext: !this.state.xIsNext

        })
        console.log(this.state.squares);
    }*/

    renderSquare(i){
        return <Square 
        value={this.props.squares[i]}
        onClick={()=>this.props.onClick(i)}
        />
    }
    render(){
       /* const winner = calculateWinner(this.state.squares);
        let status;
        if(winner)
        status = 'Winner: '+ winner;
        else
        status = 'Next Player:'+ (this.state.xIsNext ? 'X':'O');*/
        return(
            <div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        )
    }
}

export default Board