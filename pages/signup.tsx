import React from 'react'
import styled from 'styled-components'
import DashboardLayout from '../components/Dashboardlayout'
import CenteredLogo from '../components/Home/CenteredLogo'
import SignupButtons from '../components/Home/SignupButtons'

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
const signup = () => {
  return (
    <NavWrapper>
        <CenteredLogo size={70} text="Create your kanban account" />
        <SignupButtons />

        <Terms>
            By signing up, you agree to our signs and conditions
        </Terms>
    </NavWrapper>
  )
}

signup.PageLayout = DashboardLayout

export default signup