import React from 'react'
import styled from 'styled-components'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa'
import { iconStyle } from '../utils/utilData'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideNav } from '../state/display'

const Wrapper = styled.div<{showSideNav:boolean}>`
/* position:${({showSideNav}) => showSideNav ? 'absolute' : 'fixed'}; */
/* bottom:${({showSideNav}) => showSideNav ? '-80px' : '20px'}; */
color:#828FA3;
cursor:pointer;
width:${({showSideNav}) => showSideNav ? 'auto' : '56px'};
height:${({showSideNav}) => showSideNav ? 'auto' : '48px'};
background:${({theme,showSideNav}) => !showSideNav ? theme.button: "transparent"};
display:flex;
box-sizing:border-box;
justify-content:center;
align-items:center;
border-radius: ${({showSideNav}) => showSideNav ? '0' : '0px 100px 100px 0px'};
`
const Showside = styled.div`
  
`
const NoSide = styled.div`

`

const HideSideNav = () => {
   const { showSideNav }= useSelector((state: any) => state.display)
   const dispatch = useDispatch()
   const removesideNav = () => {
      dispatch(toggleSideNav(!showSideNav))
   }
  return (
    <Wrapper onClick={removesideNav} showSideNav={showSideNav} >
        {showSideNav ? 
        <Showside>
          <FaRegEye style={iconStyle} /> Hide SideNav 
        </Showside>
         : 
         <NoSide>
          <FaRegEyeSlash color="white" fontSize="22px" />
         </NoSide>
         }
    </Wrapper>
  )
}

export default HideSideNav