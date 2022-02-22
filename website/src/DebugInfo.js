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

const TestCategoryContext = createContext(null);
const TestContentContext = createContext(null);

export function DebugInfoProvider({children}){
    const [categoryList, setCategoryList] = useState(initialCategory);
    const [contentList, setContentList] = useState(initialContent);
    
    return(
        <TestCategoryContext.Provider value={categoryList}>
            <TestContentContext.Provider value={contentList}>
                {children}
            </TestContentContext.Provider>
        </TestCategoryContext.Provider>
    );
}

export function useTestCategory(){
    const testCategory = useContext(TestCategoryContext);
    if(!testCategory){
        throw new Error('TestCategoryContext Error');
    }
    return testCategory;
}

export function useTestContent(){
    const testContent = useContext(TestContentContext);
    if(!testContent){
        throw new Error('TestContentContext Error');
    }
    return testContent;
}