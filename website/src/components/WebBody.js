import react from "react";
import styled from "styled-components";
import WebContent from "./WebContent";
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
            <WebContent />
        </WebBodyTemplate>
    );
}

export default WebBody;