import * as React from "react";
import { Form, Button } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { darken, lighten } from 'polished';

import { RootState } from "../modules";
import {login} from '../modules/login';
import { signup } from "../modules/signup";
import {MessageType} from '../types';

const GlobalStyle = createGlobalStyle`
  body {
    // background: #DEF1F7;
    // background: #e9ecef;
    background: white;
    // background: whitesmoke;
  }
`;
const SignupHeader = styled.div`
  padding: 20px 10px 30px 10px;
  padding: 10px 10px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 30px;
    text-align: center;
    color: #343a40;
  }
  h2 {
    margin: 0;
    font-size: 20px;
    text-align: center;
    color: #343a40;
  }
`;

const SignupBlock = styled.div`
  width: 100%;
  background: white;
//   background: whitesmoke;
//   background: #BFDCF4;
//   background: ${lighten(0.05, '#BFDCF4')};
  //border-radius: 12px; /*둥그란 정도*/
//   border: solid 1px grey;
  //margin: 60px auto; /* 페이지 중앙에 나타나도록 설정 */
//   margin-top: 20px;
  justify-content: center;
  display: flex; /*요소들을 자유자제로 위치시키는 속성, block처럼 container 수직 쌓임*/
  flex-direction: column; //Item의 주 축이 수직
//   box-shadow: 8px 5px 20px ${lighten(0.5, '#000')};
    box-shadow: 0 0 7px ${lighten(0.5, '#000')};
`;

const SignupBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 30px;
  /* border-radius: 0px 0px 12px 12px; */
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
  height: 35px;
  font-size: 12px;
  justify-content: center;
//   margin: 10px 15px;
  margin: 5px 0px 10px 0px;
  padding-left: 10px;
`;

const SignupButton = styled.button`
  box-sizing: border-box;
//   width: 82%;
  width: 90%;
  height: 30px;
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
  background: white;

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
            alert('존재하지 않는 계정입니다. 다시 로그인 하십시오.');
            onLoginState(input);
            //console.log(loginState);///
          }
        }
      });
    }
  };

  const didLogin = () =>{
    chrome.runtime.sendMessage({type: "DIDLOGIN_SAVE"});
    
    chrome.runtime.onMessage.addListener((message:MessageType) => {
      if(message.type === "CHECKUSERINFO"){
        if (message.flag === "Not Logined"){
          console.log("로그인되지 않은 상태입니다.");
      }
      else if (message.flag ==="Error Exist"){
          console.log("오류가 발생했습니다.");
      }
      else{
          console.log("로그인되어 있는 상태입니다.");
          onLoginState({id: message.Id, password:message.Password});
      }
      }
    });
  }

  React.useEffect(() => {
    didLogin();
  }, []);

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
        else if (message.flag==="Email Exist"){
          alert('이미 존재하는 이메일입니다.');
        }
        else{
          alert('이미 존재하는 ID입니다.')
        }
      }
    });
  }

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
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
      {/* <TopBar>
        <LogoContainer>
        </LogoContainer>
        Webtorage
      </TopBar> */}
      {/* <TotalWrap>
        <Form> */}
          {/* <Form.Group controlId="joinForm">
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
          </Form.Group> */}

          {/* <Form.Group controlId="loginForm">
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
          </Form.Group> */}
        {/* </Form>
      </TotalWrap> */}
      <GlobalStyle />
            <SignupBlock>
                <SignupHeader>
                    <h1>WEBtorage</h1>
                    <h2>Login</h2>
                </SignupHeader>
                <SignupBody>
                    <h2>ID</h2>
                    <SignupInput name="id" onChange={onChange} value={input.id} placeholder="아이디를 입력해주세요" onKeyPress={onInput} />
                    <h2>Password</h2>
                    <SignupInput name="password" onChange={onChange} value={input.password} type="password" placeholder="비밀번호를 입력해주세요" onKeyPress={onInput} />
                    <SignupButton onClick={onClick}>
                        로그인
                    </SignupButton>
                </SignupBody>
            </SignupBlock>
    </>
  );
}


export default LoginPage;