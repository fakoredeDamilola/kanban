import React,{useEffect, useMemo} from 'react'
import styled from 'styled-components'
import { useState } from "react"
import WelcomeScreen from '../../components/welcome/WelcomeScreen'
import DashboardLayout from '../../components/Dashboardlayout'
import OnboardingIndicator from '../../components/welcome/OnboardingIndicator'
import ConnectWIthGithub from '../../components/welcome/ConnectWIthGithub'
import InviteCoWorkers from '../../components/welcome/InviteCoWorkers'
import GoodToGo from '../../components/welcome/GoodToGo'
import { useRouter } from 'next/router'
import { FETCH_WORKSPACE } from '../../graphql/queries'
import { useMutation, useQuery } from '@apollo/client'
import { useDispatch } from 'react-redux'
import { IBoard, setCurrentWorkspace } from '../../state/board'
import { ADD_NEW_MEMBERS_TO_WORKSPACE } from '../../graphql/mutation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotifyComponent } from '../../components/Notify/Notify'

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

const welcome = () => {
    enum ONBOARDING_SCREEN {
        WELCOME_SCREEN = "WELCOME_SCREEN",
        CONNECT_WITH_GITHUB = "CONNECT_WITH_GITHUB",
        INVITE_COWORKERS = "INVITE_COWORKERS",
        GOOD_TO_GO = "GOOD_TO_GO" 
    }
    const notifyMess = (title:string,text:string) => toast(<NotifyComponent title={title} text={text} />);

const router = useRouter() 
    const [onboardingScreen,setOnboardingScreen] = useState(ONBOARDING_SCREEN.WELCOME_SCREEN)
    const dispatch = useDispatch()
    const [workspaceID,setWorkspaceID] = useState("")
    const {data,loading,error} = useQuery(FETCH_WORKSPACE,{
      variables: {
        input: {
         workspaceURL: router?.query.id
        }
      }
    })
    const [coWorkerValue,setCoWorkerValue] = useState("")

    const [addNewMembersToWorkspace,{data:newMembersData,error:newMembersError,loading:newMembersLoading }] = useMutation(ADD_NEW_MEMBERS_TO_WORKSPACE)

    console.log({data,loading,error})
    useMemo(()=>{
      if(data?.fetchWorkspace.status){
        const workspace = data?.fetchWorkspace.workspace
        const boardDetails:IBoard = {
          workspaceID:workspace._id ?? "29",
          workspace:workspace.name,
          workspaceURL:workspace.URL,
          tasks:[]
        }
        dispatch(setCurrentWorkspace({workspace,boardsDetails:boardDetails})) 
      }
     
    },[data])
    useMemo(()=>{
     console.log({newMembersData})
          if(newMembersData?.addNewMembersToWorkspace?.status){
            
            notifyMess("Invites sent","Your team members can check their emails for the invites")
            setCoWorkerValue("")
            // setOnboardingScreen(ONBOARDING_SCREEN.GOOD_TO_GO)
          }
        
      
     
    },[newMembersData])


    const inviteCoworkers =async () =>{
     await addNewMembersToWorkspace({
        variables:{
        input:{
          members:coWorkerValue,
          workspaceURL:data?.fetchWorkspace.workspace.name,
          workspaceID:data?.fetchWorkspace.workspace._id
        }
      }
    })
    console.log({data})
    }

    useEffect(()=>{
        if(router?.query.id){
          // @ts-ignore
          setWorkspaceID(router?.query.id)
         
        }
      },[router.query])

  
  
  return (
    <NavWrapper>
        {onboardingScreen === ONBOARDING_SCREEN.WELCOME_SCREEN ?
    <WelcomeScreen onboardingScreen={onboardingScreen} setOnboardingScreen={setOnboardingScreen}  /> :
    onboardingScreen === ONBOARDING_SCREEN.CONNECT_WITH_GITHUB ?
    <ConnectWIthGithub setOnboardingScreen={setOnboardingScreen} /> :
    onboardingScreen === ONBOARDING_SCREEN.INVITE_COWORKERS ?
    <InviteCoWorkers submitCoworkers={inviteCoworkers} setCoWorkerValue={setCoWorkerValue} coWorkerValue={coWorkerValue} setOnboardingScreen={setOnboardingScreen} /> :
    onboardingScreen === ONBOARDING_SCREEN.GOOD_TO_GO ?
    <GoodToGo workspaceID={workspaceID}  /> :
    null    
    }
    <OnboardingIndicator indicator={4} currentIndicator={Object.keys(ONBOARDING_SCREEN).indexOf(onboardingScreen)} />
    <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </NavWrapper>
  )
}

welcome.PageLayout = DashboardLayout

export default welcome