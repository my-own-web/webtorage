import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { useContentDispatch } from "./InfoContext";

const BoxBlock = styled.div`
  padding: 10px 12px;
  overflow-y: auto; /*자식요소에서 아래 내용이 넘칠 때 스크롤바 사용*/
  background: #F2F3F5;
  border-radius: 5px;
  border: 2px solid #DBDCF5;
  margin: 5px 5px;;
  width: 167px;
  height: 150px;
`;
//박스 하나의 전체 디자인

const Sitename = styled.div`
  color: black;
  font-size: 12px;
  padding: 3px 0px;
`

const Title1 = styled.div`
  font-size: 12px;
  color: black;
  padding: 3px 0px;
`; //site_name이 없는 경우

const Title2 = styled.div`
  font-size: 10px;
  color: black;
  padding: 3px 0px;
`
//site_name이 있는 경우

const Url = styled.div`
  font-size: 12px;
  color: black;
  text-align: center;
  a {
    color: blue;
  }
`;

const Image = styled.div`
  margin: 3px 2px;
  width: 150px;
  height: 100px;
  border: 1px solid black;
`;

const Description = styled.div`
  font-size: 9px;
  color: black;
  padding-bottom: 3px;
  ${props => props.memo ? 'border-bottom: 1px dashed black;' : ''}
  /*아래 밑줄: div 태그로 인해 box padding 부분 제외한 전체에 밑줄 그려짐*/
  /*memo가 있는 경우 밑줄을 긋고 없는 경우 밑줄을 긋지 않음*/
`;

const Memo = styled.div`
  //display: flex; //메모 글자와 input 칸을 한줄에 놓기 위해서
  padding-top: 3px;
  font-size: 10px;
  color:black;
`;

const WriteMemo = styled.input`
  width: 110px;
  padding-top: 3px;
  font-size: 10px;
`

const ChangeButton = styled.button`
  height: 20px;
  margin: 3px;
  background: #E5B2FF;
  border: solid purple 1px;
  border-radius: 5px;
  font-size: 10px;
`

function SmallBox({ site_name, title, url, image, description, memo, date, category }) {
  const dispatch = useContentDispatch();
  const [editMemo, setEditMemo] = useState(false);
  const [changeMemo, setChangeMemo] = useState(memo);
  const [editCategory, setEditCategory] = useState(false);
  const [changeCategory, setChangeCategory] = useState(category);

  const onRemove = () => { dispatch({ type: 'REMOVE', date }) };

  const onEditMemo = (e) => {
    setChangeMemo(e.target.value);
  };
  const onEditCategory = (e) => {
    setChangeCategory(e.target.value);
  }

  const onClickMemo = () => {
    setEditMemo(!editMemo);
  }
  const onClickCategory = () => {
    setEditCategory(!editCategory);
  }

  const onCategory = (editCategory) => {
    return editCategory ? <input autoFocus value={changeCategory} onChange={onEditCategory} /> : ''
  }

  return (
    <BoxBlock>
      {site_name ? <div><Sitename>{`[${site_name}]`}</Sitename>
        <ChangeButton onClick={onRemove}>{"삭제하기"}</ChangeButton><ChangeButton onClick={onClickCategory}>{"카테고리 수정"}</ChangeButton>{onCategory(editCategory)}</div> : ''}
      {site_name ? <Title2>{title}</Title2> : <div><Title1>{`[${title}]`}</Title1>
        <ChangeButton onClick={onRemove}>{"삭제하기"}</ChangeButton><ChangeButton onClick={onClickCategory}>{"카테고리 수정"}</ChangeButton>{onCategory(editCategory)}</div>}
      <Url>URL: <a href={url}>{`"${url}"`}</a></Url>
      <Image><img src={image} width="150" height="100"></img></Image>
      <Description memo={memo}>{description}</Description>
      <Memo>{'메모: '}{editMemo ? <div><WriteMemo autoFocus value={changeMemo} onChange={onEditMemo} /><MdEdit onClick={onClickMemo} /></div> : <div>{changeMemo}<MdEdit onClick={onClickMemo} /></div>}</Memo>
    </BoxBlock>
  );
}

export default SmallBox;