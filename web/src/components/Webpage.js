import React from 'react';
import styled from 'styled-components';
import WebHeader from './WebHeader';
import WebSidebar from './WebSidebar';
import Boxes from './Boxes';
//import WebContent from './WebContent';

/*const WebTemplateBlock = styled.div`
    //background: gray;
    height: 100%;
    //display: grid;
    display: flex;  ////
    //grid-template-columns: 1fr 1fr//150px auto;
    padding: 0 10px 0 10px;
`


function Webpage() {
  return (
    <>
      <WebHeader />
      <WebTemplateBlock>
        <WebSidebar />
        <Boxes />
      </WebTemplateBlock>
      {/* <WebTemplateBlock>
        <WebSidebar />
        <WebContentBlock />
      </WebTemplateBlock> *///}
/*</>
  );
}*/

const WebTemplateBlock = styled.div`
    // background: gray;
    // min-height: 100%;
    display: grid;
    grid-template-columns: 200px auto;
    gap: 20px;
`

function Webpage() {
  return (
    <>
      <WebHeader />
      <WebTemplateBlock>
        <WebSidebar className="sidebar" />
        <Boxes className="content" />
      </WebTemplateBlock>
    </>
  );
}

export default Webpage;