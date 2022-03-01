interface SaveResponse {//popup에서 저장 버튼을 누르는 것을 보내주는 신호
    type: "SIGN_SAVE";
    category : string;
}

interface TabRequest {
    type: "REQ_TAB";
}

interface TabResponse {
    type: "RES_TAB";
    data_url: string;
    title: string;
    description: string;
    image: string;
}

export type MessageType = SaveResponse | TabRequest | TabResponse;