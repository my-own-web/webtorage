import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { useContentDispatch } from "../InfoContext";

const BoxBlock = styled.div`
  padding: 10px 12px;
  overflow-y: auto; /*자식요소에서 아래 내용이 넘칠 때 스크롤바 사용*/
  background: #F2F3F5;
  border-radius: 5px;
  border: 2px solid #DBDCF5;
  margin: 7px 9px;
  width: 285px;
  height: 200px;
`;
//박스 하나의 전체 디자인

const Sitename = styled.div`
  color: black;
  font-size: 13px;
  padding: 3px 0px;
`;

const Title1 = styled.div`
  font-size: 13px;
  color: black;
  padding: 3px 0px;
`; //site_name이 없는 경우

const Title2 = styled.div`
  font-size: 11px;
  color: black;
  padding: 4px 0px;
`;  //site_name이 있는 경우

const Url = styled.div`
  font-size: 13px;
  color: black;
  text-align: center;
  a {
    color: blue;
  }
`;

const Image = styled.div`
  margin: 5px 33px;
  width: 200px;
  height: 120px;
  border: 1px solid black;
`;

const Description = styled.div`
  font-size: 10px;
  color: black;
  padding-bottom: 3px;
  border-bottom: 1px dashed black;
  /*아래 밑줄: div 태그로 인해 box padding 부분 제외한 전체에 밑줄 그려짐*/
`;

const MemoBox = styled.div`
  display: flex;
  padding-top: 3px;
  font-size: 10px;
  color:black;
`

const SubBox = styled.div`
  display: flex;
  font-size: 11px;
`

const Memo = styled.div`
  //margin-right: 2px;
  width: 28px;
  font-size: 10px;
  color:black;
`;

const WriteMemo = styled.input`
  width: 200px;
  //padding-top: 3px;
  font-size: 10px;
`
const WriteCategory = styled.input`
  margin: 2px;
  width: 100px;
  font-size: 11px;
`

const ChangeButton = styled.button`
  height: 20px;
  margin: 3px;
  background: #E5B2FF;
  border: solid purple 1px;
  border-radius: 5px;
  font-size: 11px;
`

function BigBox({ site_name, title, url, image, description, memo, date, category }) {
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

  const onFinishMemo = (e) => {
    e.preventDefault();
    dispatch({ type: 'MEMO', date, memo: changeMemo });
  }
  const onFinishCategory = (editCategory) => {
    return editCategory ? dispatch({ type: 'CATEGORY', date, category: changeCategory }) : ''
  }

  const onCategory = (editCategory) => {
    return editCategory ? <WriteCategory autoFocus value={changeCategory} onChange={onEditCategory} /> : ''
  }

  return (
    <BoxBlock>
      {site_name ? <div><Sitename>{`[${site_name}]`}</Sitename>
        <SubBox><ChangeButton onClick={onRemove}>{"삭제하기"}</ChangeButton><ChangeButton onClick={() => { onFinishCategory(editCategory); onClickCategory() }}>{"카테고리 수정"}</ChangeButton>{onCategory(editCategory)}</SubBox></div> : ''}
      {site_name ? <Title2>{title}</Title2> : <div><Title1>{`[${title}]`}</Title1>
        <SubBox><ChangeButton onClick={onRemove}>{"삭제하기"}</ChangeButton><ChangeButton onClick={() => { onFinishCategory(editCategory); onClickCategory() }}>{"카테고리 수정"}</ChangeButton>{onCategory(editCategory)}</SubBox></div>}
      <Url>URL: <a href={url}>{`"${url}"`}</a></Url>
      <Image><img src={image} width="200" height="120"></img></Image>
      <Description>{description}</Description>
      <MemoBox><Memo>{'메모:'}</Memo>{editMemo ? <div><WriteMemo autoFocus value={changeMemo} onChange={onEditMemo} /><MdEdit onClick={() => { onClickMemo(); onFinishMemo(); }} /></div> : <div>{changeMemo}<MdEdit onClick={onClickMemo} /></div>}</MemoBox>
    </BoxBlock >
  );
}

export default BigBox;