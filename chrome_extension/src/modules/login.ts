const LOGIN = 'loginState/LOGIN_STATE';

export const login = (id : string | undefined) => ({
    type : LOGIN,
    payload : id
});

type loginAction = | ReturnType<typeof login>;

export type loginState = {
    flag : boolean,
    id : string | undefined
};

const initialState : loginState = {
    flag : false,
    id : ""
};

function LoginState(state : loginState = initialState,
    action : loginAction) : loginState {
        switch(action.type){
            case LOGIN:
                return {...state, flag : !state.flag, id : action.payload}
            default:
                return state;
        }
}

export default LoginState;