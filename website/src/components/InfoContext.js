import React, { useReducer, useContext, useState, createContext, useEffect } from 'react';
import { TodoApi } from '../utils/axios';

const CategoryListContext = createContext(null);
const SearchCategoryListContext = createContext(null);
const CurrentCategoryContext = createContext(null);
const SetCurrentCategoryContext = createContext(null);
const ContentListContext = createContext(null);
const ContentDispatchContext = createContext(null);
const DateRangeContext = createContext(null);
const SetDateRangeContext = createContext(null);
const UserLoginIdContext = createContext(null);
const CategoryActionContext = createContext(null);
const BoxSearchManagerContext = createContext(null); // 검색 관련 통합 context

export function InfoProvider({ children }) {

  const [content, setContent] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({ id: -1, name: 'ALL', size: 0 });
  const [userLoginId, setUserLoginId] = useState('');

  // 전체 카테고리 리스트
  const [allCategoryList, setAllCategoryList] = useState([]);
  // 검색된 카테고리 리스트
  const [categoryList, setCategoryList] = useState([]);
  // 검색할 기간
  const [dateRange, setDateRange] = useState([null, null]);

  /** $start 검색 관련 */
  const [isSearch, setIsSearch] = useState(false); // true: 키워드가 적용된 미리보기만 보이기
  const [searchWord, setSearchWord] = useState(""); // 검색할 키워드

  function BoxSearchManager(type, param = null) {
    switch (type) {
      case "ISSEARCH":
        console.log(type, isSearch);
        return isSearch;
      case "SETSEARCH":
        setIsSearch(param);
        console.log(type, param);
        break;
      case "GETWORD":
        console.log(type, searchWord);
        return searchWord;
      case "SETWORD":
        console.log(type, param);
        setSearchWord(param);
        break;
    }
  }
  /** $end 검색 관련 */


  async function postTabAction(action) {
    try {
      const { data } = await TodoApi.post('/tabinfo/website', action, { withCredentials: true });

      if (data === 'login again') {
        alert('다시 로그인해 주세요.');
        window.location.replace("/login"); //새로고침
      }
      else {
        ///////////////////////////
        console.log(data.userID);
        ///////////////////////////////
        setContent(data.bookmark);
        setUserLoginId(data.userID);
        ///////////////////////
        postCategoryAction({ type: "FETCH", clientId: data.userID });
      }
    } catch (error) {
      console.log(error);
    }
  }

  /** action: 
   * {type: "FETCH", clientId}
   * {type: "DELETE", clientId, id} 
   * */
  async function postCategoryAction(action) {
    try {
      const { data } = await TodoApi.post('/category', action);
      // data: {id, name, size} 객체 배열
      setAllCategoryList(data);
      setCategoryList(data);
      if (action.type == "DELETE") {
        setCurrentCategory({ id: -1, name: 'ALL', size: 0 });
      }
    } catch (error) {
      console.log(error);
    }
  }

  // 첫 렌더링에서만 실행
  useEffect(() => {
    postTabAction({ type: 'FETCH' });
    //getCategory();
  }, []);

  const searchCategoryList = (value) => {
    //검색 기능
    // console.log(value);

    // allCategoryList 배열에서 value 문자열을 포함하는 원소들만 모아서 newList 배열 생성
    const newList = allCategoryList.filter((cat) => {
      if (cat.name.toLowerCase().includes(value)) {
        // 원소 cat을 소문자로 바꿈 -> value 문자열을 포함하면 newList 배열에 추가.
        return cat;
      }
    });
    setCategoryList(newList); // useState 훅으로 현재 보이는 카테고리 배열 변경
    // 주의! 원래 카테고리 배열과 보이는 카테고리 배열은 따로 분리해 놓기.
  }

  return (
    <CategoryActionContext.Provider value={postCategoryAction}>
      <UserLoginIdContext.Provider value={userLoginId}>
        <CategoryListContext.Provider value={categoryList}>
          <SearchCategoryListContext.Provider value={searchCategoryList}>
            <CurrentCategoryContext.Provider value={currentCategory}>
              <SetCurrentCategoryContext.Provider value={setCurrentCategory}>
                <ContentListContext.Provider value={content}>
                  <ContentDispatchContext.Provider value={postTabAction}>
                    <DateRangeContext.Provider value={dateRange}>
                      <SetDateRangeContext.Provider value={setDateRange}>
                        <BoxSearchManagerContext.Provider value={BoxSearchManager}>
                          {children}
                        </BoxSearchManagerContext.Provider>
                      </SetDateRangeContext.Provider>
                    </DateRangeContext.Provider>
                  </ContentDispatchContext.Provider>
                </ContentListContext.Provider>
              </SetCurrentCategoryContext.Provider>
            </CurrentCategoryContext.Provider>
          </SearchCategoryListContext.Provider>
        </CategoryListContext.Provider>
      </UserLoginIdContext.Provider>
    </CategoryActionContext.Provider>
  );
}

export function useCategoryAction() {
  const context = useContext(CategoryActionContext);
  if (!context) {
    throw new Error('CategoryActionContext Error');
  }
  return context;
}

export function useCategoryList() {
  const categoryList = useContext(CategoryListContext);
  if (!categoryList) {
    throw new Error('CategoryListContext Error');
  }
  return categoryList;
}

export function useContent() {
  const Content = useContext(ContentListContext);
  if (!Content) {
    throw new Error('ContentContext Error');
  }
  return Content;
}

export function useContentDispatch() {
  const context = useContext(ContentDispatchContext);
  if (!context) {
    throw new Error('Cannot find ContentProvider');
  }
  return context;
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

export function useDateRange() {
  const state = useContext(DateRangeContext);
  if (!state) {
    throw new Error('DateRangeContext Error');
  }
  return state;
}

export function useSetDateRange() {
  const set = useContext(SetDateRangeContext);
  if (!set) {
    throw new Error('SetDateRange Error');
  }
  return set;
}

export function useUserLoginId() {
  const UserLoginID = useContext(UserLoginIdContext);
  /*if (!UserLoginID){
    throw new Error('UserLoginID Error');
  }*/
  return UserLoginID;
}

export function useBoxSearchManager() {
  const context = useContext(BoxSearchManagerContext);
  if (!context) {
    throw new Error("BoxSearchManager Context Error");
  }
  return context;
}