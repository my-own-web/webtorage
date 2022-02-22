import React from "react";
import styled from "styled-components";
import { useCategoryList } from "./InfoContext";

const ListBlock = styled.div`
    width: 170px; 
    height: 63vh;

    // margin-top: 5px;

    display: flex;
    flex-direction: column;
    flex-basis:100%;
    gap: 3px;
    overflow-y: auto;

    .category{
        width: 150px;
        overflow-x: clip;
    }
`

function CategoryList() {
    const categoryList = useCategoryList();

    return (
        <ListBlock>
            {
                categoryList.map((el) => {
                    return (
                        <div className="category">{el}</div>
                    );
                })
            }
        </ListBlock>
    );
}

export default CategoryList;