import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import {motion} from "framer-motion"



const CustomModalStyle = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y:scroll;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(3px);
  /* z-index: 99; */
  position: fixed;
`

const Wrapper = styled.div`
 z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  /* background-color: rgba(0, 0, 0, 0.2); */
  width: 100vw;
  height:100%;
  display:flex;
  justify-content:center;
  align-items:center;
`
const LoadingPage = () => {

  const menuVariants = {
    open: {
        opacity: 1,
        transition: {
            duration: 1
        }
    },
    closed: {
        opacity: 0,
        transition: {
            duration: 1
        }
    }
}

  return (
     <Wrapper>   
     {/* <Image alt="logo" src="/logo.svg" width={100} height={100} /> */}
     <motion.svg  variants={menuVariants} initial="closed" animate="open" width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect y="0.224121" width="6" height="25" rx="2" fill="#635FC7"/>
<rect opacity="0.75" x="9" y="0.224121" width="6" height="25" rx="2" fill="#635FC7"/>
<rect opacity="0.5" x="18" y="0.224121" width="6" height="25" rx="2" fill="#635FC7"/>
</motion.svg>
   <CustomModalStyle/>
   </Wrapper>
  )
}

export default LoadingPage