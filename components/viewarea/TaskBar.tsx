import React from 'react'
import styled from 'styled-components';
import { device } from '../../config/theme';

interface ITaskbar {
    taskbar:{
    name: string;
    quantity:number; 
    },
    view:string    

}
const TaskBarStyle = styled.div<{view:string}>`
  width:100%;
  border-radius:0px;
   height:40px;
   background-color:red;
   margin:0;
   
    box-sizing:border-box;
   display:flex;
   justify-content:space-between; 
   align-items:center;
   padding:0 5px;

   @media ${device.mobileM} {
  width:${({view}) => view==="list" ? "100%" : "90%"};
   min-width:${({view}) => view==="list" ? "100%" : "90%"};
   border-radius:${({view}) => view==="list" ? "0" : "6px"};
   height:${({view}) => view==="list" ? "80px" : "40px"};
   background-color:red;
   margin:${({view}) => view==="list" ? "0%" : "20px auto"};
   }
`
const TaskBar = ({taskbar,view}:ITaskbar) => {
  return (
    <TaskBarStyle view={view}>
        <div>{taskbar.name}</div>
        <div>{taskbar.quantity}</div>
    </TaskBarStyle>
  )
}

export default TaskBar