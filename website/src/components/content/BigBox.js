import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit } from 'react-icons/md';
import { useContentDispatch } from "../InfoContext";
import CategoryDropbox from './CategoryDropbox';
import { prependOnceListener } from 'process';

const BoxBlock = styled.div`
  // overflow-y: auto; /*자식요소에서 아래 내용이 넘칠 때 스크롤바 사용*/
  // background: #F2F3F5;
  border-radius: 5px;
  border: 2px solid #DBDCF5;
  margin: 7px 9px;

  width: 280px;
  height: 200px;
  overflow: clip;

  display: flex;
  flex-direction: column;
  gap: 3px;
  padding: 3px 10px 3px 10px;

  h3 {
    margin: 0 0 0 0;
    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
  }

  a {
    font-size: 13px;
    color: grey;
    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
  }

  .description {
    font-size: 10px;
    white-space: nowrap; // one line
    overflow: clip;
    text-overflow: ellipsis;
  }
`;
//박스 하나의 전체 디자인

const Title = styled.h3`
  // font-size: 13px;
  // color: black;
  padding: 3px 10px 0 10px;
  margin: 0 0 0 0;
`;

const Url = styled.div`
  font-size: 13px;
  color: black;
  // text-align: center;
  padding: 0px 10px 0px 10px;
  a {
    color: grey;
  }
`;

const Image = styled.div`
  // margin: 5px 40px;
  margin: 5px 0 5px 0;
  width: 200px;
  height: 120px;
  // border: 1px solid black;
`;

const Description = styled.div`
  font-size: 10px;
  color: black;
  padding-bottom: 3px;
  // border-bottom: 1px dashed black;
  /*아래 밑줄: div 태그로 인해 box padding 부분 제외한 전체에 밑줄 그려짐*/
  height: 50px;
  // overflow-y: auto;
  overflow-y: clip;
`;

const Memo = styled.div`
  //display: flex; //메모 글자와 input 칸을 한줄에 놓기 위해서
  padding-top: 3px;
  font-size: 10px;
  color:black;
`;

const WriteMemo = styled.input`
  width: 200px;
  padding-top: 3px;
  font-size: 10px;
`

const ChangeButton = styled.button`
  height: 20px;
  margin: 3px;
  background: #E5B2FF;
  border: solid purple 1px;
  border-radius: 5px;
  font-size: 11px;
`

function BigBox({ id, category, title, data_url, image, description, date, memo }) {
  const dispatch = useContentDispatch();
  const [editMemo, setEditMemo] = useState(false);
  const [changeMemo, setChangeMemo] = useState(memo);
  const [editCategory, setEditCategory] = useState(false);
  const [changeCategory, setChangeCategory] = useState(category);

  const onRemove = () => {
    dispatch({ type: 'REMOVE', id, category })
  };

  const onEditMemo = (e) => {
    setChangeMemo(e.target.value);
  };
  const onEditCategory = (e) => {
    setChangeCategory(e.target.value);
  }

  const onSaveMemo = () => {
    dispatch({
      type: "EDITMEMO",
      id,
      value: changeMemo
    });
  };

  const onClickMemo = () => {
    if (editMemo) onSaveMemo();
    setEditMemo(!editMemo);
  }

  const onClickCategory = () => {
    setEditCategory(!editCategory);
  }

  const onCategory = (editCategory) => {
    return editCategory ? <input autoFocus value={changeCategory} onChange={onEditCategory} /> : ''
  }

  return (
    <BoxBlock image={image}>
      <h3>{title}</h3>
      <a href={data_url}>{data_url}</a>
      <img src={image} width='280px' height='100px'/>
      <div className='description'>{description}</div>
      {/* <Title>{title}</Title> */}
      {/* <div>
        <Title>{`[${title}]`}</Title>
        <ChangeButton onClick={onRemove}>{"삭제하기"}</ChangeButton>
        <ChangeButton onClick={onClickCategory}>{"카테고리 수정"}</ChangeButton>
        {onCategory(editCategory)}
      </div> */}
      {/* <Url><a href={data_url}>{data_url}</a></Url> */}
      {/* <img src={image} width='280px' height='100px'/> */}
      {/* <Image><img src={image} ></img></Image> */}
      {/* <Description>{description}</Description> */}
      {/* <Memo>메모:{editMemo ? 
        <div>
          <WriteMemo autoFocus value={changeMemo} onChange={onEditMemo} />
          <MdEdit onClick={onClickMemo} />
        </div> : 
        <div>
          {changeMemo}<MdEdit onClick={onClickMemo} />
        </div>}
      </Memo> */}
    </BoxBlock >
  );
}

export default BigBox;