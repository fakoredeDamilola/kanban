import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'
import Harmburger from '../Harmburger'


const HeaderStyles = styled.div`
  padding:7px 10px;
  display:flex;
  justify-content:space-between;
  position:fixed;
    & > div {
        display:flex;
    }
/* background: rgba(66, 58, 58, 1); */
background: #011221;
width:100%;
z-index:999;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
/* backdrop-filter: blur(5px); */
/* -webkit-backdrop-filter: blur(5px); */
box-sizing:border-box;
border-bottom: 1px solid rgba(255, 255, 255, 0.3);

`
const Logo = styled.div`
    display:flex;
    color:white;
    align-items:center;
    gap:8px;
`
const List = styled.ul<{toggle:boolean}>`
 background:#000212;
 list-style-type:none;
 top:45px;
 position:fixed;
  cursor:pointer;
  font-size:14px;
  color:white; 
  flex: 0 0 auto;
 padding:0 10px;
 padding-top: 20px;
 box-sizing:border-box;
 background-color: ${({theme}) => theme.sidenav};
 width:100%;
 color: ${({theme}) => theme.primary};
 min-height:100%;
 /* height:100%; */
 height:500px;
 z-index:99;
left:${({toggle}) => toggle ? '0' : '-100%'};
transition:all 0.3s; 
  @media ${device.mobileM} {
    height:auto;
  margin-left:50px; 
  padding-top:0;
    position:static;
    background:transparent;
    left:0%;
    display:flex;
    align-items:center;
  gap:10px;
}
& >div{
    padding:15px 0;
    border-top: 1px solid ${({theme}) => theme.border};
    border-bottom: 1px solid ${({theme}) => theme.border};
    &:hover{
        color:#4658B4;
    }
    @media ${device.mobileM} {
    padding:0;
    border:0;
    
}
}
`
const ButtonWrapper = styled.div`
    display:flex;
    gap:10px;
    align-items:center;
    font-size:13px;
    & div{
        color:white;
        cursor:pointer;
        &:hover{
            color:#4658B4;
        }
    }
    button {
        border-radius:20px;
        height:30px;
        border:none;
        width:80px;
        background-color:#4658B4;
        color:white;
        cursor:pointer;
        transition:0.3s all;
        &:hover{
            text-shadow: 4px 3px 5px rgba(0,0,0,0.49);
        }
    }
`

const Header = () => {
    const [ToggleNav,setToggleNav] = useState(false)
  return (
    <HeaderStyles>
        <div>
             <Logo>
            <Image alt="logo" src="/logo.svg" width={30} height={30} />
            <div>Kanban</div>
        </Logo>
        <List toggle={ToggleNav}>
    {
        ["Features","Methods","Customers","Integrations","Pricing"].map((item,index)=>{
            return (
                <div key={index}>
                    {item}
                </div>
            )
        })
    }
        </List>
        </div>
       
        
        <ButtonWrapper>
            <Link href="/signin"><div>Log in</div></Link>
            <Link href="/signup"><button>Sign up</button></Link>
            <Harmburger ToggleNav={()=>setToggleNav((nav)=>!nav)}/>
        </ButtonWrapper>

    </HeaderStyles>
  )
}

export default Header