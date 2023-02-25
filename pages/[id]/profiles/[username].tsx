import React,{useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '../../../state/store'
import styled from 'styled-components'
import ProfilePageMain from '../../../components/profile/components/ProfilePageMain'
import ProfilePageAside from '../../../components/profile/components/ProfilePageAside'
import ProfilePageHeader from '../../../components/profile/components/ProfilePageHeader'
import { AiOutlinePlus } from 'react-icons/ai'
import { IMembers, ITaskCards } from '../../../state/board'
import { Item } from '../../../components/viewarea/IViewrea'
import Head from 'next/head'


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
    const [workspaceID,setWorkspaceID] = useState("")
    const [profile,setProfile] = useState<IMembers | null>()
    const [selected,setSelected] = useState(SELECT.ASSIGNED)
    const [profileSideNav,setProfileSideNav] = useState(false)
    const {user,boardsDetails,currentWorkspace} = useSelector((state:RootState)=>state.board)
    const [tasks,setTasks] = useState<any>([])
    const [current,setCurrent] = useState<any[]>([])
    useEffect(()=>{
      console.log(router.query.username)
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
      useEffect(()=>{
        if(profile){
          console.log(boardsDetails.tasks)
          const currentTask = boardsDetails.tasks.filter((task:ITaskCards)=> task.status.name.toLowerCase()==="todo" || task.status.name.toLowerCase()==="in progress")
        const taskArray = selected === SELECT.ASSIGNED ? boardsDetails.tasks.filter((task:ITaskCards)=>task.assigned.username ===profile?.username) :
       boardsDetails.tasks.filter((task:ITaskCards)=>task.createdby.name ===profile.name)
       if(taskArray){
          setCurrent(currentTask)
         setTasks(taskArray)
       }  
        }
        
      },[selected,router.query])
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
            null
            }
              
        </ProfilePageWrapper>
    </>
   
  )
}

export default username