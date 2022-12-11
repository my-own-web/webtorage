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
                return {...state, flag : !state.flag, profile : action.payload }
            default:
                return state;
        }
}

export default LoginState;