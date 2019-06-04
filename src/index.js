import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Squareを関数コンポーネントに書き換え
function Square(props) {
  return(
      <button className="square" onClick={props.onClick}>
        { props.value }
      </button>
  );
}

class Board extends React.Component {
  // Board にコンストラクタを追加し、初期 state に 9 個の null が 9 個のマス目に対応する 9 個の null 値をセット
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      // デフォルトで先手をバツに設定する
      xIsNext: true,
    };
  }

  // handleClickを定義する
  handleClick(i) {
    const squares = this.state.squares.slice();
    // ゲームの決着が既についている場合やクリックされたマス目が既に埋まっている場合に早期に return するようにする
    if (calculateWiunner(squares) || squares[i]) {
      return;
    }
    
    squares[i] = this.state.xIsNext ? '❌' : '⭕️';
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext,
    });
  }

  // Square に現在の値（'X'、'O' または null）を伝えるようにする
  // Board から Square に関数を渡すことにして、マス目がクリックされた時に Square にその関数を呼んでもらうようにする
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }

  render() {
    // いずれかのプレーヤが勝利したかどうか判定。決着がついた場合は “Winner: X” あるいは “Winner: O”
    const winner = calculateWiunner(this.state.squares);
    let status;
    if (winner) {
      status ='Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? '❌' : '⭕️');
    }

    return(
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
    return(
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

// =============================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWiunner(squares) {
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
