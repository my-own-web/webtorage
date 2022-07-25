# webtorage

## 1. 역할 분담
  - juk1329 : 크롬 익스텐션
  - lectura7942 : 웹사이트 - 전체적인 틀, 사이트 미리보기 디자인
  - lee0594 : 웬사이트 - 사이트 미리보기 디자인, 로그인 기능

## 2. 사용할 데이터
  1. og.url, og.title, og.description, og.image
  
  2. 탭을 저장할 때 사용자가 적는 메모
  
  3. 카테고리
  
  4. (저장)날짜
  
  확장자에서 저장 -> DB -> 사이트에서 시각화
  
  > **database table** (TODO: 수정)
  > * category: id, name, size
  > * tabinfo: id, category, title, data_url, image, description, date
  
  
## 3. 깃 사용 규칙
  - 중앙 리포는 백업 용도, 마지막에 확인한 후 merge
  - 로컬 리포로 각자 fork
  - 로컬 리포 main branch에 중앙 리포 내용 저장, 다른 branch에 새로운 기능 저장
  - 로컬 리포에서 branch merge 시도해본 후 이상 없을 시 pull request

  커밋/주석 : 한국어
