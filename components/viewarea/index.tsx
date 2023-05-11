
import { useState, useEffect, useMemo } from "react"
import AddNewBoard from "../AddNewBoard";
import usePortal from "../../hooks/usePortal";
import ErrorModal from "../modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewTask, clearCurrentWorkspaceStatus, IMembers, increaseNumberOfTasks, ITaskCards, refetchWorkspace, setCurrentWorkspaceStatus } from "../../state/board";
import { NotifyComponent } from "../Notify/Notify";

import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { IBarContent } from "./IViewrea";
import { setNewBoardModal } from "../../state/display";
import TaskPageView from "./TaskPageView";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_TASK } from "../../graphql/mutation";
import styled from "styled-components";


export default function ViewAreaIndex({margin,tasks,user,type}:{margin?:string,tasks:ITaskCards[],user?:IMembers,type?:string}) {
const [openErrorModal, setOpenErrorModal] = useState(false)

const [issueTitle,setIssueTitle] = useState("")
const [issueDescription,setIssueDescription] = useState("")
const [imgURLArray, setImgURLArray] = useState<string[]>([]);
const dispatch= useDispatch()

const {currentWorkspace} = useSelector((state:RootState)=>state.board)
const {openNewBoardModal} = useSelector((state:RootState)=>state.display)

const [createNewTask,{loading,data,error}] = useMutation(CREATE_NEW_TASK)



const notifyMess = (title:string,text:string) => toast(<NotifyComponent title={title} text={text} />);
useMemo(()=>{
  if(data?.createNewTask?.status){
    dispatch(setNewBoardModal({open:false})) 
    notifyMess("Issue created",data.createNewTask.task.issueTitle)
  }
},[data])

const closeNewBoardModal = () => {
  if(issueDescription || issueTitle){
      setOpenErrorModal(true)
  }else{
    dispatch(setNewBoardModal({open:!openNewBoardModal})) 
  }
  
}

const Container = styled.div`
background:red;
  height:100%;
  max-height:100%;
  width:100%;
`
const created = useSelector((state:RootState)=>state.user)
const createdby = {
  name:created.name,
  id:created._id,
  email:created.email,
  username:created.username
}


const [columns,setColumns] = useState<{
  name:string;
  email?:string
  img?:string
}[]>([])

useEffect(()=>{
  const cols =currentWorkspace.subItems[0].items
  setColumns(cols)
},[])

const {taskView} = useSelector((state: RootState) => state.display)
const newTask = (currentBar:IBarContent) =>{
  dispatch(clearCurrentWorkspaceStatus({}))
  dispatch(setCurrentWorkspaceStatus({selected:currentBar,type:"status"}))
  dispatch(setNewBoardModal({open:!openNewBoardModal})) 
}


  return (
  
    <DndProvider backend={HTML5Backend}> 
    <Container>
   
 <TaskPageView 
 tasks={tasks}
 newTask={newTask}
 columns={columns}
 openNewBoardModal={openNewBoardModal}
 taskView={taskView}
  margin={margin}
  type={type}
  />
  
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
   </Container>
   
   </DndProvider>
 
  
  )
}
