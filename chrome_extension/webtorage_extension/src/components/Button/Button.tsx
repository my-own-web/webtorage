import * as React from "react";
import "../Button.css";

type props = {
    children: string;
    onClick: () => void;
}
function Button ({children, onClick} : props){

    //const [category, setCategory] = React.useState('');
    //input 창 구현.. category하는 거 간단한 거는 input.tsx에서 구현.

    /*const onClick = () =>{
        chrome.runtime.sendMessage("Hello form the popup!");
    };*/

    return (
        <div className="buttonContainer">
            <button className="saveButton" onClick={onClick}>
                {children}
            </button>
        </div>
    );
};

export default Button;