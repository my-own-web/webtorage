const SIGNUP = 'loginState/SIGNUP_STATE';

export const signup = (emailprofile : any) => ({
    type : SIGNUP,
    payload : emailprofile
});

type signupAction = | ReturnType<typeof signup>;

export type signupState = {
    emailprofile : {
        email : string | undefined,
        id : string | undefined,
        password : string | undefined
    }
};

const initialState : signupState = {
    emailprofile : {
        email : "",
        id : "",
        password : ""
    }
};

function SignupState(state : signupState = initialState,
    action : signupAction) : signupState {
        switch(action.type){
            case SIGNUP:
                return {...state, emailprofile : action.payload}
            default:
                return state;
        }
}

export default SignupState;