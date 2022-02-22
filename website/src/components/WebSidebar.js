import React from 'react';
import styled from 'styled-components';
import CategoryList from './CategoryList';

const WebSideBlock = styled.div`
    position: sticky; //fixed;
    top: 70px;
    left: 10px;

    width: 170px; 
    // min-height:100%; // 최소 높이
    // height: 600px;//${window.innerHeight};// 100%;
    max-height: 70vh;
    // overflow-y: auto;
    // overflow-x: clip;

    background: white;
    // margin: 0px 10px 10px 10px;
    padding: 10px 0px 25px 20px;
    // border-right: solid gray 1px;
    border-radius: 5px; // 모서리 둥굴게
    box-shadow: 0 0 3px 0 rgba(0,0,0,100); // 박스 감싸는 그림자

    text-align: left;
    // display: flex;
    // flex-direction: column;
    // flex-basis:100%;
    // gap: 3px;

    h2 {
        font-size: 15px;
        margin: 0 0 0 0;
        // margin: 5px 0px 5px 0px;
        // text-align: center;        
    }

    hr{
        margin: 5px 0 0 0;
        // margin: 0px 5px 5px 5px;
        width: 100%;
    }

`

function WebSidebar() {
    return (
        <WebSideBlock>
            <h2>Category</h2>
            <hr />
            <CategoryList />
        </WebSideBlock>
    );
}

export default WebSidebar;