import * as React from "react";
import logo from "./logo.svg";
import "../App.css";
import { Form, Button } from 'react-bootstrap';
import styled, { createGlobalStyle } from 'styled-components';

// import Button from "../components/Button/Button";
import { TodoApi } from '../utils/axios';
import {MessageType} from '../types';
import {useSelector, useDispatch} from 'react-redux';
import {login} from '../modules/login';
import { RootState } from "../modules";
import { darken, lighten } from 'polished';

const GlobalStyle = createGlobalStyle`
  body {
    // background: #DEF1F7;
    // background: #e9ecef;
    background: white;
    // background: whitesmoke;
  }
`;
const MainpageHeader = styled.div`
  padding: 30px 20px 40px 20px;
  padding: 20px 20px;
  border-bottom: 1px solid #e9ecef;
  h1 {
    margin: 0;
    font-size: 40px;
    text-align: center;
    color: #343a40;
  }
  h2 {
    margin: 0;
    font-size: 25px;
    text-align: center;
    color: #343a40;
  }
`;

const MainpageBlock = styled.div`
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
const ButtonBlock = styled.div`
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
`;
const MainpageBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px 30px;
  border-radius: 0px 0px 12px 12px;
  h2 {
    // margin: 5px;
    margin: 0px 0px 0px 20px;
    align-self: baseline;
  }
`;

const MainpageInput = styled.input`
  box-sizing: border-box;
  border-radius: 8px;
  border: 1px solid #ada7ab;
  width: 90%;
//   transform: translate(2%);
  height: 35px;
  font-size: 15px;
  justify-content: center;
//   margin: 10px 15px;
  margin: 5px 0px 10px 0px;
  padding-left: 10px;
`;

const MainpageButton = styled.button`
  box-sizing: border-box;
//   width: 82%;
  width: 30%;
  height: 20px;
//   transform: translate(10%);
  font-size: 10px;
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
    //margin: 10px auto;
    //margin: 20px 0px 20px 0px;

  &.savebtn{
    width: 30%;
    height: 25px;
    margin: 5px auto;
  }
  &.logoutbtn{
    width: 20%;
    height: 15px;
    margin: 10px 0px 10px 10px;
  }

  &:hover {
    // background: ${darken(0.05, '#e2e2e2')};
    // background: whitesmoke;
    background: ${lighten(0.2, "black")};
  }
`;

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
    <div className="MainPage"> {/*MainDiv*/}
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        {/* <InnerDiv>
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
        <Button onClick={onLogout} className = "logoutbtn"> logout </Button> */}
        <MainpageBlock>
          <MainpageHeader>
            <h2>{loginState.profile.id}'s WEBtorage</h2>
          </MainpageHeader>
          <MainpageBody>
          <h2>category</h2>
          <MainpageInput list = "cglist" name = "cgvalue" placeholder="your category" onChange={onChange} value = {category} onKeyPress={onInput} autoFocus/>
            <datalist id = "cglist">
              {cglist.map((cg:any) => (
                <option value = {cg.name}></option>
              ))}
            </datalist>
          <h2>memo</h2>
          
          <MainpageInput name="memo" placeholder="memo" onChange={memoChange} value = {memo} onKeyPress={onInput} />
          </MainpageBody>
        </MainpageBlock>
        <ButtonBlock>
          <MainpageButton onClick={onClick} className = "savebtn"> SAVE </MainpageButton>
          <MainpageButton onClick={onLogout} className = "logoutbtn"> logout </MainpageButton>
        </ButtonBlock>
    </div>
    )
};

export default MainPage;