import * as React from "react";
import * as ReactDOM from "react-dom";

import App from "./App";
import "./popup.css";

import { Provider } from "react-redux";
import { legacy_createStore as createStore} from 'redux'
import rootReducer from "./modules";

const store = createStore(rootReducer);

var mountNode = document.getElementById("popup");


ReactDOM.render(
<Provider store={store}>
    <App />
</Provider>,
mountNode
);
