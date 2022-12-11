const LOGIN = 'loginState/LOGIN_STATE';

export const login = (profile : any) => ({
    type : LOGIN,
    payload : profile
});

type loginAction = | ReturnType<typeof login>;

export type loginState = {
    flag : boolean,
    profile : {
        id : string | undefined,
        password : string | undefined
    }
};

const initialState : loginState = {
    flag : false,
    profile : {
        id : "",
        password : ""
    }
};

function LoginState(state : loginState = initialState,
    action : loginAction) : loginState {
        switch(action.type){
            case LOGIN:
<<<<<<< HEAD
                return {...state, flag : !state.flag, profile : action.payload}
=======
                return {...state, flag : !state.flag, profile : action.payload }
>>>>>>> 88f8694 (chrome_Extension/회원가입/류그인/로그아웃)
            default:
                return state;
        }
}

export default LoginState;