import { Router, useRouter } from 'next/router'
import React from 'react'
import { AiOutlineArrowDown, AiOutlineArrowUp, AiOutlineClose } from 'react-icons/ai'
import { FiSidebar } from 'react-icons/fi'
import styled from 'styled-components'
import { device } from '../../../config/theme'
import Harmburger from '../../Harmburger'
import { useDispatch, useSelector } from 'react-redux'
import { toggleSideNav } from '../../../state/display'

const TaskPageHeaders = styled.div`
    background-color: #21232E;
    width: 100%;
    height: 40px;
    display: flex;
    color:#c4c0c0;
    align-items: center;
    padding:0 30px;
    box-sizing: border-box;
    border-radius: 5px 5px 0 0;
    position:relative;
    justify-content:space-between;
    & > div:first-child{
        display:flex;
        
    }
      	/* flex: 0; */
    `
    const SwitchPage = styled.div`
    background-color: #21232E;
    display:flex;
    margin:0 15px;
    gap:10px;
    & div {
        width:18px;
        height:18px;
        background-color: ${({theme})=>theme.sideNav};
        border-radius: 4px;
        display:flex;
        font-size:12px;
        justify-content:center;
        align-items:center;
        border:1px solid ${({theme})=>theme.border};
        cursor:pointer;
        &:hover {
            background-color: ${({theme})=>theme.cardHover};
            transition: 0.3s;
        }
    }
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
    @media ${device.mobileM} {
       display:none 
    }
   `


const TaskPageHeader = ({taskList,showTaskSideNav,setShowTaskSideNav}:{taskList:number,showTaskSideNav:boolean,setShowTaskSideNav:any}) => {
    const dispatch = useDispatch()
    const {taskView,showSideNav} = useSelector((state: any) => state.display)
    const router = useRouter()
    const toggleNav = () => {
        dispatch(toggleSideNav(!showSideNav))
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
        
        <SwitchPage>
            <div>
                <AiOutlineArrowUp />
            </div>
            <div>
                <AiOutlineArrowDown />
            </div>
           
        </SwitchPage> <div>
                {taskList}
            </div>
            
        </div>
        <SideBar onClick={()=>setShowTaskSideNav(!showTaskSideNav)}>
            <FiSidebar />
        </SideBar>
    </TaskPageHeaders>
  )
}

export default TaskPageHeader