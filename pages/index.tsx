
import {useId, useState, useEffect } from "react"
import AddNewBoard from "../components/AddNewBoard";
import ViewArea from "../components/viewarea/ViewArea";
import usePortal from "../hooks/usePortal";
import ErrorModal from "../components/modal/ErrorModal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../state/store";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addNewTask, clearCurrentWorkspaceStatus, increaseNumberOfTasks, setCurrentWorkspaceStatus } from "../state/board";
import {  NotifyComponent } from "../components/Notify/Notify";
import Navbar from "../components/navs/Navbar";
import {v4 as uuidv4} from "uuid"
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import styled from "styled-components";
import TaskBar from "../components/viewarea/TaskBar";
import { IBarContent } from "../components/viewarea/IViewrea";
import { setNewBoardModal } from "../state/display";
import NOTask from "../components/NOTask";


const FlexWrapper = styled.div<{view:string}>`
 color:${({theme}) => theme.primary};
  overflow-x: scroll; /* enable horizontal scrolling */
  display:${({view}) => view==="list" ? "block" : "flex"};
  padding:${({view}) => view==="list" ? "50px 0px" : "70px 20px"};
  max-height:100%;
  gap:40px; 
  margin-top:${({view}) => view==="list" ? "20px" : "0px"};
 flex: 1 1 auto;
   
`
const Container = styled.div`
  background-color: ${({theme}) => theme.body};
  display:flex;
  width:100%;
  max-height:100%;
  height:100%;
`


export default function Home() {
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
const user = useSelector((state:RootState)=>state.board.user)
const createdby = {
  name:user.name,
  id:user.id,
  email:user.email
}
const createNewIssue = () => {
  // dispatch(addNewBoard({newBoard}))
 if(issueTitle) {
  const workspaceDetails = currentWorkspace.subItems.reduce((acc,cur)=> {
      return  Object.assign(acc, {
        [cur.name.toLowerCase()]:{
          name: cur.selected?.name,
          img:cur.selected?.img,
          email:cur.selected?.email
        }
    })
    
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

const Columns = styled.div<{view:string}>`
    width:${({view}) => view==="list" ? "100%" : "330px"};

`

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
const {boardsDetails} = useSelector((state: RootState) => state.board)
const {taskView} = useSelector((state: RootState) => state.display)
const newTask = (currentBar:IBarContent) =>{
  dispatch(clearCurrentWorkspaceStatus({}))
  dispatch(setCurrentWorkspaceStatus({selected:currentBar,type:"status"}))
  dispatch(setNewBoardModal({open:!openNewBoardModal})) 
}


  return (
   
    <Container>
    
    <Navbar /> 
    <DndProvider backend={HTML5Backend}>
   {boardsDetails.tasks.length >0 ?
    <FlexWrapper view={taskView}>
    {columns.map((col,index)=>{
            const task = boardsDetails.tasks.filter((item)=>item?.status?.name?.toLowerCase() === col.name.toLowerCase())
          
            return (

              <Columns view={taskView}>
                  <TaskBar taskbar={{name:col.name,quantity:task.length,img:col?.img}} view={taskView} newTask={newTask} />
                <ViewArea 
      openNewBoardModal={openNewBoardModal}
      col={col}
      task={task}

      />
      </Columns>
        )
      })
      

      }
      </FlexWrapper>
   :  
   <NOTask />
   }
   
   </DndProvider>
        
      <Portal>
        {openNewBoardModal ? <AddNewBoard  
        openNewBoardModal={openNewBoardModal} 
        closeNewBoardModal={closeNewBoardModal} 
        createNewIssue={createNewIssue}
        issueTitle={issueTitle}
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
  
  )
}
