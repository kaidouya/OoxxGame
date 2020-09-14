import React, { Component, Fragment } from "react";
import styled from "styled-components";
import SvgLine from "./SvgLine";

const CheckerBoard = styled.div`
  position: relative;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  width: 450px;
  height: 450px;
  margin: 0 auto;
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
  color: #85bf21;
  font-weight: bold;
  font-size: 2rem;
`;

const ResetBtn = styled.button`
  display: block;
  margin: 20px auto 0;
  width: 300px;
  height: 50px;
  color: #555;
  border-radius: 15px;
`;

// 成功連線有哪些組合
const winnerLine = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// 丟值函式
const giveOx = (n) => {
  switch (n) {
    case 0:
      return "";
    case 1:
      return "0";
    case -1:
      return "X";
    default:
      return "";
  }
};

class Ooxx extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      whichPlay: 1,
      winner: null,
      winnerGroup: [], // 獲勝組合
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
    this.setState((preState) => {
      return {
        boxArray: newBoxArray,
        whichPlay: -this.state.whichPlay,
      };
    });
  }

  // 檢查是否已經出現贏家 + 並且記錄是哪種組合所勝出
  whosWinner() {
    const grid = this.state.boxArray;
    for (const items of winnerLine) {
      const [i, j, k] = items;
      if (grid[i] === grid[j] && grid[j] === grid[k] && grid[i] !== 0) {
        return {
          w1: grid[i],
          w2: [i, j, k],
        };
      }
    }
    return null;
  }

  // 重新開始
  resetBtn = () => {
    this.setState((preState) => {
      return {
        boxArray: [0, 0, 0, 0, 0, 0, 0, 0, 0],
        winner: null,
      };
    });
  };

  // 當更新時檢查是否已經結束
  componentDidUpdate(prevProps, preState) {
    // 防止無窮迴圈
    if (preState.boxArray !== this.state.boxArray) {
      // 確認是否有贏家出現
      const getWinnerInfo = this.whosWinner();
      if (getWinnerInfo !== null) {
        this.setState((preState) => {
          return {
            winner: getWinnerInfo.w1,
            winnerGroup: getWinnerInfo.w2,
          };
        });
      }
    }
  }

  render() {
    const { boxArray, whichPlay, winner, winnerGroup } = this.state;
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
          {winner !== null ? <SvgLine winnerGroup={winnerGroup} /> : null}
        </CheckerBoard>
        <Player>
          現在是誰在玩：我測試
          <PlayerSpan>
            {winner !== null ? "結束了啦！" : giveOx(whichPlay)}
          </PlayerSpan>
        </Player>
        <Player>
          目前贏家是：<PlayerSpan>{giveOx(winner)}</PlayerSpan>
        </Player>
        <ResetBtn onClick={this.resetBtn}>重新開始</ResetBtn>
      </Fragment>
    );
  }
}

export default Ooxx;
