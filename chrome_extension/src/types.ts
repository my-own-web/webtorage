import {loginState} from "./modules/login";


interface SaveResponse {//popup에서 저장 버튼을 누르는 것을 보내주는 신호
    type: "SIGN_SAVE";
    loginInfo : loginState;
    category : string;
    memo: string;
}

interface TabRequest {//background에서 content로 tab저장을 가져와줘
    type: "REQ_TAB";
}

interface TabResponse {//REQ_TAB메시지를 받은 content에서 tab정보를 받고 그 정보를 받았다고 background에 보내는 것
    type: "RES_TAB";
    data_url: string;
    title: string | null;
    description: string;
    image: string;
}

interface DBinfo{//DB에 저장해줘
    type: "DBINFO";
    clientId : string | undefined;
    category : string;
    data_url: string;
    title: string | null;
    description: string;
    image: string;
    date: string;
    memo: string;
}

interface SaveUser{ //로그인 페이지에서 로그인 버튼을 누르는 것을 보내주는 신호
    type: "LOGIN_SAVE";
    Id: string | undefined;
    Password: string | undefined;
}

interface OutUser{
    type: "LOGOUT_SAVE";
}

interface NewUser{ //회원가입 페이지에서 회원가입 버튼을 누르는 것을 보내주는 신호
    type: "SIGNUP_SAVE";
    Email: string | undefined;
    Id: string | undefined;
    Password: string | undefined;
}


interface LOGinfo{ ///
    type: "LOGINFO";
    Id: string | undefined;
    Password: string | undefined;
}

interface LOGOUTinfo{
    type: "LOGOUTINFO";
}

interface UserLogin {
    type:"DIDLOGIN_SAVE";
}

interface USERLOGINinfo{
    type:"USERINFO";
}

interface SIGNUPinfo{
    type: "SIGNUPINFO";
    Email: string | undefined;
    Id: string | undefined;
    Password: string | undefined;
}

interface CheckLogin{
    type: "CHECKLOGIN";
    flag: string;
}

interface CheckLogout{
    type: "CHECKLOGOUT";
    flag: string;
}

interface CheckSignup{
    type: "CHECKSIGNUP";
    flag: string;
}

interface CheckUrl{//이미 존재하는 url인지 판별하고 그 결과를 보내는 신호
    type: "CHECKURL";
    flag: string;
}

interface CheckUserinfo{
    type:"CHECKUSERINFO";
    flag: string;
    Id: string | undefined,
    Password: string | undefined;
}

export type MessageType = SaveResponse | TabRequest | TabResponse | DBinfo | SaveUser | OutUser | NewUser | LOGinfo | USERLOGINinfo | LOGOUTinfo | UserLogin | SIGNUPinfo | CheckLogin | CheckLogout | CheckSignup | CheckUrl | CheckUserinfo; ///