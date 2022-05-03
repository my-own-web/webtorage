import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete, MdCheck, MdClear } from 'react-icons/md';
import { useContentDispatch, useCategoryList } from "../InfoContext";

const BoxBlock = styled.div`
  // overflow-y: auto; /*자식요소에서 아래 내용이 넘칠 때 스크롤바 사용*/
  // background: #F2F3F5;
  border-radius: 5px;
  border: 2px solid #DBDCF5;
  margin: 7px 9px;

  width: 280px;
  height: 260px;
  overflow: clip;

  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 3px 10px 3px 10px;

  h3 {
    height: 25px;
    color: black;
    margin: 0 0 0 0;
    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
  }

  a {
    height: 18px;
    font-size: 13px;
    color: grey;
    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
  }

  .description {
    height: 13px;
    font-size: 10px;
    white-space: nowrap; // one line
    overflow: clip;
    text-overflow: ellipsis;
  }

  .memo-box {
    display: flex;
    gap: 3px;
    height: 60px;
  }

  .memo{
    width: 280px;
    padding-left: 3px;
    overflow-y: auto;
    font-size: 13px;
    font-family: sans-serif;
    border: solid 1px #DBDCF5;
  }

  .textarea{
    width: 280px;
    resize:none;
    padding-left: 3px;
    font-size: 13px;
    font-family: sans-serif;
    border: ${props => props.editMemo ? 'solid 1px red' : 'solid 1px #DBDCF5'}
  }

  .memo-save-button{
    cursor: pointer;
    height: 20px;
    width: 20px;
    padding: 0 0 0 0;
    border: solid 1px #DBDCF5;
  }

  .box-footer{
    height: 22px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    justify-content: space-between;
    align-items: center;
  }

  .category, .date{
    font-size: 13px;
  }

  .category-select-container{
    width: 140px;
    text-decoration: underline;
  }

  .category-choice{
    width: 100px;
  }

`;
//박스 하나의 전체 디자인

function BigBox({ id, category, title, data_url, image, description, date, memo }) {
  const dispatch = useContentDispatch();
  const [editMemo, setEditMemo] = useState(false);
  const [changeMemo, setChangeMemo] = useState(memo);
  const [editCategory, setEditCategory] = useState(false);

  // category select dropbox
  const cglist = useCategoryList();
  const [input, setInput] = useState('');

  const onChange = (e) => {
    setInput(e.target.value);
  }

  const onInput = (e) => {//엔터키로도 입력 가능하도록
    if (e.key == 'Enter') {
      dispatch({ type: 'EDITCATEGORY', id, old_category: category, new_category: input });
      setInput('');
      setEditCategory(false);
    }
  };

  const onExit = () => {
    setInput('');
    setEditCategory(false);
  }

  const onSaveCategory = () => {
    dispatch({ type: 'EDITCATEGORY', id, old_category: category, new_category: input });
    setInput('');
    setEditCategory(false);
  }
  // ---

  const onRemove = () => {
    dispatch({ type: 'REMOVE', id, category })
  };

  const onEditMemo = (e) => {
    setChangeMemo(e.target.value);
  };

  const onSaveMemo = () => {
    console.log(changeMemo); // dbg
    setEditMemo(false);
    dispatch({
      type: "EDITMEMO",
      id,
      value: changeMemo
    });
  };

  const onClickCategory = () => {
    setEditCategory(!editCategory);
    console.log('change editCategory');
  }

  return (
    <BoxBlock editMemo={editMemo}>
      <h3>{title}</h3>
      <a href={data_url}>{data_url}</a>
      <div className='description'>{description}</div>
      <img src={image} width='280px' height='100px' />

      <div className='memo-box'>
        <textarea className='textarea' onClick={() => { setEditMemo(true) }} onChange={(onEditMemo)}>{changeMemo}</textarea>
        <button className='memo-save-button'onClick={onSaveMemo}><MdCheck /></button>
      </div>

      <div className='box-footer'>
        <div className='category-select-container'>

          {editCategory ?
            <>
              <input list="category-list" className="category-choice" name="category-choice" placeholder={category} onChange={onChange} value={input} onKeyPress={onInput} />

              <datalist id="category-list">
                {cglist.map((cg) => (
                  <option value={cg.name}></option>
                ))}
              </datalist>

              <MdClear onClick={onExit} style={{ cursor: 'pointer' }} />
              <MdCheck onClick={onSaveCategory} style={{ cursor: 'pointer' }} />
            </> :
            <div className='category' onClick={onClickCategory} style={{ cursor: 'pointer' }}>{category}</div>}
        </div>

        <div className='date'>{date.substr(0, 4)}-{date.substr(4, 2)}-{date.substr(6, 2)} {date.substr(8, 2)}:{date.substr(10, 2)}</div>
        <MdDelete onClick={onRemove} style={{ cursor: 'pointer', color: 'red' }} />
      </div>

    </BoxBlock >
  );
}

export default BigBox;