import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useEffect,useMemo,useState } from "react"
import Navbar from "../../components/navs/Navbar";
import ViewAreaIndex from "../../components/viewarea";
import { RootState } from "../../state/store";
import { FETCH_USER, FETCH_WORKSPACE } from "../../graphql/queries";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { IBoard, addNewTask, refetchWorkspace, setCurrentWorkspace } from "../../state/board";
import LoadingPage from "../../components/LoadingPage";
import styled from "styled-components";
import AddNewBoard from "../../components/AddNewBoard";
import usePortal from "../../hooks/usePortal";
import {v4 } from "uuid"
import ErrorModal from "../../components/modal/ErrorModal";
import { setNewBoardModal } from "../../state/display";
import { CREATE_NEW_TASK } from "../../graphql/mutation";
import { NotifyComponent } from "../../components/Notify/Notify";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Item } from "../../components/viewarea/IViewrea";
import { setCurrentUser } from "../../state/user";

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
    const {user} = useSelector((state:RootState)=>state)
    const [fetchWorkspace,{data,refetch:refetchWork,loading,error}] = useLazyQuery(FETCH_WORKSPACE,{
      variables: {
        input: {
         workspaceURL: router?.query.id
        }
      }
    })
    const {data:getUser,error:userError} = useQuery(FETCH_USER,{
      variables:{
        input: {
          email:user?.email
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
  useMemo(()=>{
      if(getUser?.userInfo?.status){
        const user = getUser.userInfo.user
        console.log({user})
        // name:"",
        // email:"",
        // _id:"",
        // username:"",
        // image:"",
        // workspaces: []
        dispatch(setCurrentUser({user}))
      }
  },[getUser])

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
    const addNewData =(obj:any,name:string,item:Item | string) =>{
      return obj[name.toLowerCase()] = item
    }
    
    const createNewIssue = () => {
     
     if(issueTitle) {
      const workspaceDetails = currentWorkspace.subItems.reduce((acc,cur)=> {
        
           if(cur.name.toLowerCase() ==="assigned"){
            return Object.assign(acc, {
            [cur.name.toLowerCase()]:cur?.selected._id
        })
      } else {
        return Object.assign(acc, {
          [cur.name.toLowerCase()]:{
            name: cur.selected?.name,
            img:cur.selected?.img,
            email:"cur.selected?.email",
            username:"cur.selected?.username"
          }
      })
      } 
        
    },{})
    if(workspaceDetails["assigned"  as keyof typeof workspaceDetails]){
   addNewData(workspaceDetails,"assignee",user._id)
    } 
    const createdActivity = {
      nameOfActivity:"created",
      
      // id:uuidv4(),
      // createdby,
      // time,
      description:`created this issue`
    }
    setIssueDescription("")
    setIssueTitle("")
    if(user.types !=="guest"){
      createNewTask({
      variables: {
        input: {
          workspaceURL: currentWorkspace.URL,
          workspaceID:currentWorkspace._id,
          dueDate:"",
          issueTitle:issueTitle,
          issueDescription,
          ...workspaceDetails,
          createdBy:user._id,
          imgURLArray:imgURLArray ,
          activites:[createdActivity]
        }
      }
    })
    }else{
      const createdActivity = {
        nameOfActivity:"created",
        
        // id:uuidv4(),
        // createdby,
        // time,
        description:`created this issue`,
        createdby:{
          name:"guest",
          gmail:"guest@gmail.com"
        }
      }
      dispatch(addNewTask({newTask:{
        workspaceURL: currentWorkspace.URL,
          workspaceID:currentWorkspace._id,
          _id:v4(),
          dueDate:"",
          issueTitle:issueTitle,
          issueDescription,
          ...workspaceDetails,
          createdBy:user._id,
          imgURLArray:imgURLArray ,
          activities:[createdActivity]
      }}))
      dispatch(setNewBoardModal({open:false})) 
      notifyMess("Issue created",issueTitle)
    }
    
     }else{
      notifyMess("Title Required","please enter a title before submitting")
     }
      
    }
    // if(refetch){
      // fetchWorkspace()
    //   dispatch(refetchWorkspace({refetchWorkspace:false}))
    // }

    const Portal = usePortal(document.querySelector("#portal"));
    const Portal2 = usePortal(document.querySelector("#portal2"));
   
    const [workspace,setWorkspace] = useState<any>()
    useMemo(()=>{
      if(data?.fetchWorkspace.status){
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



  useEffect(()=>{
      if(router?.query?.id){
        console.log({currentWorkspace},router?.query)
         // @ts-ignore
          const workspace = currentWorkspace.URL === router?.query?.id ? currentWorkspace : null 
          if(workspace){
            setWorkspace(workspace)
          }else {
            fetchWorkspace()
            // console.log
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
       
       {loading || !workspace || newTaskLoading ? <LoadingPage /> :
        workspace &&  
        <Container>
        <Navbar /> 
        <ViewAreaIndex 
          tasks={workspace.task}
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