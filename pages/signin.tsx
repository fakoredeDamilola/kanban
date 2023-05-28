import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useMemo, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'
import CenteredLogo from '../components/Home/CenteredLogo'
import SignupButtons from '../components/Home/SignupButtons'
import { LOGIN} from '../graphql/mutation'
import {v4} from "uuid"
import { setCurrentUser, setTypes } from '../state/user'
import { storeDataInLocalStorage } from '../utils/localStorage'
import {  confirmPassword } from '../utils/utilFunction'
import LoadingPage from '../components/LoadingPage'
import { setCurrentSignupPage, setModalData } from '../state/display'
import Link from 'next/link'
import { RootState } from '../state/store'
import { IWorkspace, setCurrentWorkspace } from '../state/board'
import { subItems } from '../utils/utilData'

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
const SignupText = styled.div`
  color:white;
  margin:15px 0;
  font-size:14px;
  & Link {
     color:  ${({ theme }) => theme.button}; 
  }
 
`
const signin = () => {
  
const [signinObj,setSigninObject] = useState({
  email:"",
  password:""
})


const [errorTable,setErrorTable] = useState<Array<string>>([])
const [disableButton,setDisableButton] = useState(false)
const [axiosLoading,setAxiosLoading] = useState(false)
const {types} = useSelector((state:RootState)=>state.user)
const {currentWorkspace} = useSelector((state:RootState)=>state.board)


const dispatch = useDispatch()
const router = useRouter()


const [login,{data,loading,error}] = useMutation(LOGIN)

const signinWithOAuth =async  (data:any) =>{
  await login( {
    variables : {
      input:{
        email:data.email,
        password:data.id,
      }
    }
  })
}


useMemo(()=>{
  if(data?.login?.status){
    storeDataInLocalStorage("kanbanToken",data?.login?.token)
    dispatch(setCurrentUser({user:data?.login?.user})) 
    dispatch(setTypes({type:"login"}))
  router.push(`/${data?.login?.user?.workspaces[0].URL}`)
  }else if(!data?.login?.status && data?.login?.message){
    dispatch(setModalData({modalType:"error",modalMessage:data?.login?.message,modal:true}))
  }
},[data])

const handleInput = (name:string,value:string) => {
  setErrorTable([])
    setSigninObject((prevState) => {
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

const loginUser = async () => {
    await login({
      variables : {
        input:{
          email:signinObj.email,
          password:signinObj.password,
        }
      }
    })
}
const OpenNext = () => {
 dispatch(setCurrentUser({user:{
   name:"guest",
   email:"guest@gmail.com",
   _id:v4(),
   username:"guestusername",
   image:"",
   workspaces: []
 }}))
 router.push(`/${"signin-workspace"}`)
}
const setGuest = () =>{
 dispatch(setTypes({type:"guest"}))
 storeDataInLocalStorage("kanbanToken","guest")
 dispatch(setModalData({modalType:"success",modalMessage:`Hello guest, your data will be stored on the browser, i.e localstorage, and you will have limited access. Comeback and signup Thanks :)`,modal:true, type:'confirm',click:OpenNext}))
 const newWorkspace: IWorkspace = {
  name:"signin test workspace",
  URL:"signin-workspace",
  _id:v4(),
  id:"signin test workspace".slice(0,3),
  subItems: subItems,
  totalTasks:0,
  totalMembers:1,
  members:[
    {
      name:"guest",
      email:"guest@gmail.com",
      id:v4(),
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
    email:"guest@gmail.com",
    img:""
  }

}
dispatch(setCurrentWorkspace({workspace:newWorkspace,boardDetails:{
name:"signin test workspace",
URL:"signin-workspace",
workspace:"signin test workspace",
tasks:[]
}})) 
}
 
  return (
    <NavWrapper>
    {loading ? <LoadingPage /> : <>
      <CenteredLogo size={70} text="Signin to your kanban account" />
        <SignupButtons
        setAxiosLoading={setAxiosLoading}
        signupWithOAuth={signinWithOAuth} 
        handleInput={handleInput}
        errorTable={errorTable}
        setErrorTable={setErrorTable}
        submitEmail={loginUser} 
        signupObj={signinObj}
        disabled={disableButton}
        indicator={false}
        setGuest={setGuest}
        />
        <SignupText>
          Already have an account <Link href="/signup" >Sign up</Link>
        </SignupText>

     </>}
    </NavWrapper>
  )
}

signin.PageLayout = DashboardLayout

export default signin