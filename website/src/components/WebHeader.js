import { useUserLoginId } from "./InfoContext";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoApi } from '../utils/axios';
import styled from 'styled-components';
import Button from './design/Button';

const WebHeadBlock = styled.div`
    width: 100%;
    height: 60px;
    box-sizing: border-box;

    position: sticky; 
    top: 0px;
    z-index:1;
    background: white;
    padding: 5px 20px;
    // border: solid black 1px; // dbg

    //display: flex;
    //justify-content: space-between;
    display: flex;

    .logo{
        height: 30px;
        margin: 10px 10px 10px 10px;
    }
    h1 {
        box-sizing: border-box;
        margin: 3px 0 10px 0;
        cursor: pointer;
        margin: 0 auto;
        // 제목 가운데 정렬
        // flex-basis: 100%;
        text-align: center;
        // ---
    }

    h3 {
        margin: 12px 10px 0px 0px;
        font-size: 15px;
    }

    .login-button{
        margin: 12px 5px;
    }
`

function WebHeader() {
    const userLoginId = useUserLoginId();
    const navigate = useNavigate();
    let buttonName;

    const onClick = () => {
        navigate('/');
    }

    async function onClick2() {
        if (userLoginId === '') {
            navigate('/login');
        }
        else {
            try {
                await TodoApi.post('/user/logout', null, { withCredentials: true });
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <WebHeadBlock>
            <img className="logo" src="img/smiley.jpg" />
            <h1 onClick={onClick}>Webtorage</h1>
            {userLoginId ? <div><h3>{userLoginId}{'님'}</h3></div> : ''}
            <Button className="login-button" onClick={onClick2}>{userLoginId ? buttonName = "로그아웃" : buttonName = "로그인"}</Button>
        </WebHeadBlock >
    );
}

export default WebHeader;