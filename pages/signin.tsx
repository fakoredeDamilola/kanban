import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useMemo, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'
import CenteredLogo from '../components/Home/CenteredLogo'
import SignupButtons from '../components/Home/SignupButtons'
import { LOGIN} from '../graphql/mutation'
import { setCurrentUser } from '../state/user'
import { storeDataInLocalStorage } from '../utils/localStorage'
import {  confirmPassword } from '../utils/utilFunction'
import LoadingPage from '../components/LoadingPage'
import { setModalData } from '../state/display'
import Link from 'next/link'

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
    storeDataInLocalStorage("token",data?.login?.token)
    dispatch(setCurrentUser({user:data?.login?.user})) 
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

  return (
    <NavWrapper>
     <>
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
        />
        <SignupText>
          Already have an account <Link href="/signup" >Sign up</Link>
        </SignupText>

     </>
    </NavWrapper>
  )
}

signin.PageLayout = DashboardLayout

export default signin