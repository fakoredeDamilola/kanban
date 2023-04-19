import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import { motion } from 'framer-motion'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'
import CustomInput from '../CustomInput'
import PasswordIndicator from '../PasswordIndicator'

const ButtonFlex = styled.div`
display:flex;
flex-direction:column;
gap:20px;
 
`
const Button = styled.button<{field?:string}>`
        color:white;
        font-size:15px;
        border:none;
        height:45px;
        background-color:${({field}) =>field==="google"? "#666BE1": "#2A2B38"};
        border-radius:6px;
        cursor:pointer;
         width:80%;
         &:hover{
          background-color:${({field}) =>field==="googl"? "#666BE1": "#2A2B38"};
         }
         
         transition:0.3s all;
        @media ${device.mobileS} {
     width:350px;
}

`
const EmailInput = styled.div`
  padding:10px 0;
  
  transition:all 0.3s;
  /* margin:px 0; */
  & >input {
    width:100%;
    height:45px;
    box-sizing:border-box;
    padding:0 10px; 
    background:#151621;
    border:1px solid #666BE1;
    border-radius:3px;
    outline:none;
    color:white;
    margin-top:5px;
  }
  & > label{
    color:white;
    padding-bottom:8px;
    font-size:12px;
  }
`
const InputContainer = styled.div`
border-top: 1px solid ${({theme}) => theme.borderColor};

`

interface ISignup {
  handleInput:(value:string,name:string)=>void;
  signupObj:any;
  submitEmail:()=>void;
  passwordIndicator?:string;
  errorTable:string[],
  setErrorTable:any,
  disabled:boolean;
  indicator?:boolean
  signupWithOAuth:(data:any)=>void;
  setAxiosLoading:any;
}


const SignupButtons = ({
  handleInput,
  signupObj,
  errorTable,
  setErrorTable,
  submitEmail,
  passwordIndicator,
  indicator,
  signupWithOAuth,
  setAxiosLoading,
  disabled}:ISignup) => {
  const [displayInput,setDisplayInput] = useState(false)
  const colorbackground = passwordIndicator ==="weak" ? "red": passwordIndicator==="medium" ? "orange" : "green"

  const modal = {
    hidden:{
        y:"-100vh",
        opacity:0,
    },
    visible:{
        y:"0px",
        opacity:1,
        transition:{delay:0.1}
    }
}
const [user,setUser] = useState<any>(null)
const [profile,setProfile] = useState<any>(null)



useEffect(
  () => {
      if (user) {
        setAxiosLoading(true)
          axios
              .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                  headers: {
                      Authorization: `Bearer ${user.access_token}`,
                      Accept: 'application/json'
                  }
              })
              .then((res) => {
                  setProfile(res.data);
                  
                  signupWithOAuth(res.data)
              })
              .catch((err) => console.log(err));
      }
  },
  [ user ]
);

const login = useGoogleLogin({
  onSuccess: (codeResponse) => setUser(codeResponse),
  onError: (error) => console.log('Login Failed:', error)
});

const logOut = () => {
  googleLogout();
  setProfile(null);
};


  return (
    <ButtonFlex>
        <Button field="google" onClick={() => login()}>
            Continue with Google
        </Button>
          {/* <GoogleLogin onSuccess={responseMessage} onError={errorMessage} /> */}
      { displayInput &&  <InputContainer as={motion.div} variants={modal} initial="hidden" animate="visible">
        <EmailInput > 
        <label htmlFor="email">Email</label>
        <CustomInput
        fontSize='14px'
        color="white"
        fontWeight={700}
        setTextValue={()=>null}
        placeholder='Enter your email'
        type="email"
        input="text"
        name="email"
        isError={errorTable.includes("email")}
        error ={errorTable.includes("email") ? "Put enter a email" : ""}
        setErrorTable={setErrorTable}
        textvalue={signupObj.email}
        changeInput={(value,name)=>handleInput(name,value)}
        errors={["required"]}
        />
        </EmailInput>
        <EmailInput >
        <label>Password</label>
        <CustomInput
        fontSize='14px'
        color="white"
        fontWeight={700}
        setTextValue={()=>null}
        placeholder='****'
        type="password"
        input="text"
        isError={errorTable.includes("password") || errorTable.includes("passLength") && true}
        error ={errorTable.includes("password") ? "Please enter a password" : errorTable.includes("passLength") ? "length is less than 8": ""}
        name="password"
        setErrorTable={setErrorTable}
        textvalue={signupObj.password}
        changeInput={(value,name)=>handleInput(name,value)}
        errors={["required","password"]}
        />
        {indicator && <PasswordIndicator strength={passwordIndicator} colorbackground={colorbackground} />}
        </EmailInput>
        </InputContainer>}

        <Button field="googl" disabled={disabled} onClick={()=>{
          if(!displayInput){
           setDisplayInput(true)
          }else{

            submitEmail()
            // setShowError(!showError)
          }
        }}>
            Continue with Email
        </Button>
        {/* // </EmailContainer> */}
        
    </ButtonFlex>
  )
}

export default SignupButtons