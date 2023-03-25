import React, {useState} from "react";
import styled from "styled-components";
import { darken, lighten } from "polished";
import { useNavigate } from "react-router-dom";
import { TodoApi } from "../utils/axios";

const UserMenuTemplate = styled.div`
    height: auto;
    width: 100px;
    position: absolute;
    right: 0px;
    z-index: 2;
    padding: 0;
    margin: 0;

    background: black; //white; whitesmoke;
    display: flex;
    flex-direction: column;
`
const UserMenuItemContainer = styled.div`
    border-bottom: 1px solid ${lighten(0.5, "black")};
    height: 30px;
    cursor: pointer;
    box-sizing: border-box;
    position: relative;

    &:hover{
        background: ${lighten(0.3, "black")};
    }
`

const UserMenuItem = styled.div`
    font-size: 15px;
    color: white;
    width: 100px;
    margin: 0;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    text-align: center;
`

function UserMenu({show = true}){
    const navigate = useNavigate();

    async function logout() {
        try {
            await TodoApi.post('/user/logout', null, { withCredentials: true });
            // window.location.reload(); //새로고침
            window.location.replace("/"); //새로고침 
        } catch (err) {
            console.log(err);
        }
        
    }

    async function deleteAccount() {
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

    async function changePassword() {
        navigate('/changePassword');
    }


    if(!show){
        return("");
    }
    return(
        <UserMenuTemplate>
            <UserMenuItemContainer>
                <UserMenuItem onClick={logout}>
                    로그아웃
                </UserMenuItem>
            </UserMenuItemContainer>
            <UserMenuItemContainer>
                <UserMenuItem onClick={deleteAccount}>
                    회원탈퇴
                </UserMenuItem>
            </UserMenuItemContainer>
            <UserMenuItemContainer>
                <UserMenuItem onClick={changePassword}>
                    비밀번호 변경
                </UserMenuItem>
            </UserMenuItemContainer>
        </UserMenuTemplate>
    );
}

export default UserMenu;