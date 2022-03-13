import * as React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from "./components/Button/Button";

const App = () => {

  const [category, setCategory] = React.useState({cg: 'category', cgvalue: ''});
  const onChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const {value, name} = e.target;
    setCategory({...category, [name]: value});
  }

  const onClick = () =>{//fetchvalid
    const categoryText = category.cgvalue;
    chrome.runtime.sendMessage({type: "SIGN_SAVE", category: categoryText});
  };

  return (
    <div className="App">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <h1>Webtorage!</h1>
        <input name = "cgvalue" placeholder="category" onChange={onChange} value = {category.cgvalue} />
        </div>
        <Button onClick={onClick}> SAVE </Button>
    </div>
    )
};

export default App;
