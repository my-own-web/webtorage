import React, { useState } from 'react';
import styled from 'styled-components';
import { MdDelete, MdCheck } from 'react-icons/md';

const BoxBlock = styled.div`
  // overflow-y: auto; /*자식요소에서 아래 내용이 넘칠 때 스크롤바 사용*/
  // background: #F2F3F5;
  border-radius: 5px;
  border: 2px solid #DBDCF5;
  position: relative;

  width: 280px;
  height: 260px;
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

  textarea{
    width: 258px; //
    height: 50px; //
    resize: none;
    padding-left: 3px;
    font-size: 13px;
    font-family: sans-serif;
    border: solid 1px #DBDCF5;
  }

  .memo-save-button{
    cursor: pointer;
    height: 20px;
    width: 20px;
    padding: 0 0 0 0;
    border: solid 1px #DBDCF5;
    color: black;
  }

  .box-footer{
    height: 22px;
    display: flex;
    flex-direction: row;
    gap: 5px;
    justify-content: space-between;
    align-items: center;
  }

  .category{
    font-size: 13px;
    padding: 3px 0;
    overflow: clip;
    text-overflow: ellipsis;
  }

  .date{
    font-size: 13px;
  }

  .category-select-container{
    width: 140px;
    height: 25px;
    text-decoration: underline;
  }

  .category-choice{
    width: 100px;
  }
`;
//박스 하나의 전체 디자인

/* 읽을 수만 있는 미리보기. 수정/삭제 불가능. */
function BigBoxReadonly({ category, title, data_url, image, description, date, memo }) {

  return (
    <div>
      <BoxBlock>
        <div className="cover"><input type='checkbox' /></div>
        <h3 title={title}>{title}</h3>
        <a href={data_url} title={data_url}>{data_url}</a>
        <div className='description' title={description}>{description}</div>
        <img src={image} width='280px' height='100px' />

        <div className='memo-box'>
          <textarea readOnly value={memo} />
          <button className='memo-save-button'><MdCheck /></button>
        </div>

        <div className='box-footer'>
          <div className='category-select-container'>
            <div className='category' style={{ cursor: 'pointer' }}>{category || "DEFAULT"}</div>
          </div>
          {/* category에 빈 문자열이 오면 "DEFAULT" 설정 */}

          <div className='date'>{date.substr(0, 4)}-{date.substr(4, 2)}-{date.substr(6, 2)} {date.substr(8, 2)}:{date.substr(10, 2)}</div>
          <MdDelete style={{ cursor: 'pointer', color: 'red' }} />
        </div>

      </BoxBlock >
    </div>
  );
}

export default BigBoxReadonly;