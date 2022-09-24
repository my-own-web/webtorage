import * as React from "react";
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from "../modules";
import {login} from '../modules/login';

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

  const loginState = useSelector((state:RootState) => state.LoginState);
  const dispatch = useDispatch();
  const onLoginState = React.useCallback((profile : any) => dispatch(login(profile)), [dispatch]);

  const onClick = () => {
    if (loginState.flag == false){
      
      onLoginState(input);
      setInput({id : "", password : ""});
    }
  };

  const onChange = (e : any) =>{
    const {value, name} = e.target;
    setInput({...input, [name]: value});
    // setId(e.target.value);
  }
  const onInput = (e : React.KeyboardEvent<HTMLInputElement>) =>{//엔터키로도 입력 가능하도록
    if(e.key == 'Enter'){
        onClick();
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
              type="id"
              maxLength={100}
              placeholder="Enter Email address"
            />
            </Inputdiv>
            <Inputdiv>
            <Form.Label className="labeltag">ID</Form.Label>
            <Form.Control
              className="inputtag"
              type="text"
              maxLength={20}
              placeholder="name"
            />
            </Inputdiv>
            <Inputdiv>
            <Form.Label className="labeltag">Password</Form.Label>
            <Form.Control
              className="inputtag"
              type="password"
              maxLength={64}
              placeholder="Password"
            />
            </Inputdiv>
            <Button variant="primary" type="button" className="btn"> 회원가입</Button>
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
              maxLength={20}
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