import React from 'react';
import styled from 'styled-components';
import WebHeader from './WebHeader';
import WebSidebar from './WebSidebar';

const WebTemplateBlock = styled.div`
    // background: gray;
    height: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr//150px auto;
    padding: 0 10px 0 10px;
`
const WebContentBlock = styled.div`
    width: 512px;
    height: auto; // 내용에 맞는 크기
    min-height:600px; // 최소 크기

    position: relative; 
    background: white;
    // padding: 5px;
    border: solid gray 1px; // dbg
`

function Webpage() {
    return (
        <>
        <WebHeader />
        <WebSidebar />
        {/* <WebTemplateBlock>
            <WebSidebar />
            <WebContentBlock />
        </WebTemplateBlock> */}
        </>
    );
}

export default Webpage;