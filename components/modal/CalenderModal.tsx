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
import CustomDueDate from './CustomDueDate';

const CalenderWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:20px;
    width:90%;
  padding: 0;
  min-height: 250px;
  position: fixed;
  top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  height:65%;
  max-height: 65%;
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
      & input {
        width:100%;
        height:40px;
        background:transparent;
        border:none;
        border-bottom:${({theme})=>`1px solid ${theme.border}`};
        padding:0 10px;
        font-size:25px;
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

const CalenderModal = ({
  workspaceID,
  openCalenderModal,
  closeCalenderModal,
  saveCalenderModal,
  date}:{
  openCalenderModal:boolean;
  date:any;
  closeCalenderModal:() => void;
  saveCalenderModal:(e:any,date:any) => void;workspaceID?:string
}) => {
    const [openCustomDate,setOpenCustomDate] = useState(false)
    const [startDate, setStartDate] = useState(date ? new Date(date) : new Date());
    const [search,setSearch] = useState("")
   const calenderDetails = [
    {
      text: "Tomorrow",
      value:formatDate(1,"day"),
      actual:formatDate(1,"day","kek")
    },
    {
      text: "End of this week",
      value:formatDate(7-new Date().getDay(),"day"),
      actual:formatDate(7-new Date().getDay(),"day","kek")
    },
    {
      text: "In one week",
      value:formatDate(7,"day"),
      actual:formatDate(7,"day","kek")
    },
    {
      text: "Custom...",
    },
   ]
  return (
       <CustomModal  closeNewBoardModal={closeCalenderModal} openNewBoardModal={openCalenderModal}>
        
            <CalenderWrapper  >
   <CalenderHead>
  {workspaceID && <Workspace>{workspaceID}</Workspace>} <h4>Edit Due Date</h4>
    <div onClick={(e:any)=>saveCalenderModal(e,startDate)}>
            <AiOutlineClose />
          </div>
   </CalenderHead>

            <CalenderSearch>
              <input 
              type="text" 
              value={search}
              onChange={(e)=>setSearch(e.target.value)} 
              placeholder='Set due date...'
              />
            </CalenderSearch>
            <CalenderLib>
         {calenderDetails.map((calenderItem,index)=>{
          return (
            <CalenderItem onClick={(e)=>{
              if(calenderItem.value){
                setStartDate(new Date(calenderItem.actual))
                saveCalenderModal(e,new Date(calenderItem.actual))
              }else {
                setOpenCustomDate(!openCustomDate)
              }
            
            }}>
              <div>
                <BsCalendar4 /> 
              <div>
                {calenderItem.text}
              </div>
              </div>
              
              <div>
                {/* @ts-ignore */}
                {calenderItem?.value}
              </div>
            </CalenderItem>
          )
         })

         }
            </CalenderLib>
         </CalenderWrapper> 
       {openCustomDate && <CustomDueDate workspaceID={workspaceID} date={date} openCalenderModal={openCalenderModal} closeCalenderModal={()=>{
        setOpenCustomDate(false)
        closeCalenderModal()
       }} saveCalenderModal={(e,value)=>{
        setStartDate(new Date(value))
        saveCalenderModal(e,new Date(value))
       }}
        startDate={startDate}
        setStartDate={setStartDate}  />
       }
        </CustomModal>
  )
}

export default CalenderModal