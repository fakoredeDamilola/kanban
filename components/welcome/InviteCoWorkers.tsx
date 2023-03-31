import { motion } from 'framer-motion'
import React from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'


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
  /* background-color: #000313; */
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
    width:600px;
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
        background-color:transparent;
        border:1px solid rgb(57, 58, 75);
    border-radius:4px;
        cursor:pointer;
     margin:0 auto;
     width:50%;
     transition:0.3s all;
     &:hover {
      background-color:#666BE1;
     }
        
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
    color:white;
    resize: none; 
    box-sizing:border-box;
}

`
const InviteBtn = styled.div`
  text-align:right;
  padding:20px 0;
  width:90%;
  margin:0 auto;
  & button {
    width:120px;
    border:0;
    color:white;
    border-radius:4px;
    background-color:#666BE1;
    height:40px;
    cursor:pointer;
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
const InviteCoWorkers = ({setOnboardingScreen,submitCoworkers,coWorkerValue,setCoWorkerValue}:{setOnboardingScreen:any,coWorkerValue:string;submitCoworkers:any;setCoWorkerValue:any}) => {
  return (
     <Container variants={mainVariants} as={motion.div} initial="hidden" animate="visible">
          <Wrapper >
     
    <MainText as={motion.div}  variants={initialVariants}   transition={{
      duration: 0.15,
      ease: "easeOut",
      
    }}>
       <h1>Invite co-workers to your team</h1>
   <p>Kanban is meant to be used with your team. Invite some co-workers to test it out with.</p>
   </MainText>
 <MainBox  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.3
    }}>
  <TextArea >
    Email
    <textarea
    placeholder='email@example.com, email2@example.com...'
    value={coWorkerValue}
    onChange={(e)=>setCoWorkerValue(e.target.value)}
    />
  </TextArea>
 <InviteBtn>
 <button onClick ={submitCoworkers}>
Send Invite
</button>
 </InviteBtn>
 </MainBox>
 <ButtonDiv  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.6
    }}>
   <button  onClick ={()=>{setOnboardingScreen("GOOD_TO_GO")}}>
Continue
</button>
 </ButtonDiv>


 
 </Wrapper>
     </Container>
  
 
  )
}

export default InviteCoWorkers