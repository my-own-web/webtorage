import React, { useState } from 'react';
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
    // 사용 안 하는 중
    position: relative;  
    margin-right: 20px;
    // background: pink; //white;
    // border: solid gray 1px; // dbg
`

function Webpage() {
    const [boxSize, setBoxSize] = useState(1);
    const [select, setSelect] = useState(false);
    const [selectedItems, setSelectedItems] = useState(new Set());
    const content = useContent();
    const dispatch = useContentDispatch();

    // 사이즈 버튼 눌렀을 때
    function onChangeSize() {
        setBoxSize(1 - boxSize);
        console.log('changesize!'); //dbg
    }

    // 선택 버튼 눌렀을 때
    function onClickSelect() {
        if (!select) {
            selectedItems.clear();
        }
        setSelect(!select);
    }

    // 체크 박스 체크할 때
    function onCheck(e) {
        // Number() 사용하지 않으면 string으로 들어감
        if (e.target.checked) {
            selectedItems.add(Number(e.target.id));
        }
        else {
            selectedItems.delete(Number(e.target.id));
        }
        console.log('selected', selectedItems);
    }

    // 선택한 미리보기들 삭제
    function onClickDelete() {
        content.forEach((el) => {
            if (selectedItems.has(el.id)) {
                console.log(el.id, el.category); // dbg
                dispatch({ type: 'REMOVE', id: el.id, category: el.category });
            }
        });
        selectedItems.clear();
        setSelect(false);
    }

    return (
        <>
            <WebHeader />
            <WebTemplateBlock>
                <WebSidebar />
                <WebBodyTemplate>
                    <WebSubHeader boxSize={boxSize} onChangeSize={onChangeSize} select={select} onClickSelect={onClickSelect} onClickDelete={onClickDelete} />
                    <Boxes boxSize={boxSize} select={select} onCheck={onCheck} />
                </WebBodyTemplate>
            </WebTemplateBlock>
        </>
    );
}

export default Webpage;