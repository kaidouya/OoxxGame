import React, { Component } from 'react';
import styled from 'styled-components';

const SvgBody = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 300px;
  height: 300px;
  .line {
    stroke-dasharray: 0 1000;
    animation: dasharray 1s forwards;
  }
  @keyframes dasharray {
    from {
      stroke-dasharray: 0 1000;
    }
    to {
      stroke-dasharray: ${props => {
          let { x1, x2, y1, y2 } = props.children.props;
          let d = Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
          console.log(d);
          return d;
        }}
        1000;
    }
  }
`;

class SvgLine extends Component {
  constructor(props) {
    super(props);

    const { cuurentBoardState, whosWinner } = this.props;
    let positionInfo = [];

    // 找出哪些格子是贏家的
    cuurentBoardState.forEach((element, index) => {
      if (element === whosWinner) {
        positionInfo.push(index);
      }
    });
    console.log('這些格子取得勝利：' + positionInfo);
    this.state = {
      positionInfo: positionInfo
    };
  }

  render() {
    const startX = this.state.positionInfo.slice(0, 1) % 3;
    const startY = Math.floor(this.state.positionInfo.slice(0, 1) / 3);
    const endX = this.state.positionInfo.slice(-1) % 3;
    const endY = Math.floor(this.state.positionInfo.slice(-1) / 3);
    console.log(
      '開始位置x：' + (startX * 100 + 50) + '開始位置Y：' + (startY * 100 + 50)
    );
    console.log(
      '結束位置x：' + (endX * 100 + 50) + '結束位置Y：' + (endY * 100 + 50)
    );
    console.log('好難算阿 ㄇㄉ勒');
    return (
      <SvgBody>
        <line
          className='line'
          x1={startX * 100 + 50}
          y1={startY * 100 + 50}
          x2={endX * 100 + 50}
          y2={endY * 100 + 50}
          stroke='red'
          strokeWidth='5'
        />
      </SvgBody>
    );
  }
}

export default SvgLine;
