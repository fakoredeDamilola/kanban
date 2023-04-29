import React from 'react'
import styled from 'styled-components'
import DashboardLayout from '../../../components/Dashboardlayout'
import InvitePage from '../../../components/invite/InvitePage'


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
const accept = () => {
    const acceptInvite = () =>{

    }
  return (
    <NavWrapper>
        <InvitePage 
        invitee='Fakorede Damilola'
        inviteLink='73883-38838-3838'
        workerEmail='workerEmail'
        workspaceName='workspaceName'
        acceptInvite={acceptInvite} email="dfakorede29@gmail.com" />
    </NavWrapper>
  )
}

accept.PageLayout = DashboardLayout

export default accept