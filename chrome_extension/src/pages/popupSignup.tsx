import * as React from "react";
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from "../modules";
import {login} from '../modules/login';
import { signup } from "../modules/signup";
import {MessageType} from '../types';

const TotalWrap = styled.div`
  margin: auto;
  width : 100%;
  height : 100%;
  /* width: 300px;
  height: 500px;
  margin-left: 40%;
  margin-top: 100px; */
  background-color: #ffffff;

  display: flex;
  justify-content: center;

  & .btn{
      background-color: #e9f4fe;
      border: none;
      margin-left: 100px;
      /* margin-top: 15px; */
      margin-bottom: 20px;
      cursor: pointer;
      &:hover{
        background-color: #d5e8f8;
      }
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  height: 9vh;
  width: 100%;
  font-size: 6vh;
  background-color: #d5e8f8;
`;

const Middiv = styled.div`
`;

const Inputdiv = styled.div`
  margin: 10px;
  display: flex;
  /* justify-content: space-around; */
  & .labeltag{
    display: inline-block;
    width: 100px;
  }
  & .inputtag{
    display: inline-block;
    width: 200px;
  }
`;

function LoginPage() {

  const [input, setInput] = React.useState({id : "", password : ""});
  const [sign, setSign] = React.useState({email : "", id : "", password : ""});

  const loginState = useSelector((state:RootState) => state.LoginState);
  const signupState = useSelector((state:RootState) => state.SignupState);
  const dispatch = useDispatch();
  const onLoginState = React.useCallback((profile : any) => dispatch(login(profile)), [dispatch]);
  const onSignupState = React.useCallback((emailprofile : any) => dispatch(signup(emailprofile)), [dispatch]);

  const onClick = () => {
    if (loginState.flag === false){
      
      onLoginState(input); //로그인하면 LoginState의 flag 바꿔줌, login.ts의 loginstate도 update 해주는듯

      chrome.runtime.sendMessage({type: "LOGIN_SAVE", Id: input.id, Password: input.password});
      setInput({id : "", password : ""});

      chrome.runtime.onMessage.addListener((message:MessageType) => {
        if(message.type === "CHECKLOGIN"){
          if(message.flag==="OK"){
            alert('로그인 되었습니다!');
          }
          else{
            alert('존재하지 않는 계정입니다.');
          }
        }
      });
    }
  };

  const onSignup = () => {
    // if(서버에서 이미 존재하는 email인지 판별)
    //onSignupState(sign);
    chrome.runtime.sendMessage({type: "SIGNUP_SAVE", Email: sign.email, Id: sign.id, Password: sign.password});
    setSign({email : "", id: "", password : ""});

    // 회원가입 잘 저장되나 확인용
    // console.log("email : ", signupState.emailprofile.email, "id : ", signupState.emailprofile.id, "password : ", signupState.emailprofile.password);

    chrome.runtime.onMessage.addListener((message:MessageType) => {
      if(message.type === "CHECKSIGNUP"){
        if(message.flag==="New User"){
          alert('회원가입이 완료되었습니다!');
        }
        else{
          alert('회원가입을 다시 시도해 주십시오!');
        }
      }
    });
  }

  const onChange = (e : any) =>{
    const {value, name} = e.target;
    setInput({...input, [name]: value});
    // setId(e.target.value);
  }

  const onSignupChange = (e : any) =>{
    const {value, name} = e.target;
    setSign({...sign, [name]: value});
    // setId(e.target.value);
  }

  const onInput = (e : React.KeyboardEvent<HTMLInputElement>) =>{//엔터키로도 입력 가능하도록
    if(e.key == 'Enter'){
        onClick();
    }
  };

  const onSignupInput = (e : React.KeyboardEvent<HTMLInputElement>) =>{//엔터키로도 입력 가능하도록
    if(e.key == 'Enter'){
      onSignup();
    }
  };

  return (
    <>
      <TopBar>
        {/* <LogoContainer>
        </LogoContainer> */}
        Webtorage
      </TopBar>
      <TotalWrap>
        <Form>
          <Form.Group controlId="joinForm">
            <Inputdiv>
            <Form.Label className="labeltag">Email address</Form.Label>
            <Form.Control
              className="inputtag"
              name="email"
              type="email"
              maxLength={100}
              placeholder="Enter Email address"
              onChange={onSignupChange}
              value = {sign.email}
              onKeyPress={onSignupInput}
            />
            </Inputdiv>
            <Inputdiv>
            <Form.Label className="labeltag">ID</Form.Label>
            <Form.Control
              className="inputtag"
              name="id"
              type="id"
              maxLength={20}
              placeholder="name"
              onChange={onSignupChange}
              value = {sign.id}
              onKeyPress={onSignupInput}
            />
            </Inputdiv>
            <Inputdiv>
            <Form.Label className="labeltag">Password</Form.Label>
            <Form.Control
              className="inputtag"
              name="password"
              type="password"
              maxLength={64}
              placeholder="Password"
              onChange={onSignupChange}
              value = {sign.password}
              onKeyPress={onSignupInput}
            />
            </Inputdiv>
            <Button variant="primary" type="button" className="btn" onClick={onSignup}> 회원가입</Button>
          </Form.Group>

          <Form.Group controlId="loginForm">
            <Inputdiv>
            <Form.Label className="labeltag">ID</Form.Label>
            <Form.Control
              className="inputtag"
              name="id"
              type="id"
              maxLength={100}
              placeholder="Enter ID"
              onChange={onChange}
              value = {input.id}
              onKeyPress={onInput}
            />
            </Inputdiv>
            <Inputdiv>
            <Form.Label className="labeltag">Password</Form.Label>
            <Form.Control
              className="inputtag"
              name="password"
              type="password"
              maxLength={64}
              placeholder="Password"
              onChange={onChange}
              value = {input.password}
              onKeyPress={onInput}
            />
            </Inputdiv>
            <Button variant="primary" type="button" className="btn" onClick={onClick}>로그인</Button>
          </Form.Group>
        </Form>
      </TotalWrap>
    </>
  );
}


export default LoginPage;