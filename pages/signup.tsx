import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useMemo, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'
import CenteredLogo from '../components/Home/CenteredLogo'
import SignupButtons from '../components/Home/SignupButtons'
import LoadingPage from '../components/LoadingPage'
import ApiErrorModal from '../components/modal/ApiErrorModal'
import CreateWorkspace from '../components/signup/CreateWorkspace'
import VerifySignupEmail from '../components/signup/VerifySignupEmail'
import { CREATE_NEW_WORKSPACE, REGISTER, VERIFY_USER_RECORD } from '../graphql/mutation'
import { AddNewWorkspace, setCurrentUser, setTypes } from '../state/user'
import { setCurrentSignupPage, setModalData, SIGNUPPAGESTATE } from '../state/display'
import { RootState } from '../state/store'
import { storeDataInLocalStorage } from '../utils/localStorage'
import { subItems } from '../utils/utilData'
import { v4 } from 'uuid'
import { checkForError, confirmPassword } from '../utils/utilFunction'
import Link from 'next/link'
import { IWorkspace } from '../state/board'
import { setCurrentWorkspace } from '../state/board'

const NavWrapper = styled.div`
   display: flex;
   flex-direction:column;
  flex-wrap: nowrap;
  box-sizing:border-box;
  align-items:center;
  /* height:100%; */
  min-height:100%;
  background-color: ${({ theme }) => theme.background} ;
  min-width:100%;
  padding-top:10px;
  padding-bottom:20px;
 
`
const Terms = styled.div`
    margin-top:15px;
    font-size:14px;
    color: #c4c4c4;
`
const SignupText = styled.div`
  color:white;
  margin:15px 0;
  font-size:14px;
  & Link {
     color:  ${({ theme }) => theme.button}; 
  }
 
`
const signup = () => {
  


const [signupObject,setSignupObject] = useState({
  email:"",
  password:""
})


const {current_signup_page,modal} = useSelector((state:RootState)=>state.display)
const {types,name,email,_id,username} = useSelector((state:RootState)=>state.user)
const [codeInput,setCodeInput] = useState("")
const [workspaceName,setWorkspaceName] = useState("")
const [workspaceURL,setWorkspaceURL] = useState("")
const [passwordIndicator,setPasswordIndicator] = useState("empty")
  const [axiosLoading,setAxiosLoading] = useState(false)
const [errorTable,setErrorTable] = useState<Array<string>>([])
const [disableButton,setDisableButton] = useState(false)
const [signupPageState,setSignupPageState] = useState(SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX)
const [type,setType] = useState("")

useEffect(()=>{
setSignupPageState(current_signup_page)
},[])

// const {user} = useSelector((state:RootState)=>state.board)
const dispatch = useDispatch()
const router = useRouter()


const [verifyUser,{data,loading,error}] = useMutation(
  VERIFY_USER_RECORD
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

const [errorTableWorkspace,setErrorTableWorkspace] = useState([])
const [disableWorkspaceBtn,setDisableWorkspaceBtn] = useState(false)

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
      dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX}))

      router.push(`/${workspace.URL}/welcome`)
    },
    onError:(err)=>{
      
      dispatch(setModalData({modalType:"error",modalMessage:"no auth found,sign up again",modal:true}))
      dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX}))
      setCurrentSignupPage(SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX)
    }
  }
) 
const nextStep = ()=>{
  dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL})) 
        setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL)

}
useMemo(()=>{
  try{
    console.log({data})
    if(data?.verifyUserRecord?.status ===true){
      setAxiosLoading(false)
      if(type==="oauth"){
        dispatch(setTypes({type:"login"}))
        dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE}))
        setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE)
        storeDataInLocalStorage("kanbanToken",data?.verifyUserRecord?.token)
        dispatch(setCurrentUser({user:data?.verifyUserRecord?.user}))
      }else{
        dispatch(setTypes({type:"login"}))
        dispatch(setModalData({modalType:"success",modalMessage:`Due to technical issues, this is your OTP ${data?.verifyUserRecord?.OTP}`,modal:true, type:'confirm',click:nextStep}))
      
      } 
}else if(data?.verifyUserRecord?.status ===false) {
  dispatch(setModalData({modalType:"error",modalMessage:data?.verifyUserRecord?.message,modal:true}))
}
  }catch(e:any){
    console.log(e?.message)
  }

},[data])
useMemo(()=>{
  try{
    console.log({registerData})
    if(registerData?.register?.status ===true){
        storeDataInLocalStorage("kanbanToken",registerData?.register?.token)
       
        dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE}))
        dispatch(setCurrentUser({user:registerData?.register?.user}))
  setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE)
}else if(registerData?.register?.status ===false){
  dispatch(setModalData({modalType:"error",modalMessage:"Wrong OTP",modal:true}))
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
       if(arr.length===0){
        setType("password")
        await verifyUser( {
          variables : {
            input:{
              email:signupObject.email,
              password:signupObject.password,
              type:"password",
              image:""
            }
          }
        })
        
       }
  // 
}
const signupWithOAuth =async  (data:any) =>{
  setType("oauth")
  await verifyUser( {
    variables : {
      input:{
        email:data.email,
        password:data.id,
        type:"oauth",
        image:data.picture
      }
    }
  })
}

const submitCode = () => {
  // submit code
  register()
  // setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE)
}
const createNewWorkspace =async () => {
  

  // create new workspace in the backend
  const arr= checkForError({
    workspaceURL,
    workspaceName
  },setErrorTable,[])
  if(arr.length===0 && types!=="guest"){
  await createWorkspace()

  }else if(types === "guest"){
    const newWorkspace: IWorkspace = {
      name:workspaceName,
      URL:workspaceURL,
      _id:v4(),
      id:workspaceName.slice(0,3),
      subItems: subItems,
      totalTasks:0,
      totalMembers:1,
      members:[
        {
          name:"guest",
          email:email,
          id:_id,
          img:"",
          color:"red",
          joined:`${Date.now()}`,
          username:"guestusername",
          taskIDs:[]
        }
      ],
    task:[],
      owner: {
        name:"guest",
        email:email,
        img:""
      }

  }
  dispatch(setCurrentWorkspace({workspace:newWorkspace,boardDetails:{
    name:workspaceName,
    URL:workspaceURL,
    workspace:workspaceName,
    tasks:[]
  }}))
  router.push(`/${workspaceURL}/welcome`)
  }
}
const OpenNext = () => {
   dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE}))
  dispatch(setCurrentUser({user:{
    name:"guest",
    email:"guest@gmail.com",
    _id:v4(),
    username:"guestusername",
    image:"",
    workspaces: []
  }}))
setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE)
}
const setGuest = () =>{
  dispatch(setTypes({type:"guest"}))
  storeDataInLocalStorage("kanbanToken","guest")
  dispatch(setModalData({modalType:"success",modalMessage:`Hello guest, your data will be stored on the browser, i.e localstorage, and you will have limited access. Comeback and signup Thanks :)`,modal:true, type:'confirm',click:OpenNext}))
 
}
const logOut = () =>{
  dispatch(setTypes({type:""}))
  storeDataInLocalStorage("kanbanToken","")
  dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX}))
  dispatch(setCurrentUser({user:{
    name:"",
    email:"",
    _id:"",
    username:"",
    image:"",
    workspaces: []
  }}))
setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX)
}
  return (
    <NavWrapper>
     {loading|| registerLoading || axiosLoading ? 
     <LoadingPage /> :
     signupPageState === SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX ?
     <>
      <CenteredLogo size={70} text="Create your kanban account" />
        <SignupButtons 
        setAxiosLoading={setAxiosLoading}
        handleInput={handleInput}
        errorTable={errorTable}
        setErrorTable={setErrorTable}
        submitEmail={submitEmail} 
        signupObj={signupObject}
        disabled={disableButton}
        passwordIndicator={passwordIndicator}
        signupWithOAuth={signupWithOAuth}
        setGuest={setGuest}
        />

        <Terms>
            By signing up, you agree to our signs and conditions
        </Terms>
        <SignupText>
          Already have an account <Link href="/signin" >Sign in</Link>
        </SignupText>
     </> : signupPageState === SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL ?
     <VerifySignupEmail submitCode={submitCode} email={signupObject.email} codeInput={codeInput} setCodeInput={setCodeInput} /> : 
     signupPageState === SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE ?
      <CreateWorkspace 
      errorTableWorkspace={errorTableWorkspace}
      setErrorTableWorkspace={setErrorTableWorkspace}
      disableWorkspaceBtn={disableWorkspaceBtn}
      setDisableWorkspaceBtn={setDisableWorkspaceBtn}
      createNewWorkspace={createNewWorkspace}
      email={registerData?.register?.user.email}
      workspaceName={workspaceName} 
      setWorkspaceName={setWorkspaceName} 
      workspaceURL={workspaceURL}
      logOut={logOut}
      setWorkspaceURL={setWorkspaceURL}
      /> : null
    }
    
    {modal &&  <ApiErrorModal />}
    </NavWrapper>
  )
}

signup.PageLayout = DashboardLayout

export default signup