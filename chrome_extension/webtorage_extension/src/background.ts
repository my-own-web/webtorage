// This file is ran as a background script
import {MessageType} from './types';
//import {TodoAPI} from './utils/axios';
import axios from 'axios';

console.log("Hello from background script!")

let category = '';
let data_url = '';
let title = '';
let description = '';
let image = '';

const DBconn =async (params: MessageType) => {
    if(params.type === "DBINFO"){
        try{
            const res = await axios.post('http://localhost:3001/tabinfo', params);
            chrome.runtime.sendMessage({type: "CHECKURL", flag : res.data});
            if(res.data){
                console.log("DB 저장 성공!");//여기를 chrome.runtime.sendmessage(type을 하나 더 만들어서)로 팝업창에 메시지 띄우기
            }
            else{
                console.log("DB 저장 실패..");
            }
        }
        catch(err){
            console.error(err);
        }
    }
}

chrome.runtime.onMessage.addListener((message: MessageType) =>{
    //두 가지 응답을 받음. 처음엔 팝업창에서 버튼 눌리면 카테고리 저장,
    //두 번째는 content.js에서 탭 정보 불러오는것 -> 이 과정은 먼저 요청을 날리고 받는 것
        //-> 두 가지 시도 스위치문으로 두 응답을 분리
        //처음 팝업창에서 응답을 받고 요청 날리고 다른 스위치 문에서 응답 받기
        //두번째는 그냥 분리 안하고 한 스위치 문에서 처리.
    switch(message.type){
        case "SIGN_SAVE":
            //category 정보를 저장하는 코드
            //저장하고 다른 탭 정보가 필요하니 content에 쿼리를 날리는거지.
            category = message.category;
            console.log(category, message.category);
            const tabmessage = {type: "REQ_TAB"};
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                /*tabs.forEach((tab) =>{
                    if(tab.id){
                        chrome.tabs.sendMessage(tab.id, tabmessage);
                    }
                });*/
                if(tabs[0].id){
                    console.log("tab id : ", tabs[0].id);
                    chrome.tabs.sendMessage(tabs[0].id, tabmessage);
                }
            });
            break;

        case "RES_TAB": 
            data_url = message.data_url;
            title = message.title;
            description = message.description;
            image = message.image;
            //console.log("check : ", message.title, message. description);
            console.log("completed?: ",category, data_url, title, description, image);

            //message.url, title, description을 저장하는 코드 혹은 함수
            DBconn({type: 'DBINFO', category: category, data_url:data_url ,title: title, description:description, image:image})
            break;
        
        default:
            break;
        
    }
})

/*
  DB
*/