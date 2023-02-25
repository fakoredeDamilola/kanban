import React from 'react'
import styled from 'styled-components'
import { device } from '../../config/theme'

const ButtonFlex = styled.div`
display:flex;
flex-direction:column;
gap:20px;
 
`
const Button = styled.button<{style?:string}>`
        color:white;
        font-size:15px;
        border:0;
        height:45px;
        background-color:${({style}) =>style==="google"? "#666BE1": "#2A2B38"};
        border-radius:6px;
        cursor:pointer;
         width:80%;
        @media ${device.mobileS} {
     width:350px;
}

`
const SignupButtons = () => {
  return (
    <ButtonFlex>
        <Button style="google">
            Continue with Google
        </Button>
        <Button style="googl">
            Continue with Email
        </Button>
    </ButtonFlex>
  )
}

export default SignupButtons