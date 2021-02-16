import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

//Function to deliver state from Board class
function Square(props) {
    return (
        <button className= "square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}
  
class Board extends React.Component {
    //Lift the state of eahc square and place in the parent componenet for retrieval
    constructor(props) {
        super(props);
        this.state = {
            squares: Array(9).fill(null),
            xIsNext: true,
        };
    }

    //Definition of handleClick function which will send the props value to square class
    handleClick(i) {
        const squares = this.state.squares.slice();
        //Change the value of the xIsNext boolean
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) {
        return (
        <Square 
            value={this.state.squares[i]}
            onClick={() => this.handleClick(i)}
            />
        );    
    }

    render() {
        //Give winner object the value of the square[a] in calculateWinner function
        const winner = calculateWinner(this.state.squares);
        let status;
        console.log(winner);
        //Check for a winner before indicating who is next to go
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            //Take the state of the xIsNext boolean to define the next player to go
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div>
            <div className="status">{status}</div>
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
        );
    }
}

class Game extends React.Component {
render() {
    return (
    <div className="game">
        <div className="game-board">
        <Board />
        </div>
        <div className="game-info">
        <div>{/* status */}</div>
        <ol>{/* TODO */}</ol>
        </div>
    </div>
    );
}
}

// ========================================

ReactDOM.render(
<Game />,
document.getElementById('root')
);

//Function to loop through squares to determine who won, this for loop takes an array of three square values and compares all lines objecs in the array for equal values , so determining a winner
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
      for (let i = 0; i < lines.length; i++) {
          const [a, b, c] = lines[i];
          if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
              return squares[a];
          }
      }
      return null;
}
  