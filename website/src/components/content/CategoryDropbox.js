import React, { useState } from 'react';
import {useCategoryList} from '../InfoContext';

function CategoryDropbox({category}){
    const cglist = useCategoryList();
    const [input, setInput] = useState(category);

    const onChange = (e) =>{
        setInput(e.target.value);
    }

    const onInput = (e) =>{//엔터키로도 입력 가능하도록
        if(e.key == 'Enter'){
            console.log(input);
        }
    };

    return (
        <>
        <input list="category-list" id="category-choice" name="category-choice" placeholder="Click to check your category" onChange={onChange} value = {input} onKeyPress={onInput} width = "60px" />

        <datalist id="category-list">
            {cglist.map((cg) => (
            <option value = {cg.name}></option>
            ))}
        </datalist>
        </>
    );
}

export default CategoryDropbox;