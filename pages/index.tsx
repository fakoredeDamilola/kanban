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
  background-image: linear-gradient(to right, #14143693, #4b00e029);
  /* background-image:linear-gradient(92.88deg, rgb(69, 94, 181) 9.16%, rgb(86, 67, 204) 43.89%, rgb(103, 63, 215) 64.72%); */
  min-width:100%;

  
`
const H1 = styled.div`
 font-size:40px;
 font-weight:500;
 background-color: #4f4f738b;
  
  /* Create the gradient. */
  background-image: linear-gradient(45deg, #fffeff, #4f4f738b);
  
  /* Set the background size and repeat properties. */
  background-size: 100%;
  background-repeat: repeat;

  /* Use the text as a mask for the background. */
  /* This will show the gradient as a text color rather than element bg. */
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
    x:'-100vw'
  },
  visible:{
    opacity:1,
    x:0,
    transition:{
      duration:2,
      type:'spring',
      stiffness:120,
    }
  }
}

const textVariants = {
  hidden: {
     y:'-100vh',
     opacity:0
  },
  visible:{
    opacity:1,
    y:0,
    transition:{
      type:'spring',
      delay:0.5,
      stiffness:320,
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
      delay:1,
      duration:0.1,
      ease:'easeInOut'
      // staggerChildren:0.4
    }
  }
}

const HomePage = () => {
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

