import React from 'react'
import styled from 'styled-components';



const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label<{width?:string;height?:string;ml?:string;}>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${({width}) => width ? "25px" : "50px"};
    height:${({height}) => height ? "15px" : "26px"};
  border-radius: 15px;
  background: ${({ theme }) => theme.button};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: ${({width}) => width ? width : "18px"};
    height:${({height}) => height ? height : "18px"};
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input<{width?:string;height?:string;ml?:string;}>`
  opacity: 0;
  z-index: 1;
  border-radius: 15px;
  width: 50px;
  height: 26px;
  &:checked + ${CheckBoxLabel} {
    background: ${({ theme }) => theme.button};
    &::after {
      content: "";
      display: block;
      border-radius: 50%;
      width: ${({width}) => width ? width : "18px"};
    height:${({height}) => height ? height : "18px"};
      margin-left: 26px;
      transition: 0.2s;
    }
  }
`;
interface IToggle {
    toggleTheme:any;
    theme:any;
    width?:string;
    height?:string;
    ml?:string;
    name:string
}
const Checkbox = ({  toggleTheme,theme,width,height,ml,name }:IToggle) => {
  return (
    <CheckBoxWrapper >
          
    <CheckBox id="checkbox" type="checkbox" name={name} width={width} height={height} ml={ml} onClick={toggleTheme} checked={theme==="dark" ?true : false} />
    <CheckBoxLabel htmlFor="checkbox"  width={width} height={height} ml={ml}/>
  </CheckBoxWrapper>
  )
}

export default Checkbox