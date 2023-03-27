import { useMutation } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useMemo, useState,useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'
import CenteredLogo from '../components/Home/CenteredLogo'
import SignupButtons from '../components/Home/SignupButtons'
import { LOGIN} from '../graphql/mutation'
import { setCurrentUser } from '../state/board'
import { storeDataInLocalStorage } from '../utils/localStorage'
import {  confirmPassword } from '../utils/utilFunction'

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
const signin = () => {
  


const [signinObj,setSigninObject] = useState({
  email:"",
  password:""
})


const [errorTable,setErrorTable] = useState<Array<string>>([])
const [disableButton,setDisableButton] = useState(false)


const dispatch = useDispatch()
const router = useRouter()


const [login,{data,loading,error}] = useMutation(
  LOGIN, {
    variables : {
      input:{
        email:signinObj.email,
        password:signinObj.password,
      }
    }
  }
)


useMemo(()=>{
if(data?.login?.status){
}


},[data])
if(data?.login?.status){
  storeDataInLocalStorage("token",data?.login?.token) 
  dispatch(setCurrentUser({user:data?.login?.user})) 
router.push(`/${data?.login?.user?.workspaces[0].URL}`)
}


console.log({data,error,loading})
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
    await login()
}

  return (
    <NavWrapper>
     <>
      <CenteredLogo size={70} text="Signin to your kanban account" />
        <SignupButtons 
        handleInput={handleInput}
        errorTable={errorTable}
        setErrorTable={setErrorTable}
        submitEmail={loginUser} 
        signupObj={signinObj}
        disabled={disableButton}
        indicator={false}
        />

     </>
    </NavWrapper>
  )
}

signin.PageLayout = DashboardLayout

export default signin