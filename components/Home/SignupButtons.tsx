import React, { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'

const ButtonFlex = styled.div`
display:flex;
flex-direction:column;
gap:20px;
 
`
const Button = styled.button<{field?:string}>`
        color:white;
        font-size:15px;
        border:0;
        height:45px;
        background-color:${({field}) =>field==="google"? "#666BE1": "#2A2B38"};
        border-radius:6px;
        cursor:pointer;
         width:80%;
        @media ${device.mobileS} {
     width:350px;
}

`
const EmailInput = styled.div<{displayInput:boolean}>`
  border-top: 1px solid white;
  padding:10px 0;
  /* visibility:${({displayInput}) => !displayInput ? "hidden" : "visible"}; */
  display:${({displayInput}) => !displayInput ? "none" : "block"};
  opacity:${({displayInput}) => !displayInput ? "0" : "1"};
  height: ${({displayInput}) => !displayInput ? "0" : "auto"};
  transition:all 0.3s;
  /* margin:px 0; */
  & >input {
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
`
const Error = styled.div<{showError:boolean}>`
   display: ${({showError}) => showError ? "block": "none"};
   color:red;
   font-size:12px;
   padding-top:10px;
`
const SignupButtons = ({emailInput,setEmailInput,submitEmail}:{emailInput:string,setEmailInput:any;submitEmail:()=>void}) => {
  const [displayInput,setDisplayInput] = useState(false)
  const [showError,setShowError] = useState(false)
  return (
    <ButtonFlex>
        <Button field="google">
            Continue with Google
        </Button>
        {/* <EmailContainer>*/}
<EmailInput displayInput={displayInput}> 

<input 
  value={emailInput}
  onChange={(e)=>setEmailInput(e.target.value)}
/>
<Error showError={showError}>Please enter an email address for login</Error>
        </EmailInput>
        <Button field="googl" onClick={()=>{
          if(emailInput ){
            submitEmail()
          }else{
            setDisplayInput(true)
            setShowError(!showError)
          }
        }}>
            Continue with Email
        </Button>
        {/* // </EmailContainer> */}
        
    </ButtonFlex>
  )
}

export default SignupButtons