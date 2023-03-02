import react, { useEffect, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useCurrentCategory, useCategoryList, useUserLoginId, useCategoryAction } from "./InfoContext";
import DateButton from "./DateButton";
import Button from "./design/Button";
import { MdCheck, MdDelete } from "react-icons/md";
import { lighten } from "polished";

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
    grid-template-columns: 25px 150px 50px 1fr;
    gap: 5px;
    align-items: center;

    .category-container{
        grid-row-start: 1;
        grid-column: 1/6;

        display: flex;
        align-items: center;
        gap: 5px;
    }

    h2{
        margin: 0;
        overflow: clip;
        text-overflow: ellipsis;
    }

    .category-delete-icon{
        color: red;
        font-size: 20px;
        cursor: pointer;
    }

    .add-button{
        background: black;
        color: white;
        &:hover{
            background: ${lighten(0.3, "black")};
        }
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
        border: none;
    }
    .all-checkbox{
        cursor: pointer;
    }

    .size-button{
        // padding: 0px 6px;
        white-space: nowrap;
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
        grid-column-start: 2;
    }

  .category-choice{
        height: 20px;
        width: 120px;
        border: none;
        border-radius: 5px;
    }

  .change-category-button{
        cursor: pointer;
        &:hover{
            color: red;
        }
        box-sizing: border-box;
        font-size: 18px;
    }

    .delete-button{
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
    const userLoginId = useUserLoginId();
    const categoryAction = useCategoryAction();

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
        if (userLoginId) navigate("/create");
        else navigate("/login");
    }

    // TODO delete category
    const onDeleteCategory = () => {
        if (currentCategory.size > 0) {
            alert("빈 카테고리만 삭제할 수 있습니다.");
        }
        else {
            categoryAction({ type: "DELETE", clientId: userLoginId, id: currentCategory.id });
        }
    }

    return (
        <WebSubHeaderBlock>
            <div className="category-container">
                <h2>{currentCategory.name}</h2>
                {currentCategory.name == "ALL" || currentCategory.name == "DEFAULT" ? "" :
                    <MdDelete className="category-delete-icon" onClick={onDeleteCategory} />
                }
            </div>

            <div className="container all-checkbox-container"><input className="all-checkbox" type='checkbox' onChange={(e) => setSelectAll(e.target.checked)} /></div>
            {selected ?
                <>
                    <div className="container category-select-container">
                        <input list="category-list" className="category-choice" name="category-choice" placeholder="카테고리 변경" onChange={onChange} value={input} onKeyPress={onInput} />

                        <datalist id="category-list">
                            {cglist.map((cg) => (
                                <option value={cg.name}></option>
                            ))}
                        </datalist>

                        <MdCheck className="change-category-button" onClick={onSaveCategory} />
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