import React, { useEffect, useState, useRef } from "react";
import styled from "styled-components";
import { useBoxSearchManager, useSearchCategoryList } from "./InfoContext";
import { MdClear } from 'react-icons/md';
const SearchBox = styled.div`
    margin: 0 5px 0 0;
    // background: grey; // dbg

    display: flex;
    gap: 5px;

    .clear-icon{
        visibility: ${props => props.show ? 'visible' : 'hidden'};
        text: center;
        margin-top: 1px;
        cursor: pointer;
        font-size: 20px;
    }
`

const SearchInput = styled.input`
    width: 120px;
    border: 1px solid ${props => props.isSearch ? "#ff6b6b" : "black"}
`

function BoxSearch() {
    const [input, setInput] = useState('');
    const [show, setShow] = useState(false); // MdClear icon 보일 여부
    // input에 focus in(onFocus) 하면 show=true
    // focus out(onBlur) 하면, 검색창에 아무것도 없을 때 show=false

    const inputRef = useRef(); // 리셋 버튼 누를 때 검색창에 focus 하기 위함

    const boxSearchManager = useBoxSearchManager();
    const isSearch = boxSearchManager("ISSEARCH");

    // 입력값이 변할 때마다 검색함
    const onChange = (e) => {
        setInput(e.target.value);
    };

    const onClick = () => {
        setInput('');
        setShow(false);
        // inputRef.current.focus();
        boxSearchManager("SETSEARCH", false);
    }

    const onKeyPress = e => {
        if (e.key == "Enter") {
            boxSearchManager("SETSEARCH", true);
            boxSearchManager("SETWORD", input);
            inputRef.current.blur();
        }
    }

    return (
        <SearchBox onFocus={() => { setShow(true) }} onBlur={() => {
            if (!input) setShow(false);
            // 조건 없으면 버튼 먼저 사라져서 리셋 안 됨.
        }} show={show}>
            <SearchInput placeholder='Search Tabs' value={input} onChange={onChange} ref={inputRef} onKeyPress={onKeyPress} isSearch={isSearch} />
            <MdClear className="clear-icon" onClick={onClick} />
        </SearchBox>
    );
}

export default BoxSearch;