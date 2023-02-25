import React from 'react'
import { BsFillMoonStarsFill, BsSunFill } from 'react-icons/bs';
import { useSelector } from 'react-redux';

import styled from "styled-components"
import { RootState } from '../state/store';
import { iconStyle } from '../utils/utilData';
import Checkbox from './Checkbox';


const Toggler = styled.div<{showSideNav:boolean}>`
  display:flex;
  justify-content:center;
  align-items:center;
  display:${({showSideNav}) => !showSideNav ? "none" : "flex"};
  width:200px;
  bottom:60px;
  position:absolute;
  left:2%;
  background-color: ${({theme}) => theme.other};
  color:white;
  font-size: 20px;
  height:48px;
  font-weight: 500;
  border-radius: 10px;
  z-index:999;
  cursor:pointer;
  transition:1s all ease;
  margin:0 auto;
  &:hover{
    /* background-color: ${({theme}) => theme.hover}; */
    /* opacity:0.25; */
  }
`



interface IToggle {
    toggleTheme:any;
    theme:any
}
const Toggle = ({  toggleTheme,theme }:IToggle) => {
  const {showSideNav} = useSelector((state:RootState) => state.display)
   return (
    <>
             <Toggler showSideNav={showSideNav}>
        
       <BsSunFill style={iconStyle} />
         
        <Checkbox toggleTheme={toggleTheme} name="toggle" theme={theme} />
       <BsFillMoonStarsFill style={iconStyle} />
     
      </Toggler>
    </>

     
      
    );
};

export default Toggle;