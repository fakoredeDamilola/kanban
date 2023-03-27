import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useMemo, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'
import CenteredLogo from '../components/Home/CenteredLogo'
import SignupButtons from '../components/Home/SignupButtons'
import CreateWorkspace from '../components/signup/CreateWorkspace'
import VerifySignupEmail from '../components/signup/VerifySignupEmail'
import { CREATE_NEW_WORKSPACE, REGISTER, VERIFY_USER_RECORD } from '../graphql/mutation'
import  { AddNewWorkspace, IBoard, IWorkspace, setCurrentUser, setCurrentWorkspace } from '../state/board'
import { setCurrentSignupPage, SIGNUPPAGESTATE } from '../state/display'
import { RootState } from '../state/store'
import { storeDataInLocalStorage } from '../utils/localStorage'
import { subItems } from '../utils/utilData'
import { checkForError, confirmPassword } from '../utils/utilFunction'

const NavWrapper = styled.div`
   display: flex;
   flex-direction:column;
  flex-wrap: nowrap;
  box-sizing:border-box;
  align-items:center;
  /* height:100%; */
  min-height:100%;
  background-color: #000313;
  min-width:100%;
  padding-top:10px;
  padding-bottom:20px;
 
`
const Terms = styled.div`
    margin-top:15px;
    font-size:14px;
    color: #c4c4c4;
`
const signup = () => {
  


const [signupObject,setSignupObject] = useState({
  email:"",
  password:""
})


const {current_signup_page} = useSelector((state:RootState)=>state.display)
const [codeInput,setCodeInput] = useState("")
const [workspaceName,setWorkspaceName] = useState("")
const [workspaceURL,setWorkspaceURL] = useState("")
const [passwordIndicator,setPasswordIndicator] = useState("empty")
const [errorTable,setErrorTable] = useState<Array<string>>([])
const [disableButton,setDisableButton] = useState(false)
const [signupPageState,setSignupPageState] = useState(SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX)

useEffect(()=>{
  console.log({current_signup_page})
setSignupPageState(current_signup_page)
},[])

const {user} = useSelector((state:RootState)=>state.board)
const dispatch = useDispatch()
const router = useRouter()


const [verifyUser,{data,loading,error}] = useMutation(
  VERIFY_USER_RECORD, {
    variables : {
      input:{
        email:signupObject.email,
        password:signupObject.password,
      }
    }
  }
)

const [register,{data:registerData,loading:registerLoading,error:registerError}] = useMutation(
  REGISTER, {
    variables: {
      input: {
        OTP:codeInput
      }
    }
  }
) 
const [createWorkspace] = useMutation(
  CREATE_NEW_WORKSPACE, {
    variables: {
      input: {
    "workspaceName":workspaceName,
    "workspaceURL":workspaceURL,
    subItems:subItems
      }
    },
    onCompleted: (data) =>{
      const workspace =data.createNewWorkspace.workspace
      console.log({workspace})
      dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL}))

      router.push(`/${workspace.URL}/welcome`)
    }
  }
) 


console.log({data,error,loading})
console.log({registerData,registerError,registerLoading})
useMemo(()=>{
  try{
    if(data?.verifyUserRecord?.status ===true){
      dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL}))
      
  setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL)
}
  }catch(e:any){
    console.log(e?.message)
  }

},[data])
useMemo(()=>{
  try{
    if(registerData?.register?.status ===true){
        storeDataInLocalStorage("token",registerData?.register?.token)
        console.log(registerData?.register?.user,"user")
        dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE}))
        dispatch(setCurrentUser({user:registerData?.register?.user}))
  setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE)
}else if(registerData?.register?.status ===false){
  alert("wrong OTP")
}
  }catch(e:any){
    console.log(e?.message)
  }

},[registerData])

const handleInput = (name:string,value:string) => {
  setErrorTable([])
    setSignupObject((prevState) => {
        return {
            ...prevState,
            [name]:value
        }
    })
    if(name==="password"){
        confirmPassword(value)
    }
    if(errorTable.length=== 0){
      setDisableButton(false)
    }else{
      setDisableButton(true)
    }
}
const submitEmail =async () => {
  // send email link invite
  const passwordStrength = confirmPassword(signupObject.password)
  setPasswordIndicator(passwordStrength)
  const arr= checkForError(signupObject,setErrorTable,[])
       console.log({arr})
       if(arr.length===0){
        await verifyUser()
        
       }
  // 
}

const submitCode = () => {
  // submit code
  register()
  // setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE)
}
const createNewWorkspace =async () => {
  // const newWorkspace: IWorkspace = {
  //     name:workspaceName,
  //     URL:workspaceURL,
  //     id:workspaceName.slice(0,3),
  //     subItems: subItems,
  //     totalTasks:0,
  //     totalMembers:1,
  //     members:[
  //       {
  //         name:user.name,
  //         email:user.email,
  //         id:user.id,
  //         img:user.image,
  //         color:"red",
  //         joined:`${Date.now()}`,
  //         username:user.name,
  //         taskIDs:[]
  //       }
  //     ],
  //     taskID:[],
  //     owner: {
  //       name:user.name,
  //       email:user.email,
  //       img:user.image
  //     }

  // }
  // dispatch(AddNewWorkspace({newWorkspace}))
  // router.push(`/${workspaceName}/welcome`)

  // create new workspace in the backend
  await createWorkspace()

  
}

  return (
    <NavWrapper>
     {signupPageState === SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX ?
     <>
      <CenteredLogo size={70} text="Create your kanban account" />
        <SignupButtons 
        handleInput={handleInput}
        errorTable={errorTable}
        setErrorTable={setErrorTable}
        submitEmail={submitEmail} 
        signupObj={signupObject}
        disabled={disableButton}
        passwordIndicator={passwordIndicator}
        />

        <Terms>
            By signing up, you agree to our signs and conditions
        </Terms>
     </> : signupPageState === SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL ?
     <VerifySignupEmail submitCode={submitCode} email={signupObject.email} codeInput={codeInput} setCodeInput={setCodeInput} /> : 
     signupPageState === SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE ?
      <CreateWorkspace 
      createNewWorkspace={createNewWorkspace}
      email={user?.email}
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