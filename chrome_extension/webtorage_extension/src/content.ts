// This file is injected as a content script
import {MessageType} from "./types";
/*
const header = document.createElement("h1");
header.innerHTML = "Webtorage!";

const body = document.getElementsByTagName("body");
body[0]?.prepend(header);

interface TabResponse {
    type: "RES_TAB";
    taburl?: string;
    title?: string;
    description?: string;

}

*/

chrome.runtime.onMessage.addListener((message:MessageType, sender) => {
    console.log("Hello from content script!");

    switch (message.type) {
        case "REQ_TAB":
            const body = document.getElementsByTagName("meta");
            let title = "";
            let data_url = "";
            let description = "";
            let image = "";
            console.log(body[0])
            for(const prop in body){
                console.log(prop);
                if(isNaN(Number(prop))){
                    console.log("break!");
                    break;
                }
                /*
                if(prop === "length"){
                    console.log("break!");
                    break;
                }
                */
                console.log(body[prop].getAttribute("property"), body[prop].content);
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
                
            }
            console.log("Responding...", title, data_url, description, sender.tab?.id);

            chrome.runtime.sendMessage({type: "RES_TAB", data_url: data_url, title: title, description: description, image: image});
            break;
        default:
            break;
        
    }
})