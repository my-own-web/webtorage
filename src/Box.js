import React from 'react';
import styled from 'styled-components';

const BoxBlock = styled.div`
  flex:1;
  padding: 10px 12px;
  overflow-y: auto; /*자식요소에서 아래 내용이 넘칠 때 스크롤바 사용*/
  background: #F2F3F5;
  border-radius: 10px;
  border: 2px solid #DBDCF5;
  width: 240px;
  height: 200px;
`;
//박스 하나의 전체 디자인

const Title = styled.div`
  font-size: 13px;
  color: black;
  padding: 3px 0px;
`;

const Url = styled.div`
  font-size: 13px;
  color: black;
  text-align: center;
`;

const Image = styled.div`
  margin: 5px 0px;
  text-align: center;
`;

const Description = styled.div`
  font-size: 10px;
  color: black;
  padding-bottom: 2px;
  border-bottom: 1px dashed black;  /*아래 밑줄: div 태그로 인해 box padding 부분 제외한 전체에 밑줄 그려짐*/
`;

const Memo = styled.div`
  padding-top: 3px;
  font-size: 10px;
  color:black;
`;

function Box({ title, url, image, description, memo }) {

  return (
    <BoxBlock>
      <Title>{`[${title}]`}</Title>
      <Url>URL: <a href={url}>{`"${url}"`}</a></Url>
      <Image><img src={image} width="180" height="100"></img></Image>
      <Description>{description}</Description>
      <Memo>{`메모: ${memo}`}</Memo>
    </BoxBlock>
  );
}

export default Box;