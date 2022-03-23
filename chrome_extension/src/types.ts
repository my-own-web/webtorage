interface SaveResponse {//popup에서 저장 버튼을 누르는 것을 보내주는 신호
    type: "SIGN_SAVE";
    category : string;
    memo: string;
}

interface TabRequest {//background에서 content로 tab저장을 가져와줘
    type: "REQ_TAB";
}

interface TabResponse {//REQ_TAB메시지를 받은 content에서 tab정보를 받고 그 정보를 받았다고 background에 보내는 것
    type: "RES_TAB";
    data_url: string;
    title: string;
    description: string;
    image: string;
}

interface DBinfo{//DB에 저장해줘
    type: "DBINFO";
    category : string;
    data_url: string;
    title: string;
    description: string;
    image: string;
    date: string;
    memo: string;
}

interface CheckUrl{//이미 존재하는 url인지 판별하고 그 결과를 보내는 신호
    type: "CHECKURL";
    flag: boolean;
}

export type MessageType = SaveResponse | TabRequest | TabResponse | DBinfo | CheckUrl;