// Is used to  that you can call from your component to let it “remember” things.
import { useState } from "react";

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

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

  // This makes it so that we are checking to see if whech spaces equal each other
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}
// export JavaScript keyword makes this function accessible outside of this file.
//The default keyword tells other files using your code that it’s the main function in your file.
// we will not be creating the game function

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // This makes sure that we stop and once there is just one value
    if (squares[i] || calculateWinner(squares)) {
      return;
    }
    const nextSquares = squares.slice();

    // This is an if statement so that we can flip values
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares, i); //This makes sure that that after this happens the value is reset after
  }
  //THis will also us to understand the state of the squares
  // This saves the constants of the for tic tac toe squre into a array of length 9

  // Button classname=Button is a html tag for displaying buttons
  // React components can only return single JSX elements like buttons

  //This is to display the winners
  const winner = calculateWinner(squares);
  let status;

  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return (
    // Is how to make fragrments
    // We will render here by making a function for the squares

    // => means {() => handleClick(0)} is an arrow function that calls handleClick(0) when the square is clicked.

    // handleClick(0) is a function that updates the board when the square is clicked.
    <>
      <h1>Ruth Perjuste's Tic Tac Toe Game</h1>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}
// So we now make it so the sqares can each be clicked
// The null passed to useState is used as the initial value for this state variable,

export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);

  const [currentMove, setCurrentMove] = useState(0);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove]?.squares || Array(9).fill(null);

  function handlePlay(nextSquares, currentIndex) {
    // We need to find th eindex of where we are clicking
    const current_col = currentIndex % 3;
    const current_row = Math.floor(currentIndex / 3);

    const nextHistory = history
      .slice(0, currentMove + 1)
      .concat([
        { squares: nextSquares, location: [current_col + 1, current_row + 1] },
      ]);
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((item, move) => {
    let description;
    let location = "";

    if (move > 0) {
      const [current_col, current_row] = item.location;
      location = "You are at Col:" + current_col + " Row:" + current_row;
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <div>{location}</div>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}
