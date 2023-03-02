import React, { useState } from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'
import CenteredLogo from '../Home/CenteredLogo'

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
const Content = styled.div`
    text-align:center;
    color:white;
    font-size:17px;
    p {
        margin:10px;
    }
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
    border-top: 1px solid white;
  padding:10px 0;
  /* visibility:${({displayInput}) => !displayInput ? "hidden" : "visible"}; */
  display:${({displayInput}) => !displayInput ? "none" : "block"};
  opacity:${({displayInput}) => !displayInput ? "0" : "1"};
  height: ${({displayInput}) => !displayInput ? "0" : "auto"};
  transition:all 0.3s;
  width:100%;
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


const VerifySignupEmail = ({email,codeInput,setCodeInput,submitCode}:{email:string,codeInput:string;setCodeInput:any;submitCode:()=>void}) => {
    const [showError,setShowError] = useState(false)
    const [displayInput,setDisplayInput] = useState(false)
  return (
    <NavWrapper>
        <CenteredLogo size={70} text="Check your email" padding='30px 0' />
        <Content>
            <p>We've sent a temporary login link</p>
            <p>please check your inbox at <b>{email}</b></p>
        </Content>
        <Footer>
            <CodeInput displayInput={displayInput}>
            <input 
  value={codeInput}
  onChange={(e)=>setCodeInput(e.target.value)}
/>
<Error showError={showError}>Please enter an email address for login</Error>
<button onClick ={()=>{
   
        // submit code
        submitCode()

}}>
    Continue with login code
</button>
            </CodeInput>
            <p onClick={()=>{
                if(!displayInput){
                    setDisplayInput(true)
                }
            }}>Enter code manually</p>
            <p>Back to login</p>
        </Footer>
    </NavWrapper>
  )
}

export default VerifySignupEmail