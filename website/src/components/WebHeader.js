import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './design/Button';

const WebHeadBlock = styled.div`
    // width: 100%; // chk: 패이지 넘어감
    height: 50px;

    position: sticky; 
    top: 0px;
    z-index:1;

    background: white;
    padding: 5px 20px;
    // border: solid black 1px; // dbg

    // display: flex;
    // justify-content: space-between;
    
    display: grid;
    grid-template-columns: auto auto 1fr auto auto;
    gap: 20px;

    .logo{
        height: 30px;
        margin: 10px 10px 10px 10px;
    }

    h1 {
        box-sizing: border-box;
        margin: 3px 0 10px 0;
        cursor: pointer;

        // 제목 가운데 정렬
        // flex-basis: 100%;
        text-align: center;
        // ---
    }

    // TODO 검색창
    .search-input{
        // box-sizing: border-box;
        margin: 10px 100px;
        // width: 600px;
    }

    .add-button{
        margin: 12px 0px;
        background: black;
        color: white;
        // height: 40px;
        // margin: 0 auto;
    }

    .login-button{
        margin: 12px 0px;
    }
`

function WebHeader() {
    const [didLogin, setDidLogin] = useState(0);
    const navigate = useNavigate();

    const onClick = () => {
        navigate('/');
    }

    function onLogin() {
        if (didLogin === 0)
            navigate('/login');
        //setDidLogin(1 - didLogin);
    }

    return (
        <WebHeadBlock>
            <img className="logo" src="img/smiley.jpg" />
            <h1 onClick={onClick}>Webtorage</h1>
            <input className="search-input" placeholder="TODO 검색창" />
            <Button className="add-button">추가하기</Button>
            <Button className='login-button' onClick={onLogin}>{didLogin ? "로그아웃" : "로그인"}</Button>
        </WebHeadBlock>
    );
}

export default WebHeader;