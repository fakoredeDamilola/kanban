import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'
import {motion} from "framer-motion"

const Picture = styled.div<{padding?:string}>`
width:100%;
padding:${({padding})=>padding ?? "50px 0"};
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;

& >div{
  font-size:20px;
  margin-top:20px;
  color:#D1D2DF;
}    
`
const Container = styled.div`
  margin-top:40px;
`

const logoVariants = {
  hidden:{
    opacity:0,
    x:-140
  },
  visible:{
    opacity:1,
    x:0,
    transition:{
      duration:0.5,
    }
  }
}
const pathVariants = {
  hidden: {
    opacity: 0,
    pathLength: 0,
  },
  visible: {
    opacity: 1,
    pathLength: 1,
    transition: { 
      duration: 0.54,
      ease: "easeInOut",
    }
  }
};


const CenteredLogo = ({size,text,padding}:{size?:number;padding?:string;text?:string}) => {
  return (
    <Container drag 
    dragConstraints={{left:0,top:0,right:0,bottom:0}}
    dragElastic={0.2} as={motion.div} 
    
    variants={logoVariants}
    initial="hidden"
    animate="visible"
    >
              <Picture padding={padding}>
        {/* <Image alt="logo" src="/logo.svg" width={size ?? 100} height={size ?? 100} /> */}
        <motion.svg variants={pathVariants}  initial="hidden"
    animate="visible" width="114" height="99" viewBox="0 0 114 99" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect x="42" width="30" height="99" rx="10" fill="#635FC7"/>
<rect opacity="0.75" width="30" height="99" rx="10" fill="#635FC7"/>
<rect opacity="0.5" x="84" width="30" height="99" rx="10" fill="#635FC7"/>
</motion.svg>




        {text && <div>{text}</div>}
        </Picture>
    </Container>

  )
}

export default CenteredLogo