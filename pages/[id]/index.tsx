import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { useEffect } from "react"
import Navbar from "../../components/navs/Navbar";
import ViewAreaIndex from "../../components/viewarea";
import { RootState } from "../../state/store";
import Layout from "../../components/Layout";


 function Home() {
    const router = useRouter()
  const {boardsDetails,user} = useSelector((state: RootState) => state.board)

  useEffect(()=>{
    // if(!)
    console.log(router.query)
      if(router?.query.username && router?.query.id){
        // @ts-ignore
        const info = currentWorkspace.members.find((item:Item)=>item.username===router.query?.username)
        
        // @ts-ignore
         setProfile(info)
         // @ts-ignore
         setWorkspaceID(router.query?.id)
         console.log(boardsDetails.tasks)
         
        
        
        
        
      }
      console.log(router.query)
    },[router.query])

  return (
    <>
       <Navbar /> 
  <ViewAreaIndex 
  tasks={boardsDetails.tasks}
  />
    </>

  )
}

// Home.PageLayout = Layout

export default Home