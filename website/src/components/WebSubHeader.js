import react, { useState } from "react";
import styled from "styled-components";
import { useCurrentCategory, useCategoryList } from "./InfoContext";
import DateButton from "./DateButton";
import Button from "./design/Button";
import { MdCheck } from "react-icons/md";

const WebSubHeaderBlock = styled.div`
    background: white;
    height: 70px;
    position: sticky;
    top: 60px; //chk
    z-index: 1;
    border-bottom: solid 1px;

    display: grid;
    grid-template-columns: 1fr 50px 50px 130px 75px 75px 170px; //각각 button(item들) 사이 간격 결정
    gap: 5px;
    // grid-template-rows: 1fr 1fr;
    align-items: center;

    // display: flex;
    // // flex-direction: column;
    // justify-content: space-between;
    // padding: 0px 5px 0px 5px;

    .all-checkbox{
    }

    .select-button{
        grid-column-start: 5;
    }

    .size-button{
    }

    .category-select-container{
    width: 130px;
    height: 25px;
    text-decoration: underline;
    }

  .category-choice{
    width: 100px;
    }

  .change-category-button{
    cursor: pointer;
    height: 20px;
    width: 20px;
    padding: 0 0 0 0;
    border: solid 1px #DBDCF5;
    }

    .delete-button{
        // width: 45px;
        // height: 20px;
        // padding: 3px 3px;
        // border: solid 1px #DBDCF5;
        cursor: pointer;
    }
`

export default function WebSubHeader({ boxSize, onChangeSize, select, onClickSelect, onClickDelete, onChangeCategory }) {
    const currentCategory = useCurrentCategory();

    // $begin category select dropbox
    const cglist = useCategoryList();
    const [input, setInput] = useState('');

    const onChange = (e) => {
        setInput(e.target.value);
    }

    const onInput = (e) => {//엔터키로도 입력 가능하도록
        if (e.key == 'Enter') {
            onChangeCategory(input);
            setInput('');
        }
    };

    const onSaveCategory = () => {
        onChangeCategory(input);
        setInput('');
    }
    // $end category select dropbox

    return (
        <WebSubHeaderBlock>
            <h2>{currentCategory}</h2>
            {select ?
                <>
                    <div className="all-checkbox" select={select}>
                        전체<input type='checkbox' />
                    </div>
                    <button className="delete-button" onClick={onClickDelete}>삭제</button>
                    <div>
                        <input list="category-list" className="category-choice" name="category-choice" placeholder="카테고리 변경" onChange={onChange} value={input} onKeyPress={onInput} />

                        <datalist id="category-list">
                            {cglist.map((cg) => (
                                <option value={cg.name}></option>
                            ))}
                        </datalist>

                        <button className="change-category-button" onClick={onSaveCategory}><MdCheck /></button>
                    </div>
                </> : ''}
            <Button className='select-button' onClick={() => { onClickSelect() }}>{select ? '선택취소' : '선택하기'}</Button>
            <Button className='size-button' onClick={() => {
                onChangeSize();
            }}>{boxSize ? "작게보기" : "크게보기"}</Button>
            <DateButton className='date-button' />
        </WebSubHeaderBlock>
    );
}