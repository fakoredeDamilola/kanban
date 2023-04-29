import React from 'react'
import styled from 'styled-components'
import { IMembers } from '../../../state/board'
import ProfilePicture from '../../ProfilePicture'

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
    width:80%;
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
const ProfilePageAside = ({user,profileSideNav,currentTask}:{user:IMembers,profileSideNav:boolean;currentTask:number}) => {
  return (
    <ProfilePageAsideContainer profileSideNav={profileSideNav}>
    <ProfilePageAsideHeader>
      <ProfilePicture assigned={{
        name:user.name,
        img:user.img,
      }} size="80px" tooltip={false} />
     <div>
      <h4>{user.name}</h4>
      <Muted>{user.email}</Muted>
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
            value:user.username,
          },
          {
            name:"Joined",
            value:`${new Date(user.joined)}`.split(" ").slice(1,5).join(" "),
          },
          {
            name:"Working on",
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
    </ProfilePageAsideContainer>

  )
}

export default ProfilePageAside