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
import { setCurrentUser } from '../state/user'
import { setCurrentSignupPage, setModalData, SIGNUPPAGESTATE } from '../state/display'
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
const signup = () => {
  


const [signupObject,setSignupObject] = useState({
  email:"",
  password:""
})


const {current_signup_page,modal} = useSelector((state:RootState)=>state.display)
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

useMemo(()=>{
  try{
    if(data?.verifyUserRecord?.status ===true){
      setAxiosLoading(false)
      if(type==="oauth"){
        dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE}))
        setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_CREATE_WORKSPACE)
        storeDataInLocalStorage("token",data?.verifyUserRecord?.token)
        dispatch(setCurrentUser({user:data?.verifyUserRecord?.user}))
      }else{
        dispatch(setCurrentSignupPage({current:SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL})) 
        setSignupPageState(SIGNUPPAGESTATE.SIGN_UP_VERIFY_EMAIL)
      } 
}else if(data?.verifyUserRecord?.status ===false) {
  // alert("user exist")
  dispatch(setModalData({modalType:"error",modalMessage:data?.verifyUserRecord?.message,modal:true}))
}
  }catch(e:any){
    console.log(e?.message)
  }

},[data])
useMemo(()=>{
  try{
    if(registerData?.register?.status ===true){
        storeDataInLocalStorage("token",registerData?.register?.token)
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
  //         id:user._id,
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
  const arr= checkForError({
    workspaceURL,
    workspaceName
  },setErrorTable,[])
  if(arr.length===0){
  await createWorkspace()

  }
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
        />

        <Terms>
            By signing up, you agree to our signs and conditions
        </Terms>
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
      setWorkspaceURL={setWorkspaceURL}
      /> : null
    }
    
    {modal &&  <ApiErrorModal />}
    </NavWrapper>
  )
}

signup.PageLayout = DashboardLayout

export default signup