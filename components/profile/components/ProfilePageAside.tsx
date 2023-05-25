import React from 'react'
import styled from 'styled-components'
import { IBoard, IMembers, IWorkspace, setCurrentWorkspace } from '../../../state/board'
import ProfilePicture from '../../ProfilePicture'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { IUser } from '../../../state/user'

const ProfilePageAsideContainer = styled.div<{profileSideNav:boolean}>`
    /* width: 50%;
    height: 100%; */
    overflow-y:scroll;
    padding:25px 40px;
    padding-top:60px;
    box-sizing: border-box;
        position:absolute;
        background-color: ${({theme})=>theme.sidenav};
        width:330px;
        height:100%;
        right:${({profileSideNav})=>profileSideNav?"0":"-330px"};
        transition:all 0.3s;
       
    
    `
    const TaskPageItem = styled.div`
    display:grid;
    grid-template-columns:repeat(2,120px);
    width:100%;
    color:white;    
    font-size:14px;
    margin:15px auto;
   
    & > div:last-child {
      
      color: ${({theme})=>theme.secondaryColor};
      display: flex;
      
      align-items: center;
      cursor:pointer;
      border-radius: 5px;
      padding: 0 10px;
      box-sizing: border-box;
    }
  `
    const ProfilePageAsideHeader = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    color: #fff;
    box-sizing: border-box;
    align-items: center;
    gap:10px;
    & > div {
    }
    & > h4 {
    color: #c4c0c0;
      cursor:pointer;
      &:hover {
        color: ${({theme})=>theme.secondaryColor};
      }
    }
    p {
      font-size:12px;
    }
    `
    const Muted = styled.div`
      color:#c4c0c0;
      margin:10px 0;
      font-size:13px;
    `
    const AsideMain = styled.div`
      padding:30px 0;
    `
    const Icon = styled.div`
    display:flex;
    gap:10px;
  `
  const AsideList = styled.ul`
    list-style-type:none;
    color:#c4c0c0;
    border-top:1px solid white;
    padding:20px 15px;
    & li {
      font-size:14px;
      margin:7px 0;
      padding:4px 13px;
      box-sizing:border-box;
      transition:all 0.3s;
      cursor:pointer;
  &:hover {
    background:#1D1E2B;
    box-sizing:border-box;
  }
    }
  `
  interface IProfileWorkspace {
    workspaceID:IWorkspace;
    status:string
  }
const ProfilePageAside = ({workspaces,member,user,profileSideNav,currentTask,assigned}:{member:IMembers,user:IUser,profileSideNav:boolean;currentTask:number;assigned:number;workspaces:IWorkspace[]}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const selectItem = (event:any,element:any) => {
  
    const currentWorkspace:Partial<IWorkspace> = {
      id:element.id ? element?.id :"29",
      name:element.name,
      totalTasks:0,
      totalMembers:0,
      owner:{
        name:"",
        email:""
      },
      task:[],
      members:[],
      // subItems:[]
    }
    // recieve data from backend

    const boardDetails:IBoard = {
      workspaceID:element.id ? element?.id :"29",
      workspace:element.name,
      workspaceURL:"u8838",
      tasks:[]
    }
    dispatch(setCurrentWorkspace({workspace:currentWorkspace,boardsDetails:boardDetails})) 
   
      router.push(`/${element?.URL}`)
    
    
   
  }
  return (
    <ProfilePageAsideContainer profileSideNav={profileSideNav}>
    <ProfilePageAsideHeader>
      <ProfilePicture assigned={{
        name:member.name,
        img:member.img,
      }} size="80px" tooltip={false} edit={member.email === user.email ? true : false} />
     <div>
      <h4>{member.name}</h4>
      <Muted>{member.email}</Muted>
      <p>Edit Profile</p>
     </div>

    </ProfilePageAsideHeader>
    <AsideMain>
      {
        [
          {
            name:"Status",
            value:"Online",
          },
          {
            name:"Username",
            value:member.username,
          },
          {
            name:"Joined",
            value:`${new Date(member.joined)}`.split(" ").slice(1,5).join(" "),
          },
          {
            name:"Working on",
            value:`${assigned} issue`,
          },
          {
            name:"Assigned to",
            value:`${currentTask} issue`,
          },

        ].map((item,index)=>{
          return (
            <TaskPageItem key={index}>
            <div>{item.name}</div>
            <Icon>
             {/* <CustomIcon img={selected.img} type={selected.type} /> */}
               <div>{item.value}</div>
               </Icon>
            </TaskPageItem>
          )
        })
      }
    </AsideMain>
    <AsideList>
      {
      workspaces?.map((workspace:any  ,index)=>{
        return (

          <li key={index}  onClick={(e:any)=>selectItem(e,workspace.workspaceID)}> <ProfilePicture assigned={{name:workspace.workspaceID.name}} tooltip={false} /> {workspace.workspaceID.URL}</li>
        )
      })
    }
    </AsideList>
    
    </ProfilePageAsideContainer>

  )
}

export default ProfilePageAside