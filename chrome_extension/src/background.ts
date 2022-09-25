// This file is ran as a background script
import * as React from "react";
import { MessageType } from './types';
import { TodoApi } from './utils/axios';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "./modules";
import { loginState } from "./modules/login";


console.log("Hello from background script!")

let category = '';
let data_url = '';
let title = '';
let description = '';
let image = '';
let memo = '';

let loginInfo: loginState = {
    flag: false,
    id: ""
};

const DBconn = async (params: MessageType) => {//tab 정보를 DB에 저장하는 함수
    console.log("DBconn : ", params);

    if (params.type === "DBINFO") {
        try {
            const res = await TodoApi.post('/tabinfo', params);
            chrome.runtime.sendMessage({ type: "CHECKURL", flag: res.data });
            if (res.data.success) {
                console.log("DB 저장 성공!");//여기를 chrome.runtime.sendmessage(type을 하나 더 만들어서)로 팝업창에 메시지 띄우기
            }
            else {
                console.log("DB 저장 실패..");
            }
        }
        catch (err) {
            console.error(err);
        }
    }
}

chrome.runtime.onMessage.addListener((message: MessageType) => {

    //두 가지 응답을 받음. 처음엔 팝업창에서 버튼 눌리면 카테고리 저장,
    //두 번째는 content.js에서 탭 정보 불러오는것 -> 이 과정은 먼저 요청을 날리고 받는 것
    switch (message.type) {
        case "SIGN_SAVE":
            //category 정보를 저장하는 코드
            //저장하고 다른 탭 정보가 필요하니 content에 쿼리를 날림.
            loginInfo = message.loginInfo;
            category = message.category;
            memo = message.memo;
            console.log(category, message.category);
            const tabmessage = { type: "REQ_TAB" };
            //content로 쿼리를 날리는 함수. REQ_TAB으로
            chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
                if (tabs[0].id) {
                    console.log("tab id : ", tabs[0].id);
                    chrome.tabs.sendMessage(tabs[0].id, tabmessage);
                }
            });
            break;

        case "RES_TAB":
            //content에서 tab 정보를 받는 곳.
            console.log('step RES_TAB');
            // const loginState = useSelector((state:RootState) => state.LoginState);

            data_url = message.data_url;
            title = message.title;
            description = message.description;
            image = message.image;
            let today = new Date();
            let year = today.getFullYear();
            let month = ('0' + (today.getMonth() + 1)).slice(-2);
            let day = ('0' + today.getDate()).slice(-2);
            const dateString = year + month + day;
            //console.log("check : ", message.title, message. description); 디버그용
            console.log("completed?: ", loginInfo, category, data_url, title, description, image);

            //message.url, title, description 등 tab정보를 DB로 날리는 곳
            DBconn({ type: 'DBINFO', clientId: loginInfo.id, category: category, data_url: data_url, title: title, description: description, image: image, date: dateString, memo: memo })
            break;

        default:
            break;

    }
})

/*
  DB
*/