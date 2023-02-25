
import { useState, useEffect } from "react"
import AddNewBoard from "../AddNewBoard";
import usePortal from "../../hooks/usePortal";
import ErrorModal from "../modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewTask, clearCurrentWorkspaceStatus, IMembers, increaseNumberOfTasks, ITaskCards, setCurrentWorkspaceStatus } from "../../state/board";
import { NotifyComponent } from "../Notify/Notify";
import Navbar from "../navs/Navbar";
import {v4 as uuidv4} from "uuid"
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { IBarContent } from "./IViewrea";
import { setNewBoardModal } from "../../state/display";
import TaskPageView from "./TaskPageView";


export default function ViewAreaIndex({margin,tasks,user,type}:{margin?:string,tasks:ITaskCards[],user?:IMembers,type?:string}) {
const [openErrorModal, setOpenErrorModal] = useState(false)

const [issueTitle,setIssueTitle] = useState("")
const [issueDescription,setIssueDescription] = useState("")
const [imgURLArray, setImgURLArray] = useState<string[]>([]);
const dispatch= useDispatch()



const notifyMess = (title:string,text:string) => toast(<NotifyComponent title={title} text={text} />);

const {currentWorkspace} = useSelector((state:RootState)=>state.board)
const {openNewBoardModal} = useSelector((state:RootState)=>state.display)

const closeNewBoardModal = () => {
  if(issueDescription || issueTitle){
      setOpenErrorModal(true)
  }else{
    dispatch(setNewBoardModal({open:!openNewBoardModal})) 
  }
  
}
const created = useSelector((state:RootState)=>state.board.user)
const createdby = {
  name:created.name,
  id:created.id,
  email:created.email,
  username:created.username
}
const createNewIssue = () => {
  // dispatch(addNewBoard({newBoard}))
 if(issueTitle) {
  const workspaceDetails = currentWorkspace.subItems.reduce((acc,cur)=> {
    console.log(cur.name.toLowerCase(),"kdkkd")
    
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
  id:uuidv4(),
  createdby,
  time,
  description:`created this issue`
}

const newTask ={
  workspaceID:currentWorkspace.id,
  // id:uuidv4(),
  id:`${currentWorkspace.id}-${id}`,
  issueTitle,
  issueDescription,
 ...workspaceDetails,
    createdby,
   time,
  imgURLArray,
  activites:[createdActivity],
}

dispatch(addNewTask({newTask}))
dispatch(increaseNumberOfTasks({id}))
 dispatch(setNewBoardModal({open:!openNewBoardModal})) 
notifyMess("Issue created",issueTitle)
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
   <>
   
    <DndProvider backend={HTML5Backend}>
 <TaskPageView 
 tasks={tasks}
 newTask={newTask}
 columns={columns}
 openNewBoardModal={openNewBoardModal}
 taskView={taskView}
  margin={margin}
  />

    </DndProvider>
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
   </>
   
 
  
  )
}
