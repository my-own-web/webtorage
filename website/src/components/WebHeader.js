import { useUserLoginId } from "./InfoContext";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoApi } from '../utils/axios';
import styled from 'styled-components';
import Button from './design/Button';
import Cookies from "universal-cookie";
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
    padding: 5px 20px;
    // border: solid black 1px; // dbg

    //display: flex;
    // justify-content: space-between;
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

    .search-input{
        width: 400px;
        // flex-basis: 100%;
    }

    h3 {
        // margin: 12px 10px 0px 0px;
        // margin: 3px 0 10px 0;
        font-size: 15px;
        // text-align: center;
    }

    .signup-button{
        margin: 12px 5px;
        background: black;
        color: white;
        &:hover{
            background: ${lighten(0.2, "black")};
        }
    }

    .login-button{
        margin: 12px 5px;
        // border: none;
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
                //window.location.reload(); //새로고침
                window.location.replace("/"); //새로고침
                navigate('/');
            } catch (err) {
                console.log(err);

                // debug: 서버 안 켰을 때 디버그용
                if (process.env.NODE_ENV === "development") {
                    const cookies = new Cookies();
                    cookies.remove('validuser');
                    window.location.replace("/"); //새로고침
                    navigate('/');
                    return;
                }
            }
        }
    }

    const onClickSignup = () =>{
        navigate("/signup");
    }

    return (
        <WebHeadBlock>
            <img className="logo" src="img/smiley.jpg" />
            <h1 onClick={onClick}>Webtorage</h1>
            {/* <Input className="search-input" placeholder="Search Tabs" /> */}
            {userLoginId ? <div><h3>{userLoginId}{'님'}</h3></div> : 
            <Button className="signup-button" onClick={onClickSignup}>회원가입</Button>}
            <Button className="login-button" onClick={onClick2}>{userLoginId ? buttonName = "로그아웃" : buttonName = "로그인"}</Button>
        </WebHeadBlock >
    );
}

export default WebHeader;