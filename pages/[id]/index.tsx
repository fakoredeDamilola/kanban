import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useEffect,useMemo,useState } from "react"
import Navbar from "../../components/navs/Navbar";
import ViewAreaIndex from "../../components/viewarea";
import { RootState } from "../../state/store";
import { FETCH_WORKSPACE } from "../../graphql/queries";
import { useLazyQuery, useMutation } from "@apollo/client";
import { IBoard, refetchWorkspace, setCurrentWorkspace } from "../../state/board";
import LoadingPage from "../../components/LoadingPage";
import styled from "styled-components";
import AddNewBoard from "../../components/AddNewBoard";
import { m } from "framer-motion";
import usePortal from "../../hooks/usePortal";
import ErrorModal from "../../components/modal/ErrorModal";
import { setNewBoardModal } from "../../state/display";
import { CREATE_NEW_TASK } from "../../graphql/mutation";
import { NotifyComponent } from "../../components/Notify/Notify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Container = styled.div`
  min-height:100%;  
  height:100%;
`
const Cover = styled.div`
  background-color:${({theme}) => "blue"};
  min-height:100%;
  height:100%;
`

 function Home() {
    const router = useRouter()
    const dispatch = useDispatch()
    const {refetch} = useSelector((state:RootState)=>state.board)
    const [openErrorModal, setOpenErrorModal] = useState(false)

const [issueTitle,setIssueTitle] = useState("")
const [issueDescription,setIssueDescription] = useState("")
const [imgURLArray, setImgURLArray] = useState<string[]>([]);
const notifyMess = (title:string,text:string) => toast(<NotifyComponent title={title} text={text} />);
    const [errorModal,setErrorModal] = useState(false)
    const [fetchWorkspace,{data,refetch:refetchWork,loading,error}] = useLazyQuery(FETCH_WORKSPACE,{
      variables: {
        input: {
         workspaceURL: router?.query.id
        }
      }
    })
    const [createNewTask,{loading:newTaskLoading,data:newTaskData,error:newTaskError}] = useMutation(CREATE_NEW_TASK,{
      refetchQueries:() => [{
        query: FETCH_WORKSPACE,
        variables: { 
          input: {
            workspaceURL: router?.query.id
           }
        },
    }]
    })

    useMemo(()=>{
    if(newTaskData?.createNewTask?.status){
      dispatch(setNewBoardModal({open:false})) 
      notifyMess("Issue created",newTaskData.createNewTask.task.issueTitle)
    }
  },[newTaskData])

    const {openNewBoardModal} = useSelector((state:RootState)=>state.display)
    const closeNewBoardModal = () => {
      
      if(issueDescription || issueTitle){
          setOpenErrorModal(true)
      }else{
        dispatch(setNewBoardModal({open:!openNewBoardModal})) 
      }
      
    }

    const closeErrorModal = (text:string) => {
      setOpenErrorModal(false)
      if(text!=="cancel"){
        setIssueDescription("")
        setIssueTitle("")
     dispatch(setNewBoardModal({open:!openNewBoardModal})) 
      }
      
    }
    
    
    const createNewIssue = () => {
      // dispatch(addNewBoard({newBoard}))
     if(issueTitle) {
      const workspaceDetails = currentWorkspace.subItems.reduce((acc,cur)=> {
        
      //      if(cur.name.toLowerCase() ==="assigned" && type==="profile"){
      //       return Object.assign(acc, {
      //       [cur.name.toLowerCase()]:{
      //         name: user?.name,
      //         img:user?.img,
      //         email:user?.email,
      //         username:user?.username
      //       }
      //   })
      // } else {
        return Object.assign(acc, {
          [cur.name.toLowerCase()]:{
            name: cur.selected?.name,
            img:cur.selected?.img,
            email:cur.selected?.email,
            username:cur.selected?.username
          }
      })
      // } 
        
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
    setIssueDescription("")
    setIssueTitle("")
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
     }else{
      notifyMess("Title Required","please enter a title before submitting")
     }
      
    }
    if(refetch){
      console.log("ue")
      fetchWorkspace()
      console.log({data})
      dispatch(refetchWorkspace({refetchWorkspace:false}))
    }

    const Portal = usePortal(document.querySelector("#portal"));
    const Portal2 = usePortal(document.querySelector("#portal2"));

    const [workspace,setWorkspace] = useState<any>()
    useMemo(()=>{
      if(data?.fetchWorkspace.status){
        console.log("fetched")
        const workspace = data?.fetchWorkspace.workspace
        const boardDetails:IBoard = {
          workspaceID:workspace._id ?? "29",
          workspace:workspace.name,
          workspaceURL:workspace.URL,
          tasks:[]
        }
        dispatch(setCurrentWorkspace({workspace,boardsDetails:boardDetails})) 
        setWorkspace(workspace)
      }else{
      //  router.push("/")
      }
     
    },[data])
  const {boardsDetails,currentWorkspace} = useSelector((state: RootState) => state.board)

  // useEffect(()=>{
  //   // if(!)
  //   console.log(router.query)
  //     if(router?.query.username && router?.query.id){
  //       // @ts-ignore
  //       const info = currentWorkspace.members.find((item:Item)=>item.username===router.query?.username)
        
  //       // @ts-ignore
  //        setProfile(info)
  //        // @ts-ignore
  //        setWorkspaceID(router.query?.id)
  //        console.log(boardsDetails.tasks)
        
  //     }
  //   },[router.query])

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

  return (
    <Cover>
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
      {/* <LoadingPage /> */}
       
       {loading || !workspace ? <LoadingPage /> :
        workspace &&  
        <Container>
        <Navbar /> 
        <ViewAreaIndex 
          tasks={workspace.taskID}
          />
          </Container>
       }
  
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
    </Cover>

  )
}

// Home.PageLayout = Layout

export default Home