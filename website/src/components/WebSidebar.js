import React, { useState } from 'react';
import styled from 'styled-components';
import CategoryList from './CategoryList';
import CategorySearch from './CategorySearch';

const WebSideTemplate = styled.div`
    position: sticky; //위치 고정
    top: 60px; // fix: 작/크게보기 하면 사이드바 위로 왔다갔다 하는 문제
    left: 10px;

    width: auto;
    max-height: 80vh;

    // 사이드바 여러개 있을 때
    display: flex;
    flex-direction: column;
    gap: 10px;
`

const WebSideBlock = styled.div`
    width: 170px; 
    max-height: 70vh;

    background: white;
    margin-top: 5px;
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
        <WebSideTemplate>
            <WebSideBlock>
                <h2>Category</h2>
                <CategorySearch />
                <hr />
                <CategoryList />
            </WebSideBlock>
        </WebSideTemplate>
    );
}

export default WebSidebar;