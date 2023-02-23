import React, { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { lighten } from 'polished';
import CategoryList from './CategoryList';
import CategorySearch from './CategorySearch';
import Button from './design/Button';
import { useUserLoginId } from './InfoContext';

const WebSideTemplate = styled.div`
    position: sticky; //위치 고정
    top: 60px; // fix: 작/크게보기 하면 사이드바 위로 왔다갔다 하는 문제
    left: 10px;

    width: auto;
    max-height: 70vh; // 위치 고정에 필요

    // 사이드바 여러개 있을 때
    display: flex;
    flex-direction: column;
    gap: 10px;

    z-index: 2; // fix: 사이드바 안 요소들이 body에 의해 가려짐

    .button-container{
        width: 190px;
        height: 75px;
        margin: 5px 0;
        // border: 1px solid;
    }
    .add-button{
        background: black;
        color: white;
        &:hover{
            background: ${lighten(0.3, "black")};
        }
        width: 190px;
        font-size: 20px;
        height: 50px;
        margin-top: 25px;

        border-radius: 5px; // 모서리 둥굴게
    }
`

const WebSideBlock = styled.div`
    width: 170px; 
    max-height: 70vh; // 스크롤 생성에 필요

    background: white;
    margin-top: 5px;
    padding: 10px 0px 10px 20px;
    border-radius: 5px; // 모서리 둥굴게
    box-shadow: 0 0 3px 0 rgba(0,0,0,100); // 박스 감싸는 그림자

    text-align: left;
    display: flex; // flex container for category lists
    flex-direction: column;
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
    const userLoginId = useUserLoginId();
    const navigate = useNavigate();
    function onClickCreate() {
        if (userLoginId) navigate("/create");
        else navigate("/login");
    }

    return (
        <WebSideTemplate>
            <div className='button-container'>
                <Button className="add-button" onClick={onClickCreate} background="black">추가하기</Button>
            </div>
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