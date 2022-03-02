import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryList from './CategoryList';
import CategorySearch from './CategorySearch';

const WebSideBlock = styled.div`
    position: sticky; //위치 고정
    top: 70px;
    left: 10px;
    width: 170px; 
    max-height: 70vh;
    background: white;
    padding: 10px 0px 20px 20px;
    border-radius: 5px; // 모서리 둥굴게
    box-shadow: 0 0 3px 0 rgba(0,0,0,100); // 박스 감싸는 그림자
    text-align: left;
    display: flex;
    flex-direction: column;
    flex-basis:100%;
    gap: 5px;
    h2 {
        font-size: 15px;
        margin: 0 0 0 0;
    }
    hr{
        margin: 0 20px 0 0;
    }
`

function WebSidebar() {
  return (
    <WebSideBlock>
      <h2>Category</h2>
      <CategorySearch />
      <hr />
      <CategoryList />
    </WebSideBlock>
  );
}

export default WebSidebar;