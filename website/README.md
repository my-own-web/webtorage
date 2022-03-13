# website: 클라이언트(웹사이트) 폴더

## src/components/

### Webpage.js  

import: `WebHeader`, `WebSidebar`, `WebBody`  
export: `Webpage`

**WebTemplateBlock**  
헤더 밑 공간(사이드바, 서브헤더, 미리보기 리스트)를 아루르는 틀이다.  

**Webpage**  
웹페이지 전체 틀이다.

### WebHeader.js  

헤더 파일이다.  
import: none  
export: `WebHeader`

**WebHeadBlock**  
헤더 틀이다.
위치가 고정되어 스크롤에 영향 받지 않는다.

**WebHeader**  
헤더 컴포넌트이다.  
로고 이미지와 제목으로 구성되어 있다.

### WebSidebar.js

import: `CategoryList`, `CategorySearch`
export: `WebSidebar`

**WebSideTemplate**  
사이드바가 들어갈 틀이다.

**WebSideBlock**  
사이드바 모양 컴포넌트이다.

**WebSidebar**  
사이드바 내용 컴포넌트이다.  
사이드바 제목과 카테고리 입력창, 카테고리 리스트로 구성되어 있다.

### WebBody.js  

import: `Boxes`, `WebSubHeader`  
export: `WebBody`

**WebBodyTemplate**  
서브헤더과 미리보기 리스트가 들어갈 틀이다.

**WebBody**  
서브헤더와 미리보기 리스트(`Boxes`)로 구성된 바디 컴포넌트이다.

### WebSubHeader.js

import: `useCurrentCategory`, `DateSearch`
export: `WebSubheader`

**WebSubHeaderBlock**  
서브헤더 모양 컴포넌트이다.

**WebSubHeader**  
현재 카테고리를 보여준다.  
오른쪽에 날짜 범위를 선택할 수 있는 버튼이 있다.

### CategorySearch.js

import: `useCategoryList`, `useSearchCategoryList`
export: `CategorySearch`

**CategorySearchBox**  
카테고리 검색 창이 들어갈 틀이다.

**SearchInput**  
카테고리 검색 창 모양을 정한다.

**CategorySearch**  
카테고리 검색 창과 리셋 버튼(추가 예정)으로 구성되어 있다.  
검색 기능은 `InfoContext.js`에서 context로 제공된다.

### CategoryList.js

import: `useCategoryList`, `useSetCurrentCategory`
export: `CategoryList`

**ListBlock**  
카테고리 리스트 모양을 정한다.  
원소 위에 마우스가 hover하면 분홍색으로 바뀐다.

**CategoryItem**  
카테고리 리스트의 각 원소에 대한 컴포넌트이다.  
해당 원소를 누르면 현재 카테고리로 설정한다.

**CategoryList**  
`map` 함수를 통해 카테고리 리스트를 보여주는 컴포넌트이다.

### DateSearch.js

날짜 검색 버튼, 달력 팝업

import: `react-datepicker`, `react-datepicker/dist/react-datepicker.css`
export: `DateSearch`

**DatePickerTemplate**  
DatePicker 커스텀 템플릿.

**DatePickerComponent**  
DatePicker에서 날짜 범위를 선택하는 컴포넌트.

**DateSearch**  

### InfoContext.js

import: `TodoApi`
export: 
`useCategoryList`: (검색된) 카테고리 리스트 context  
`useSearchCategoryList`: 카테고리 검색 기능 context  
`useCurrentCategory`: 현재 선택된 카테고리 context  
`useSetCurrentCategory`: 카테고리 선택 기능 context

**getCategory()**  
DB에서 전체 카테고리 리스트를 가져온다.

**searchCategoryList(value)**  
value로 시작하는 카테고리로만 이루어진 리스트를 생성한다.

### src/components/content

미리보기 리스트와 관련된 폴더

**BigBox.js**  

**Boxes.js**  

**Context.js**  

**SmallBox.js**  

## 주석

주석 줄임말 뜻은 다음과 같다.

`dbg`: 디버그용  
`chk`: 확인필요한 코드
