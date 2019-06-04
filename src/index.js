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
  // Square に現在の値（'X'、'O' または null）を伝えるようにする
  // Board から Square に関数を渡すことにして、マス目がクリックされた時に Square にその関数を呼んでもらうようにする
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
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
    );
  }
}

class Game extends React.Component {
  // タイムトラベル機能の追加
  // Game コンポーネントの初期 state をコンストラクタ内でセット
  // 初期 state に 9 個の null が 9 個のマス目に対応する 9 個の null 値をセット
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      // いま何手目の状態を見ているのかを表す
      stepNumber: 0,
      // デフォルトで先手をバツに設定する
      xIsNext: true,
    };
  }

  // handleClickを定義する
  handleClick(i) {
    // Game 内の handleClick メソッドで、新しい履歴エントリを history に追加
    // 「時間の巻き戻し」をしてからその時点で新しい着手を起こした場合に、
    // そこから見て「未来」にある履歴を確実に捨て去ることができる
    const history = this.state.history.slice(0, this.state.stepNumber + 1);

    const current = history[history.length - 1];
    const squares = current.squares.slice();
    // ゲームの決着が既についている場合やクリックされたマス目が既に埋まっている場合に早期に return するようにする
    if (calculateWiunner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.state.xIsNext ? '❌' : '⭕️';
    this.setState({
      // concat()は元の配列をミューテートしない(コピーする)ためこっちを使う
      history: history.concat([{
        squares: squares,
      }]),
      // stepNumber を更新する
      stepNumber: history.length,

      xIsNext: !this.state.xIsNext,
    });
  }

  // jumpTo メソッドを定義してその stepNumber が更新されるようにする
  // 更新しようとしている stepNumber の値が偶数だった場合は xIsNext を true に設定
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    // render 関数を更新して、ゲームのステータステキストの決定や表示の際に最新の履歴が使われるようにする
    const history = this.state.history;
    // 常に最後の着手後の状態をレンダーするのではなく stepNumber によって現在選択されている着手をレンダーするようにするｙ
    const current = history[this.state.stepNumber];
    // いずれかのプレーヤが勝利したかどうか判定。決着がついた場合は “Winner: X” あるいは “Winner: O”
    const winner = calculateWiunner(current.squares);

    // map()メソッドを使って着手履歴の配列をマップして画面上のボタンを表現する React 要素を作りだし、
    // 過去の手番に「ジャンプ」するためのボタンの一覧を表示
    const moves = history.map((step, move) => {
      const desc = move ?
        'Go to move #' + move;
        'Go to game start';
      return (
        // keyは追加一意なIDをキーとしている
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{ desc }</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? '❌' : '⭕️');
    }

    return(
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{ status }</div>
        <ol>{ moves }</ol>
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
