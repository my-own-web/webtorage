import React, { useReducer, useContext, useState, createContext, useEffect } from 'react';
import { TodoApi } from '../utils/axios';

const initialContent = [
  { //나중에는 id 대신 date랑 category로 정렬해서 사용?
    id: 1,
    category: "페이지", //카테고리 지정
    title: "네이버",
    data_url: "https://www.naver.com/",
    image: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
    description: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
    date: '202202162300',
    memo: "네이버 메인 페이지" //메모 글자수 제한해야 할듯
  },
  {
    id: 2,
    category: "페이지",
    title: "Github",
    data_url: "https://github.com",
    image: "https://github.githubassets.com/images/modules/open_graph/github-logo.png",
    description: "GitHub is where people build software. More than 73 million people use GitHub to discover, fork, and contribute to over 200 million projects.",
    date: '202202212317',
    memo: "코드 및 기록 저장소"
  },
  {
    id: 3,
    category: "페이지",
    title: "Notion",
    data_url: "https://www.notion.so",
    image: "https://www.notion.so/images/meta/default.png",
    description: "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team",
    date: '202202220014',
    memo: "기록 저장소"
  },
  {
    id: 4,
    category: "질문 사이트",
    title: "Canva",
    data_url: "https://www.canva.com",
    image: "https://static.canva.com/static/images/fb_cover-1.jpg",
    description: "팀원들과 함께 아름다운 디자인을 만들어 보세요. Canva가 제공하는 드래그 앤 드롭 기능 및 레이아웃을 사용하여 명함, 로고, 프레젠테이션 등을 디자인하고, 공유하고, 인쇄하세요.",
    date: '202202220142',
    memo: "포스터 디자인 검색할 때 유용"
  },
  {
    id: 5,
    category: "질문 사이트",
    title: "Stack Overflow",
    data_url: "https://stackoverflow.com",
    image: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
    description: "Stack Overflow | The World’s Largest Online Community for Developers Stack Overflow | The World’s Largest Online Community for Developers Stack Overflow | The World’s Largest Online Community for Developers Stack Overflow | The World’s Largest Online Community for Developers Stack Overflow | The World’s Largest Online Community for Developers Stack Overflow | The World’s Largest Online Community for Developers",
    date: '202203031103',
    memo: "memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow memo for stack overflow"
  },
  {
    id: 6,
    category: "DEFAULT",
    title: "default test default test default testdefault test default test",
    data_url: "https://test.comaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    image: "",
    description: "description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test description for test",
    date: '202203221204',
    memo: ''
  }
];

// 디버그용 category 리스트
let initialCategory = [
  {
    id: 1,
    name: 'suchalongnamedcategorylonglonglonglonglong', size: 0
  },
  {
    id: 2,
    name: "질문 사이트",
    size: 1
  },
  {
    id: 3,
    name: "페이지",
    size: 4
  }

];
// dbg: 내용 채우기
for (var i = 5; i <= 20; i++) {
  initialCategory.push({ id: i, name: `category${i}`, size: 0 });
}

const CategoryListContext = createContext(null);
const SearchCategoryListContext = createContext(null);
const CurrentCategoryContext = createContext(null);
const SetCurrentCategoryContext = createContext(null);
const ContentListContext = createContext(null);
const ContentDispatchContext = createContext(null);
const DateRangeContext = createContext(null);
const SetDateRangeContext = createContext(null);
const UserLoginIdContext = createContext(null);
const BoxSearchManagerContext = createContext(null); // 검색 관련 통합 context

export function InfoProvider({ children }) {

  const [content, setContent] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('ALL');
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


  async function postAction(action) {
    try {
      const { data } = await TodoApi.post('/tabinfo/website', action, { withCredentials: true });
      //const { data } = await TodoApi.post('/tabinfo/website', action);
      setContent(data.bookmark);
      setUserLoginId(data.userID);
      ////////////////////////////////////////////////
    } catch (error) {
      console.log(error);

      // dbg: 서버 안 켰을 때 디버그용
      if (process.env.NODE_ENV === "development") {
        setContent(initialContent);
      }
    }
  }

  async function getCategory() {
    try {
      const { data } = await TodoApi.get('/category');
      // data: {id, name, size} 객체 배열
      setAllCategoryList(data);
      setCategoryList(data);
    } catch (error) {
      console.log(error);

      // dbg: 서버 안 켰을 때 디버그용
      if (process.env.NODE_ENV === "development") {
        setAllCategoryList(initialCategory);
        setCategoryList(initialCategory);
      }
    }
  }

  // 첫 렌더링에서만 실행
  useEffect(() => {
    postAction({ type: 'FETCH' });
    getCategory();
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
    <UserLoginIdContext.Provider value={userLoginId}>
      <CategoryListContext.Provider value={categoryList}>
        <SearchCategoryListContext.Provider value={searchCategoryList}>
          <CurrentCategoryContext.Provider value={currentCategory}>
            <SetCurrentCategoryContext.Provider value={setCurrentCategory}>
              <ContentListContext.Provider value={content}>
                <ContentDispatchContext.Provider value={postAction}>
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
  );
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