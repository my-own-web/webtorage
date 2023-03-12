import { useUserLoginId } from "./InfoContext";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Button from './design/Button';
import BoxSearch from "./BoxSearch";
import UserMenu from "./UserMenu";
import { darken, lighten } from "polished";
import { GoTriangleDown } from "react-icons/go";

const WebHeadBlock = styled.div`
    width: 100%;
    height: 60px;
    box-sizing: border-box;
    position: sticky; 
    top: 0px;
    z-index:2;
    background: white;
    padding: 5px 20px 5px 10px;
    display: flex;
    .logo{
        height: 30px;
        margin: 10px 0 10px 0px;
        cursor: pointer;
    }
    h1 {
        box-sizing: border-box;
        margin: 3px 15px 10px 2px;
        cursor: pointer;
    }
    // 창 크기 작아질 때 적용
    @media (max-width: 600px){
        h1 {
            ${props=>props.hideLogo? "display: none;": ""}
        }
    }
    .user{
        min-width: 210px; // 약 20자+아이콘 크기
        text-align: end;
        position: relative;
        /* button 디자인 제거 */
        padding: 0;
        border: none;
        background: none;
        margin-left: auto;
    }
    .user-name{
        display: inline-block;
        font-size: 15px;
        cursor: pointer;
    }
    .user-menu-icon{
        cursor: pointer;
        position: relative;
        top: 3px;
        color: ${props=>props.showUserMenu? "red":"black"};
    }
    .user-name:hover+ .user-menu-icon{
        color: red;
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

    const [showUserMenu, setShowUserMenu] = useState(false);

    const onClick = () => {
        navigate('/');
    }

    async function onClickLogin() {
        navigate('/login');
    }

    const onClickSignup = () => {
        navigate("/signup");
    }

    const onClickUser = () =>{
        setShowUserMenu(!showUserMenu);
    }

    return (
        <WebHeadBlock showUserMenu={showUserMenu} hideLogo = {search && userLoginId}>
            <img className="logo" src="img/smiley.jpg" onClick={onClick}/>
            <h1 onClick={onClick}>WEBtorage</h1>
            {search && userLoginId ?
                <BoxSearch className="search-input" />
                : ""
            }
            {userLoginId ?
                <button className="user" onBlur={()=>{setShowUserMenu(false)}}>
                    <h3 className="user-name" onClick={onClickUser}>{userLoginId}{'님'}</h3>
                    <GoTriangleDown className="user-menu-icon" size="16"/>
                    {showUserMenu?
                        <UserMenu  />: ""}
                </button> :
                <>
                    <Button className="signup-button" onClick={onClickSignup}>회원가입</Button>
                    <Button className="login-button" onClick={onClickLogin}>{buttonName = "로그인"}</Button>
                </>
            }
        </WebHeadBlock >
    );
}

export default WebHeader;