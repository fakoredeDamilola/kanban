import React from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { GrCheckmark } from 'react-icons/gr'
import { IconContext } from 'react-icons/lib'
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
  background-color: #000313;
`
const GitInfo = styled.div`
  width:90%;
  margin: 0 auto;
  margin-bottom:30px;
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
  @media ${device.mobileM} {
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
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
const ConnectWIthGithub = ({setOnboardingScreen } : {setOnboardingScreen:any} ) => {
  return (
     <Container>
          <Wrapper >
        <IconContext.Provider
      value={{ color: 'white', size: '70px' }}
    >

        <AiFillGithub  />
        </IconContext.Provider>
    <MainText>
       <h1>Connect with Github</h1>
   <p>Automate issue workflow when  Github pull requests are opened and merged.</p>
   </MainText>
 <MainBox>
 <IconContext.Provider
      value={{ color:"#666BE1",size:"20px" }}
    >
  <GitInfo>

    <GrCheckmark/>
    <div>Kanban links the issue and the GitHub pull request automatically </div>
  </GitInfo>
  <GitInfo>
    <GrCheckmark />
    <div>Kanban syncs the issue status when a pull request is opened,closed, merged or, reverted </div>
  </GitInfo>
  <GitInfo>
    <GrCheckmark />
    <div>Kanban will not ask for code read permissions </div>
  </GitInfo>
 </IconContext.Provider>
 
 </MainBox>
 <ButtonDiv>
   <button onClick ={()=>{}}>
Authenticate with Github
</button>
 </ButtonDiv>

 <Aside onClick={()=>{setOnboardingScreen("INVITE_COWORKERS")}}>
    I'll do this later
 </Aside>
 
 </Wrapper>
     </Container>
  
 
  )
}

export default ConnectWIthGithub