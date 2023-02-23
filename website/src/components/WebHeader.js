import { useUserLoginId } from "./InfoContext";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoApi } from '../utils/axios';
import styled from 'styled-components';
import Button from './design/Button';
import Input from "./design/Input";
import { lighten } from "polished";

const WebHeadBlock = styled.div`
    width: 100%;
    height: 60px;
    box-sizing: border-box;

    position: sticky; 
    top: 0px;
    z-index:1;
    background: white;
    padding: 5px 20px 5px 10px;

    display: flex;

    .logo{
        height: 30px;
        margin: 10px 0 10px 0px;
    }
    h1 {
        box-sizing: border-box;
        margin: 3px 15px 10px 2px;
        cursor: pointer;
    }

    // 창 크기 작아질 때 적용
    @media (max-width: 700px){
        h1 {
            display: none;
        }
    }

    .search-input{
        min-width: 140px;
        width: 100%;
        margin: 5px 10px;
    }

    .user{
        min-width: 200px; // 약 20자 크기
        font-size: 13px;
        text-align: end;
        margin-left: auto;
    }

    .signup-button{
        min-width: 60px;
        margin: 12px 5px 12px auto;
        background: black;
        color: white;
        &:hover{
            background: ${lighten(0.3, "black")};
        }
    }

    .login-button{
        min-width: 60px;
        margin: 12px 5px;
    }

    
`

function WebHeader({search = false}) {
    const userLoginId = useUserLoginId();
    // const userLoginId = "test";
    // const userLoginId = "A234567890B234567890" // 20자
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
                //window.location.reload(); //새로고침
                window.location.replace("/"); //새로고침
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    }

    const onClickSignup = () =>{
        navigate("/signup");
    }

    return (
        <WebHeadBlock>
            <img className="logo" src="img/smiley.jpg" />
            <h1 onClick={onClick}>WEBtorage</h1>
            {search && userLoginId? 
            <Input className="search-input" placeholder="Search Tabs" />:""
            }
            {userLoginId ? <div className="user"><h3>{userLoginId}{'님'}</h3></div> : 
            <Button className="signup-button" onClick={onClickSignup}>회원가입</Button>}
            <Button className="login-button" onClick={onClick2}>{userLoginId ? buttonName = "로그아웃" : buttonName = "로그인"}</Button>
        </WebHeadBlock >
    );
}

export default WebHeader;