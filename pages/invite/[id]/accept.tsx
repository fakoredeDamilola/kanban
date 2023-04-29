import React, { useEffect, useState,useMemo } from 'react'
import styled from 'styled-components'
import DashboardLayout from '../../../components/Dashboardlayout'
import InvitePage from '../../../components/invite/InvitePage'
import { useRouter } from 'next/router'
import { useMutation, useQuery } from '@apollo/client'
import { VERIFY_MEMBERS_LINK } from '../../../graphql/queries'
import LoadingPage from '../../../components/LoadingPage'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import { ADD_MEMBERS } from '../../../graphql/mutation'


const NavWrapper = styled.div`
   /* display: flex; */
   flex-direction:column;
  flex-wrap: nowrap;
  box-sizing:border-box;
  align-items:center;
  height:100%;
  max-height:100%;
  background-color: ${({theme})=>theme.background};
  min-width:100%;
  color:white;
 
`
const accept = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [userInvite,setUserInvite] = useState("")
  const [userInviteIssue,setUserInviteIssue] = useState("")
  const [linkDetails,setLinkDetails] = useState<any>(null)
  const {data,error,loading} = useQuery(VERIFY_MEMBERS_LINK,{
    variables:{
        input: {
            inviteURL:router?.query.id
        }
    }
  })
  const [addMembers,{data:addMembersData,error:addMembersError,loading:addMembersLoading}] = useMutation(ADD_MEMBERS)

  useMemo(()=>{ 
if( data){
    setUserInviteIssue(data?.verifyMembersLink.field ?? "good")
    if(data?.verifyMembersLink.status){
    setUserInvite(data?.verifyMembersLink?.invite?.email)
      setLinkDetails(data?.verifyMembersLink.workspace)
      if(data?.verifyMembersLink?.invite?.email === data?.verifyMembersLink.user.email){
        setUserInviteIssue("accept")
      }else{
        setUserInviteIssue("login")
      }
    }
  }
  },[data])
  useMemo(()=>{
if( addMembersData?.AddNewMember?.status){
  let workspaceURL = addMembersData?.AddNewMember?.workspaceInfo?.workspaceID?.URL
  router.push(`/${workspaceURL}`)
  }
  },[addMembersData])

    const acceptInvite =async (value:string) =>{
      if(value=== "accept") {
        await addMembers({
          variables:{
            input:{
             inviteToken: data?.verifyMembersLink?.invite?.inviteToken
            }
          }
        })
      }else{
        router.push("/signin")
      }
    }
  return (
    <NavWrapper>
     {loading || addMembersLoading ?
     <LoadingPage /> :
   
        <InvitePage 
        invitee={linkDetails?.owner?.username}
        inviteLink='73883-38838-3838'
        workerEmail={userInvite}
        workspaceName={linkDetails?.name}
        acceptInvite={acceptInvite} email={data?.verifyMembersLink.user.email}
        userInviteIssue={userInviteIssue}
        />
        
        // userInviteIssue==="account" ?
        
        }
    </NavWrapper>
  )
}

accept.PageLayout = DashboardLayout

export default accept