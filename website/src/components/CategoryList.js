import React from "react";
import styled from "styled-components";

const ListBlock = styled.div`
width: 170px; 
height: 67vh;

margin: 10px 0 10px 0;

display: flex;
    flex-direction: column;
    flex-basis:100%;
    gap: 3px;
overflow-y: auto;
overflow-x: clip;
`
// dbg: 카테고리 배열
var TestCategory = [];
// dbg: 내용 채우기
for (var i = 1; i <= 20; i++) {
    TestCategory.push(`category${i}`);
}

function CategoryList() {
    return (
        <ListBlock>
            {
                TestCategory.map((el) => {
                    return (
                        <div className="category">{el}</div>
                    );
                })
            }
        </ListBlock>
    );
}

export default CategoryList;