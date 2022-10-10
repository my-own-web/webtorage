import { combineReducers } from "redux";
import LoginState from "./login";
import SignupState from "./signup";

const rootReducer = combineReducers({
    LoginState,
    SignupState
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;