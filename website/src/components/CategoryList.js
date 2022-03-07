import React from "react";
import styled from "styled-components";
import { useCategoryList, useSetCurrentCategory } from "./InfoContext";

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
        cursor: pointer;
        &:hover {
            color: #ff6b6b;
            // background: grey;
            font-weight: bold;
        }
    }
`

function CategoryItem({id, text, number}){
    const setCurrent = useSetCurrentCategory();

    const onClick = (e) => {
        setCurrent(text);
    }

    return(
        <div className='category' onClick={onClick}>{text}</div>
    );
}

function CategoryList() {
    const categoryList = useCategoryList();

    return (
        <ListBlock>
            {
                categoryList.map((el) => {
                    return (
                        <CategoryItem text={el}/>
                        // chk: id, number 전달 필요
                    );
                })
            }
        </ListBlock>
    );
}

export default CategoryList;