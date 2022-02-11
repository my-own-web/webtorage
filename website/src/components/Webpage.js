import React from 'react';
import styled from 'styled-components';

const WebTemplateBlock = styled.div`
    background: gray;
    display: grid;
    grid-template-columns: 100px auto;
    gap: 20px;
    padding: 10px;
`

const WebHeadBlock = styled.div`
    // width: 100%; // chk: 패이지 넘어감
    height: 50px;

    position: relative; 
    background: white;
    // padding: 5px;
    margin: 10px;
    border: solid black; // dbg
`

const WebSideBlock = styled.div`
    width: 100px; //512px;
    height: auto; // 내용에 맞는 크기
    min-height:600px; // 최소 크기

    position: relative; 
    background: white;
    // padding: 5px;
    border: solid black; // dbg
`

const WebContentBlock = styled.div`
    width: auto; //512px;
    height: auto; // 내용에 맞는 크기
    min-height:600px; // 최소 크기

    position: relative; 
    background: white;
    // padding: 5px;
    border: solid black; // dbg
`

// dbg: 카테고리 배열
var TestCategory = [];
// dbg: url 배열
var TestContent = [];

// dbg: 카테고리, url 내용 채우기
for(var i=1;i<=10;i++){
    TestContent.push(`content${i}`);
    TestCategory.push(`category${i}`);
}

function Webpage() {
    return (
        <>
        <WebHeadBlock>
            <h>Webtorage</h>
        </WebHeadBlock>
        <WebTemplateBlock>
        <WebSideBlock>
            {
            TestCategory.map((el)=>{
                return(
                <div>{el}</div>
                );
            })
            }
        </WebSideBlock>
        <WebContentBlock>
            {
                TestContent.map((el)=>{
                    return(
                        <div>{el}</div>
                    )
                })
            }
        </WebContentBlock>
        </WebTemplateBlock>
        </>
    );
}

export default Webpage;