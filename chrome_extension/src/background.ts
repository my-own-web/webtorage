// This file is ran as a background script
import * as React from "react";
import {MessageType} from './types';
import { TodoApi } from './utils/axios';
import {useSelector, useDispatch} from 'react-redux';
import { RootState } from "./modules";
import {loginState} from "./modules/login";
import {signupState} from "./modules/signup";


console.log("Hello from background script!")

let category = '';
let data_url = '';
// let title = '';
let description = '';
let image = '';
let memo = '';

let signupInfo : signupState = {
    emailprofile : {
        email : "",
        id : "",
        password : ""
    }
};

let loginInfo : loginState = {
    flag : false,
    profile : {
        id : "",
        password : ""
    }
};

const DBconn =async (params: MessageType) => {//tab 정보를 DB에 저장하는 함수
    console.log("DBconn : ", params);

    if(params.type === "DBINFO"){
        console.log("DBconn 시작")
        try{
            console.log("DB로 보내기 전..")
            const res = await TodoApi.post('/tabinfo', params);
            console.log('res : ', res);

            chrome.runtime.sendMessage({type: "CHECKURL", flag : res.data});

            if(res.data=== "newtab"){
                console.log("DB 저장 성공!");//여기를 chrome.runtime.sendmessage(type을 하나 더 만들어서)로 팝업창에 메시지 띄우기
            }
            else if (res.data === "fail"){
                console.log("DB 저장 실패..");
            }
            else if (res.data === "로그인 시간 만료"){
                console.log("로그인 시간이 만료되었습니다.");
            }
        }
        catch(err){
            console.error(err);
        }
    }

    else if (params.type === "SIGNUPINFO"){ ///
        try{
            const res = await TodoApi.post('/user/signup', params);

            chrome.runtime.sendMessage({type: "CHECKSIGNUP", flag : res.data});

            if (res.data === "New User"){
                console.log("회원가입되었습니다!");
            }
            else if (res.data === "Aleady Exist"){
                console.log("이미 존재하는 계정입니다.");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    else if (params.type === "LOGINFO"){ ///
        try{
            const res = await TodoApi.post('/user/login', params, { withCredentials: true }); /////////////////////////////////

            chrome.runtime.sendMessage({type: "CHECKLOGIN", flag : res.data});

            if (res.data === "OK"){
                console.log("로그인되었습니다!");
            }
            else if (res.data === "Invalid User"){
                console.log("존재하지 않는 계정입니다.");
            }
        }
        catch(err){
            console.log(err);
        }
    }

    else if (params.type === "LOGOUTINFO"){
        try{
            const res = await TodoApi.post('/user/logout', params, { withCredentials: true }); /////////////////////////////////

            chrome.runtime.sendMessage({type: "CHECKLOGOUT", flag : res.data});

            if (res.data === "Logout"){
                console.log("로그아웃되었습니다!");
            }
            else{
                console.log("로그아웃 과정에 오류가 발생했습니다. 다시 시도해 주세요.")
            }
        }
        catch(err){
            console.log(err);
        }
    }
}

chrome.runtime.onMessage.addListener((message: MessageType) =>{

    //두 가지 응답을 받음. 처음엔 팝업창에서 버튼 눌리면 카테고리 저장,
    //두 번째는 content.js에서 탭 정보 불러오는것 -> 이 과정은 먼저 요청을 날리고 받는 것
    switch(message.type){
        case "SIGN_SAVE":
            //category 정보를 저장하는 코드
            //저장하고 다른 탭 정보가 필요하니 content에 쿼리를 날림.
            loginInfo = message.loginInfo;
            category = message.category;
            memo = message.memo;
            console.log(category, message.category);
            const tabmessage = {type: "REQ_TAB"};
            //content로 쿼리를 날리는 함수. REQ_TAB으로
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                if(tabs[0].id){
                    console.log("tab id : ", tabs[0].id);
                    chrome.tabs.sendMessage(tabs[0].id, tabmessage);
                }
            });
            break;

        case "RES_TAB": 
            //content에서 tab 정보를 받는 곳.
            console.log('step RES_TAB');
            // const loginState = useSelector((state:RootState) => state.LoginState);

            // data_url = message.data_url;
            let title = message.title;
            description = message.description;
            image = message.image;
            chrome.tabs.query({currentWindow: true, active : true}, function(tabs){
                console.log(tabs[0].url);
                if(tabs[0].url){
                    data_url = tabs[0].url;
                }
            })
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);
            const dateString = year + month + day;
            //console.log("check : ", message.title, message. description); 디버그용
            console.log("completed?: ",loginInfo, category, data_url, title, description, image);

            //message.url, title, description 등 tab정보를 DB로 날리는 곳
            DBconn({type: 'DBINFO', clientId : loginInfo.profile.id ,category: category, data_url:data_url ,title: title, description:description, image:image, date:dateString, memo:memo})
            break;

        case "LOGIN_SAVE":
            loginInfo.profile.id = message.Id;
            loginInfo.profile.password = message.Password;
            DBconn({type: 'LOGINFO', Id : loginInfo.profile.id , Password : loginInfo.profile.password})
            break;
        
        case "SIGNUP_SAVE":
            signupInfo.emailprofile.email = message.Email;
            signupInfo.emailprofile.id = message.Id;
            signupInfo.emailprofile.password = message.Password;
            DBconn({type: 'SIGNUPINFO', Email : signupInfo.emailprofile.email, Id : signupInfo.emailprofile.id , Password : signupInfo.emailprofile.password})

        case "LOGOUT_SAVE":
            DBconn({type: 'LOGOUTINFO'});

        default:
            break;
        
    }
})

/*
  DB
*/