import React, { useEffect, useState, useRef } from "react";
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
        text: center;
        margin-top: 1px;
        cursor: pointer;
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
    // input에 focus in(onFocus) 하면 show=true
    // focus out(onBlur) 하면, 검색창에 아무것도 없을 때 show=false

    const inputRef = useRef(); // 리셋 버튼 누를 때 검색창에 focus 하기 위함

    // 입력값이 변할 때마다 검색함
    const onChange = (e) => {
        setInput(e.target.value);

        //검색 기능
        searchList(e.target.value);
    };

    const onClick = () => {
        setInput('');
        searchList('');
        setShow(false);
        inputRef.current.focus();
    }

    return (
        <CategorySearchBox onFocus={()=>{setShow(true)}} onBlur={()=>{
            if(!input) setShow(false);
            // 조건 없으면 버튼 먼저 사라져서 리셋 안 됨.
        }} show={show}>
            <SearchInput placeholder='Search Category' value={input} onChange={onChange} ref={inputRef}/>
            <MdClear className="clear-icon" onClick={onClick}/>
        </CategorySearchBox>
    );
}

export default CategorySearch;