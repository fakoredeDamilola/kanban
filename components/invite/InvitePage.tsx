import React, { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'
import { motion } from 'framer-motion'
import PictureLogo from '../PictureLogo'
import { useRouter } from 'next/router'

const Container = styled.div`
  width:100%;
  min-height:100%;
  padding-top:30px;
  background-color: ${({theme}) => theme.background};
`
const EmailBox = styled.div`
  & p {
    color:#D1D2DF;
    margin-bottom:4px;
    font-size:12px;
  }
  cursor:pointer;
    padding:15px 10px;
  &:hover {
    background:#1D1E2B;
    transition:all 0.3s;
    box-sizing:border-box;
  }
  color:white;
 
  
`
const MainBox = styled.div`
display:flex;
   justify-content:center;
   align-items:center;
   flex-direction:column;
  background:#1D1E2B;
  color:white;
  padding:30px 20px;
  box-sizing:border-box;
  width:90%;
  margin:0 auto;
 border-radius:4px;
    box-sizing:border-box;
 margin-top:20px;
    text-align:center;
    & p {
      margin:15px 0;
      font-size:15px;
      line-height:25px;
    }
    & h1 {
      margin-top:20px;
    }
    
 @media ${device.mobileM} {
    width:500px;
  }
`

const MainText = styled.div`
  text-align:center;
  color:white;
  & > p {
  margin:30px;
  font-size:14px;
  color:#D1D2DF;
  }

`

const SignedInBox = styled.div`
  color:white;
    padding:15px 10px;
  cursor:pointer;
  &:hover {
    background:#1D1E2B;
    transition:all 0.3s;
    box-sizing:border-box;
  }
  & p {
    font-size:12px;
  }
`
const Wrapper= styled.div`
  margin:20px 0;
  @media ${device.mobileM} {
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    width:500px;
    margin:0 auto;
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
const EmailInfo = styled.div`
  width:95%;
    box-sizing:border-box;
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
 
`
const InvitePage = ({acceptInvite,email,invitee,workspaceName,workerEmail,inviteLink,userInviteIssue}:{
 acceptInvite:(value:string) => void;
 email:string;
 workspaceName:string;
 invitee:string;
 inviteLink:string;
 workerEmail:string;
 userInviteIssue:string;
}) => {
  
  const router= useRouter()
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
const GoBack = () =>{
  router.push("/")
}

  return (
    <Container variants={mainVariants} as={motion.div} initial="hidden" animate="visible">

      <EmailInfo  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
    }}>
         <EmailBox>
      <p>Logged in as:</p>
      <p>{email}</p>
        </EmailBox>
        <SignedInBox onClick={()=>router.push("/")}>
        Back to Kanban
        </SignedInBox>
      </EmailInfo>
       
        <Wrapper>
     
           <MainText  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.3
    }}>
          </MainText>
        <MainBox  variants={initialVariants} as={motion.div}  transition={{
      duration: 0.3,
      ease: "easeOut",
      delay:0.9
    }}>
         {  userInviteIssue==="link" ?
        <>
        <h1>Invitation not found</h1>
        <p>If you think this is a mistake or if you have trouble logging into the workspace, please contact the workspace admins or Kanban support.</p>
        <ButtonDiv>
          <button onClick ={GoBack}>
            Go back
          </button>
        </ButtonDiv>
        </> :
        <>
         <PictureLogo type="text" src="AA" color="red" />
         <h1>{invitee} has invited you to workspace {workspaceName}</h1>
        
        {userInviteIssue==="accept" ?<p>To accept the invitation, click here</p> : <p>To accept the invitation, please login as {workerEmail}</p>}
        <ButtonDiv>
          <button onClick ={() =>acceptInvite(userInviteIssue)}>
{  userInviteIssue==="accept" ? "accept":userInviteIssue==="login" ?  "login":null}
</button>
        </ButtonDiv>
        </> }
     
        </MainBox>
       
        
        
        
        </Wrapper>
        
       
    </Container>
  )
}

export default InvitePage