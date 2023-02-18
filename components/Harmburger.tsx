import React from 'react'
import styled from 'styled-components'
import { device } from '../config/theme'

const HarmburgerStyles = styled.div`
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    align-items:center;
    width:30px;
    cursor:pointer;
     display:block;
        @media ${device.mobileM} {
          display:none;
        }
    div{
        width:100%;
        height:3px;
        margin:2px 0;
        background-color: ${({theme}) => theme.primary};
        border-radius:5px;
       
        
    }
`

const Harmburger = ({ToggleNav}:{ToggleNav:()=>void}) => {

  return (
    <HarmburgerStyles onClick={ToggleNav}>
        {[1,2,3].map((item) => <div key={item} />)}
    </HarmburgerStyles>
  )
}

export default Harmburger