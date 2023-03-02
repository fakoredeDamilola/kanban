import React,{useEffect} from 'react'
import styled from 'styled-components'
import { useState } from "react"
import WelcomeScreen from '../../components/welcome/WelcomeScreen'
import DashboardLayout from '../../components/Dashboardlayout'
import OnboardingIndicator from '../../components/welcome/OnboardingIndicator'
import ConnectWIthGithub from '../../components/welcome/ConnectWIthGithub'
import InviteCoWorkers from '../../components/welcome/InviteCoWorkers'
import GoodToGo from '../../components/welcome/GoodToGo'
import { useRouter } from 'next/router'

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
const router = useRouter() 
    const [onboardingScreen,setOnboardingScreen] = useState(ONBOARDING_SCREEN.WELCOME_SCREEN)
    const [workspaceID,setWorkspaceID] = useState("")

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
    <InviteCoWorkers setOnboardingScreen={setOnboardingScreen} /> :
    onboardingScreen === ONBOARDING_SCREEN.GOOD_TO_GO ?
    <GoodToGo workspaceID={workspaceID}  /> :
    null    
    }
    <OnboardingIndicator indicator={4} currentIndicator={Object.keys(ONBOARDING_SCREEN).indexOf(onboardingScreen)} />
    </NavWrapper>
  )
}

welcome.PageLayout = DashboardLayout

export default welcome