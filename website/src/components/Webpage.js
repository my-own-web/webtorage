import React, {useState} from 'react';
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
    const [boxSize, setBoxSize] = useState(1);

    function onClick() {
        setBoxSize(1 - boxSize);
        console.log('changesize!'); //dbg
    }

    return (
        <>
            <WebHeader />
            <WebTemplateBlock>
                <WebSidebar />
                <WebBodyTemplate>
                    <WebSubHeader boxSize={boxSize} onClick={onClick} />
                    <Boxes boxSize={boxSize} />
                </WebBodyTemplate>
            </WebTemplateBlock>
        </>
    );
}

export default Webpage;