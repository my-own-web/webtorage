import React, { useContext, useState, createContext, useEffect } from 'react';
import { TodoApi } from '../utils/axios';

const CategoryListContext = createContext(null);
const SearchCategoryListContext = createContext(null);
const CurrentCategoryContext = createContext(null);
const SetCurrentCategoryContext = createContext(null);

export function InfoProvider({ children }) {
    const [currentCategory, setCurrentCategory] = useState('none');

    // 전체 카테고리 리스트
    const [allCategoryList, setAllCategoryList] = useState([]);
    // 검색된 카테고리 리스트
    const [categoryList, setCategoryList] = useState([]);

    async function getCategory() {
        try {
            const { data } = await TodoApi.get('/');
            setAllCategoryList(data);
            setCategoryList(data);
            console.log(data); // dbg
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(()=>{
        getCategory();
    }, []);


    const searchCategoryList = (value) => {
        //검색 기능
        // console.log(value);

        // allCategoryList 배열에서 value 문자열을 포함하는 원소들만 모아서 newList 배열 생성
        const newList = allCategoryList.filter((cat) => {
            if (cat.toLowerCase().includes(value)) {
                // 원소 cat을 소문자로 바꿈 -> value 문자열을 포함하면 newList 배열에 추가.
                return cat;
            }
        });
        setCategoryList(newList); // useState 훅으로 현재 보이는 카테고리 배열 변경
        // 주의! 원래 카테고리 배열과 보이는 카테고리 배열은 따로 분리해 놓기.

        // console.log(newList);
    }

    return (
        <CategoryListContext.Provider value={categoryList}>
            <SearchCategoryListContext.Provider value={searchCategoryList}>
                <CurrentCategoryContext.Provider value={currentCategory}>
                    <SetCurrentCategoryContext.Provider value={setCurrentCategory}>
                        {children}
                    </SetCurrentCategoryContext.Provider>
                </CurrentCategoryContext.Provider>
            </SearchCategoryListContext.Provider>
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

export function useSearchCategoryList() {
    const searchList = useContext(SearchCategoryListContext);
    if (!searchList) {
        throw new Error('SetCategoryListContext Error');
    }
    return searchList;
}

export function useCurrentCategory() {
    const current = useContext(CurrentCategoryContext);
    if (!current) {
        throw new Error('CurrentCategoryContext Error');
    }
    return current;
}

export function useSetCurrentCategory() {
    const set = useContext(SetCurrentCategoryContext);
    if (!set) {
        throw new Error('SetCurrentCategoryContext Error');
    }
    return set;
}