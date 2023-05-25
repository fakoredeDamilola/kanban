import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"
import usePortal from "../../hooks/usePortal"
import { addNewActivity, changeTaskDueDate, IActivity, ITaskCards, IWorkspace } from "../../state/board"
import CalenderModal from "../modal/CalenderModal"
import TaskPageAside from "./components/TaskPageAside"
import TaskPageHeader from "./components/TaskPageHeader"
import TaskPageMain from "./components/TaskPageMain"
import {v4 as uuidv4} from "uuid"
import { getTextDate } from "../../utils/utilFunction"
import { RootState } from "../../state/store"
import { CHANGE_TASK_DUE_DATE } from "../../graphql/mutation"
import { useMutation } from "@apollo/client"
import { useRouter } from "next/router"
import { ADD_NEW_ACTIVITY } from "../../graphql/mutation"


const TaskPageWrapper = styled.div`
    width:100%;
    height:100%;
    overflow-y:hidden;
    background-color: ${({theme}) => theme.background};
    border:1px solid ${({theme}) => theme.border};
    color: ${({theme}) => theme.text};
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    box-sizing:border-box;
    position:relative;
    overflow-x:hidden;
    &::-webkit-scrollbar {
        width: 0px;
        background: transparent; 
    }
    padding:10px;
    
`
const TaskpageDesign = styled.div`
    width:100%;
    height:100%;
    background-color: ${({theme}) => theme.body};
    border:1px solid ${({theme}) => theme.border};
    color: ${({theme}) => theme.text};
    border-radius:8px;
    display: flex;
      	flex-direction: column;
    `
const TaskPageContainer = styled.div`
    width:100%;
    flex: 1; 
      	min-height: 0; 
    background-color: ${({theme}) => theme.background};
    color: ${({theme}) => theme.text};
    display:flex;
    `

const TaskPage = ({setTask,position,taskInfo,workspace,workspaceURL,taskListLength}:{taskInfo?:ITaskCards,position:number,workspace:IWorkspace,taskListLength:ITaskCards[],workspaceURL:string;setTask: React.Dispatch<React.SetStateAction<ITaskCards | undefined>>}) => {
    console.log({taskInfo})
    const router = useRouter()
    const [changeTaskDate,{data,loading,error}] = useMutation(CHANGE_TASK_DUE_DATE)
    const [addNewActivity] = useMutation(ADD_NEW_ACTIVITY)
    const {user} = useSelector((state:RootState)=>state)
    
    const dispatch = useDispatch()
    const [showTaskSideNav,setTaskShowSideNav] = useState(false)
    
const [openCalenderModal, setOpenCalenderModal] = useState(false)
    
const Portal = usePortal(document.querySelector("#portal"));
   const saveCalenderDate = (e:any,startDate:any) => {
    dispatch(changeTaskDueDate({id:taskInfo?._id,duedate:startDate}))
    changeTaskDate({
        variables:{
            input:{
                 taskID:taskInfo?._id,
            date:`${new Date(startDate).getTime()/1000}`
            }
           
        }
    })
    console.log({data,error,loading})

       const newActivity = {
      
        nameOfActivity:taskInfo?.dueDate? "changed due date" : "added due date",
            // @ts-ignore
            description:taskInfo?.dueDate ? `changed due date from ${getTextDate(new Date(parseInt(taskInfo?.dueDate)*1000))} to ${getTextDate(startDate)}` :startDate ? `set due date ${getTextDate(startDate)}` : "removed due date",
            icon:"BsCalendar4"
        }
        addNewActivity({
variables:{
              input:{
                taskID:taskInfo?._id,
              activity:newActivity
              }
              
            }
          
        })
            
        // dispatch(addNewActivity({id:taskInfo?._id,activity:CalenderActivity}))
         setOpenCalenderModal(false)
    }
    const closeCalenderModal = () => {
        setOpenCalenderModal(false)
    }
    const changeTask = (num:number) => {
        const newTask = workspace.task[position===0 ? 1 + num : position + num]
        router.push(`/${workspaceURL}/${newTask._id}`)
        setTask(newTask)
    }
    return (
        <TaskPageWrapper>
           {taskInfo ? 
           <TaskpageDesign>
                <TaskPageHeader changeTask={changeTask} position={position} workspaceURL={taskInfo.workspaceURL} showTaskSideNav={showTaskSideNav} setShowTaskSideNav={setTaskShowSideNav} taskList={taskListLength.length}/>
            <TaskPageContainer>
                <TaskPageMain task={taskInfo} 
                setOpenCalenderModal={setOpenCalenderModal}/>

 <TaskPageAside user={user} task={taskInfo} workspacesubitems={workspace.subItems} workspace={workspace} members={workspace.members} showTaskSideNav={showTaskSideNav} />
            </TaskPageContainer>
            </TaskpageDesign> : 
            null
            }
            <Portal>
                 {openCalenderModal ? <CalenderModal workspaceID={workspace.id} date={taskInfo?.dueDate} openCalenderModal={openCalenderModal} closeCalenderModal={closeCalenderModal} saveCalenderModal={saveCalenderDate}  /> : null}
            </Portal>
              
        </TaskPageWrapper>
    )
}

export default TaskPage