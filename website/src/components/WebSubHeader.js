import react, { useEffect, useState } from "react";
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
    grid-template-columns: 1fr 25px 150px 50px 75px 75px 170px; //각각 button(item들) 사이 간격 결정
    gap: 5px;
    align-items: center;

    .container{
        height: 25px;
        background: whitesmoke;
        border: solid #bfbdbd 1px;
        border-radius: 7px;
        box-sizing: border-box;
    }
    .all-checkbox-container{
        width: 25px;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .all-checkbox{
        cursor: pointer;
    }

    .select-button{
        grid-column-start: 5;
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
    }
`

export default function WebSubHeader({ boxSize, onChangeSize, select, onClickSelect, onClickDelete, onChangeCategory, setSelectAll }) {
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

    // 선택취소 했을 때 카테고리 선택 취소
    useEffect(() => {
        if (!select) setInput('');
    }, [select]);

    return (
        <WebSubHeaderBlock>
            <h2>{currentCategory}</h2>
            {select ?
                <>
                    <div className="container all-checkbox-container"><input className="all-checkbox" type='checkbox' onChange={(e) => setSelectAll(e.target.checked)} /></div>
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
                </> : ''}
            <Button className='select-button' onClick={() => { onClickSelect() }}>{select ? '선택취소' : '선택하기'}</Button>
            <Button className='size-button' onClick={() => {
                onChangeSize();
            }}>{boxSize ? "작게보기" : "크게보기"}</Button>
            <DateButton className='date-button' />
        </WebSubHeaderBlock>
    );
}