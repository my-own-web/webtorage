import React from 'react';
import styled from 'styled-components';

const WebSideBlock = styled.div`
    width: 200px; 
    min-height:100%; // 최소 높이

    position: relative; 
    background: white;
    // margin: 0px 10px 10px 0px;
    padding: 10px 20px 15px 30px;
    border-right: solid gray 1px;
    // border-radius: 5px; // 모서리 둥굴게
    // box-shadow: 0 0 3px 0 rgba(0,0,0,100); // 박스 감싸는 그림자

    text-align: left;
    display: flex;
    flex-direction: column;
    gap: 3px;

    h2 {
        font-size: 15px;
        margin: 0 0 0 0;
        // margin: 5px 0px 5px 0px;
        // text-align: center;        
    }

    hr{
        margin: 5px 0 0 0;
        // margin: 0px 5px 5px 5px;
        width: 100%;
    }
`
// dbg: 카테고리 배열
var TestCategory = [];
// dbg: 내용 채우기
for (var i = 1; i <= 40; i++) {
    TestCategory.push(`category${i}`);
}

function WebSidebar() {
    return (
        <WebSideBlock>
            <h2>Category</h2>
            <hr />
            {
                TestCategory.map((el) => {
                    return (
                        <div className="category">{el}</div>
                    );
                })
            }
        </WebSideBlock>
    );
}

export default WebSidebar;