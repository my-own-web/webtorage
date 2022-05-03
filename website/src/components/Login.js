import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import { darken } from 'polished';
import { TodoApi } from '../utils/axios';
import WebHeader from './WebHeader';

const LoginBlock = styled.div`
  width: 600px;
  //background: #DAEBE2;
  background: #BFDCF4;
  //background: #DEF1F7;
  border-radius: 12px; /*둥그란 정도*/
  margin: 0 auto; /* 페이지 중앙에 나타나도록 설정 */
  margin-top: 35px;
  justify-content: center;
  display: flex; /*요소들을 자유자제로 위치시키는 속성, block처럼 container 수직 쌓임*/
  flex-direction: column; //Item의 주 축이 수직
`;

const GlobalStyle = createGlobalStyle`
  body {
    //background: #DEF1F7;
    background: #e9ecef;
    //background: white;
  }
`;

const LoginHeader = styled.div`
  padding: 20px 20px 30px 20px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 40px;
    text-align: center;
    color: #343a40;
  }
`;

const LoginBody = styled.div`
  display: block;
  padding: 10px 15px;
  align-items: center;
  border-radius: 0px 0px 12px 12px;
  background: #BFDCF4;
  h2 {
    margin: 10px;
  }
`;

const LoginInput = styled.input`
  border-radius: 8px;
  border: 1px solid #ada7ab;
  width: 90%;
  transform: translate(2%);
  height: 45px;
  font-size: 15px;
  align-items: center;
  justify-content: center;
  margin: 5px 10px;
`;

const LoginButton = styled.button`
  width: 82%;
  height: 55px;
  transform: translate(9%);
  font-size: 16px;
  border: 1px solid #ada7ab;
  border-radius: 10px;
  //background: #e2e2e2;
  background: #BCE9E8;
  margin-top: 30px;
  margin-bottom: 20px;

  &:hover {
    background: ${darken(0.1, '#BCE9E8')};
  }
`;

function Login() {
  const [users, setUsers] = useState([]);

  async function fetchInitial() {
    try {
      const { data } = await TodoApi.post("/user");
      setUsers(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchInitial();
  }, []);

  const navigate = useNavigate();

  async function UserLogin(userInf) {
    try {
      const res = await TodoApi.post("/user/login", userInf);
      if (res.data === 'OK') {
        alert("성공적으로 로그인되었습니다.");
        navigate('/');
      }
      else if (res.data === 'Invalid User') {
        alert("아이디 또는 비밀번호를 확인하세요.");
      }
    } catch (err) {
      console.log(err);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    }
  }

  const [userInf, setUserInf] = useState({
    Id: '',
    Password: ''
  });

  const { Id, Password } = userInf;

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
    setUserInf({
      Id: '',
      Password: ''
    });
  }

  return (
    <div>
      <GlobalStyle />
      <WebHeader />
      <LoginBlock>
        <LoginHeader>
          <h1>Login Page</h1>
        </LoginHeader>
        <LoginBody>
          <h2>ID</h2>
          <LoginInput name="Id" onChange={onChange} value={Id} placeholder="ID를 입력해주세요" />
          <h2>Password</h2>
          <LoginInput name="Password" onChange={onChange} value={Password} type="password" placeholder="Password를 입력해주세요" />
          <LoginButton onClick={onSubmit}>
            로그인
          </LoginButton>
        </LoginBody>
      </LoginBlock>
    </div>
  );
}

export default Login;