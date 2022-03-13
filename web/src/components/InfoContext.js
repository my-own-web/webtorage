import React, { useReducer, useContext, useState, createContext } from 'react';

// 디버그용 category 리스트
var initialCategory = ['suchalongnamedcategorylonglonglonglonglong'];
// dbg: 내용 채우기
for (var i = 1; i <= 40; i++) {
  initialCategory.push(`category${i}`);
}

const initialContent = [
  { //나중에는 id 대신 date랑 category로 정렬해서 사용?
    date: 202202162300,
    title: "네이버",
    site_name: '',
    url: "https://www.naver.com/",
    image: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_212852414260.png",
    description: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요",
    //memo: "네이버 메인 페이지", //메모 글자수 제한해야 할듯
    category: "페이지" //카테고리 지정
  },
  {
    date: 202202212317,
    title: "Build software better, together",
    site_name: "Github",
    url: "https://github.com",
    image: "https://github.githubassets.com/images/modules/open_graph/github-logo.png",
    description: "GitHub is where people build software. More than 73 million people use GitHub to discover, fork, and contribute to over 200 million projects.",
    memo: "코드 및 기록 저장소",
    category: "페이지"
  },
  {
    date: 202202220014,
    title: "Notion - The all-in-one workspace for your notes, tasks, wikis, and databases.",
    site_name: "Notion",
    url: "https://www.notion.so",
    image: "https://www.notion.so/images/meta/default.png",
    description: "A new tool that blends your everyday work apps into one. It's the all-in-one workspace for you and your team",
    memo: "기록 저장소",
    category: "페이지"
  },
  {
    date: 202202220142,
    title: "공동작업을 통해 무료로 멋진 그래픽 디자인을 만들어 보세요",
    site_name: "Canva",
    url: "https://www.canva.com",
    image: "https://static.canva.com/static/images/fb_cover-1.jpg",
    description: "팀원들과 함께 아름다운 디자인을 만들어 보세요. Canva가 제공하는 드래그 앤 드롭 기능 및 레이아웃을 사용하여 명함, 로고, 프레젠테이션 등을 디자인하고, 공유하고, 인쇄하세요.",
    memo: "포스터 디자인 검색할 때 유용",
    category: "페이지"
  },
  {
    date: 202203031103,
    title: "Stack Overflow - Where Developers Learn, Share, Build Careers",
    site_name: "Stack Overflow",
    url: "https://stackoverflow.com",
    image: "https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon@2.png?v=73d79a89bded",
    description: "Stack Overflow | The World’s Largest Online Community for Developers",
    category: "질문사이트"
  }
];

function contentReducer(content, action) {
  switch (action.type) {
    case "MEMO":
      return;
    case "CATEGORY":
      return;
    case "REMOVE":
      return content.filter(list => list.date !== action.date);
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const CategoryListContext = createContext(null);
const ContentListContext = createContext(null);
const ContentDispatchContext = createContext(null);
const SearchCategoryListContext = createContext(null);

export function InfoProvider({ children }) {
  const [categoryList, setCategoryList] = useState(initialCategory);
  //const [contentList, setContentList] = useState(initialContent);
  const [content, dispatch] = useReducer(contentReducer, initialContent);

  const searchCategoryList = (value) => {
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
      <ContentListContext.Provider value={content}>
        <ContentDispatchContext.Provider value={dispatch}>
          <SearchCategoryListContext.Provider value={searchCategoryList}>
            {children}
          </SearchCategoryListContext.Provider>
        </ContentDispatchContext.Provider>
      </ContentListContext.Provider>
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