<<<<<<< HEAD
# webtorage

## 1. 역할 분담
  - 박정규 : 크롬 익스텐션
  - 권지은 : 웹사이트 - 전체적인 틀
  - 이소연 : 웬사이트 - 사이트 미리보기 시각화

## 2. 사용할 데이터
  1. og.url, og.title, og.description, og.image
  
  2. 탭을 저장할 때 사용자가 적는 메모
  
  3. 카테고리
  
  4. (저장)날짜
  
  확장자에서 저장 -> DB -> 사이트에서 시각화
  
## 3. 깃 사용 규칙
  - 중앙 리포는 백업 용도, 마지막에 확인한 후 merge
  - 로컬 리포로 각자 fork
  - 로컬 리포 main branch에 중앙 리포 내용 저장, 다른 branch에 새로운 기능 저장
  - 로컬 리포에서 branch merge 시도해본 후 이상 없을 시 pull request

  커밋/주석 : 한국어
=======
## src/components/

**InfoContext.js**  
카테고리 배열 등 데이터 관련 파일   
카테고리 검색 함수  
initialContent 배열은 디버깅용

**WebContent.js**  
미리보기 시각화 컴포넌트 들어갈 자리

**Webpage.js**  
웹 페이지 전체 틀

**WebHeader.js**  
로고+제목 헤더 (페이지 내 위치 고정됨)

**WebSidebar.js**  
카테고리/날짜 선택 가능 사이드바 (페이지 내 위치 고정됨)

**CategoryList.js**  
사이드바 속 카테고리 리스트 시각화

**CategorySearch.js**  
카테고리 검색용 입력창  
검색 함수는 InfoContext.js에 있음

**DateSearch.js**  
날짜 검색 버튼, 달력 팝업  
`react-datepicker` 사용


## 주석

주석 줄임말 뜻은 다음과 같다.

`dbg`: 디버그용  
`chk`: 확인필요한 코드
>>>>>>> upstream/main
