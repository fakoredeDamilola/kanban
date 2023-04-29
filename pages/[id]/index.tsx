import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

import { useEffect,useMemo,useState } from "react"
import Navbar from "../../components/navs/Navbar";
import ViewAreaIndex from "../../components/viewarea";
import { RootState } from "../../state/store";
import { FETCH_WORKSPACE } from "../../graphql/queries";
import { useLazyQuery } from "@apollo/client";
import { IBoard, setCurrentWorkspace } from "../../state/board";
import LoadingPage from "../../components/LoadingPage";

 function Home() {
    const router = useRouter()
    const dispatch = useDispatch()
    

    const [fetchWorkspace,{data,loading,error}] = useLazyQuery(FETCH_WORKSPACE,{
      variables: {
        input: {
         workspaceURL: router?.query.id
        }
      }
    })
    const [workspace,setWorkspace] = useState<any>()

    useMemo(()=>{
      if(data?.fetchWorkspace.status){
        const workspace = data?.fetchWorkspace.workspace
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
    <>
       <Navbar /> 
       
       {loading ? <LoadingPage /> :
        workspace && <ViewAreaIndex 
          tasks={workspace.taskID}
          />
       }
  
    </>

  )
}

// Home.PageLayout = Layout

export default Home