import React, { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'

const Container = styled.div`
  width:100%;
  min-height:100%;
  padding-top:30px;
  background-color: #000313;
`
const EmailBox = styled.div`
  & p:first-child {
    color:#D1D2DF;
    margin-bottom:4px;
  }
  cursor:pointer;
    padding:15px 10px;
  &:hover {
    background:#1D1E2B;
    transition:all 0.3s;
    box-sizing:border-box;
  }
  color:white;
  font-size:13px;
  
`
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

const MainText = styled.div`
  text-align:center;
  color:white;
  & > p {
  margin-top:30px;
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
    margin-top:-30px;
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
  width:90%;
    box-sizing:border-box;
  margin:0 auto;
  display:flex;
  align-items:center;
  justify-content:space-between;
`
const InputText = styled.div`
  position:absolute;
top:0;
  left:0px;
  display:flex;
  justify-content:center;
  align-items:center;
  padding-left:10px;
  color:#666;
  height:45px;
`

const InvitePage = ({acceptInvite,email,invitee,workspaceName,workerEmail,inviteLink}:{
 acceptInvite:() => void;
 email:string;
 workspaceName:string;
 invitee:string;
 inviteLink:string;
 workerEmail:string;
}) => {
  
  return (
    <Container>
      <EmailInfo>
         <EmailBox>
      <p>Logged in as:</p>
      <p>{email}</p>
        </EmailBox>
        <SignedInBox>
        Log out
        </SignedInBox>
      </EmailInfo>
       
        <Wrapper>
           <MainText>
              <h1>Create a new workspace</h1>
          <p>Workspaces are shared environments where teams can work on projects,cycles and tasks</p>
          </MainText>
        <MainBox>
         <h1>{invitee} has invited to workspace {workspaceName}</h1>
        
        <p>To accept the invitation, please login as {workerEmail}</p>
        <ButtonDiv>
          <button onClick ={acceptInvite}>
Create workspace
</button>
        </ButtonDiv>
        </MainBox>
        
        
        </Wrapper>
        
       
    </Container>
  )
}

export default InvitePage