import React, { Component } from 'react'
import style from './Ooxx.module.css';

const printAnwser = (n) => {
    switch (n) {
        case 0:
            return '';
        case 1:
            return 'O';
        case -1:
            return 'X';
        default:
            return 'X';
    }
}

const winnerList = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

export default class Game extends Component {
    state = {
        girds: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        player: 1,
        winner: 0,
    }

    winner = () => {
        const numberList = this.state.girds;
        for (const item of winnerList) {
            const [i, j, k] = item;
            if (numberList[i] === numberList[j] && numberList[j] === numberList[k]) {
                return numberList[i];
            }
        }
        return 0;
    }

    handleCLick = (index) => {
        if (this.state.winner !== 0) return;
        const girds = [...this.state.girds];

        if (girds[index] !== 0) return;
        girds[index] = this.state.player;
        this.setState(
            {
                girds,
                player: -this.state.player,
            }
        );
    }

    resetBox = () => {
        this.setState({
            girds: [0, 0, 0, 0, 0, 0, 0, 0, 0],
            player: 1,
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.girds !== this.state.girds) {
            this.setState({
                winner: this.winner(),
            }, () => (console.log(this.state.winner)));
        }
    }

    render() {
        const { girds, player, winner } = this.state;
        return (
            <div>
                <div className={style.board}>
                    {girds.map((element, index) => {
                        return (
                            <div
                                className={style.grid}
                                key={index}
                                onClick={
                                    () => {
                                        return this.handleCLick(index);
                                    }
                                }>
                                <span>{printAnwser(element)}</span>
                            </div>
                        );
                    })}
                </div>
                <div>目前輪到:{printAnwser(player)}</div>
                <div>赢家是:{printAnwser(winner)}</div>
                <button onClick={this.resetBox}>重新開始</button>
            </div>
        )
    }
}
