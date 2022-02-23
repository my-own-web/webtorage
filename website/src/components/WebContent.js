import React from 'react'
import styled from 'styled-components'
import { useTestContent } from './InfoContext';

const WebContentBlock = styled.div`
    // width: auto; //100%; // 512px;
    // height: auto; // 내용에 맞는 크기
    // min-height:600px; // 최소 크기

    position: relative; //sticky; 
    // top: 70px;
    // left: 210px;

    background: pink; //white;
    // padding: 5px;
    border: solid gray 1px; // dbg
`

function WebContent() {
    const TestContent = useTestContent();

    return(
    <WebContentBlock>
        {
            TestContent.map((el) => {
                return (
                    <div className="content">{el}</div>
                );
            })
        }
    </WebContentBlock>
    );
}

export default WebContent;