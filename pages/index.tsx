import Link from 'next/link'
import React from 'react'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'
import CenteredLogo from '../components/Home/CenteredLogo'
import Header from '../components/Home/Header'
import { device } from '../config/theme'

const NavWrapper = styled.div`
   display: flex;
   flex-direction:column;
  flex-wrap: nowrap;
  box-sizing:border-box;
  height:100%;
  max-height:100%;
  background-color: #000313;
  min-width:100%;

  
`
const H1 = styled.div`
  color:#C0C0C4;
 font-size:40px;
  @media ${device.mobileM} {
     font-size:64px;
  }
`
const Content = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  & button{
    margin-top:70px;
    height:50px;

    padding:6px 15px;
    width:180px;
    font-size:17px;
    border-radius:30px;
    background-color:#4658B4;
        color:white;
        cursor:pointer;
  }
`
const HomePage = () => {
  return (
    <>
     <Header />
    <NavWrapper>
      <CenteredLogo />
      <Content>
         <H1>Built for the future.</H1>
         <H1>Available today.</H1> 
         <Link href="/signup">
          <button >
        Sign up for free
      </button>
         </Link>
          
      </Content>
   
    
    </NavWrapper>
    </>
    
    
  )
}

HomePage.PageLayout = DashboardLayout

export default HomePage

