import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import { darken, lighten } from 'polished';
import { TodoApi } from '../utils/axios';
import WebHeader from './WebHeader';
import Cookies from 'universal-cookie';
import { useContentDispatch } from "./InfoContext";


const SignupBlock = styled.div`
  width: 500px;
  background: white;
//   background: whitesmoke;
//   background: #BFDCF4;
//   background: ${lighten(0.05, '#BFDCF4')};
  border-radius: 12px; /*둥그란 정도*/
//   border: solid 1px grey;
  margin: 60px auto; /* 페이지 중앙에 나타나도록 설정 */
//   margin-top: 20px;
  justify-content: center;
  display: flex; /*요소들을 자유자제로 위치시키는 속성, block처럼 container 수직 쌓임*/
  flex-direction: column; //Item의 주 축이 수직
//   box-shadow: 8px 5px 20px ${lighten(0.5, '#000')};
    box-shadow: 0 0 7px ${lighten(0.5, '#000')};
`;

const GlobalStyle = createGlobalStyle`
  body {
    // background: #DEF1F7;
    // background: #e9ecef;
    background: white;
    // background: whitesmoke;
  }
`;

const SignupHeader = styled.div`
  padding: 30px 20px 40px 20px;
  padding: 20px 20px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 40px;
    text-align: center;
    color: #343a40;
  }
`;

const SignupBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 50px;
  border-radius: 0px 0px 12px 12px;
  h2 {
    // margin: 5px;
    margin: 0px 0px 0px 20px;
    align-self: baseline;
  }
`;

const SignupInput = styled.input`
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #ada7ab;
  width: 90%;
//   transform: translate(2%);
  height: 50px;
  font-size: 15px;
  justify-content: center;
//   margin: 10px 15px;
  margin: 0px 0px 20px 0px;
  padding-left: 10px;
`;

const SignupButton = styled.button`
  box-sizing: border-box;
//   width: 82%;
  width: 90%;
  height: 50px;
//   transform: translate(10%);
  font-size: 16px;
  ///border: 1px solid #ada7ab;
//   border: 1px solid #bfbdbd;
  border: none;
  border-radius: 8px;
  background: black;
  color: white;
  font-weight: bold;
  cursor: pointer;
//   background: ${darken(0.05, 'whitesmoke')};
//   /background: #e2e2e2;
  //background: #BCE9E8;
//   margin-top: 35px;
//   margin-bottom: 35px;
    margin: 20px 0px 20px 0px;


  &:hover {
    // background: ${darken(0.05, '#e2e2e2')};
    // background: whitesmoke;
    background: ${lighten(0.2, "black")};
  }
`;

function SignupPage() {
    const [users, setUsers] = useState([]);
    let fin = 0;

    const [userInf, setUserInf] = useState({
        Email: '',
        Id: '',
        Password: ''
    });

    const { Email, Id, Password } = userInf;

    const dispatch = useContentDispatch();

    const onChange = useCallback(
        e => {
            const { name, value } = e.target;
            setUserInf({
                ...userInf,
                [name]: value
            });
        },
        [userInf]
    );

    const onSubmit = () => {
        console.log(userInf);
        UserLogin(userInf);
        if (fin === 1) {
            setUserInf({
                Id: '',
                Password: ''
            });
            fin = 0;
        }
    }

    const navigate = useNavigate();
    const cookies = new Cookies();

    const onKeyPress = (e) => {
        if (e.key == 'Enter')
            onSubmit();
    }

    async function UserLogin(userInf) {
        if (Id === '' && Password === '')
            alert("아이디와 비밀번호를 입력해주세요");
        else if (Id === '')
            alert("아이디를 입력해주세요");
        else if (Password === '')
            alert("비밀번호를 입력해주세요");
        else {
            fin = 1;
            try {
                const res = await TodoApi.post("/user/login", userInf, { withCredentials: true });
                if (res.data === 'OK') {
                    console.log(cookies.get('validuser')); //확인용
                    dispatch({ type: "FETCH" }); // 로그인 정보로 미리보기 불러오기
                    navigate('/');
                }
                else if (res.data === 'Invalid User') {
                    alert("아이디 또는 비밀번호를 확인하세요.");
                    cookies.remove('validuser');
                }
            } catch (err) {
                console.log(err);
                alert("오류가 발생했습니다. 다시 시도해 주세요.");
                cookies.remove('validuser');
            }
        }
    }

    return (
        <div>
            <GlobalStyle />
            <WebHeader />
            <SignupBlock>
                <SignupHeader>
                    <h1>Signup Page</h1>
                </SignupHeader>
                <SignupBody>
                    <h2>Email</h2>
                    <SignupInput name="Email" onChange={onChange} value={Email} placeholder="Email을 입력해주세요" onKeyPress={onKeyPress} />
                    <h2>ID</h2>
                    <SignupInput name="Id" onChange={onChange} value={Id} placeholder="ID를 입력해주세요" onKeyPress={onKeyPress} />
                    <h2>Password</h2>
                    <SignupInput name="Password" onChange={onChange} value={Password} type="password" placeholder="Password를 입력해주세요" onKeyPress={onKeyPress} />
                    <SignupButton onClick={onSubmit}>
                        로그인
                    </SignupButton>
                </SignupBody>
            </SignupBlock>
        </div>
    );
}

export default SignupPage;