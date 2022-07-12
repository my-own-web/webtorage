import styled, { css } from "styled-components";

const Button = styled.button`
  height: 25px;
  width: auto;
  border: solid #bfbdbd 1px;
  border-radius: 7px;
  font-size: 12px;
  cursor: pointer;
  background: whitesmoke;
  &:hover{
    background: #bfbdbd;
  }
`

export default Button;