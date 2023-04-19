import React from 'react'
import { AiOutlinePlus } from 'react-icons/ai';
import styled from 'styled-components';
import { device } from '../../config/theme';
import CustomIcon from '../CustomIcon';
import { ITaskbar } from './IViewrea';



const TaskBarStyle = styled.div<{view:string}>`
  width:100%;
  border-radius:0px;
   height:20px;
   color:${({theme}) => theme.primary};
   margin:0;
   font-size:14px;
    box-sizing:border-box;
   display:flex;  
   justify-content:space-between; 
   align-items:center;
   padding:0px;
   & > div {
        display:flex;
        & > div:last-child{
          margin-left:10px;
          font-weight:100;
        }
   }

   @media ${device.mobileM} {
  width:${({view}) => view==="list" ? "100%" : "90%"};
   min-width:${({view}) => view==="list" ? "100%" : "90%"};
   border-radius:${({view}) => view==="list" ? "0" : "6px"};
   height:${({view}) => view==="list" ? "40px" : "40px"};

   margin:${({view}) => view==="list" ? "0%" : "20px auto"};
   margin-left:${({view}) => view==="list" ? "0" : "10px"};
   }
`
const Plus = styled.div`
  cursor:pointer;
   width:20px;
   border-radius:6px;
   height:20px;
   display:flex;
    justify-content:center;
    align-items:center;
    &:hover{
      background-color:${({theme}) => theme.sidenav};
      color:${({theme}) => theme.white};
    }
  `
  const Icon = styled.div`
    display:flex;
    align-items:center;
    gap:10px;
  `
const   TaskBar = ({taskbar,view,newTask}:ITaskbar) => {
  return (
    <TaskBarStyle view={view}>
      <div>
        <Icon>
          <CustomIcon img={taskbar.img} fontSize={view==="list" ? "16px" :"15px"} />
        <div>{taskbar.name}</div>

        </Icon>
        
        <div>{taskbar.quantity}</div>
      </div>
      <Plus>
        <AiOutlinePlus onClick={()=>newTask(taskbar)}/>
      </Plus>
       
    </TaskBarStyle>
  )
}

export default TaskBar