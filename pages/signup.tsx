import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'
import CenteredLogo from '../components/Home/CenteredLogo'
import SignupButtons from '../components/Home/SignupButtons'
import CreateWorkspace from '../components/signup/CreateWorkspace'
import VerifySignupEmail from '../components/signup/VerifySignupEmail'
import  { AddNewWorkspace, IWorkspace } from '../state/board'
import { RootState } from '../state/store'
import { subItems } from '../utils/utilData'

const NavWrapper = styled.div`
   display: flex;
   flex-direction:column;
  flex-wrap: nowrap;
  box-sizing:border-box;
  align-items:center;
  height:100%;
  max-height:100%;
  background-color: #000313;
  min-width:100%;
  padding-top:10px;
 
`
const Terms = styled.div`
    margin-top:15px;
    font-size:14px;
    color: #c4c4c4;
`
const signup = () => {
  
  enum SIGNUPPAGESTATE {
  SIGN_UP_PAGE_INDEX = "SIGN_UP_PAGE_INDEX",
  SIGN_UP_VERIFY_EMAIL = "SIGN_UP_VERIFY_EMAIL",
  SIGN_UP_CREATE_WORKSPACE = "SIGN_UP_CREATE_WORKSPACE" 
}

const [emailInput,setEmailInput] = useState("")
const [codeInput,setCodeInput] = useState("")
const [workspaceName,setWorkspaceName] = useState("")
const [workspaceURL,setWorkspaceURL] = useState("")
const [signupPageState,setSignupPageState] = useState(SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX)

const {user} = useSelector((state:RootState)=>state.board)
const dispatch = useDispatch()
const router = useRouter()

const submitEmail = () => {
  // send email link invite
  setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL)
}

const submitCode = () => {
  // submit code
  setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE)
}
const createNewWorkspace = () => {
  const newWorkspace: IWorkspace = {
      name:workspaceName,
      URL:workspaceURL,
      id:workspaceName.slice(0,3),
      subItems: subItems,
      totalTasks:0,
      totalMembers:1,
      members:[
        {
          name:user.name,
          email:user.email,
          id:user.id,
          img:user.image,
          color:"red",
          joined:`${Date.now()}`,
          username:user.name,
          taskIDs:[]
        }
      ],
      taskID:[],
      owner: {
        name:user.name,
        email:user.email,
        img:user.image
      }

  }
  // create new workspace in the backend
  dispatch(AddNewWorkspace({newWorkspace}))
  router.push(`/${workspaceName}/welcome`)
}

  return (
    <NavWrapper>
     {signupPageState === SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX ?
     <>
      <CenteredLogo size={70} text="Create your kanban account" />
        <SignupButtons submitEmail={submitEmail} emailInput={emailInput} setEmailInput={setEmailInput} />

        <Terms>
            By signing up, you agree to our signs and conditions
        </Terms>
     </> : signupPageState === SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL ?
     <VerifySignupEmail submitCode={submitCode} email={emailInput} codeInput={codeInput} setCodeInput={setCodeInput} /> : 
     signupPageState === SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE ?
      <CreateWorkspace 
      createNewWorkspace={createNewWorkspace}
      workspaceName={workspaceName} 
      setWorkspaceName={setWorkspaceName} 
      workspaceURL={workspaceURL}
      setWorkspaceURL={setWorkspaceURL}
      /> : null
    }
    </NavWrapper>
  )
}

signup.PageLayout = DashboardLayout

export default signup