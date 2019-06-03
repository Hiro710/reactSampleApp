import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  // コンストラクタを追加してstateを初期化
  constructor(props) {
    super(props);
    // React コンポーネントはコンストラクタで this.state を設定することで、状態を持つことができる
    // this.stateは定義されているコンポーネント内でプライベートである
    this.state = {
      value: null,
    };
  }

  render() {
    return(
      // アロー関数を使ってタイプ量を減らす
      // onClick={function(){alert('click');}}ではなく以下の様に記述する () =>を書くのを忘れない
      // onClickプロパティに渡しているのは関数である
      <button
        className="square"
        onClick={() => this.setState({value: '❌'})}>
        { this.state.value }
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = "Next player: X";

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
