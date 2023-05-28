import { useLazyQuery, useQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskPage from '../../components/taskpage/TaskPage'
import { FETCH_TASK, FETCH_WORKSPACE } from '../../graphql/queries'
import { IBoard, ITaskCards, setCurrentWorkspace } from '../../state/board'
import { RootState } from '../../state/store'
import LoadingPage from '../../components/LoadingPage'
import NoAuth from '../../components/NoAuth'
import NoTaskFound from '../../components/NoTaskFound'

const SingleTask = () => {
  const [workspace,setWorkspace] = useState<any>()
  const [workspaceURL,setWorkspaceURL] = useState<any>("")
  const [taskID,setTaskID] = useState<any>("")
  const [task,setTask] = useState<ITaskCards>()
  const router = useRouter()
  const {currentWorkspace} = useSelector((state:RootState)=>state.board)
  const {user} = useSelector((state:RootState)=>state)
  

  const dispatch = useDispatch()

  useEffect(()=>{
    if(router?.query.taskID){
       setWorkspaceURL(router.query.id)
    setTaskID(router.query.taskID)
    }
  },[router.query])
  const [fetchTask,{data,error,loading}] = useLazyQuery(FETCH_TASK,{
    variables:{
        input: {
            id:router?.query.taskID,
            URL:router?.query.id
        }
    }
  })
  useEffect(()=>{
    if(!task?._id && user.types!=="guest"){
      fetchTask()
    }else if(user.types==="guest"){
     setTask(currentWorkspace.task.find((t)=>t._id === router?.query.taskID))
    }
  },[task])
  useMemo(()=>{
    // if(data?.fetchTask?.status){
        setTask(data?.fetchTask?.task)
    // }else{
    // }
  },[data])


  const [fetchWorkspace,{data:workspaceData,loading:workspaceLoading}] = useLazyQuery(FETCH_WORKSPACE,{
    variables: {
      input: {
       workspaceURL: router?.query.id
      }
    }
  })

  useMemo(()=>{
    if(workspaceData?.fetchWorkspace.status){
      const workspace = workspaceData?.fetchWorkspace.workspace
      const boardDetails:IBoard = {
        workspaceID:workspace._id ?? "29",
        workspace:workspace.name,
        workspaceURL:workspace.URL,
        tasks:[]
      }
      dispatch(setCurrentWorkspace({workspace,boardsDetails:boardDetails})) 
      setWorkspace(workspace)
    }
   
  },[workspaceData])
  useEffect(()=>{
    if(router?.query?.id){
       // @ts-ignore
        const workspace = currentWorkspace.URL === router?.query?.id ? currentWorkspace : null 
        console.log({workspace})
        if(workspace){
          setWorkspace(workspace)
        }else {
          fetchWorkspace()
          
        }
        
    }
},[currentWorkspace,router.query])


  const taskList = task?.status?.name
  const taskListLength = currentWorkspace.task.filter((task:ITaskCards)=>task.status.name === taskList)
  if(loading || workspaceLoading){
    return <LoadingPage />
  }else if(task && workspace) {
    return <TaskPage setTask={setTask} position={workspace?.task?.findIndex((item:any)=>item._id ===task?._id)} taskInfo={task} workspace={workspace} workspaceURL={workspaceURL} taskListLength={taskListLength} />
  }else if(!task) {
    return (<NoTaskFound title="No Task Found" text="Please go back to home page" email={user.email} link={()=>router.push(`/${router?.query.id}`)}/>)
  }
   
//   return <div>you</div>
  
}

export default SingleTask