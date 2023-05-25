import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'
import CustomInput from '../CustomInput'
import { shortenInfo } from '../../utils/utilFunction'

const Container = styled.div`
  width:100%;
  min-height:100%;
  padding-top:30px;
  /* background-color: #000313; */
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
const InputBox = styled.div`
  width:90%;
  margin: 0 auto;
  margin-bottom:30px;
  & > p {
    margin-bottom:5px;
  }
  & input {
    width:100%;
    height:45px;
    box-sizing:border-box;
    padding:0 0px; 
    padding-left:156px;
    background:#151621;
    border:1px solid ${({theme}) => "#666BE1"};
    border-radius:3px;
    outline:none;
    color:white;
  }
  & > div {
    position:relative;
  }
`
const InputBoxName = styled.div`
  width:90%;
  margin: 0 auto;
  margin-bottom:30px;
  & > p {
    margin-bottom:5px;
  }
  & input {
    width:100%;
    height:45px;
    box-sizing:border-box;
    padding:0 10px; 
    background:#151621;
    border:1px solid ${({theme}) => "#666BE1"};
    border-radius:3px;
    outline:none;
    color:white;
  }
  & > div {
    position:relative;
  }
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
        transition:0.3s all; 
     margin:0 auto;
     width:90%;
        &:hover{
    box-shadow: 20px -3px 72px 1px rgba(79,82,180,0.75);
  }     
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
top:5px;
  left:0px;
  display:flex;
  justify-content:center;
  font-size:14px;
  align-items:center;
  padding-left:10px;
  color:#666;
  height:45px;
`

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
      // stiffness:320,
      // staggerChildren:0.4
    }
  }
}

const modalVariants = {
  hidden:{
      y:"-100vh",
      opacity:0,
  },
  visible:{
      y:0,
      opacity:1,
      transition:{delay:0.5}
  }
}

const CreateWorkspace = ({workspaceName,workspaceURL,setWorkspaceURL,setWorkspaceName,createNewWorkspace,email,errorTableWorkspace,setErrorTableWorkspace,disableWorkspaceBtn,setDisableWorkspaceBtn}:{
  workspaceName:string;
  email:string;
  setWorkspaceName:React.Dispatch<React.SetStateAction<string>>;
  workspaceURL:string;
  setWorkspaceURL:React.Dispatch<React.SetStateAction<string>>;
  createNewWorkspace:() => void;
  errorTableWorkspace:string[];
  setErrorTableWorkspace:any;
  disableWorkspaceBtn:boolean;
  setDisableWorkspaceBtn:React.Dispatch<React.SetStateAction<boolean>>
}) => {
  
const [controlInput,setControlInput] = useState(true)

const [errorTable,setErrorTable] = useState<Array<string>>([])
const [disableButton,setDisableButton] = useState(false)

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
           <MainText as={motion.div} variants={textVariants} initial="hidden" animate="visible">
              <h1>Create a new workspace</h1>
          <p>Workspaces are shared environments where teams can work on projects,cycles and tasks</p>
          </MainText>
        <MainBox as={motion.div} variants={modalVariants} initial="hidden" animate="visible">
         
        
        <InputBoxName>
        <p>Workspace Name</p>
        <CustomInput
        fontSize='14px'
        color="white"
        fontWeight={700}
        placeholder='Enter your workspaceName'
        type="string"
        input="text"
        name="workspaceName"
        isError={errorTable.includes("workspaceName")}
        error ={errorTable.includes("workspaceName") ? "Put enter a workspaceName" : ""}
        setErrorTable={setErrorTable}
        textvalue={workspaceName}
        changeInput={(value,name)=>{
            setWorkspaceName(value)
    if(controlInput){
    setWorkspaceURL(value.split(" ").join("-"))
    }
        }}
        errors={["required"]}
        />
      
        </InputBoxName>
        <InputBox>
        <p>Workspace URL</p>
        <div>
             {/* <input 
  value={workspaceURL}
 
  onChange={(e)=>setWorkspaceURL(e.target.value)}
  name="workspaceURL"
  
/> */}
 <CustomInput
        fontSize='14px'
        color="white"
        fontWeight={700}
        placeholder='Enter your workspaceURL'
        type="string"
        input="text"
        name="workspaceURL"
        isError={errorTable.includes("workspaceURL")}
        error ={errorTable.includes("workspaceURL") ? "Put enter a workspaceURL" : ""}
        setErrorTable={setErrorTable}
        textvalue={workspaceURL}
        changeInput={(value,name)=>{
          setWorkspaceURL(value)
          setControlInput(false) 
        }}
        errors={["required"]}
        />
<InputText>
{shortenInfo(process.env.NEXT_PUBLIC_URL,8)}
</InputText>
        </div>
     
        </InputBox>
        </MainBox>
        <ButtonDiv>
          <button onClick ={createNewWorkspace}>
Create workspace
</button>
        </ButtonDiv>
        
        </Wrapper>
        
       
    </Container>
  )
}

export default CreateWorkspace