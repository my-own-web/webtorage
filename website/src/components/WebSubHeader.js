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

export default function WebSubHeader(){
    const currentCategory = useCurrentCategory();

    return(
        <WebSubHeaderBlock>
            <h2>{currentCategory}</h2>
            <DateSearch />
        </WebSubHeaderBlock>
    );
}