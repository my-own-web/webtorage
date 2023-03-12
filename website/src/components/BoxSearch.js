import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useBoxSearchManager, useSearchCategoryList } from "./InfoContext";
import { MdClear } from 'react-icons/md';
const SearchBox = styled.div`
    min-width: 158px;
    margin: 5px 10px;
    width: 100%;
    position: relative;

    display: flex;
    gap: 5px;
    
    .clear-icon{
        position: absolute;
        right: 5px;
        visibility: ${props => props.show ? 'visible' : 'hidden'};
        text: center;
        // margin-top: 1px;
        cursor: pointer;
        font-size: 30px; //20px;
        height: 100%;
        color: ${props => props.isSearch? "black" : "#dee2e6"};

        &:hover{
            color: red;
        }
    }
`

const SearchInput = styled.input`
    padding: 12px 35px 12px 12px;
    border-radius: 4px;
    width: 100%;
    outline: none;
    font-size: 18px;
    box-sizing: border-box;

    border: ${props => props.isSearch ? "2px solid black;" : "1px solid #dee2e6;"}
`

function BoxSearch() {
    const [input, setInput] = useState('');
    const [show, setShow] = useState(false); // MdClear icon 보일 여부
    // input에 focus in(onFocus) 하면 show=true
    // focus out(onBlur) 하면, 검색창에 아무것도 없을 때 show=false

    const inputRef = useRef(); // 리셋 버튼 누를 때 검색창에 focus 하기 위함

    const boxSearchManager = useBoxSearchManager();
    const isSearch = boxSearchManager("ISSEARCH");

    const onChange = (e) => {
        setInput(e.target.value);
    };

    const onClick = () => {
        setInput('');
        setShow(false);
        // inputRef.current.focus();
        boxSearchManager("SETSEARCH", false);
    }

    // 엔터키 치면 검색함
    const onKeyPress = e => {
        if (e.key == "Enter") {
            if (input) {
                boxSearchManager("SETSEARCH", true);
                boxSearchManager("SETWORD", input);
            }
            else {
                boxSearchManager("SETSEARCH", false);
            }
            inputRef.current.blur();
        }
    }

    return (
        <SearchBox onFocus={() => { setShow(true) }} onBlur={() => {
            if (!input) setShow(false);
            // 조건 없으면 버튼 먼저 사라져서 리셋 안 됨.
        }} show={show} isSearch={isSearch}>
            <SearchInput placeholder='Search Tabs' value={input} onChange={onChange} ref={inputRef} onKeyPress={onKeyPress} isSearch={isSearch} />
            <MdClear className="clear-icon" onClick={onClick} />
        </SearchBox>
    );
}

export default BoxSearch;