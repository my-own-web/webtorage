import { useUserLoginId } from "./InfoContext";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TodoApi } from '../utils/axios';
import styled from 'styled-components';
import Button from './design/Button';
import Input from "./design/Input";
import { lighten } from "polished";
import BoxSearch from "./BoxSearch";

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
    @media (max-width: 751px){
        h1 {
            display: none;
        }
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
    
    .quit-button{
        min-width: 60px;
        margin: 12px 5px;
    }
    
`

function WebHeader({ search = false }) {
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

    async function quitClick() {
        let quit = window.confirm("정말로 탈퇴하시겠습니까?");
        if (quit) {
            try {
                const res = await TodoApi.post('/user/quit', null, { withCredentials: true });
                if (res.data === '해당 사용자의 계정 정보가 삭제되었습니다.') {
                    alert('회원 탈퇴되었습니다.');
                }
                else if (res.data === '로그인 후 해당 기능을 이용해주시기 바랍니다.') {
                    alert('회원 탈퇴에 실패했습니다. 로그인 후 다시 이용해 주시기 바랍니다.');
                }
                window.location.replace("/"); //새로고침
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    }

    async function quitClick() {
        let quit = window.confirm("정말로 탈퇴하시겠습니까?");
        if (quit) {
            try {
                const res = await TodoApi.post('/user/quit', null, { withCredentials: true });
                if (res.data === '해당 사용자의 계정 정보가 삭제되었습니다.') {
                    alert('회원 탈퇴되었습니다.');
                }
                else if (res.data === '로그인 후 해당 기능을 이용해주시기 바랍니다.') {
                    alert('회원 탈퇴에 실패했습니다. 로그인 후 다시 이용해 주시기 바랍니다.');
                }
                window.location.replace("/"); //새로고침
                navigate('/');
            } catch (err) {
                console.log(err);
            }
        }
    }

    const onClickSignup = () => {
        navigate("/signup");
    }

    return (
        <WebHeadBlock>
            <img className="logo" src="img/smiley.jpg" />
            <h1 onClick={onClick}>WEBtorage</h1>
            {search && userLoginId ?
                <BoxSearch className="search-input" />
                : ""
            }
            {userLoginId ?
                <>
                    <div className="user">
                        <h3>{userLoginId}{'님'}</h3>
                    </div>
                    <Button className="login-button" onClick={onClick2}>{buttonName = "로그아웃"}</Button>
                    <Button className="quit-button" onClick={quitClick}>회원탈퇴</Button>
                </> :
                <>
                    <Button className="signup-button" onClick={onClickSignup}>회원가입</Button>
                    <Button className="login-button" onClick={onClick2}>{buttonName = "로그인"}</Button>
                </>
            }

        </WebHeadBlock >
    );
}

export default WebHeader;