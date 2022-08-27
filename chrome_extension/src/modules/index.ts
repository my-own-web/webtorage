import { combineReducers } from "redux";
import LoginState from "./login";

const rootReducer = combineReducers({
    LoginState
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;