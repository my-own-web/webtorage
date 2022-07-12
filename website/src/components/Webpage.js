import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import WebHeader from './WebHeader';
import WebSidebar from './WebSidebar';
import WebSubHeader from './WebSubHeader';
import Boxes from './content/Boxes';
import { useContent, useContentDispatch } from './InfoContext';

const WebTemplateBlock = styled.div`
    // background: gray;
    // min-height: 100%;
    display: grid;
    grid-template-columns: 200px auto;
    gap: 20px;
`

const WebBodyTemplate = styled.div`
    position: relative;  
    margin-right: 20px;
    overflow-x: clip;
    // width: 83vw;
    // background: pink; //white;
    // border: solid gray 1px; // dbg
`

function Webpage() {
    const [boxSize, setBoxSize] = useState(1);
    const [selected, setSelected] = useState(false); // true: 선택된 미리보기 존재
    const [selectAll, setSelectAll] = useState(false); // 전체 선택하기 기능 on/off 여부
    const [selectedItems, setSelectedItems] = useState(new Set());
    const content = useContent();
    const dispatch = useContentDispatch();

    // 사이즈 버튼 눌렀을 때
    function onChangeSize() {
        setBoxSize(1 - boxSize);
        console.log('changesize!'); //dbg
    }

    // 체크된 미리보기들 set에서 관리
    function checkedItemHandler(id, add) {
        // console.log(id, checked);
        if (add) { // 추가
            selectedItems.add(Number(id));
            setSelectedItems(selectedItems);
        }
        else { // 삭제
            selectedItems.delete(Number(id));
            setSelectedItems(selectedItems);

        }
        console.log('selected', selectedItems, selected);
        if (selectedItems.size == 0) setSelected(false);
        else setSelected(true);
    }

    // 선택한 미리보기들 삭제
    function onClickDelete() {
        content.forEach((el) => {
            if (selectedItems.has(el.id)) {
                console.log('delete', el.id, el.category); // dbg
                dispatch({ type: 'REMOVE', id: el.id, category: el.category });
            }
        });
        selectedItems.clear();
        setSelectAll(false);
    }

    // 선택한 미리보기 카테고리 수정
    function onChangeCategory(new_category) {
        content.forEach((el) => {
            if (selectedItems.has(el.id)) {
                console.log('change category', el.id, el.category); // dbg
                dispatch({ type: 'EDITCATEGORY', id: el.id, old_category: el.category, new_category });
            }
        });
        selectedItems.clear();
        setSelectAll(false);
    }

    return (
        <>
            <WebHeader />
            <WebTemplateBlock>
                <WebSidebar />
                <WebBodyTemplate>
                    <WebSubHeader boxSize={boxSize} onChangeSize={onChangeSize} onClickDelete={onClickDelete} onChangeCategory={onChangeCategory} setSelectAll={setSelectAll} selected={selected} />
                    <Boxes boxSize={boxSize} checkedItemHandler={checkedItemHandler} selectAll={selectAll} setSelectAll={setSelectAll} />
                </WebBodyTemplate>
            </WebTemplateBlock>
        </>
    );
}

export default Webpage;