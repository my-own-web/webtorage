import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from 'react-router-dom';
import styled, { createGlobalStyle } from "styled-components";
import { darken, lighten } from 'polished';
import { TodoApi } from '../utils/axios';
import WebHeader from './WebHeader';

const LoginBlock = styled.div`
  width: 500px;
  background: white;
  border-radius: 12px; /*둥그란 정도*/
  margin: 60px auto; /* 페이지 중앙에 나타나도록 설정 */
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

const LoginHeader = styled.div`
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

const LoginBody = styled.div`
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

const LoginInput = styled.input`
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

const LoginButton = styled.button`
  box-sizing: border-box;
  width: 90%;
  height: 50px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background: whitesmoke;
  font-weight: bold;
  cursor: pointer;
  margin: 20px 0px 20px 0px;


  &:hover {
    background: ${darken(0.05, "whitesmoke")};
  }
`;

function ChangePassword(){
    const navigate = useNavigate();

    const [inputs, setInputs] = useState({
        newPassword: "",
        checkPassword:""
    });

    const { newPassword, checkPassword } = inputs;

    const onChange = (e) => {
        setInputs({
        ...inputs,
        [e.target.name]: e.target.value
        });
    }

    const onSubmit = () =>{
        changeUserInfo();
    };

    async function changeUserInfo(inputs){
        if (newPassword === '' || checkPassword === ''){
            alert("비밀번호와 비밀번호 확인 칸을 모두 입력해주세요.");
            return;
        }
        else if (newPassword !== checkPassword){
            alert("비밀번호와 새 비밀번호가 일치하지 않습니다. 다시 확인해주세요.");
            return;
        }
        try {
            const res = await TodoApi.post("/user/changePassword", {newpassword: newPassword}, { withCredentials: true });
            if (res.data==="Password Changed"){
                alert("비밀번호가 변경되었습니다!");
                navigate('/');
            }
            else if (res.data==="로그인 후 해당 기능을 이용해주시기 바랍니다."){
                alert("로그인 후 해당 기능을 이용해주시기 바랍니다.");
                navigate('/login');
            }
          } catch (err) {
            console.log(err);
            alert("오류가 발생했습니다. 다시 시도해 주세요.");
          } finally {
            setInputs({
              newPassword: "",
              checkPassword: ""
            });
        }
    }

    const onKeyPress = (e) => {
        if (e.key === 'Enter')
          onSubmit();
    };

    return (
        <div>
          <GlobalStyle />
          <WebHeader />
          <LoginBlock>
            <LoginHeader>
              <h1>Password Change</h1>
            </LoginHeader>
            <LoginBody>
              <h2>New Password</h2>
              <LoginInput name="newPassword" onChange={onChange} value={newPassword} type="password" placeholder="새 비밀번호를 입력해주세요" onKeyPress={onKeyPress} />
              <h2>Confirm Password</h2>
              <LoginInput name="checkPassword" onChange={onChange} value={checkPassword} type="password" placeholder="비밀번호를 다시 한 번 입력해주세요" onKeyPress={onKeyPress} />
              <LoginButton onClick={onSubmit}>
                확인
              </LoginButton>
            </LoginBody>
          </LoginBlock>
        </div>
    );
}        

export default ChangePassword;