import React from 'react'
import styled from 'styled-components';
import { device } from '../../config/theme';

interface ITaskbar {
    taskbar:{
    name: string;
    quantity:number; 
    }    

}
const TaskBarStyle = styled.div`
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
  width:90%;
   min-width:90%;
   border-radius:6px;
   height:40px;
   background-color:red;
   margin:20px auto;
   }
`
const TaskBar = ({taskbar}:ITaskbar) => {
  return (
    <TaskBarStyle>
        <div>{taskbar.name}</div>
        <div>{taskbar.quantity}</div>
    </TaskBarStyle>
  )
}

export default TaskBar