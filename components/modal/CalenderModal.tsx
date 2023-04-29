import React, { forwardRef } from 'react'
import styled from 'styled-components'
import DatePicker, { CalendarContainer } from 'react-datepicker';
import CustomModal from '../CustomModal'
import {useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const CalenderWrapper = styled.div`
    display:flex;
    flex-direction:column;
    gap:20px;
    width: 60%;
  padding: 0;
  min-height: 250px;
  position: fixed;
  top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  height:90%;
  max-height: 90%;
  background-color: ${({theme}) => theme.nav};
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 12px;
  z-index: 2;
    `
    const CalenderHead = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
        padding: 10px 17px;
    border-bottom:1px solid ${({theme}) => theme.border};
        font-size:18px;
        color:#c4c0c0;
    div{
        cursor: pointer;
    }
    
    `
    const CalenderBody = styled.div`
    /* display:flex; */
    padding: 20px 17px;
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
    `
    const CustomCalender = styled.button`
         width:100%;
    height:40px;
    border:1px solid ${({theme}) => theme.border};
    border-radius:6px;
    padding:0 10px;
    margin:10px 0;
    text-align:left;
    background-color:black;
    box-sizing:border-box;
    color:#c4c0c0;
    font-size:14px;
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

const CalenderModal = ({openCalenderModal,closeCalenderModal,saveCalenderModal,date}:{openCalenderModal:boolean,date:any,closeCalenderModal:() => void,saveCalenderModal:(e:any,date:any) => void}) => {
    const [startDate, setStartDate] = useState(date ? new Date(date) : new Date());
    const Months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

    const MyContainer = ({ className, children }:any) => {
        return (
          <div style={{ padding: "0 20px",display:"flex",justifyContent:"center", boxSizing:"border-box", color: "#fff",width:"100%" }}>
            <CalendarContainer className={className}>
              
              <div style={{ position: "relative" }}>{children}</div>
            </CalendarContainer>
          </div>
        );
      };
      const ExampleCustomInput = forwardRef(({ value, onClick }:{value:any,onClick:any}, ref) => (
        // @ts-ignore
        <CustomCalender  onClick={onClick} ref={ref}>
          {value ?? "DD/MM/YYYY"}
        </CustomCalender>
      ));
  return (
       <CustomModal  closeNewBoardModal={closeCalenderModal} openNewBoardModal={openCalenderModal}>
        
            <CalenderWrapper  >
   <CalenderHead>
    <h4>Edit Due Date</h4>
    <div onClick={(e:any)=>saveCalenderModal(e,startDate)}>
            <AiOutlineClose />
          </div>
   </CalenderHead>
   <style>
              {`.date-picker {
                background-color: transparent;
                  font-size: 14px;
                  width:auto;
                  border:0;
                  margin:0 auto;
                  margin-top:-10px;

              }
                .day-selected {
                    color: #fff;
                    margin:5px 10px;
                    border-radius:50%;
                }
                .month-selected {
                    color: #fff;
                }
                .weeks-selected {
                    color:#c4c0c0;
                    margin:5px 10px;
                    margin-top:0px;
                    borderBottom:"1px solid #c4c0c0";
                    border-radius:50%;

                }
              
              `}
            </style>
  
        <CalenderBody>
            <div>
                <h4>Due Date</h4> <p>-</p> <p> Issue needs to be completed by</p>
            </div> 
            {/* <Input
                type="date"
                value={startDate.toISOString().split('T')[0]}
            /> */}
            <DatePicker
      selected={startDate}
      customInput={<ExampleCustomInput value={Date} onClick={()=>{}}/>}
      isClearable
      // @ts-ignore
      onChange={(date) => setStartDate(date)}
      placeholderText="This is readOnly"
      readOnly
    />
            </CalenderBody>
            <CalenderLib>
               <DatePicker
             renderCustomHeader={({
                monthDate,
                decreaseMonth,
                increaseMonth,
                changeMonth,
                changeYear,
              }) => {
                return (
                  <div

                    style={{
                      margin: "0 10px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontSize:"14px",
                      backgroundColor:"transparent",
                    }}
                  >
                    <div

                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={decreaseMonth}
                    >
                      <AiOutlineLeft />
                    </div>
                       <div style={{
                  margin:"6px 9px",
                  display: "flex",
                  fontSize:"14px",
                  backgroundColor:"transparent",
                }}
              >
                  {monthDate.getMonth() === 0 ? "December" : Months[monthDate.getMonth() - 1]} {monthDate.getFullYear()}
              </div>
                    <div

                      style={{
                        display: "flex",
                        alignItems: "center",
                        cursor: "pointer",
                      }}
                      onClick={increaseMonth}
                    >
                      <AiOutlineRight />
                    </div>
                  </div>
                );
              }}
              renderDayContents={(day) => {
                return (
                  <div

                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      fontSize:"14px",
                      backgroundColor:"transparent",

                    }}
                  >
                 {day}
                  </div>
                );
              }}
              
      selected={startDate}
      monthsShown={2}
    monthClassName={()=> "month-selected"}
 
      onChange={(date) => {
        // e.stopPropagation()
        //   @ts-ignore
        setStartDate(date)
      }}
      startDate={startDate}
      calendarClassName="date-picker"
      weekDayClassName={()=> "weeks-selected"}
      dayClassName={()=> "day-selected"}
      
              calendarContainer={MyContainer}
      inline
    />
         
            </CalenderLib>
            <CalenderButton onClick={(e:any)=>saveCalenderModal(e,startDate)}>
            Save Due Date
           </CalenderButton>
         </CalenderWrapper> 
        
        </CustomModal>
  )
}

export default CalenderModal