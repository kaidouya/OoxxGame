import React, { Component } from 'react';
import styled from 'styled-components';

const SvgBody = styled.svg`
  position: absolute;
  top: 0px;
  left: 0px;
  width: 450px;
  height: 450px;
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
          // 自己來算兩點之間的距離
          let { x1, x2, y1, y2 } = props.children.props;
          let d = Math.sqrt((x2 -= x1) * x2 + (y2 -= y1) * y2);
          console.log('兩點之間的距離:' + d);
          return d;
        }}
        1000;
    }
  }
`;

class SvgLine extends Component {
  constructor(props) {
    super(props);

    let positionInfo = this.props.winnerGroup;

    console.log('這些格子取得勝利：' + positionInfo);
    this.state = {
      positionInfo: positionInfo
    };
  }

  render() {
    const number01 = 148; // 方格的寬
    const number02 = 74; // 方格寬的一半
    const startX = this.state.positionInfo.slice(0, 1) % 3;
    const startY = Math.floor(this.state.positionInfo.slice(0, 1) / 3);
    const endX = this.state.positionInfo.slice(-1) % 3;
    const endY = Math.floor(this.state.positionInfo.slice(-1) / 3);
    console.log(
      '開始位置x：' +
        (startX * number01 + number02) +
        '開始位置Y：' +
        (startY * number01 + number02)
    );
    console.log(
      '結束位置x：' +
        (endX * number01 + number02) +
        '結束位置Y：' +
        (endY * number01 + number02)
    );
    console.log('好難算阿 ㄇㄉ勒');
    return (
      <SvgBody>
        <line
          className='line'
          x1={startX * number01 + number02}
          y1={startY * number01 + number02}
          x2={endX * number01 + number02}
          y2={endY * number01 + number02}
          stroke='red'
          strokeWidth='5'
        />
      </SvgBody>
    );
  }
}

export default SvgLine;
