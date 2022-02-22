import React from 'react'
import styled from 'styled-components'

const WebContentBlock = styled.div`
    width: 100%; // 512px;
    // height: auto; // 내용에 맞는 크기
    // min-height:600px; // 최소 크기

    position: relative; //sticky; 
    // top: 70px;
    // left: 210px;

    background: pink; //white;
    // padding: 5px;
    border: solid gray 1px; // dbg
`

let TestContent = [];
for (var i = 1; i <= 40; i++) {
    TestContent.push(`content${i}`);
}

function WebContent() {
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