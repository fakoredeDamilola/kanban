import { useRouter } from 'next/router'
import React,{useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DashboardLayout from '../components/Dashboardlayout'
import CreateWorkspace from '../components/signup/CreateWorkspace'
import { AddNewWorkspace, IWorkspace } from '../state/board'
import { RootState } from '../state/store'
import { subItems } from '../utils/utilData'

const join = () => {

    const [workspaceName,setWorkspaceName] = useState("")
const [workspaceURL,setWorkspaceURL] = useState("")
const {user} = useSelector((state:RootState)=>state.board)
const dispatch = useDispatch()
const router = useRouter()

    const createNewWorkspace = () => {
        const newWorkspace: IWorkspace = {
            name:workspaceName,
            URL:workspaceURL,
            id:workspaceName.slice(0,3),
            subItems: subItems,
            totalTasks:0,
            totalMembers:1,
            members:[
              {
                name:user.name,
                email:user.email,
                id:user._id,
                img:user.image,
                color:"red",
                joined:`${Date.now()}`,
                username:user.name,
                taskIDs:[]
              }
            ],
            taskID:[],
            owner: {
              name:user.name,
              email:user.email,
              img:user.image
            }
      
        }
        // create new workspace in the backend
        dispatch(AddNewWorkspace({newWorkspace}))
        router.push(`/${workspaceName}`)
      }

  return (
    <CreateWorkspace 
    email={user.email}
    createNewWorkspace={createNewWorkspace}
    workspaceName={workspaceName} 
    setWorkspaceName={setWorkspaceName} 
    workspaceURL={workspaceURL}
    setWorkspaceURL={setWorkspaceURL}
    />
  )
}

join.PageLayout = DashboardLayout

export default join