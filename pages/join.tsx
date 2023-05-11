import { useRouter } from 'next/router'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from '../components/Dashboardlayout'
import CreateWorkspace from '../components/signup/CreateWorkspace'
import {  IWorkspace } from '../state/board'
import { AddNewWorkspace } from '../state/user'
import { RootState } from '../state/store'
import { subItems } from '../utils/utilData'
import styled from 'styled-components'
import { useMutation } from '@apollo/client'
import { CREATE_NEW_WORKSPACE } from '../graphql/mutation'
import { setCurrentSignupPage, setModalData } from '../state/display'
import LoadingPage from '../components/LoadingPage'

const NavWrapper = styled.div`
   display: flex;
   flex-direction:column;
  flex-wrap: nowrap;
  box-sizing:border-box;
  align-items:center;
  /* height:100%; */
  min-height:100%;
  background-color: ${({ theme }) => theme.background} ;
  min-width:100%;
  padding-top:10px;
  padding-bottom:20px;
 
`
const join = () => {

    const [workspaceName,setWorkspaceName] = useState("")
const [workspaceURL,setWorkspaceURL] = useState("")
const {user} = useSelector((state:RootState)=>state)
const dispatch = useDispatch()
const router = useRouter()
const [errorTableWorkspace,setErrorTableWorkspace] = useState([])
const [disableWorkspaceBtn,setDisableWorkspaceBtn] = useState(false)

const [createWorkspace,{loading}] = useMutation(
  CREATE_NEW_WORKSPACE, {
    variables: {
      input: {
    "workspaceName":workspaceName,
    "workspaceURL":workspaceURL,
    subItems:subItems
      }
    },
    onCompleted: (data) =>{
      const workspace =data.createNewWorkspace.workspace
      dispatch(AddNewWorkspace({newWorkspace:workspace}))

      router.push(`/${workspace.URL}`)
    },
    onError:(err)=>{
      dispatch(setModalData({modalType:"error",modalMessage:"no auth found,sign up again",modal:true}))
    }
  }
) 


    const createNewWorkspace = async () => {
        // const newWorkspace: IWorkspace = {
        //     name:workspaceName,
        //     URL:workspaceURL,
        //     id:workspaceName.slice(0,3),
        //     subItems: subItems,
        //     totalTasks:0,
        //     totalMembers:1,
        //     members:[
        //       {
        //         name:user.name ?? "name",
        //         email:user.email,
        //         id:user._id,
        //         img:user.image ?? "eje",
        //         color:"red",
        //         joined:`${Date.now()}`,
        //         username:user.name ?? "userm",
        //         taskIDs:[]
        //       }
        //     ],
        //     taskID:[],
        //     owner: {
        //       name:user.name ?? "name",
        //       email:user.email,
        //       img:user.image
        //     }
      
        // }
        // create new workspace in the backend
        // dispatch(AddNewWorkspace({newWorkspace}))
        // router.push(`/${workspaceName}`)
        await createWorkspace()
      }

  return (
    <NavWrapper>
      {!loading ? 
        <CreateWorkspace 
    errorTableWorkspace={errorTableWorkspace}
    setErrorTableWorkspace={setErrorTableWorkspace}
    disableWorkspaceBtn={disableWorkspaceBtn}
    setDisableWorkspaceBtn={setDisableWorkspaceBtn}
    email={user.email}
    createNewWorkspace={createNewWorkspace}
    workspaceName={workspaceName} 
    setWorkspaceName={setWorkspaceName} 
    workspaceURL={workspaceURL}
    setWorkspaceURL={setWorkspaceURL}
    /> : <LoadingPage />

      }
     
    </NavWrapper>
   
  )
}


export default join