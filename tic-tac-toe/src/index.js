import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

function Square(props) {
    const style = props.highlight ? {
        backgroundColor: "#4CAF50"
    } : {};

    return (
        <button key={props.value} className="square" onClick={props.onClick} style={style}>
            {props.value}
        </button>
    )
}

class Board extends React.Component {
    renderSquare(i) {
        const highlight = this.props.hightligh;
        let shouldHighLight = false;
        if (highlight) {
            shouldHighLight = highlight.includes(i)
        }

        return <Square key={"hello" + i}
                       value={this.props.squares[i]}
                       onClick={() => this.props.onClick(i)}
                       highlight={shouldHighLight}
        />;
    }

    renderRow(n) {
        const content = [];
        for (let i = 0; i < 3; i++) {
            content.push(this.renderSquare(i + n * 3))
        }
        return <div className="board-row" key={"savun " + n}>
            {content}
        </div>
    }

    render() {
        const content = [];
        for (let i = 0; i < 3; i++) {
            content.push(this.renderRow(i));
        }
        return <div>
            {content}
        </div>;
    }
}

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
                pos: [null, null]
            }],
            xIsNext: true,
            stepNumber: 0,
            isAscending: true,
            draw: false
        }
    }

    handleSwitch() {
        const newAscending = !this.state.isAscending;
        const currentHistory = this.state.history.slice().reverse();
        this.setState({
            isAscending: newAscending,
            history: currentHistory,
            stepNumber: currentHistory.length - this.state.stepNumber - 1
        })
        /*const current = this.state.history.slice()
        current.reverse()
        this.setState({
            history: current
        })*/
    }

    handleClick(i) {
        const history = this.state.isAscending ? this.state.history.slice(0, this.state.stepNumber + 1) : this.state.history.slice(this.state.stepNumber, this.state.history.length);
        const current = this.state.isAscending ? history[history.length - 1] : history[0];
        const squares = current.squares.slice()
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';

        if (noSquaresLeft(squares)) {
            this.setState({
                draw: true
            })
        }

        let x, y;
        switch (i) {
            case 0:
                x = 0;
                y = 0;
                break;
            case 1:
                x = 0;
                y = 1;
                break;
            case 2:
                x = 0;
                y = 2;
                break;
            case 3:
                x = 1;
                y = 0;
                break;
            case 4:
                x = 1;
                y = 1;
                break;
            case 5:
                x = 1;
                y = 2;
                break;
            case 6:
                x = 2;
                y = 0;
                break;
            case 7:
                x = 2;
                y = 1;
                break;
            case 8:
                x = 2;
                y = 2;
                break;
            default:
                break;
        }

        this.setState({
            history: this.state.isAscending ? history.concat([{
                squares: squares,
                pos: [x, y]
            }]) : [{
                squares: squares,
                pos: [x, y]
            }].concat(history),
            stepNumber: this.state.isAscending ? history.length : 0,
            xIsNext: !this.state.xIsNext
        })
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2 === 0)
        })
    }

    renderToggle() {
        return <label className="switch">
            <input type="checkbox" onClick={() => {
                this.handleSwitch()
            }}/>
            <span className="slider round"></span>
        </label>
    }


    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        let squareToHighligh;
        let status;
        if (winner) {
            status = 'Winner: ' + winner[0];
            squareToHighligh = winner[1];
        } else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        if (this.state.draw) {
            status = "Draw";
        }

        const moves = history.map((step, move) => {
            let desc = (step.pos[0] !== null && step.pos[1] !== null) ? 'Go to move #' + (move) + ' (' + step.pos[0] + ' , ' + step.pos[1] + ')' : 'Go to game start';

            if (this.state.stepNumber === move) {
                return (<li key={move}>
                    <button onClick={() => this.jumpTo(move)}><b>{desc}</b></button>
                </li>)
            }

            return (<li key={move}>
                <button onClick={() => this.jumpTo(move)}>{desc}</button>
            </li>)
        })


        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        hightligh={squareToHighligh}
                        squares={current.squares}
                        onClick={(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <div>{this.renderToggle()}</div>
                    <ol>{moves}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
        [0, 3, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}

function noSquaresLeft(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null) {
            return false;
        }

    }
    return true;
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Game/>
);

