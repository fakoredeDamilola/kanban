import { useMutation } from '@apollo/client'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'
import { RESEND_OTP } from '../../graphql/mutation'
import CenteredLogo from '../Home/CenteredLogo'
import Timer from '../Timer'
import { useRouter } from 'next/router'

const InputVariants = {
    hidden:{
      opacity:0,
      y:"-10vh"
    },
    visible:{
      opacity:1,
      y:0,
      transition:{
        duration:1,
        delay:2,
        ease: "easeIn",
      }
    }
  }

const NavWrapper = styled.div`
   display: flex;
   flex-direction:column;
  flex-wrap: nowrap;
  box-sizing:border-box;
  align-items:center;
  height:100%;
  max-height:100%;
  /* background-color: #000313; */
  min-width:100%;
  padding-top:10px;
 
`
const Content = styled.div`
    text-align:center;
    color:white;
    font-size:17px;
    p {
        margin:10px;
    }
`
const Resend = styled.div`
    display:flex;
    gap:5px;
    margin:15px;
    align-items:center;
    flex-direction:column;
    color:#848598;  
`
const Footer = styled.div`

margin:50px 0;
    p{
        cursor: pointer;
        color:#848598;
        text-align:center;
        font-size:12px;
        &:hover {
            color:white;
        }

    }
    p:last-child {
        margin-top:20px;
    }
`
const CodeInput = styled.div<{displayInput:boolean}>`
    border-top: 1px solid #666BE1;
  padding:10px 0;
  /* visibility:${({displayInput}) => !displayInput ? "hidden" : "visible"}; */
  display:${({displayInput}) => !displayInput ? "none" : "block"};
  opacity:${({displayInput}) => !displayInput ? "0" : "1"};
  height: ${({displayInput}) => !displayInput ? "0" : "auto"};
  transition:all 0.3s;
  width:${device.mobileS ? "340px" : "100%"};
  & >input {
    width:100%;
    text-align:center;
    height:45px;
    box-sizing:border-box;
    padding:0 10px; 
    background:#151621;
    border:1px solid ${({theme}) => "#666BE1"};
    border-radius:3px;
    outline:none;
    color:white;
  }
  & >button {
    color:white;
        font-size:15px;
        border:0;
        height:45px;
        background-color:#666BE1;
        border-radius:6px;
        cursor:pointer;
        margin-top:20px;
         /* width:80%; */
        @media ${device.mobileS} {
     width:100%;
}
  } 
`
const Error = styled.div<{showError:boolean}>`
   display: ${({showError}) => showError ? "block": "none"};
   color:red;
   font-size:12px;
   padding-top:10px;
`
const LinkDiv = styled.div`
    cursor: pointer;
    color:#666BE1;
    font-size:12px;
      transition:0.3s all;
    &:hover{
      color:#848598; 
    }
`


const VerifySignupEmail = ({email,codeInput,setCodeInput,submitCode}:{email:string,codeInput:string;setCodeInput:any;submitCode:()=>void}) => {
  const router = useRouter()

const [resendOTP,{data,error,loading}] = useMutation(RESEND_OTP,{
    variables:{
        input:{
            email:email
        }
    }
})


    const [showError,setShowError] = useState(false)
    const [displayInput,setDisplayInput] = useState(false)
    const [showTimer,setShowTimer] = useState(false)

    const updateUI = ()=>{
        setShowTimer(!showTimer)
    }
    const resendCode = async ()=>{
       await resendOTP()
    }
  return (
    <NavWrapper>
        <CenteredLogo size={70} text="Check your email" padding='30px 0' />
        <Content>
            <p>We've sent a temporary login link</p>
            <p>please check your inbox at <b>{email}</b></p>
        </Content>
        <Footer>
            <CodeInput as={motion.div} displayInput={displayInput} variants={InputVariants} initial="hidden" animate="visible">
            <input 
            onFocus={()=>setShowError(false)}
  value={codeInput}
  onChange={(e)=>setCodeInput(e.target.value)}
/>
<Error showError={showError}>Please enter an email address for login</Error>
<button onClick ={()=>{
   
        // submit code
        if(codeInput){
            submitCode()
        }else{
            setShowError(true)
        }
        

}}>
    Continue with login code
</button>
<Resend>
  
  {!showTimer ? 
  <>
   <div>A new code in </div> 
  <Timer secs='300' updateUI={updateUI} /> 
  </>
  :
  <LinkDiv onClick={resendCode}>Resend code</LinkDiv>
  }
</Resend>

            </CodeInput>
            <p onClick={()=>{
                if(!displayInput){
                    setDisplayInput(true)
                }
            }}>Enter code manually</p>
            <p onClick={()=>router.push("/signin")}>Back to login</p>
        </Footer>
    </NavWrapper>
  )
}

export default VerifySignupEmail