import React, { useState } from 'react';
import styled from 'styled-components';
import BigBox from './BigBox';
import SmallBox from './SmallBox';
import { useContent, useCurrentCategory, useDateRange } from '../InfoContext';

const WebContentBlock = styled.div`
  // background: pink; // dbg: 하얀색으로 변경?
  min-height: 100vh; // 70vh; // dbg: 
  display: block;
  // padding: 5px;
  // border: solid gray 1px; // dbg
`

const BoxesBlock = styled.div`
  //width: 840px;
  //background: #DEF2F4;
  //height: 100%;
  // background: pink; // dbg
  display: flex;
  flex-wrap: wrap; /*item이 container의 너비를 초과하면 줄바꿈함*/
  padding: 10px 15px 10px 15px;
  gap: 10px;
`;
//여러 박스들이 모여있을 때의 전체 색깔, 위치 등
//height를 지정하지 않아 item들이 쌓일 때 그것에 맞게 height가 변하도록 함

// Date 객체 형식 -> YYYYMMDDHHYY 형식으로 변환
// .getMonth(): 월은 0부터 시작
function configDateRange(range) {
  let start = null, end = null;
  if (range[0] != null) {
    start = range[0].getFullYear() * 100000000 + (range[0].getMonth() + 1) * 1000000 + range[0].getDate() * 10000;
  }
  if (range[1] != null) {
    end = range[1].getFullYear() * 100000000 + (range[1].getMonth() + 1) * 1000000 + range[1].getDate() * 10000 + 2359;
  }
  return [start, end];
}

function Boxes({ boxSize, select, onCheck }) { //더 늦게 저장한 순(date가 늦은 순)으로 정렬함
  const currentCategory = useCurrentCategory();
  const dateRange = configDateRange(useDateRange());

  const datas = useContent().filter((e) => {
    // 카테고리 필터
    if (currentCategory === 'ALL') return true;
    return e.category === currentCategory;
  }).filter((e) => {
    // 날짜 필터
    // console.log('range', dateRange,'title',e.site_name, 'date', e.date); // dbg
    if (dateRange[0] == null || dateRange[1] == null) return true;
    return dateRange[0] <= e.date && e.date <= dateRange[1];
  });

  datas.sort(function (a, b) {
    return b.date - a.date;
  }); ////더 늦게 저장한 순(date가 늦은 순)으로 정렬하는 함수

  return (
    <div>
      <WebContentBlock>
        <BoxesBlock>
          {boxSize ? datas.map(data => (
            <div>
              {select ? <input type='checkbox' id={data.id} category={data.category} onChange={onCheck} /> : ''}
              <BigBox
                key={data.id}
                id={data.id}
                category={data.category}
                title={data.title}
                data_url={data.data_url}
                image={data.image}
                description={data.description}
                date={data.date}
                memo={data.memo}
              />
            </div>)) : datas.map(data => (
              <SmallBox
                key={data.id}
                id={data.id}
                category={data.category}
                title={data.title}
                data_url={data.data_url}
                image={data.image}
                description={data.description}
                date={data.date}
                memo={data.memo}
              />))}
        </BoxesBlock>
      </WebContentBlock>
    </div>
  );
}

export default Boxes;