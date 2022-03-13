import React from 'react';
import styled from 'styled-components';
import WebHeader from './WebHeader';
import WebSidebar from './WebSidebar';
import WebBody from './WebBody';

const WebTemplateBlock = styled.div`
    // background: gray;
    // min-height: 100%;
    display: grid;
    grid-template-columns: 200px auto;
    gap: 20px;
`

function Webpage() {
    return (
        <>
        <WebHeader/>
        <WebTemplateBlock>
            <WebSidebar />
            <WebBody />
        </WebTemplateBlock>
        </>
    );
}

export default Webpage;