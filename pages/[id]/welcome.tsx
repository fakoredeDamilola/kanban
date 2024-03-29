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
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'
import { useDispatch, useSelector } from 'react-redux'
import { IBoard, setCurrentWorkspace } from '../../state/board'
import { ADD_NEW_MEMBERS_TO_WORKSPACE } from '../../graphql/mutation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { NotifyComponent } from '../../components/Notify/Notify'
import LoadingPage from '../../components/LoadingPage'
import { RootState } from '../../state/store'

const NavWrapper = styled.div`
   display: flex;
   flex-direction:column;
  flex-wrap: nowrap;
  box-sizing:border-box;
  align-items:center;
  min-height:100%;
  background-color: ${({theme}) => theme.background};
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
    const notifyMess = (title:string,text:string,link?:string) => toast(<NotifyComponent title={title} link={link} text={text} />);

const router = useRouter() 
    const [onboardingScreen,setOnboardingScreen] = useState(ONBOARDING_SCREEN.WELCOME_SCREEN)
    const dispatch = useDispatch()
    const {types} = useSelector((state:RootState)=>state.user)
    const [workspaceID,setWorkspaceID] = useState("")
    const [fetchWorkspace,{data,loading,error}] = useLazyQuery(FETCH_WORKSPACE,{
      variables: {
        input: {
         workspaceURL: router?.query.id
        }
      }
    })
    const [coWorkerValue,setCoWorkerValue] = useState("")

    const [addNewMembersToWorkspace,{data:newMembersData,error:newMembersError,loading:newMembersLoading }] = useMutation(ADD_NEW_MEMBERS_TO_WORKSPACE)
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
    useEffect(()=>{
      if(types !=="guest"){
        fetchWorkspace()
      }
    },[])
    useMemo(()=>{
      console.log({newMembersData})
          if(newMembersData?.addNewMembersToWorkspace?.status){
            const res =newMembersData?.addNewMembersToWorkspace?.result
            res.map((data:any) => {
              console.log({data})
              notifyMess(`Invites sent to ${data.name}` ,"Your team members can check their emails for the invites, due to a glitch please use this link",data?.url)
            })
            
            setCoWorkerValue("")
            // setOnboardingScreen(ONBOARDING_SCREEN.GOOD_TO_GO)
          }
        
      
     
    },[newMembersData])


    const inviteCoworkers =async () =>{
      if(coWorkerValue.length > 0){
         await addNewMembersToWorkspace({
        variables:{
        input:{
          members:coWorkerValue,
          workspaceURL:data?.fetchWorkspace.workspace.URL,
          workspaceID:data?.fetchWorkspace.workspace._id,
          workspaceName:data?.fetchWorkspace.workspace.name,
        }
      }
    })
      }
    
    }

    useEffect(()=>{
        if(router?.query.id){
          // @ts-ignore
          setWorkspaceID(router?.query.id)
         
        }
      },[router.query])

  
  
  return (
    <NavWrapper>
        {newMembersLoading ? <LoadingPage />
        
        : onboardingScreen === ONBOARDING_SCREEN.WELCOME_SCREEN ?
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