import React, { useState } from "react";
import styled from "styled-components";
import { useSearchCategoryList } from "./InfoContext";
import { MdClear } from 'react-icons/md';
const CategorySearchBox = styled.div`
    margin: 0 5px 0 0;
    // background: grey; // dbg

    display: flex;
    gap: 5px;

    .clear-icon{
        visibility: ${props => props.show? 'visible' : 'hidden'};
        color: red;
        text: center;
        margin-top: 1px;
        cursor: pointer;
        // weight: bold;
        font-size: 20px;
    }
`

const SearchInput = styled.input`
    width: 120px;
`

function CategorySearch() {
    const [input, setInput] = useState('');
    const searchList = useSearchCategoryList();
    const [show, setShow] = useState(false); // MdClear icon 보일 여부
    // input에 focus in(onFocus) 하면 show=true, focus out(onBlur) 하면 show=false

    // 입력값이 변할 때마다 검색함
    const onChange = (e) => {
        setInput(e.target.value);

        //검색 기능
        searchList(e.target.value);
    };

    const onClick = () => {
        setInput('');
    }

    return (
        <CategorySearchBox show={show}>
            <SearchInput placeholder='Search Category' value={input} onChange={onChange} onFocus={()=>{setShow(true)}} onBlur={()=>{setShow(false)}}/>
            <MdClear className="clear-icon" onClick={onClick}/>
        </CategorySearchBox>
    );
}

export default CategorySearch;