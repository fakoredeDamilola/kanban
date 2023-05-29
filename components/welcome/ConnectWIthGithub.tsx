import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { GrCheckmark } from 'react-icons/gr'
import { IconContext } from 'react-icons/lib'
import styled from 'styled-components'
import { device } from '../../config/theme'
import {motion} from 'framer-motion'
import { useSelector } from 'react-redux'
import { RootState } from '../../state/store'


const MainBox = styled.div`
  background:#1D1E2B;
  color:white;
  padding:30px 0;
  width:90%;
  margin:0 auto;
 border-radius:4px;
    box-sizing:border-box;
 margin-top:20px;


`
const Container = styled.div`
    width:100%;
`
const GitInfo = styled.div`
  width:90%;
  margin: 0 auto;
 padding:15px 0;
  border-bottom:1px solid ${({theme})=>theme.borderColor};
  font-size:12px;
  display:flex;
  gap:20px;
  align-items:center;
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
   display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
  @media ${device.mobileM} {
   
    width:500px;
    margin:0 auto;
    margin-top:20px;
  }
`
const ButtonDiv = styled.div`
width:100%;
        margin-top:20px;
        text-align:center;
   & >button {
    color:white;
        font-size:15px;
        border:0;
        height:45px;
        background-color:#666BE1;
        border-radius:6px;
        cursor:pointer;
         
     margin:0 auto;
     width:90%;
        
 }
`
const Aside = styled.div`
cursor:pointer;
    font-size:14px;
    color:#666;
    
    padding:30px 0;
`

const initialVariants = {
  hidden: {
    y: -100,
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  },
};
const mainVariants = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

const ConnectWIthGithub = ({setOnboardingScreen } : {setOnboardingScreen:any} ) => {
  const {types} = useSelector((state:RootState)=> state.user)
  return (
     <Container>
          <Wrapper variants={mainVariants} as={motion.div} initial="hidden" animate="visible">
      <motion.div variants={initialVariants}   transition={{
      duration: 0.15,
      ease: "easeOut",
      
    }}>
          <IconContext.Provider
      value={{ color: 'white', size: '70px' }}
    >

        <AiFillGithub  />
        </IconContext.Provider>
      </motion.div>
      
    <MainText variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.3
    }}>
       <h1>Connect with Github</h1>
   <p>Automate issue workflow when  Github pull requests are opened and merged.</p>
   </MainText>
 <MainBox  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.6
    }}>

      <div>
        {[
      "Kanban links the issue and the GitHub pull request automatically ",
      "Kanban syncs the issue status when a pull request is opened,closed, merged or, reverted",
      "Kanban will not ask for code read permissions "
    ].map((gitItem,index)=>{
      return (
        <GitInfo>
    <GrCheckmark  color="#666BE1" size="15px"/>
    <div>{gitItem}</div>
  </GitInfo>
      )
      
    })}
   
      </div>
    
 
 </MainBox>
 <ButtonDiv  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.9
    }}>
   <button onClick ={()=>{}}>
Authenticate with Github
</button>
 </ButtonDiv>

 <Aside variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:1.2
    }} onClick={()=>{
      if(types==="guest"){
        setOnboardingScreen("GOOD_TO_GO")
      }else{
        setOnboardingScreen("INVITE_COWORKERS")
      }
    }}>
    I'll do this later
 </Aside>
 
 </Wrapper>
     </Container>
  
 
  )
}

export default ConnectWIthGithub