import React from 'react'
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { IconContext } from 'react-icons/lib';

import styled from "styled-components"
import { iconStyle } from '../utils/utilData';


const Toggler = styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  width:90%;
  bottom:60px;
  position:absolute;
  left:5%;
  background-color: ${({theme}) => theme.other};
  color:white;
  font-size: 20px;
  height:48px;
  font-weight: 500;
  border-radius: 10px;
  cursor:pointer;
  transition:1s all ease;
  margin:0 auto;
  &:hover{
    background-color: ${({theme}) => theme.hover};
    opacity:0.25;
  }
`


const CheckBoxWrapper = styled.div`
  position: relative;
`;
const CheckBoxLabel = styled.label`
  position: absolute;
  top: 0;
  left: 0;
  width: 50px;
  height: 26px;
  border-radius: 15px;
  background: ${({ theme }) => theme.button};
  cursor: pointer;
  &::after {
    content: "";
    display: block;
    border-radius: 50%;
    width: 18px;
    height: 18px;
    margin: 3px;
    background: #ffffff;
    box-shadow: 1px 3px 3px 1px rgba(0, 0, 0, 0.2);
    transition: 0.2s;
  }
`;
const CheckBox = styled.input`
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
      width: 18px;
      height: 18px;
      margin-left: 26px;
      transition: 0.2s;
    }
  }
`;

interface IToggle {
    toggleTheme:any;
    theme:any
}
const Toggle = ({  toggleTheme,theme }:IToggle) => {
   return (
         <Toggler>
        
       <BsSunFill style={iconStyle} />
         
        <CheckBoxWrapper >
        <CheckBox id="checkbox" type="checkbox" onClick={toggleTheme} checked={theme==="dark" ?true : false} />
        <CheckBoxLabel htmlFor="checkbox" />
      </CheckBoxWrapper>
       <BsFillMoonStarsFill style={iconStyle} />
     
      </Toggler>
     
      
    );
};

export default Toggle;