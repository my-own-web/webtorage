import react from "react";
import styled from "styled-components";
import WebContent from "./WebContent";
import { useCurrentCategory } from "./InfoContext";
import DateSearch from "./DateSearch";

const WebBodyTemplate = styled.div`
    // width: auto; //100%; // 512px;
    // height: auto; // 내용에 맞는 크기
    // min-height:600px; // 최소 크기

    position: relative; //sticky; 
    // top: 70px;
    // left: 210px;

    // background: pink; //white;
    // padding: 5px;
    // border: solid gray 1px; // dbg
`

const WebSubHeaderBlock = styled.div`
    background: white;
    height: 75px;
    position: sticky;
    top: 60px;
    z-index: 1;
    border-bottom: solid 1px;

    display: flex;
    // flex-direction: column;
    justify-content: space-between;
    padding: 0px 5px 0px 5px;
    align-items: center;
`

function WebSubHeader(){
    const currentCategory = useCurrentCategory();

    return(
        <WebSubHeaderBlock>
            <h2>Category :            {currentCategory}
            </h2>
            <DateSearch />
        </WebSubHeaderBlock>
    );
}

function WebBody(){
    return(
        <WebBodyTemplate>
            <WebSubHeader />
            <WebContent />
        </WebBodyTemplate>
    );
}

export default WebBody;