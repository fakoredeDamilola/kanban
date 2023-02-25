import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { FiSidebar } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { device } from '../../../config/theme'
import { IMembers, IUser } from '../../../state/board'
import { switchProfileView, toggleSideNav } from '../../../state/display'
import BoardSwitchbutton from '../../BoardSwitchbutton'
import Harmburger from '../../Harmburger'
import ProfilePicture from '../../ProfilePicture'


const TaskPageHeaders = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    color:#c4c0c0;
    align-items: center;
    padding:10px 25px;
    box-sizing: border-box;
    border:1px solid ${({theme}) => theme.border};
    position:relative;
    justify-content:space-between;
    & > div:first-child{
        display:flex;
        align-items:center;
        gap:10px;
        
    }
    & > div:last-child{
        display:flex;
        gap:10px;
        align-items:center;
        
    }
      	/* flex: 0; */
    `
  
   const CloseBtn = styled.div`
    cursor:pointer;
    &:hover {
        color: ${({theme})=>theme.primary};
        transition: 0.3s;
    }
    display:none;
    @media ${device.mobileM} {
        display:block;
    }

   `
   const HamBurgerBtn = styled.div`
   display:flex;
   align-items:center;
   @media ${device.mobileM} {
        display:none;
    }
    
   `
   const SideBar = styled.div`
   cursor:pointer;
   `
   const Picture = styled.div`
    display:flex;
    gap:9px;
    align-items:center;
    font-size:14px;
   `

const ProfilePageHeader = ({profileSideNav,user,setProfileSideNav}:{profileSideNav:boolean,setProfileSideNav:any,user:IMembers}) => {

    const dispatch = useDispatch()
    const {profileView,showSideNav} = useSelector((state: any) => state.display)
    const router = useRouter()
    const toggleNav = () => {
        dispatch(toggleSideNav(!showSideNav))
    }
    const changeBoardView = (view:string) => {
        dispatch(switchProfileView(view))
      
      }

  return (
    <TaskPageHeaders>
    <div>
        
    <CloseBtn>
        <AiOutlineClose fontSize="12px" onClick={()=>router.push("/")}/>
    </CloseBtn>
    <HamBurgerBtn>
        <Harmburger ToggleNav={toggleNav}/>
    </HamBurgerBtn>
     <Picture>
           <ProfilePicture assigned={{
            name:user?.name,
            img:user?.img
           }} tooltip={false} size="25px" /> <div>{user.name}</div>
        </Picture>
        
    </div>
    <div>
       <BoardSwitchbutton taskView={profileView}changeBoardView={changeBoardView}  />

    <SideBar onClick={()=>setProfileSideNav(!profileSideNav)}>
        <FiSidebar />
    </SideBar>  
    </div>
   
</TaskPageHeaders>
  )
}

export default ProfilePageHeader