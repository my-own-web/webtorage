import react from "react";
import styled from "styled-components";
import { useCurrentCategory } from "./InfoContext";
import DateSearch from "./DateSearch";

const WebSubHeaderBlock = styled.div`
    background: white;
    height: 70px;
    position: sticky;
    top: 60px; //chk
    z-index: 1;
    border-bottom: solid 1px;

    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    padding: 0px 5px 0px 5px;
    align-items: center;
`
const SizeButton = styled.button`
  height: 25px;
  background: #E5B2FF;
  border: solid purple 1px;
  border-radius: 7px;
  font-size: 12px;
  cursor: pointer;
`
export default function WebSubHeader({boxSize, onClick}){
    const currentCategory = useCurrentCategory();
    
    console.log('subheader boxSize', boxSize); // dbg

    return(
        <WebSubHeaderBlock>
            <h2>{currentCategory}</h2>
            <DateSearch />
            <SizeButton onClick={() => {
                onClick();
            }}>{boxSize ? "작게보기" : "크게보기"}</SizeButton>
        </WebSubHeaderBlock>
    );
}