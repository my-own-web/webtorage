import React from 'react';
import styled from 'styled-components';

const WebHeadBlock = styled.div`
    width: 100%; // chk: 패이지 넘어감
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

        // 제목 가운데 정렬
        flex-basis: 100%;
        text-align: center;
        // ---
    }
`

function WebHeader(){
    return(
        <WebHeadBlock>
            <img className="logo" src="img/smiley.jpg" />
            <h1>Webtorage</h1>
        </WebHeadBlock>
    );
}

export default WebHeader;