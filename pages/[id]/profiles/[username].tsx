import React,{useEffect,useState, useMemo} from 'react'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import styled from 'styled-components'
import ProfilePageMain from '../../../components/profile/components/ProfilePageMain'
import ProfilePageAside from '../../../components/profile/components/ProfilePageAside'
import ProfilePageHeader from '../../../components/profile/components/ProfilePageHeader'
import { AiOutlinePlus } from 'react-icons/ai'
import { IBoard, ITaskCards, setCurrentWorkspace } from '../../../state/board'
import Head from 'next/head'
import { FETCH_MEMBER, FETCH_WORKSPACE } from '../../../graphql/queries'
import { useLazyQuery } from '@apollo/client'


const ProfilePageWrapper = styled.div`
    width:100%;
    height:100%;
    overflow-y:hidden;
    background-color: ${({theme}) => theme.sidenav};
    /* background:red; */
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
`
const ProfilePageDesign = styled.div`
 width:100%;
    height:100%;
    /* background-color: ${({theme}) => theme.background}; */
    border:1px solid ${({theme}) => theme.border};
  padding: 0 25px;
    color: ${({theme}) => theme.text};
    display: flex;
      	flex-direction: column; 
`
const ProfilePageContainer = styled.div`
   width:100%;
    flex: 1; 
  padding: 0 25px;
    min-height: 0; 
    color: ${({theme}) => theme.text};
    display:flex;
`
const ProfilPageSubHead = styled.div`
  height:45px;
  border:1px solid ${({theme}) => theme.border};
  padding: 0 25px;
  display:flex;
  align-items:center;
  box-sizing:border-box;
  gap:15px;
`
const SwitchButton =styled.div<{selected:string}>`
  display:flex;
  width:160px;
  border-radius:8px;
  align-items:center;
  background-color:#21232E;
  & >div {
    display:flex;
  border-radius:8px;
    font-size:12px;
    color:#c4c0c0;
    width:80px;
    justify-content:center;
    align-items:center;
    cursor:pointer;
    font-size:12px;
    width:80px;
    height:25px;
  }
  &> div:first-child {
    background-color:${({selected})=>selected.toLowerCase()==="assigned" ? "#2C2D3C": "#21232E" };
  }
  &> div:last-child {
    background-color:${({selected})=>selected.toLowerCase()==="created" ? "#2C2D3C": "#21232E" };
  }
`
const Filter = styled.div`
  display:flex;
  gap:5px;
  color:#c4c0c0;
  border:1px dashed ${({theme}) => theme.border};
  border-radius:4px;
  width:60px;
  justify-content:center;
  cursor:pointer;
  height:25px;
  font-size:12px;
  align-items:center;

`
const username = () => {
enum SELECT {
  ASSIGNED = "assigned",
  CREATED = "created"
}

    const router = useRouter()
    const dispatch = useDispatch()
    const [workspaceID,setWorkspaceID] = useState("")
    const [profile,setProfile] = useState<any | null>()
    const [selected,setSelected] = useState(SELECT.ASSIGNED)
    const [profileSideNav,setProfileSideNav] = useState(false)
    const {boardsDetails,currentWorkspace} = useSelector((state:RootState)=>state.board)
    const {user} = useSelector((state:RootState)=>state)
    const [tasks,setTasks] = useState<any>([])
    const [current,setCurrent] = useState<any[]>([])

    const [fetchMember,{data,error,loading}] = useLazyQuery(FETCH_MEMBER,{
      variables:{
          input: {
              name:router?.query.username
          }
      }
    })

    useMemo(()=>{
      if(data?.FetchMember?.__typename==="CreateMemberFailResponse"){
        setProfile(null)
      }else if(data?.FetchMember?.__typename==="CreateMemberSuccessResponse"){
        setProfile(data?.FetchMember?.member)
      }
    },[data])
    useEffect(()=>{
        if(router?.query.username && router?.query.id){
          // @ts-ignore
          // const info = currentWorkspace.members.find((item:Item)=>item.username===router.query?.username)
          
          // // @ts-ignore
          //  setProfile(info)
          if(!profile){
              fetchMember()
          }
         
           // @ts-ignore
           setWorkspaceID(router.query?.id)
           // @ts-ignore
           const workspace = currentWorkspace.URL === router?.query?.id ? currentWorkspace : null 
           if(workspace){
             setWorkspace(workspace)
           }else {
             fetchWorkspace()
           }
           
        }
      },[router.query])


      const [fetchWorkspace,{data:workspaceData,loading:workspaceLoading}] = useLazyQuery(FETCH_WORKSPACE,{
        variables: {
          input: {
           workspaceURL: router?.query.id
          }
        }
      })
      const [workspace,setWorkspace] = useState<any>()
  
      useMemo(()=>{
        if(workspaceData?.fetchWorkspace.status){
          const workspace = workspaceData?.fetchWorkspace.workspace
          const boardDetails:IBoard = {
            workspaceID:workspace._id ?? "29",
            workspace:workspace.name,
            workspaceURL:workspace.URL,
            tasks:[]
          }
          dispatch(setCurrentWorkspace({workspace,boardsDetails:boardDetails})) 
          setWorkspace(workspace)
        }
       
      },[workspaceData])
  
  

      useEffect(()=>{
        if(currentWorkspace.URL === router?.query?.id && profile){
          const currentTask = workspace.taskID.filter((task:ITaskCards)=> task.status.name.toLowerCase()==="todo" || task.status.name.toLowerCase()==="in progress")
        const taskArray = selected === SELECT.ASSIGNED ? workspace.taskID.filter((task:ITaskCards)=>task.assigned.name ===profile?.name) :
       workspace.taskID.filter((task:ITaskCards)=>task?.createdBy?.name ===profile.name)

       if(taskArray){
          setCurrent(currentTask)
         setTasks(taskArray)
       }  
        }
        
      },[router.query,workspace,selected])
  return (
    <>
    <Head>
      <title>{profile?.name}</title>
    </Head>
     <ProfilePageWrapper>
           {profile ? 
           <ProfilePageDesign>
                <ProfilePageHeader user={profile} profileSideNav={profileSideNav} setProfileSideNav={setProfileSideNav}/>
                <ProfilPageSubHead>
                  <SwitchButton selected={selected}>
                    <div onClick={()=>setSelected(SELECT.ASSIGNED)}>Assigned</div>
                    <div onClick={()=>setSelected(SELECT.CREATED)}>Created</div>
                  </SwitchButton>
                  <Filter>
                    <AiOutlinePlus /> <div>Filter</div>
                  </Filter>
                </ProfilPageSubHead>
            <ProfilePageContainer>
                <ProfilePageMain user={profile} tasks={tasks} 
               />

 <ProfilePageAside currentTask={current.length} user={profile} profileSideNav={profileSideNav}  />
            </ProfilePageContainer>
            </ProfilePageDesign> : 
            <h1>Not found</h1>
            }
              
        </ProfilePageWrapper>
    </>
   
  )
}

export default username