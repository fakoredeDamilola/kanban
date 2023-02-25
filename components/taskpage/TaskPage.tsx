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

const TaskPageWrapper = styled.div`
    width:100%;
    height:100%;
    overflow-y:hidden;
    background-color: ${({theme}) => theme.sidenav};
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
    background-color: ${({theme}) => theme.background};
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

const TaskPage = ({taskInfo,workspace,taskListLength}:{taskInfo?:ITaskCards,workspace:IWorkspace,taskListLength:ITaskCards[]}) => {
    
    const dispatch = useDispatch()
    const {user} = useSelector((state:RootState)=>state.board)
    const {taskView} = useSelector((state:RootState)=>state.display)
    const [showTaskSideNav,setTaskShowSideNav] = useState(false)
    
const [openCalenderModal, setOpenCalenderModal] = useState(false)
    
const Portal = usePortal(document.querySelector("#portal"));
   const saveCalenderDate = (e:any,startDate:any) => {
    dispatch(changeTaskDueDate({id:taskInfo?.id,duedate:startDate}))

        const CalenderActivity:IActivity = {
            id: uuidv4(),
            nameOfActivity:taskInfo?.dueDate? "changed due date" : "added due date",
           description:taskInfo?.dueDate ? `changed due date from ${getTextDate(taskInfo?.dueDate)} to ${getTextDate(startDate)}` :startDate ? `set due date ${getTextDate(startDate)}` : "removed due date",
            createdby: {
              name:user.name,
              id:user.id,
              email:user.email
            },
            time:Date.now()
        }
        dispatch(addNewActivity({id:taskInfo?.id,activity:CalenderActivity}))
         setOpenCalenderModal(false)
    }
    const closeCalenderModal = () => {
        setOpenCalenderModal(false)
    }
    return (
        <TaskPageWrapper>
           {taskInfo ? 
           <TaskpageDesign>
                <TaskPageHeader showTaskSideNav={showTaskSideNav} setShowTaskSideNav={setTaskShowSideNav} taskList={taskListLength.length}/>
            <TaskPageContainer>
                <TaskPageMain task={taskInfo} 
                setOpenCalenderModal={setOpenCalenderModal}/>

 <TaskPageAside task={taskInfo} workspace={workspace.subItems} showTaskSideNav={showTaskSideNav} />
            </TaskPageContainer>
            </TaskpageDesign> : 
            null
            }
            <Portal>
                 {openCalenderModal ? <CalenderModal date={taskInfo?.dueDate} openCalenderModal={openCalenderModal} closeCalenderModal={closeCalenderModal} saveCalenderModal={saveCalenderDate} /> : null}
            </Portal>
              
        </TaskPageWrapper>
    )
}

export default TaskPage