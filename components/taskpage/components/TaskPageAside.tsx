import React, { forwardRef, useState } from 'react'
import { BiLinkAlt } from 'react-icons/bi'
import styled from 'styled-components'
import { addNewActivity, changeTaskDueDate, changeTaskPriority, IActivity, ITaskCards, selectSubItems, subItem } from '../../../state/board'
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2'
import IconsWrapper from '../../IconsWrapper'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CustomTooltip from '../../Tooltip'
import { NotifyComponent } from '../../Notify/Notify'
import AsideItems from './AsideItems'
import { useDispatch, useSelector } from 'react-redux'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { getTextDate } from '../../../utils/utilFunction'
import {v4 as uuidv4} from "uuid"
import { Item } from '../../viewarea/IViewrea'
import { RootState } from '../../../state/store'
import { device } from '../../../config/theme'

const TaskPageAsideContainer = styled.div<{showTaskSideNav:boolean}>`
    /* width: 50%;
    height: 100%; */
    padding:0 20px;
    border:1px solid ${({theme})=>theme.border};
    box-sizing: border-box;
      	flex: 0 100px;
        position:absolute;
        background-color: ${({theme})=>theme.sidenav};
        width:300px ;
        height:100%;
        right:${({showTaskSideNav})=>showTaskSideNav?"0":"-310px"};
        transition:all 0.3s;
        @media ${device.mobileM} {
          position:static;
        }
    
    `
    const TaskPageAsideHeader = styled.div`
    width: 100%;
    height: 50px;
    color: #c4c0c0;
    display: flex;
    box-sizing: border-box;
    border-bottom: 1px solid ${({theme})=>theme.border};
    align-items: center;
    gap:40px;
    & > div {
      display: flex;
      gap: 10px;
    }
    & > h4 {
      cursor:pointer;
      &:hover {
        color: ${({theme})=>theme.secondaryColor};
      }
    }
    `
    const TaskPageAsideMain = styled.div`
    width: 100%;
    height: 100%;
    color: #c4c0c0;
    box-sizing: border-box;
    border-bottom: 1px solid ${({theme})=>theme.border};
    align-items: center;
    padding:30px 0;
`
const TaskPageAsideTop = styled.div`
  border-bottom: 1px solid ${({theme})=>theme.border};
 
`
const TaskPageAsideBottom = styled.div`
 padding:20px 0;
`
const TaskAsideCalender = styled.div`
display:grid;
grid-template-columns:1fr 1fr;
/* gap:10px; */
font-size:12px;
& p {
  display: flex;
  align-items: center;
  
}
`
const CustomCalender = styled.button`
 color: ${({theme})=>theme.secondaryColor};
 background-color:transparent;
    width:150px;
    height:35px;
    display: flex;
    border:0;
    align-items: center;
    cursor:pointer;
    border-radius: 5px;
    padding: 0 10px;
    box-sizing: border-box;
    &:hover {
      background-color: ${({theme})=>"#1B1D29"};
      transition: 0.3s;
    border: 1px solid ${({theme})=>theme.secondaryColor};
    }
  
`

const ExampleCustomInput = forwardRef(({ value, onClick }:{value:any,onClick:any}, ref) => (
  // @ts-ignore
  <CustomCalender  onClick={onClick} ref={ref}>
    {value ?? "DD/MM/YYYY"}
  </CustomCalender>
));

const copyLink = (title:string,text:string) => toast(<NotifyComponent title={title} text={text} />);


const TaskPageAside = ({task,workspace,showTaskSideNav}:{task:ITaskCards,workspace:subItem[],showTaskSideNav:boolean}) => {
  
const user = useSelector((state:RootState)=>state.board.user)
const copyText = (text:string) => {
  navigator.clipboard.writeText(text)
}
const dispatch = useDispatch()

  const changeTaskTodo = (name:string,item:Item) => {
    // dispatch(set)
    let newActivity:IActivity
    if(name ==="Label") {
      newActivity = {
        id: uuidv4(),
        nameOfActivity:"Changed Label",
        // @ts-ignore
        description: `added label`,
        createdby: {
          name:user.name,
          id:user.id,
          email:user.email
        },
        time:Date.now(),
        icon:"MdLabel",
        color:item.img,
        name:item.name
      }
    }else{
      newActivity = {
      id: uuidv4(),
      nameOfActivity:"Changed Status",
      // @ts-ignore
     description: `changed ${name} from ${task[name?.toLowerCase() as keyof typeof task].name} to ${item.name}`,
     createdby: {
      name:user.name,
      id:user.id,
      email:user.email
    },
      time:Date.now(),
      icon:item.img
  }
    }
    
  
    dispatch(changeTaskPriority({id:task.id,type:item,name}))
  dispatch(addNewActivity({id:task?.id,activity:newActivity}))

  }
  console.log({task})
  const setStartDate = (date:Date |null) => {
    dispatch(changeTaskDueDate({id:task?.id,duedate:date}))
    const CalenderActivity:IActivity = {
      id: uuidv4(),
      nameOfActivity:task?.dueDate? "Changed Due Date" : "Added Due Date",
     description:task?.dueDate && date ? `Changed Due Date from ${getTextDate(task?.dueDate)} to ${getTextDate(date)}` :date ? `Set Due Date ${getTextDate(date)}` : "Removed Due Date",
     createdby: {
      name:user.name,
      id:user.id,
      email:user.email
    },
      time:Date.now()
  }
  
  dispatch(addNewActivity({id:task?.id,activity:CalenderActivity}))
  }
  return (
    <TaskPageAsideContainer showTaskSideNav={showTaskSideNav}>
        <TaskPageAsideHeader>
          
        <CustomTooltip toolTipText="copy issue URL to clipboard">
          <h4 onClick={()=>{
            copyText(`${task.id}`)
            copyLink(`${task.id} copied to clipboard`,"You can paste it anywhere")
          }}>{task.id}</h4>
        </CustomTooltip>
        
        <div>
        <CustomTooltip toolTipText="copy issue URL to clipboard">
          <IconsWrapper onClick={()=>{
            copyText(`localhost:3000/board/${task.workspaceID}/task/${task.id}`)
            copyLink(`Issue ${task.id} URL copied to clipboard`,"You can paste it anywhere")
          }} width="30px" height="30px">
          <BiLinkAlt />
        </IconsWrapper>
        </CustomTooltip>
        <CustomTooltip toolTipText="copy issue ID to clipboard">
        <IconsWrapper onClick={()=>{
            copyText(`${task.id}`)
            copyLink(`${task.id} copied to clipboard`,"You can paste it anywhere")
          }} width="30px" height="30px">
          <HiOutlineClipboardDocumentList />
        </IconsWrapper>
        </CustomTooltip>
        </div>
        
        </TaskPageAsideHeader>

  <TaskPageAsideMain>
    <TaskPageAsideTop>
    {[
      {
        name:"Status",
        value:task.status.name,
        items:workspace.filter(item=>item.name.toLowerCase()==="status")[0].items,
        selected:task.status,
        top:"50%",
      },
      {
        name:"Priority",
        value:task.priority.name,
        items:workspace.filter(item=>item.name.toLowerCase()==="priority")[0].items,
        selected:task.priority,
        top:"50%",
      },
      {
        name:"Assigned",
        value:task.assigned.name,
        items:workspace.filter(item=>item.name.toLowerCase()==="assigned")[0].items,
        selected:task.assigned,
        top:"50%",
      },
      {
        name:"Label",
        value:task.label.name,
        items:workspace.filter(item=>item.name.toLowerCase()==="label")[0].items,
        selected:task.label,
        top:"50%",
      },
    ].map((item,index)=>{
      return (
        <AsideItems
        workspaceID={task.workspaceID}
        selected={item.selected}
      key={index}
      name={item?.name}
      value={item?.value}
      workspace={item.items}
      changeTaskTodo={changeTaskTodo}
    />
      )
    }) 
}
    </TaskPageAsideTop>
  {task.dueDate ?  
    <TaskPageAsideBottom>
      <TaskAsideCalender>
    <p>Due Date</p>
   <DatePicker
   
      // @ts-ignore
      selected={Date.parse(task.dueDate)}
      customInput={<ExampleCustomInput value={Date} onClick={()=>{}}/>}
      isClearable
      onChange={(date) => setStartDate(date)}
      placeholderText="This is readOnly"
    />
      </TaskAsideCalender>
    </TaskPageAsideBottom>
 :null
    
  }
   

  </TaskPageAsideMain>
        <ToastContainer
position="bottom-right"
autoClose={5000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"
/>
    </TaskPageAsideContainer>
  )
}

export default TaskPageAside