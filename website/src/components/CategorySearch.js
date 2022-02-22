import React, { useState } from "react";
import styled from "styled-components";
import { useCategoryList, useSearchCategoryList } from "./InfoContext";

const CategorySearchBox = styled.div`
margin: 0 5px 0 0;
`

const SearchInput = styled.input`
width: 120px;
`

function CategorySearch() {
    const [input, setInput] = useState('');
    const categoryList = useCategoryList();
    const searchList = useSearchCategoryList();

    // 입력값이 변할 때마다 검색함
    const onChange = (e) => {
        setInput(e.target.value);

        //검색 기능
        searchList(e.target.value);
    };

    return (
        <CategorySearchBox>
            <SearchInput placeholder='Search Category' value={input} onChange={onChange} />
        </CategorySearchBox>
    );
}

export default CategorySearch;