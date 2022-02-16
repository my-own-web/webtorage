import React from 'react';
import styled from 'styled-components';
import metaData from './Context';
import Box from './Box';

const BoxesBlock = styled.div`
  width: 1000px;
  height: 500px;
  background: #DEF2F4;
  padding: 10px;
`; //임시로 설정
//여러 박스들이 모여있을 때의 전체 색깔, 위치 등

function Boxes() {
  const datas = metaData; //일단 박스 하나만 있다고 가정함: map 함수 작동 안함

  return (<BoxesBlock>
    {datas.map(data => (
      <Box
        key={data.date}
        title={data.title}
        url={data.url}
        image={data.image}
        description={data.description}
        memo={data.memo}
      />))}
  </BoxesBlock>);
}

export default Boxes;