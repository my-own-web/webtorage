import * as React from "react";
import logo from "./logo.svg";
import "../App.css";
import { Form, Button } from 'react-bootstrap';
import styled from 'styled-components';

// import Button from "../components/Button/Button";
import { TodoApi } from '../utils/axios';
import {MessageType} from '../types';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../modules/login';
import { RootState } from "../modules";

const MainDiv = styled.div`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d5e8f8;

  & .btn{
      background-color: #e9f3fb;
      border: none;
      margin-left: 100px;
      margin-top: 15px;
      margin-bottom: 20px;
      cursor: pointer;
      &:hover{
        background-color: #ddeaf5;
      }
  }
  & .logoutbtn{
      background-color: #e9f3fb;
      border: none;
      margin-left: 5px;
      margin-right: 5px;
      margin-top: 5px;
      margin-bottom: 5px;
      cursor: pointer;
      &:hover{
        background-color: #ddeaf5;
      }
  }
`;
const InnerDiv = styled.div`
  margin-top: 20px;
`;

const MainPage = () => {

  const [category, setCategory] = React.useState("");
  const [memo, setMemo] = React.useState("");
  const [cglist, setCglist] = React.useState([]);
  const loginState = useSelector((state:RootState) => state.LoginState);

  const dispatch = useDispatch();
  const onLoginState = React.useCallback((profile : any) => dispatch(login(profile)), [dispatch]);

  console.log("id : ", loginState.profile.id, "password : ", loginState.profile.password);

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setCategory(value);
  }
  const memoChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setMemo(value);
  }
  const fetchcategory = async() =>{//DB에서 현재 저장되어 있는 카테고리 정보를 받는 초기화 함수
    try{
      const {data} = await TodoApi.post("/category", {type: "FETCH", clientId: loginState.profile.id});
      setCglist(data);
      }
    catch(e){
      console.error(e)
    }
  }
  
  React.useEffect(()=>{//마운트
    fetchcategory();

  },[]);

  const onClick = async() =>{//fetchvalid
    const categoryText = category;
    const memoText = memo;
    //클릭했을 때, SIGN_SAVE메시지를 background에 보내서 tab 정보를 받아와달라고 요청.
    chrome.runtime.sendMessage({type: "SIGN_SAVE", loginInfo : loginState, category: categoryText, memo: memoText});
    setCategory("");
    setMemo("");
    console.log('id : ', loginState.profile.id);
    //CHECKURL이라는 message 받는 함수 만들고, true, false받는 함수 만들어서 아래 완료 창 띄우기
    chrome.runtime.onMessage.addListener((message:MessageType) => {
      if(message.type === "CHECKURL"){
        if(message.flag===""){
          alert('저장이 완료되었습니다!');
        }
        else if (message.flag==="중복된 URL 입니다"){
          alert('이미 존재하는 url입니다!');
        }
        else if (message.flag === "로그인이 필요합니다."){
          alert('로그인 시간이 만료되었습니다! 다시 로그인을 해주세요.');
          onLoginState({id : "", password : ""});
        }
      }
    });
  };

  const onLogout = () =>{
    if(loginState.flag === true){
      chrome.runtime.sendMessage({type: "LOGOUT_SAVE"});
      onLoginState({id : "", password : ""});

      chrome.runtime.onMessage.addListener((message:MessageType) => {
        if(message.type === "CHECKLOGOUT"){
          if(message.flag==="Logout"){
            alert('로그아웃되었습니다!');
          }
          else{
            alert('로그아웃을 실패했습니다. 다시 시도해 주세요.');
          }
        }
      });
    }
  };

  const onInput = (e : React.KeyboardEvent<HTMLInputElement>) =>{//엔터키로도 입력 가능하도록
    if(e.key === 'Enter'){
        onClick();
    }
  };
  return (
    <MainDiv className="MainPage">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <InnerDiv>
          <h1>{loginState.profile.id}'s Webtorage</h1>

          <p>category</p>
          <input list = "cglist" name = "cgvalue" placeholder="your category" onChange={onChange} value = {category} onKeyPress={onInput} autoFocus/>
            <datalist id = "cglist">
              {cglist.map((cg:any) => (
                <option value = {cg.name}></option>
              ))}
            </datalist>
          <p>memo</p>
          
          <input name="memo" placeholder="memo" onChange={memoChange} value = {memo} onKeyPress={onInput} />
        </InnerDiv>
        <Button onClick={onClick} className = "btn"> SAVE </Button>
        <Button onClick={onLogout} className = "logoutbtn"> logout </Button>
    </MainDiv>
    )
};

export default MainPage;