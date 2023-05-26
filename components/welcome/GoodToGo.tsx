import React from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'
import {CgShortcut} from "react-icons/cg"
import { AiOutlineCompress } from 'react-icons/ai'
import { GrDocumentUser } from 'react-icons/gr'
import { IconContext } from 'react-icons'
import { HiOutlineUserGroup } from 'react-icons/hi'
import Link from 'next/link'
import { motion } from 'framer-motion'
const Container = styled.div`
    width:100%;
`
const MainText = styled.div`
  text-align:center;
  color:white;
  margin-top:30px;
  & > p {
  margin-top:30px;
  font-size:14px;
  color:#D1D2DF;
  }
`

const Wrapper= styled.div`
  margin:20px 0;
  @media ${device.mobileM} {
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:75%;
    margin:0 auto;
    margin-top:20px;
  }
`
const ButtonDiv = styled.div`
width:100%;
        margin-top:20px;
        text-align:center;
   & button {
    color:white;
        font-size:15px;
        border:0;
        height:45px;
    border-radius:4px;
        cursor:pointer;
     margin:0 auto;
     width:50%;
     transition:0.3s all;
      background-color:#666BE1;
     
        
 }
`
const TextArea = styled.div`
width:90%;
margin:0 auto;
font-size:13px;
& > textarea {
    margin-top:5px;
    width:100%;
    height:80px; 
    background:#151621;
    padding:10px;
    border:1px solid rgb(57, 58, 75);
    border-radius:4px;
    resize: none; 
    box-sizing:border-box;
}

`
const GridDiv = styled.div`
margin:30px 0;
   @media ${device.mobileS} {
    display:flex;
    width:100%;
   
  }   
`
const Grid = styled.div`
  width:90%;
  padding:30px 40px;
  border:1px solid rgb(57, 58, 75);
    border-radius:4px;
    @media ${device.mobileS} {
    width:100%;
   
  } 
`
const Content = styled.div`
  color:white; 
  margin:10px 0; 
  h4{
    font-size:17px;
  }
  p {
    font-size:14px;
    margin-top:10px;
  }
`


const initialVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    // transition: {
     
    // },
  },
};
const mainVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
    // transition: {
     
    // },
  },
};
const GoodToGo = ({workspaceID}:{workspaceID:string}) => {
  return (
    <Container variants={mainVariants} as={motion.div} initial="hidden" animate="visible">
    <Wrapper >
    
<MainText as={motion.div} variants={initialVariants}   transition={{
      duration: 0.3,
      ease: "easeOut",
      
    }}>
 <h1>You're good to go</h1>
<p>Next, explore the features and create issues by pressing c when you're in the app.</p>
</MainText>
<IconContext.Provider
      value={{ color: 'white', size: '70px' }}
    >
<GridDiv  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.3
    }}>
<Grid>
   <div>
    <HiOutlineUserGroup />
    </div> 
    <Content>
        <h4>Tell your team</h4>
        <p>Make sure to invite your team members</p>
    </Content>
</Grid>
<Grid>
<div>
    <AiOutlineCompress />
</div>
<Content>
        <h4>Integrate Github</h4>
        <p>Link your pull request and create issues from comments</p>
    </Content>
</Grid>
<Grid>
<div>
    <CgShortcut/>
</div>
<Content>
        <h4>Keyboard shortcuts</h4>
        <p>Learn the keyboard shortcuts bt pressing ?</p>
    </Content>
</Grid>
</GridDiv>
</IconContext.Provider>
<ButtonDiv  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.6
    }}>
    <Link href={`/${workspaceID}`}>
    <button >
Open Kanban
</button>
    </Link>

</ButtonDiv>



</Wrapper>
</Container>
  )
}

export default GoodToGo