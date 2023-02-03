import styled, { css } from "styled-components";
import {darken} from "polished";

const Button = styled.button`
  height: 25px;
  width: auto;
  border: none; //solid #bfbdbd 1px;
  border-radius: 7px;
  font-size: 12px;
  cursor: pointer;
  background: ${props => props.background ? props.background : "whitesmoke"};
  &:hover{
    background: ${props => props.background ? darken(0.05, props.background) : darken(0.05, "whitesmoke")}; //#bfbdbd 보다 밝음
  }
`

export default Button;