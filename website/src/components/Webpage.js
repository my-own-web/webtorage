import React from 'react';
import styled from 'styled-components';
import WebHeader from './WebHeader';
import WebSidebar from './WebSidebar';
import WebSubHeader from './WebSubHeader';
import Boxes from './content/Boxes';

const WebTemplateBlock = styled.div`
    // background: gray;
    // min-height: 100%;
    display: grid;
    grid-template-columns: 200px auto;
    gap: 20px;
`

const WebBodyTemplate = styled.div`
    // 사용 안 하는 중
    position: relative;  
    margin-right: 20px;
    // background: pink; //white;
    // border: solid gray 1px; // dbg
`

function Webpage() {
    return (
        <>
            <WebHeader />
            <WebTemplateBlock>
                <WebSidebar />
                <WebBodyTemplate>
                    <WebSubHeader />
                    <Boxes />
                </WebBodyTemplate>
            </WebTemplateBlock>
        </>
    );
}

export default Webpage;