import react, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCurrentCategory, useCategoryList } from "./InfoContext";
import DateButton from "./DateButton";
import Button from "./design/Button";
import { MdCheck } from "react-icons/md";

const WebSubHeaderBlock = styled.div`
    background: white;
    height: 75px;
    position: sticky;
    top: 60px; //chk
    z-index: 1;
    border-bottom: solid 1px;
    padding: 0px 17px 6px 16px;
    margin-bottom: 5px;

    display: grid;
    grid-template-rows: 40px 30px;
    grid-template-columns: 25px 60px 50px 150px 1fr;
    gap: 5px;
    align-items: center;

    h2{
        grid-row-start: 1;
        grid-column: 1/4;
        margin: 0;
    }

     .add-button{
        background: black;
        color: white;
        width: 62px;
        grid-row-start: 2;
        grid-column-start: 2;
    }

    .container{
        height: 25px;
        background: whitesmoke;
        border: solid #bfbdbd 1px;
        border-radius: 7px;
        box-sizing: border-box;
    }
    .all-checkbox-container{
        grid-column-start: 1;
        grid-row-start: 2;
        width: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .all-checkbox{
        cursor: pointer;
    }

    .size-button{
    }

    .category-select-container{
        background-color: white;
        width: 150px;
        display: flex;
        gap: 1px;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
        background: white;

        grid-row-start: 2;
        grid-column-start: 4;
    }

  .category-choice{
        height: 20px;
        width: 110px;
        border: none;
    }

  .change-category-button{
        background: white;
        &:hover{
            background: #bfbdbd;
        }
        box-sizing: border-box;
      width: 20px;
      height: 20px;
      border-radius: 0px;
      border: none;
        padding: 1px;

    }

    .delete-button{
        background: white;
         &:hover{
            background: #bfbdbd;
        }
        grid-row-start: 2;
        grid-column-start: 3;
    }

    .date-button{
    }

    .right-button-group{
        display: flex;
        gap: 5px;
        grid-row-start:2;
        grid-column-start: 5;
        justify-content: right;
    }
`

export default function WebSubHeader({ boxSize, onChangeSize, onClickDelete, onChangeCategory, setSelectAll, selected }) {
    const currentCategory = useCurrentCategory();
    const navigate = useNavigate();

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

    function onClickCreate() {
        navigate("/create");
    }

    return (
        <WebSubHeaderBlock>
            <h2>{currentCategory}</h2>
            <div className="container all-checkbox-container"><input className="all-checkbox" type='checkbox' onChange={(e) => setSelectAll(e.target.checked)} /></div>
            <Button className="add-button" onClick={onClickCreate}>추가하기</Button>
            {selected ?
                <>
                    <div className="container category-select-container">
                        <input list="category-list" className="category-choice" name="category-choice" placeholder="카테고리 변경" onChange={onChange} value={input} onKeyPress={onInput} />

                        <datalist id="category-list">
                            {cglist.map((cg) => (
                                <option value={cg.name}></option>
                            ))}
                        </datalist>

                        <Button className="change-category-button" onClick={onSaveCategory}><MdCheck /></Button>
                    </div>
                    <Button className="delete-button" onClick={onClickDelete}>삭제</Button>
                </> : ""}
            <div className="right-button-group">
                <Button className='size-button' onClick={() => {
                    onChangeSize();
                }}>{boxSize ? "작게보기" : "크게보기"}</Button>
                <DateButton className='date-button' />
            </div>
        </WebSubHeaderBlock>
    );
}