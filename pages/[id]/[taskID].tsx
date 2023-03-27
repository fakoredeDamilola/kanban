import { useLazyQuery } from '@apollo/client'
import { useRouter } from 'next/router'
import React, { useEffect, useState,useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import TaskPage from '../../components/taskpage/TaskPage'
import { FETCH_TASK, FETCH_WORKSPACE } from '../../graphql/queries'
import { IBoard, ITaskCards, setCurrentWorkspace } from '../../state/board'
import { RootState } from '../../state/store'

const SingleTask = () => {
  const [workspace,setWorkspace] = useState<any>()
  const [taskID,setTaskID] = useState<any>("")
  const [task,setTask] = useState<ITaskCards>()
  const router = useRouter()
  const {currentWorkspace} = useSelector((state:RootState)=>state.board)

  const dispatch = useDispatch()

  useEffect(()=>{
    if(router?.query.taskID){
      console.log(router.query)
       setWorkspace(router.query.taskID)
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
  console.log({data,error,loading})
  useMemo(()=>{
    // if(data?.fetchTask?.status){
        setTask(data?.fetchTask?.task)
    // }else{
    // }
  },[data])
  useEffect(()=>{
      if(router?.query?.taskID && router?.query.id){
         // @ts-ignore
          const taskInfo = currentWorkspace.taskID.find((task)=>task._id === router.query.taskID)
          if(taskInfo){
            setTask(taskInfo)
          }else {
            fetchTask()
          }
          
      }
  },[currentWorkspace,workspace,taskID])


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
      console.log({workspace})
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
        if(workspace){
          setWorkspace(workspace)
        }else {
          fetchWorkspace()
        }
        
    }
},[currentWorkspace,router.query])

  const taskList = task?.status?.name
  const taskListLength = currentWorkspace.taskID.filter((task:ITaskCards)=>task.status.name === taskList)
  if(loading){
    return <div>
        <h1>loading</h1>
    </div>
  }else if(task && workspace) {
    return <TaskPage taskInfo={task} workspace={workspace} taskListLength={taskListLength} />
  }else if(!task) {
    return (<div>
        <h1>task not found</h1>
    </div>)
  }
   
//   return <div>you</div>
  
}

export default SingleTask