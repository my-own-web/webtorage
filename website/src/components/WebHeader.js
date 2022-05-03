import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const WebHeadBlock = styled.div`
    // width: 100%; // chk: 패이지 넘어감
    height: 50px;

    position: sticky; 
    top: 0px;
    z-index:1;

    background: white;
    padding: 5px;
    // border: solid black 1px; // dbg

    display: flex;

    .logo{
        height: 30px;
        margin: 10px 10px 10px 10px;
    }

    h1 {
        margin: 5px 0 5px 0;
        cursor: pointer;

        // 제목 가운데 정렬
        flex-basis: 100%;
        text-align: center;
        // ---
    }
`

function WebHeader() {

    const navigate = useNavigate();

    const onClick = () => {
        navigate('/');
    }

    return (
        <WebHeadBlock>
            <img className="logo" src="img/smiley.jpg" />
            <h1 onClick={onClick}>Webtorage</h1>
        </WebHeadBlock>
    );
}

export default WebHeader;