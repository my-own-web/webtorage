import React, { useContext, useState, createContext } from 'react';

// 디버그용 category 리스트
var initialCategory = ['suchalongnamedcategorylonglonglonglonglong'];
// dbg: 내용 채우기
for (var i = 1; i <= 40; i++) {
    initialCategory.push(`category${i}`);
}

var initialContent = [];
for (var i = 1; i <= 40; i++) {
    initialContent.push(`content${i}`);
}

const CategoryListContext = createContext(null);
const TestContentContext = createContext(null);
const SearchCategoryListContext = createContext(null);

export function InfoProvider({ children }) {
    const [categoryList, setCategoryList] = useState(initialCategory);
    const [contentList, setContentList] = useState(initialContent);

    const searchCategoryList = (value) =>{
        //검색 기능
        console.log(value);
        const newList = initialCategory.filter((cat) => {
            if (cat.toLowerCase().includes(value)) {
                return cat;
            }
        });
        setCategoryList(newList);
        // console.log(newList);
        //---
    }

    return (
        <CategoryListContext.Provider value={categoryList}>
            <TestContentContext.Provider value={contentList}>
                <SearchCategoryListContext.Provider value={searchCategoryList}>
                    {children}
                </SearchCategoryListContext.Provider>
            </TestContentContext.Provider>
        </CategoryListContext.Provider>
    );
}

export function useCategoryList() {
    const categoryList = useContext(CategoryListContext);
    if (!categoryList) {
        throw new Error('CategoryListContext Error');
    }
    return categoryList;
}

export function useTestContent() {
    const testContent = useContext(TestContentContext);
    if (!testContent) {
        throw new Error('TestContentContext Error');
    }
    return testContent;
}

export function useSearchCategoryList() {
    const searchList = useContext(SearchCategoryListContext);
    if (!searchList) {
        throw new Error('SetCategoryListContext Error');
    }
    return searchList;
}