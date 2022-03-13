import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Button/Button";
import axios from 'axios';
import {MessageType} from './types';

const App = () => {

  const [category, setCategory] = React.useState("");
  const [cglist, setCglist] = React.useState([]);

  const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    setCategory(value);
  }
  const fetchcategory = async() =>{
    try{
      //setCglist([]);
      const {data} = await axios.get('http://localhost:3001/tabinfo');
      console.log(data);
      //const templist = data.map(cg => cg.category);
      setCglist(data);
      data.map((cg: any)=>(console.log(cg.category)));
    }
    catch(e){
      console.error(e)
    }
  }
  
  React.useEffect(()=>{
    fetchcategory();
  },[]);

  const onClick = async() =>{//fetchvalid
    const categoryText = category;
    chrome.runtime.sendMessage({type: "SIGN_SAVE", category: categoryText});
    setCategory("");
    //message 받는 함수 만들고, true, false받는 함수 만들어서 아래 완료 창 띄우기
    chrome.runtime.onMessage.addListener((message:MessageType) => {
      if(message.type === "CHECKURL"){
        if(message.flag){
          alert('저장이 완료되었습니다!');
        }
        else{
          alert('이미 존재하는 tab입니다!');
        }
      }
    });

  };
  const onInput = (e : React.KeyboardEvent<HTMLInputElement>) =>{
    if(e.key == 'Enter'){
        onClick();
    }
  };
  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <h1>Webtorage!</h1>
        <input list = "cglist" name = "cgvalue" placeholder="Click to check your category" onChange={onChange} value = {category} onKeyPress={onInput} width = "60px" autoFocus/>
          <datalist id = "cglist">
            {cglist.map((cg:any) => (
              <option value = {cg.category}></option>
            ))}
          </datalist>
        </div>
        <Button onClick={onClick}> SAVE </Button>
    </div>
    )
};

export default App;
