import react from "react";
import styled from "styled-components";
import { useCurrentCategory } from "./InfoContext";
import DateButton from "./DateButton";

const WebSubHeaderBlock = styled.div`
    background: white;
    height: 70px;
    position: sticky;
    top: 60px; //chk
    z-index: 1;
    border-bottom: solid 1px;

    display: grid;
    grid-template-columns: 1fr 75px 200px;
    gap: 5px;
    // grid-template-rows: 1fr 1fr;
    align-items: center;

    // display: flex;
    // // flex-direction: column;
    // justify-content: space-between;
    // padding: 0px 5px 0px 5px;
`
const SizeButton = styled.button`
  height: 25px;
  width: 75px;
  background: #E5B2FF;
  border: solid purple 1px;
  border-radius: 7px;
  font-size: 12px;
  cursor: pointer;
  &:hover{
      background: #dd9ffc;
  }
`
export default function WebSubHeader({boxSize, onClick}){
    const currentCategory = useCurrentCategory();
    
    console.log('subheader boxSize', boxSize); // dbg

    return(
        <WebSubHeaderBlock>
            <h2>{currentCategory}</h2>
            <SizeButton onClick={() => {
                onClick();
            }}>{boxSize ? "작게보기" : "크게보기"}</SizeButton>
            <DateButton />
        </WebSubHeaderBlock>
    );
}