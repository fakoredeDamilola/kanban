import { motion } from 'framer-motion'
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
  overflow-x:hidden;
  height:100%;
  max-height:100%;
  /* background-color: #000313; */
  background: radial-gradient(100% 100% at 50% 0%, #011628 0%, #001120 100%);
 
  @media ${device.mobileM} {
     &::before{
    content:"";
    position: absolute;
width: 800px;
margin:0 auto;
height: 800px;
left: 201px;
top: -400px;
border-radius:50%;
background: #01111E;
box-shadow: 0px 4px 50px rgba(7, 97, 169, 0.1);
  }
  }
  min-width:100%;

  
`
const H1 = styled.div`
 font-size:30px;
 font-weight:500;
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
const Content = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  & button{
    margin-top:70px;
    height:50px;
    border:none;
    padding:6px 15px;
    width:180px;
    font-size:17px;
    border-radius:30px;
    background-color:rgb(79, 82, 180);
    /*  */
        color:white;
        cursor:pointer;
        transition:0.3s all; 
        &:hover{
    box-shadow: 20px -3px 72px 1px rgba(79,82,180,0.75);
  }
  }
 
`
const bodyVariants = {
  hidden:{
    opacity:0,
    y:'-10vh'
  },
  visible:{
    opacity:1,
    y:0,
    transition:{
      duration:0.5,
      type:'spring',
      ease:'easeOut'
      // stiffness:120,
    }
  }
}

const textVariants = {
  hidden: {
     y:'-15vh',
     opacity:0
  },
  visible:{
    opacity:1,
    y:0,
    transition:{
      type:'spring',
      ease:'easeOut',
      delay:0.2,
      // stiffness:320,
      // staggerChildren:0.4
    }
  }
}
const buttonVariants = {
  hidden: {
     y:'-10px',
     opacity:0
  },
  visible:{
    opacity:1,
    y:0,
    transition:{
      type:'spring',
      delay:0.4,
      duration:0.2,
      ease:'easeOut'
      // staggerChildren:0.4
    }
  }
}

const HomePage = () => {
  const cloudName = process.env.NEXT_PBLIC_CLOUDNAME
  console.log({cloudName})
  return (
    <>
     <Header />
    <NavWrapper>
      <CenteredLogo />
      <Content as={motion.div}>
         <H1 as={motion.h1} variants={textVariants}  initial="hidden"
    animate="visible" >Built for the future.</H1>
         <H1 as={motion.h1} initial="hidden"
    animate="visible" variants={bodyVariants} >Available today.</H1> 
         <Link href="/signup">
          <motion.button variants={buttonVariants}  initial="hidden"
    animate="visible"  >
        Sign up for free
      </motion.button>
         </Link>
         
      </Content>
    
    </NavWrapper>
    </>
    
    
  )
}

HomePage.PageLayout = DashboardLayout

export default HomePage

