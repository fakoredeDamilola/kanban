import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'
import CustomButton from '../CustomButton'
import CenteredLogo from '../Home/CenteredLogo'

const Content = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  width:100%;
  background-color: #191A23;
  & p {
    margin-top:30px;
    font-size:14px;
    color:#C0C0C4;
  }
`
const H1 = styled.div`
  color:white;
 font-size:40px;
 background-color: #4f4f738b;
  background-image: linear-gradient(45deg, #fffeff, #4f4f738b);
  background-size: 100%;
  background-repeat: repeat;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent; 
  -moz-background-clip: text;
  -moz-text-fill-color: transparent;
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
         <H1>Welcome to Kanban</H1>
         <p>Kanban helps you to streamline software development, cycles and bug fixes</p> 
          <CustomButton
          disabled={false}
          color="white"
          hover="#848598"
          background='button'
          mobileWidth="350px"
          width="250px"
          margin="30px"
          onClick={()=>setOnboardingScreen("CONNECT_WITH_GITHUB")}>
        Get Started
      </CustomButton>
          
      </Content>
    </>
  )
}

export default WelcomeScreen