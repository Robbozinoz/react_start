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
    // //Lift the state of eahc square and place in the parent componenet for retrieval
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         squares: Array(9).fill(null),
    //         xIsNext: true,
    //     };
    // }

    //Take the state give to Board form the Game class to render square to Square
    renderSquare(i) {
        return (
        <Square 
            value={this.props.squares[i]}
            onClick={() => this.props.onClick(i)}
            />
        );    
    }

    render() {
        // //Give winner object the value of the square[a] in calculateWinner function
        // const winner = calculateWinner(this.state.squares);
        // let status;
     
        // //Check for a winner before indicating who is next to go
        // if (winner) {
        //     status = 'Winner: ' + winner;
        // } else {
        //     //Take the state of the xIsNext boolean to define the next player to go
        //     status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        // }

        return (
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
        );
    }
}

class Game extends React.Component {
    //Construct the history state, lifted from the Board class
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
        };
    }

    //Definition of handleClick function which will send the props value to square class
    handleClick(i) {
        const history = this.state.history;
        const current = history[history.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
          return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
          history: history.concat([{
            squares: squares,
          }]),
          xIsNext: !this.state.xIsNext,
        });
    }

    render() {
        const history = this.state.history;
        //Assign the latest history to the current object
        const current = history[history.length - 1];
        //Keep the current winner object updates with the value from the winner check function
        const winner = calculateWinner(current.squares);

        
        let status;
        if (winner) {
            status = 'Winner: ' + winner;
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
        <div className="game">
            <div className="game-board">
            <Board
                squares={current.squares}
                onClick={(i) => this.handleClick(i)}   
            />
            </div>
            <div className="game-info">
            <div>{status}</div>
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
  