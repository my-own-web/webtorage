import React, { useState } from 'react';
import styled from 'styled-components';
import { useContent } from "../InfoContext";
import BigBox from './BigBox';
import SmallBox from './SmallBox';

const WebContentBlock = styled.div`
  background: pink;
  display: block;
  padding: 5px;
  border: solid gray 1px;
`

const BoxesBlock = styled.div`
  //width: 840px;
  //background: #DEF2F4;
  //height: 100%;
  background: pink;
  display: flex;
  flex-wrap: wrap; /*item이 container의 너비를 초과하면 줄바꿈함*/
  padding: 10px;
`;
//여러 박스들이 모여있을 때의 전체 색깔, 위치 등
//height를 지정하지 않아 item들이 쌓일 때 그것에 맞게 height가 변하도록 함
const SizeButton = styled.button`
  height: 25px;
  background: #E5B2FF;
  border: solid purple 1px;
  border-radius: 7px;
  font-size: 12px;
`;

function Boxes() {

  const datas = useContent();

  datas.sort(function (a, b) {
    return b.date - a.date;
  }); ////더 늦게 저장한 순(date가 늦은 순)으로 정렬하는 함수

  const [boxSize, setBoxSize] = useState(1);

  const onClick = () => {
    setBoxSize(1 - boxSize);
  }

  return (
    <div>
      <WebContentBlock>
        <SizeButton onClick={onClick}>{boxSize ? "작게보기" : "크게보기"}</SizeButton>
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
              date={data.date}
              category={data.category}
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