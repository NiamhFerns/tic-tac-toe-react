import './App.css';
import { useState } from 'react';

// You can move the behaviour for this into the parent.
// Click handler just tells parents (x, y) is clicked, do your thing.
const Square = ({ icon, turnTick, row, col }) => {
  let [clicked, setClicked] = useState(false);
  const clickHandler = () => {
    if (!clicked) {
      setClicked(true);
      turnTick(row, col);
    }
  };

  return (
    <button className='square' onClick={clickHandler}>
      {icon}
    </button>
  );
};

const Board = () => {
  let [turn, setTurn] = useState('O');
  let [victory, setVictory] = useState(false);
  let [draw, setDraw] = useState(false);
  let [prevLocation, setPrevLocation] = useState([0, 0]);

  let [board, setBoard] = useState([
    ['_', '_', '_'],
    ['_', '_', '_'],
    ['_', '_', '_'],
  ]);

  const _setBoard = (turn, row, col) => {
    if (row < 0 || row > 2 || col < 0 || col > 2) {
      throw new Error(
        `Invalid entry index for ${turn} in row ${row} col ${col}.`,
      );
    }
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[col][row] = turn;
    setBoard(newBoard);
  };

  const turnTick = (row, col) => {
    setPrevLocation([row, col]);
    _setBoard(turn, row, col);
    checkVictory();
    setTurn(turn === 'O' ? 'X' : 'O');
  };

  const checkVictory = () => {
    setVictory(false);
  }

  // The rows to columns definition below looks weird because each square is laid left to right then top to bottom.
  return victory ? (
    <h1>{turn} WINS!</h1>
  ) : (
    <>
      <p>Current turn: {turn}</p>
      <div className='board'>
        <div className='row'>
          <Square icon={board[0][0]} turnTick={turnTick} row={0} col={0} />
          <Square icon={board[1][0]} turnTick={turnTick} row={0} col={1} />
          <Square icon={board[2][0]} turnTick={turnTick} row={0} col={2} />
        </div>
        <div className='row'>
          <Square icon={board[0][1]} turnTick={turnTick} row={1} col={0} />
          <Square icon={board[1][1]} turnTick={turnTick} row={1} col={1} />
          <Square icon={board[2][1]} turnTick={turnTick} row={1} col={2} />
        </div>
        <div className='row'>
          <Square icon={board[0][2]} turnTick={turnTick} row={2} col={0} />
          <Square icon={board[1][2]} turnTick={turnTick} row={2} col={1} />
          <Square icon={board[2][2]} turnTick={turnTick} row={2} col={2} />
        </div>
      </div>
    </>
  );
};

function App() {
  return (
    <>
      <Board />
    </>
  );
}

export default App;
