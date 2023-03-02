import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { EnumDeclaration } from 'typescript'
import { device } from '../../config/theme'
import CenteredLogo from '../Home/CenteredLogo'

const Content = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width:100%;
  & button{
    margin-top:70px;
    height:50px;

    padding:6px 15px;
    width:250px;
    font-size:17px;
    border-radius:6px;
    background-color:#4658B4;
        color:white;
        cursor:pointer;
        @media ${device.mobileM} {
     width:350px;
  }
  }
  & p {
    margin-top:30px;
    font-size:14px;
    color:#C0C0C4;
  }
`
const H1 = styled.div`
  color:white;
 font-size:40px;
  @media ${device.mobileM} {
     font-size:64px;
  }
`
const WelcomeScreen = ({
  onboardingScreen,
  setOnboardingScreen,
}:{
  onboardingScreen:string;
  setOnboardingScreen:any;
}) => {
  return (
    <>
     <CenteredLogo />
      <Content>
         <H1>Welcome to Linear</H1>
         <p>Linear helps you to streamline software development, cycles and bug fixes</p> 
          <button onClick={()=>setOnboardingScreen("CONNECT_WITH_GITHUB")}>
        Get Started
      </button>
          
      </Content>
    </>
  )
}

export default WelcomeScreen