import React from "react";
import styled from "styled-components";
import { useCategoryList, useSetCurrentCategory } from "./InfoContext";

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
        text-overflow: ellipsis;
        cursor: pointer;
    }

    .category:hover::before{
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

function CategoryItem({ id, name, size }) {
    const setCurrent = useSetCurrentCategory();

    const onClick = (e) => {
        setCurrent({id: id, name: name, size: size});
    }

    return (
        <div className='category' name={name} onClick={onClick}>{name}</div>
    );
}

function CategoryList() {
    const categoryList = useCategoryList();

    return (
        <ListBlock>
            <CategoryItem name="ALL" />
            <CategoryItem name="DEFAULT" />
            {
                categoryList.map((el) => {
                    return (
                        <CategoryItem key={el.id} id={el.id} name={el.name} size={el.size}/>
                        // el: 객체 {id, name, size}
                    );
                })
            }
        </ListBlock>
    );
}

export default CategoryList;