import React from "react";
import styled from "styled-components";
import { useCategoryList,useSetCurrentCategory } from "./InfoContext";

const ListBlock = styled.div`
    width: 170px; 
 
    // margin-top: 5px;

    display: flex;
    flex-direction: column;
    gap: 3px;
    overflow-y: auto;

    .category{
        width: 150px;
        overflow-x: clip;
        cursor: pointer;
    }

    .category[name]:hover::before{
        color: #ff6b6b;
        font-weight: bold;

        content:attr(name); 
        position: absolute; 
        height: 10px;
        line-height:10px; 
        padding: 5px; 
        background: white;
        font-size: 15px; 
        border: 1px solid;
    }
`

function CategoryItem({id, name, size}){
    const setCurrent = useSetCurrentCategory();

    const onClick = (e) => {
        setCurrent(name);
    }

    return(
        <div className='category' name={name} onClick={onClick}>
            {name.length > 15 ? name.substr(0, 15)+'...' : name}
        </div>
    );
}

function CategoryList() {
    const categoryList = useCategoryList();

    return (
        <ListBlock>
            {
                categoryList.map((el) => {
                    return (
                        <CategoryItem name={el.name}/>
                        // el: 객체 {id, name, size}
                    );
                })
            }
        </ListBlock>
    );
}

export default CategoryList;