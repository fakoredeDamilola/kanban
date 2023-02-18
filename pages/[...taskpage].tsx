import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TaskPage from '../components/taskpage/TaskPage'
import { ITaskCards } from '../state/board'
import { RootState } from '../state/store'

const SingleTask = () => {
  const [workspace,setWorkspace] = useState<any>("")
  const [taskID,setTaskID] = useState<any>("")
  const [task,setTask] = useState<ITaskCards>()
  const router = useRouter()
  const {boardsDetails,currentWorkspace} = useSelector((state:RootState)=>state.board)

  

  useEffect(()=>{
    if(router?.query.taskpage){
       setWorkspace(router.query.taskpage[0])
    setTaskID(router.query.taskpage[1])
    }
  },[router.query])
  useEffect(()=>{
    if(boardsDetails){
      if(router?.query?.taskpage && router?.query.taskpage[1]){
         // @ts-ignore
          const taskInfo = boardsDetails.tasks.find((task)=>task.id === router.query.taskpage[1])
          setTask(taskInfo)
      }
    }
  },[boardsDetails,workspace,taskID])
  const taskList = task?.status.name
  const taskListLength = boardsDetails.tasks.filter((task:ITaskCards)=>task.status.name === taskList)
  return <TaskPage taskInfo={task} workspace={currentWorkspace} taskListLength={taskListLength} />
  
}

export default SingleTask