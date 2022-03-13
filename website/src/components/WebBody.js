import react from "react";
import styled from "styled-components";
import Boxes from "./content/Boxes";
import WebSubHeader from "./WebSubHeader";

const WebBodyTemplate = styled.div`
    // 사용 안 하는 중
    position: relative;    
    // background: pink; //white;
    // border: solid gray 1px; // dbg
`

function WebBody(){
    return(
        <WebBodyTemplate>
            <WebSubHeader />
            <Boxes />
        </WebBodyTemplate>
    );
}

export default WebBody;