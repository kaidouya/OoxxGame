import React, { Component, Fragment } from 'react';
import styled from 'styled-components';

const CheckerBoard = styled.div`
  width: 300px;
  height: 300px;
  margin: 0 auto;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
`;

const BoxBody = styled.span`
  flex-basis: 33%;
  height: 33%;
  border: 1px solid #ccc;
  margin: -1px 0 0 -1px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: sans-serif;
  font-size: 60px;
  color: #666;
  cursor: pointer;
  user-select: none;
`;

const Player = styled.span`
  display: block;
  color: #0cc;
  font-size: 1rem;
  text-align: center;
`;

const PlayerSpan = styled(Player)`
  display: inline-block;
  font-weight: bold;
  font-size: 2rem;
`;

// 連線成功
const winnerLine = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// 丟值函式
const giveOx = n => {
  switch (n) {
    case 0:
      return '';
    case 1:
      return '0';
    case -1:
      return 'X';
    default:
      return '';
  }
};

class Ooxx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      whichPlay: 1,
      winner: null
    };
  }

  // 點擊事件
  clickHandle(index) {
    if (this.state.winner !== null) return;
    const newBoxArray = [...this.state.boxArray];
    // 防止重複點擊
    if (newBoxArray[index] !== 0) {
      return;
    }
    newBoxArray[index] = this.state.whichPlay;
    this.setState(preState => {
      return {
        boxArray: newBoxArray,
        whichPlay: -this.state.whichPlay
      };
    });
  }

  // 檢查是否已經出現贏家
  whosWinner() {
    const grid = this.state.boxArray;
    for (const items of winnerLine) {
      const [i, j, k] = items;
      if (grid[i] === grid[j] && grid[j] === grid[k] && grid[i] !== 0) {
        return grid[i];
      }
    }
    return null;
  }

  // 當更新時檢查是否已經結束
  componentDidUpdate(prevProps, preState) {
    // 防止無窮迴圈
    if (preState.boxArray !== this.state.boxArray) {
      const getWinner = this.whosWinner();
      if (getWinner !== null) {
        this.setState(preState => {
          return {
            winner: getWinner
          };
        });
      }
    }
  }

  render() {
    const { boxArray, whichPlay, winner } = this.state;
    return (
      <Fragment>
        <CheckerBoard>
          {boxArray.map((element, index) => {
            return (
              <BoxBody key={index} onClick={this.clickHandle.bind(this, index)}>
                {giveOx(element)}
              </BoxBody>
            );
          })}
        </CheckerBoard>
        <Player>
          現在是誰在玩：<PlayerSpan>{giveOx(whichPlay)}</PlayerSpan>
        </Player>
        <Player>
          目前贏家是：<PlayerSpan>{giveOx(winner)}</PlayerSpan>
        </Player>
      </Fragment>
    );
  }
}

export default Ooxx;
