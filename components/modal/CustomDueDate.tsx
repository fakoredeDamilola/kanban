import React, { forwardRef } from 'react'
import styled from 'styled-components'
import DatePicker, { CalendarContainer } from 'react-datepicker';
import CustomModal from '../CustomModal'
import {useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { device } from '../../config/theme';
import { formatDate } from '../../utils/utilFunction';
import { BsCalendar4 } from 'react-icons/bs';

const CalenderWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:20px;
    width:95%;
  padding: 0;
  position: fixed;
  top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  height:300px;
  max-height: 300px;
  background-color: ${({theme}) => theme.nav};
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 12px;
  z-index: 2;
  @media ${device.mobileM} {
    width: 60%;
  }
    `
    const CalenderHead = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
        padding: 10px 17px;
    border-bottom:1px solid ${({theme}) => theme.border};
        font-size:14px;
        color:#c4c0c0;
    div{
        cursor: pointer;
    }
    
    `
    const CalenderBody = styled.div`
    
    & div:first-child {
        display:flex;
        color:#c4c0c0;
        gap:10px;
            font-size:14px;
        h4{
            font-weight:700;
        }
    }
    `
    const CalenderLib = styled.div`
    width:100%;
    box-sizing:border-box;
    padding:10px 20px;
    `
 
const CalenderButton = styled.button`
    width:90%;
    height:40px;
    border:1px solid ${({theme}) => theme.border};
    border-radius:6px;
    padding:0 10px;
    margin:0 auto;
    background-color:#3e82cf;
    box-sizing:border-box;
    color:white;
    font-size:14px;
    margin-top:-15px;
    cursor: pointer;
    &:hover{
      transition: 0.3s;
        background-color:#1569c9;
    }
    `
    const Workspace = styled.div`
    /* margin-right:10px; */
    font-weight:500;
    background-color:${({theme})=>theme.body};
    color:#f5f5f5;
    padding:5px 10px;
    border-radius:4px;
    border: 1px solid ${({theme}) => theme.border};
    & + div {
      font-weight:500;
      color:${({theme})=>theme.secondaryColor};
      display:flex;
      align-items:center;
    }
    
    `
    const CalenderSearch = styled.div`
    margin:20px 0;
    padding:0 20px;
    box-sizing:border-box;
    h4 {
        color:white;
        margin-bottom:10px;
    }
      & input {
        width:100%;
        height:40px;
        background:transparent;
        border:none;
        border-bottom:${({theme})=>`1px solid ${theme.border}`};
        /* padding:0 10px; */
        font-size:20px;
        color:${({theme})=>` ${theme.otherColor}`};
        outline:none;
        ::placeholder {
          color:${({theme})=>` ${theme.otherColor}`};
        }
      }
    `
const CalenderItem = styled.div`
padding:10px 14px;
box-sizing:border-box;
transition:0.3s all;
border-radius:6px;
cursor:pointer;
&:hover{
color:white;
  background:${({theme})=>`#2E303C`}
}
  display:flex;
  color:${({theme})=>` ${theme.otherColor}`};
  justify-content:space-between;
  & div:first-child{
    display:flex;
    gap:30px;
  }
`

const CustomDueDate = ({
  workspaceID,
  openCalenderModal,
  closeCalenderModal,
  startDate,
  setStartDate,
  saveCalenderModal,
  date}:{
  openCalenderModal:boolean;
  date:any;
  setStartDate:any;
  startDate:any;
  closeCalenderModal:() => void;
  saveCalenderModal:(e:any,date:any) => void;workspaceID?:string
}) => {
   
  return (
       <CustomModal  closeNewBoardModal={closeCalenderModal} openNewBoardModal={openCalenderModal}>
        
            <CalenderWrapper  >
   <CalenderHead>
   <Workspace>
            {workspaceID}
          </Workspace> <h4>Edit Due Date</h4>
    <div onClick={closeCalenderModal}>
            <AiOutlineClose />
          </div>
   </CalenderHead>

            <CalenderSearch>
                <h4><span>Due Date </span> - Issue needs to be completed by this date</h4>
              <input 
              type="date" 
              value={startDate}
              onChange={(e)=>setStartDate(e.target.value)} 
              placeholder='DD/MM/YYYY'
              />
            </CalenderSearch>
            <CalenderLib>
        
            </CalenderLib>
            <CalenderButton onClick={(e:any)=>{
                closeCalenderModal()
                saveCalenderModal(e,startDate)
            }}>
            Save Due Date
           </CalenderButton>
         </CalenderWrapper> 
        
        </CustomModal>
  )
}

export default CustomDueDate