import * as React from "react";
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from "../modules";
import {login} from '../modules/login';


function LoginPage() {

  const [id, setId] = React.useState('');

  const loginState = useSelector((state:RootState) => state.LoginState);
  const dispatch = useDispatch();
  const onLoginState = React.useCallback((id : string | undefined) => dispatch(login(id)), [dispatch]);

  const onClick = () => {
    if (loginState.flag == false){
      onLoginState(id);
      setId('');
    }
  };

  const onChange = (e : any) =>{
    setId(e.target.value);
  }
  return (
    <>
      <TopBar>
        <LogoContainer>
        </LogoContainer>
      </TopBar>
      <TotalWrap>
        <Form>
          <Form.Group controlId="joinForm">
            <div>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="id"
              maxLength={100}
              placeholder="Enter ID"
            />
            </div>
            <div>
            <Form.Label>name</Form.Label>
            <Form.Control
              type="text"
              maxLength={20}
              placeholder="name"
            />
            </div>
            <div>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              maxLength={64}
              placeholder="Password"
            />
            </div>
            <Button variant="primary" type="button" className="btn"> 회원가입</Button>
          </Form.Group>

          <Form.Group controlId="loginForm">
            <div>
            <Form.Label>ID</Form.Label>
            <Form.Control
              type="id"
              maxLength={100}
              placeholder="Enter ID"
              onChange={onChange}
              value = {id} 
            />
            </div>
            <div>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              maxLength={20}
              placeholder="Password"
            />
            </div>
            <Button variant="primary" type="button" className="btn" onClick={onClick}>로그인</Button>
          </Form.Group>
        </Form>
      </TotalWrap>
    </>
  );
}

const TotalWrap = styled.div`
  margin: 0;
  width: 300px;
  height: 500px;
  margin-left: 40%;
  margin-top: 100px;

  & .btn{
      background-color: slateblue;
      border: none;
      margin-left: 100px;
      margin-top: 15px;
      margin-bottom: 20px;
      cursor: pointer;
  }

`;

const TopBar = styled.div`
  display: flex;
  height: 9vh;
  background-color: rgb(189 167 232);;
`;

const LogoContainer = styled.div`
  width: 300px;
  height: 10vh;
//   background-color: green;
  margin-top: .5rem;
  & .logo {
      color: blue;
  }
`;

export default LoginPage;