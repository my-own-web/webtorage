import react from "react";
import styled from "styled-components";
import { useCurrentCategory } from "./InfoContext";
import DateButton from "./DateButton";
import Button from "./design/Button";

const WebSubHeaderBlock = styled.div`
    background: white;
    height: 70px;
    position: sticky;
    top: 60px; //chk
    z-index: 1;
    border-bottom: solid 1px;

    display: grid;
    grid-template-columns: 1fr 50px 75px 90px 75px 75px 170px; //각각 button(item들) 사이 간격 결정
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
`

export default function WebSubHeader({ boxSize, onChangeSize, select, onClickSelect, onClickDelete }) {
    const currentCategory = useCurrentCategory();

    console.log('subheader boxSize', boxSize); // dbg

    return (
        <WebSubHeaderBlock>
            <h2>{currentCategory}</h2>
            {select ?
                <>
                    <div className="all-checkbox" select={select}>
                        전체<input type='checkbox' />
                    </div>
                    <Button onClick={onClickDelete}>삭제</Button>
                    <Button>카테고리 수정</Button>
                </> : ''}
            <Button className='select-button' onClick={() => { onClickSelect() }}>{select ? '선택취소' : '선택하기'}</Button>
            <Button className='size-button' onClick={() => {
                onChangeSize();
            }}>{boxSize ? "작게보기" : "크게보기"}</Button>
            <DateButton className='date-button' />
        </WebSubHeaderBlock>
    );
}