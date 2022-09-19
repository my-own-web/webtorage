import * as React from "react";
import "./App.css";
import Button from "./components/Button/Button";
import { TodoApi } from './utils/axios';
import {MessageType} from './types';

import MainPage from "./pages/mainPage";
import LoginPage from "./pages/popupSignup";
import { useEffect, useState } from "react";

import {useSelector, useDispatch} from 'react-redux';
import { RootState } from "./modules";

enum View{
  Loading,
  Login,
  Main,
  Error
}

const App = () => {

  const [view, setView] = useState<View>(View.Login);
  const loginState = useSelector((state:RootState) => state.LoginState)

  useEffect(()=>{
    if(loginState.flag){
        setView(View.Main);
    }
    else{
      setView(View.Login)
    }
  }, [loginState.flag])

  const renderView = () =>{
    // console.log('view : ', view)
    switch(view){
      case View.Login:
        return <LoginPage />
      case View.Main:
        return <MainPage />
      default:
        return <LoginPage />
    }
  }
  // console.log(view);
  return (
    <div className="app">
      {renderView()}
    </div>
    );
};

export default App;
