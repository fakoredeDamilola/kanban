
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
`
const created = useSelector((state:RootState)=>state.user)
const createdby = {
  name:created.name,
  id:created._id,
  email:created.email,
  username:created.username
}
const createNewIssue = () => {
  // dispatch(addNewBoard({newBoard}))
 if(issueTitle) {
  const workspaceDetails = currentWorkspace.subItems.reduce((acc,cur)=> {
    
       if(cur.name.toLowerCase() ==="assigned" && type==="profile"){
        return Object.assign(acc, {
        [cur.name.toLowerCase()]:{
          name: user?.name,
          img:user?.img,
          email:user?.email,
          username:user?.username
        }
    })
  } else {
    return Object.assign(acc, {
      [cur.name.toLowerCase()]:{
        name: cur.selected?.name,
        img:cur.selected?.img,
        email:cur.selected?.email,
        username:cur.selected?.username
      }
  })
  } 
    
},{})
const id = currentWorkspace.totalTasks+1
const time = Date.now()
const createdActivity = {
  nameOfActivity:"created",
  // id:uuidv4(),
  // createdby,
  // time,
  description:`created this issue`
}

// const newTask ={
//   workspaceID:currentWorkspace.id,
//   id:`${currentWorkspace.id}-${id}`,
//   issueTitle,
//   issueDescription,
//  ...workspaceDetails,
//     createdby,
//    time,
//   imgURLArray,
//   activites:[createdActivity],
// }

// dispatch(addNewTask({newTask}))
// dispatch(increaseNumberOfTasks({id}))

createNewTask({
  variables: {
    input: {
      workspaceURL: currentWorkspace.URL,
      workspaceID:currentWorkspace._id,
      dueDate:"",
      issueTitle:issueTitle,
      issueDescription,
      ...workspaceDetails,
      imgURLArray:[],
      activites:[createdActivity]
    }
  }
})
dispatch(refetchWorkspace({refetchWorkspace:true}))
 }else{
  notifyMess("Title Required","please enter a title before submitting")
 }
  
}


const closeErrorModal = (text:string) => {
  setOpenErrorModal(false)
  if(text!=="cancel"){
 dispatch(setNewBoardModal({open:!openNewBoardModal})) 
  }
  
}

const Portal = usePortal(document.querySelector("#portal"));
const Portal2 = usePortal(document.querySelector("#portal2"));


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
  
    <DndProvider backend={HTML5Backend}> <Container>
   
 <TaskPageView 
 tasks={tasks}
 newTask={newTask}
 columns={columns}
 openNewBoardModal={openNewBoardModal}
 taskView={taskView}
  margin={margin}
  />

    <Portal>
        {openNewBoardModal ? <AddNewBoard  
        openNewBoardModal={openNewBoardModal} 
        closeNewBoardModal={closeNewBoardModal} 
        createNewIssue={createNewIssue}
        issueTitle={issueTitle}
        user={user}
        issueDescription= {issueDescription}
        setIssueTitle={setIssueTitle}
        setIssueDescription={setIssueDescription}
        imgURLArray= {imgURLArray}
        setImgURLArray= {setImgURLArray}
        currentWorkspace={currentWorkspace}
        workspaces={currentWorkspace}
        /> : null}
      </Portal>
      <Portal2>
      
      {openErrorModal ? <ErrorModal openErrorModal={openErrorModal} closeErrorModal={closeErrorModal} /> : null}
      </Portal2>
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
