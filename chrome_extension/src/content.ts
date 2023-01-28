// This file is injected as a content script
import {MessageType} from "./types";

chrome.runtime.onMessage.addListener((message:MessageType, sender) => {
    console.log("Hello from content script!");

    //메시지를 받을 때 REQ_TAB이라는 메시지를 받으면 tab 정보를 RES_TAB이라는 메시지와 함께
    //보내는 곳
    switch (message.type) {
        case "REQ_TAB":
            const body = document.getElementsByTagName("meta");
            const temp = document.getElementsByTagName("p");
            let title = "";
            let data_url = "";
            let description = "";
            let image = "";
            console.log(body[0], temp[0])

            for(const prop in body){
                console.log(prop);
                if(isNaN(Number(prop))){
                    console.log("break!");
                    break;
                }

                console.log(body[prop].getAttribute("property"), body[prop].getAttribute("name"), body[prop].content);
                if(body[prop].getAttribute("property") != null || body[prop].getAttribute("name") != null){
                    if(body[prop].getAttribute("property") != null){
                        const text = body[prop].getAttribute("property");
                        if(text){
                            if(text == "og:title"){
                                title = body[prop].content;
                            }
                            else if(text == "og:url"){
                                data_url = body[prop].content;
                            }
                            else if(text == "og:image"){
                                image = body[prop].content;
                            }
                            else if(text == "og:description"){
                                description = body[prop].content;
                            }
                        }
                    }
                    else if(body[prop].getAttribute("name") != null){
                        const text = body[prop].getAttribute("name");
                        if(text){
                            if(text == "twitter:title"){
                                title = body[prop].content;
                            }
                            else if(text == "twitter:url"){
                                data_url = body[prop].content;
                            }
                            else if(text == "twitter:image"){
                                image = body[prop].content;
                            }
                            else if(text == "twitter:description"){
                                description = body[prop].content;
                            }
                        }
                    }
                }
            }
            console.log("Responding...", title, data_url, description, image, sender.tab?.id);


            //api post tab info api 

            // if(title === "" && data_url === "" && description === "" && image === "" && document.getElementsByTagName("h1")[0] != null &&  temp[0] != null){
            //     title = document.getElementsByTagName("h1")[0].innerText;
            //     description = temp[0].innerText;
            // }
            // console.log("Responding...", title, data_url, description, sender.tab?.id);

            chrome.runtime.sendMessage({type: "RES_TAB", data_url: data_url, title: null, description: description, image: image});
            break;
        default:
            break;
        
    }
})