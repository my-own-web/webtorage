import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { MdEdit, MdDelete, MdCheck, MdClear } from 'react-icons/md';
import { useContentDispatch, useCategoryList } from "../InfoContext";

const BoxBlock = styled.div`
  // background: #F2F3F5;
  border-radius: 5px;
  border: 2px solid #DBDCF5;
  position: relative;

  width: 160px;
  height: 180px;
  overflow: clip;

  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 3px 10px 3px 10px;

  // $start 선택 체크 박스
  .cover{
    visibility: ${props => props.bChecked ? "visible" : "hidden"};

    right: 10px;
    position: absolute;
    background: rgba(0,0,0,0.1);
    width: 30px;
    height: 30px;

    display: flex;
    align-items: center;
    justify-content: center;
  }

  input[type="checkbox"]{
    cursor: pointer;
  }

  &:hover .cover{
    visibility: visible;
  }
  // $end 선택 체크 박스

  a {
    height: 18px;
    margin: 0 0 0 0;
    font-weight: bold;
    font-size: 15px;
    color: black;
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

  .image{
    width: 160px;
    height: 50px;
  }

  .memo-box {
    display: flex;
    gap: 3px;
    height: 40px;
  }

  .memo{
    padding-left: 3px;
    overflow-y: auto;
    font-size: 13px;
    font-family: sans-serif;
    border: solid 1px #DBDCF5;
  }

  .textarea{
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
    color: ${props => props.editMemo ? 'red' : 'black'}
  }

  .box-footer{
    height: 22px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    
    // flex-direction: row;
    // gap: 5px;
    // justify-content: space-between;
    // align-items: center;
  }

  .category{
    font-size: 13px;
    padding: 3px 0;
    overflow: clip;
    text-overflow: ellipsis;
    text-decoration: underline;
  }

  .date{
    font-size: 13px;
    grid-row-start: 2;
  }

  .delete-icon{
    grid-row-start: 2;
    justify-self: end;
  }

  .category-select-container{
    width: 140px;
    height: 25px;
  }

  .category-choice{
    width: 100px;
  }

`;
//박스 하나의 전체 디자인

function SmallBox({ id, category, title, data_url, image, description, date, memo, checkedItemHandler, selectAll, setSelectAll }) {
  const dispatch = useContentDispatch();
  const [editMemo, setEditMemo] = useState(false);
  const [changeMemo, setChangeMemo] = useState(memo);
  const [editCategory, setEditCategory] = useState(false);
  const [bChecked, setChecked] = useState(false);

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

  //$begin 체크박스 관련 기능

  // 체크박스 체크할 때
  const checkHandler = (e) => {
    if (selectAll) { // 체크된 전체에서 하나 해제 -> chk
      // setSelectAll(false);
      setChecked(false);
      checkedItemHandler(id, false);
    }
    else { // 각각 체크
      setChecked(!bChecked); // 체크 상태 변화
      checkedItemHandler(id, e.target.checked); // selectedItems set 수정
    }
  }

  // 전체 선택 버튼을 누를 때, selectAll값에 따라 미리보기 체크/해제
  useEffect(() => {
    // if (selectAll) { // 전체 선택 체크되면 모든 미리보기 체크 -> chk
    setChecked(selectAll);
    checkedItemHandler(id, selectAll);
    // }
  }, [selectAll]);

  //$end 체크박스 관련 기능


  return (
    <div>
      <BoxBlock editMemo={editMemo} bChecked={bChecked}>
        <div className="cover"><input type='checkbox' checked={bChecked} onChange={checkHandler} /></div>
        <a href={data_url} target='_black' title={data_url}>{title}</a>
        {/* <a href={data_url} title={data_url}>{title}</a> */}
        <div className='description' title={description}>{description}</div>
        <img src={image} className='image' />

        <div className='memo-box'>
          <textarea className='textarea' onClick={() => { setEditMemo(true) }} onChange={(onEditMemo)} value={changeMemo} />
          <button className='memo-save-button' onClick={onSaveMemo}><MdCheck /></button>
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
          <MdDelete className='delete-icon' onClick={onRemove} style={{ cursor: 'pointer', color: 'red' }} />
        </div>

      </BoxBlock >
    </div>
  );
}

export default SmallBox;