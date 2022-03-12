import React, { useState } from 'react';
import styled from 'styled-components';
import metaData from './Context';
import BigBox from './BigBox';
import SmallBox from './SmallBox';

const WebContentBlock = styled.div`
  // background: pink; // dbg: 하얀색으로 변경?
  min-height: 100vh; // 70vh; // dbg: 
  display: block;
  padding: 5px;
  // border: solid gray 1px; // dbg
`

const BoxesBlock = styled.div`
  //width: 840px;
  //background: #DEF2F4;
  //height: 100%;
  display: flex;
  flex-wrap: wrap; /*item이 container의 너비를 초과하면 줄바꿈함*/
  padding: 10px;
`;
//여러 박스들이 모여있을 때의 전체 색깔, 위치 등
//height를 지정하지 않아 item들이 쌓일 때 그것에 맞게 height가 변하도록 함

function Boxes({boxSize}) { //더 늦게 저장한 순(date가 늦은 순)으로 정렬함
  const datas = metaData; //일단 박스 하나만 있다고 가정함: map 함수 작동 안함
  datas.sort(function (a, b) {
    return b.date - a.date;
  });

  return (
    <div>
      <WebContentBlock>
        <BoxesBlock>
          {boxSize ? datas.map(data => (
            <BigBox
              key={data.date}
              site_name={data.site_name}
              title={data.title}
              url={data.url}
              image={data.image}
              description={data.description}
              memo={data.memo}
            />)) : datas.map(data => (
              <SmallBox
                key={data.date}
                site_name={data.site_name}
                title={data.title}
                url={data.url}
                image={data.image}
                description={data.description}
                memo={data.memo}
              />))}
        </BoxesBlock>
      </WebContentBlock>
    </div>
  );
}

export default Boxes;