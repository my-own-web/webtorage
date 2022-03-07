import React from 'react';
import styled from 'styled-components';

const BoxBlock = styled.div`
  padding: 10px 12px;
  overflow-y: auto; /*자식요소에서 아래 내용이 넘칠 때 스크롤바 사용*/
  background: #F2F3F5;
  border-radius: 5px;
  border: 2px solid #DBDCF5;
  margin: 7px 9px;
  width: 296px;
  height: 200px;
`;
//박스 하나의 전체 디자인

const Sitename = styled.div`
  color: black;
  font-size: 13px;
  padding: 3px 0px;
`

const Title1 = styled.div`
  font-size: 13px;
  color: black;
  padding: 3px 0px;
`; //site_name이 없는 경우

const Title2 = styled.div`
  font-size: 11px;
  color: black;
  padding: 4px 0px;
`
//site_name이 있는 경우

const Url = styled.div`
  font-size: 13px;
  color: black;
  text-align: center;
  a {
    color: blue;
  }
`;

const Image = styled.div`
  margin: 5px 40px;
  width: 200px;
  height: 120px;
  border: 1px solid black;
`;

const Description = styled.div`
  font-size: 10px;
  color: black;
  padding-bottom: 3px;
  ${props => props.memo ? 'border-bottom: 1px dashed black;' : ''}
  /*아래 밑줄: div 태그로 인해 box padding 부분 제외한 전체에 밑줄 그려짐*/
  /*memo가 있는 경우 밑줄을 긋고 없는 경우 밑줄을 긋지 않음*/
`;

const Memo = styled.div`
  padding-top: 3px;
  font-size: 10px;
  color:black;
`;

function BigBox({ site_name, title, url, image, description, memo }) {

  return (
    <BoxBlock>
      {site_name ? <Sitename>{`[${site_name}]`}</Sitename> : ''}
      {site_name ? <Title2>{title}</Title2> : <Title1>{`[${title}]`}</Title1>}
      <Url>URL: <a href={url}>{`"${url}"`}</a></Url>
      <Image><img src={image} width="200" height="120"></img></Image>
      <Description memo={memo}>{description}</Description>
      {memo ? <Memo>{`메모: ${memo}`}</Memo> : ''}
    </BoxBlock >
  );
}

export default BigBox;