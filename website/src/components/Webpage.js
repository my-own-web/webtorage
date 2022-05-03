import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    const [didLogin, setDidLogin] = useState(0);
    const navigate = useNavigate();

    function onClick() {
        setBoxSize(1 - boxSize);
        console.log('changesize!'); //dbg
    }

    function onLogin() {
        if (didLogin === 0)
            navigate('/login');
        //setDidLogin(1 - didLogin);
    }

    return (
        <>
            <WebHeader />
            <WebTemplateBlock>
                <WebSidebar />
                <WebBodyTemplate>
                    <WebSubHeader boxSize={boxSize} onClick={onClick} didLogin={didLogin} onLogin={onLogin} />
                    <Boxes boxSize={boxSize} />
                </WebBodyTemplate>
            </WebTemplateBlock>
        </>
    );
}

export default Webpage;