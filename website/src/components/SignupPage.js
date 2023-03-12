import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import { darken, lighten } from 'polished';
import { TodoApi } from '../utils/axios';
import WebHeader from './WebHeader';

const SignupBlock = styled.div`
  width: 500px;
  box-sizing: border-box;
  // height: 500px;
  background: white;
  border-radius: 12px; /*둥그란 정도*/
  margin: 20px auto; /* 페이지 중앙에 나타나도록 설정 */
  justify-content: center;
  display: flex; /*요소들을 자유자제로 위치시키는 속성, block처럼 container 수직 쌓임*/
  flex-direction: column; //Item의 주 축이 수직
  box-shadow: 0 0 7px ${lighten(0.5, '#000')};
`;

const GlobalStyle = createGlobalStyle`
  body {
    background: white;
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
    margin: 0px 0px 0px 20px;
    align-self: baseline;
  }
`;

const SignupInput = styled.input`
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #ada7ab;
  width: 90%;
  height: 50px;
  font-size: 15px;
  justify-content: center;
  margin: 5px 0px 20px 0px;
  padding-left: 10px;
`;

const SignupButton = styled.button`
  box-sizing: border-box;
  width: 90%;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: black;
  color: white;
  font-weight: bold;
  cursor: pointer;
  margin: 20px 0px 20px 0px;


  &:hover {
    background: ${lighten(0.3, "black")};
  }
`;

function SignupPage() {
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    id: "",
    password: ""
  })

  const onChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    });
  }

  const onKeyPress = (e) => {
    if (e.key == 'Enter')
      onSubmit();
  }

  const onSubmit = async () => {
    console.log(inputs);
    let emailReg = /^[_a-zA-Z0-9-\.]*@{1}[\.a-zA-Z0-9-]*[.]{1}[a-zA-Z]{2,3}$/;

    if (inputs.email == '' || inputs.id == '' || inputs.password == '') {
      alert("이메일, 아이디와 패스워드를 모두 입력해주세요.");
      return;
    }

    if (!emailReg.test(inputs.email)){
      alert("이메일 형식이 올바르지 않습니다.")
      return;
    }
    
    else if(inputs.id.length > 20){
      alert("아이디는 20자 이하로 해주세요.");
      return;
    }

    //send data to server
    try {
      const res = await TodoApi.post('/user/signup', inputs);
      if (res.data == 'New User') {
        alert('회원가입이 완료되었습니다!');
        navigate("/login");
      }
      else if (res.data == "Email Exist"){
        alert('이미 가입된 이메일 입니다.');
      } 
      else{
        alert('사용할 수 없는 ID입니다.');
      }
    } catch (err) {
      console.log(err);
      alert("오류가 발생했습니다. 다시 시도해 주세요.");
    } finally {
      setInputs({
        email: "",
        id: "",
        password: ""});
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
          <SignupInput name="email" onChange={onChange} value={inputs.email} placeholder="이메일을 입력해주세요" onKeyPress={onKeyPress}/>
          <h2>ID</h2>
          <SignupInput name="id" onChange={onChange} value={inputs.id} placeholder="아이디를 입력해주세요" onKeyPress={onKeyPress}/>
          <h2>Password</h2>
          <SignupInput name="password" onChange={onChange} value={inputs.password} type="password" placeholder="비밀번호를 입력해주세요" onKeyPress={onKeyPress}/>
          <SignupButton onClick={onSubmit}>
            회원가입
          </SignupButton>
        </SignupBody>
      </SignupBlock>
    </div>
  );
}

export default SignupPage;