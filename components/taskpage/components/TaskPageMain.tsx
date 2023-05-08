import React, { useState } from 'react'
import { AiOutlinePlus, AiOutlineStar } from 'react-icons/ai'
import { BiChevronRight, BiDotsHorizontalRounded } from 'react-icons/bi'
import { HiOutlineDotsHorizontal } from 'react-icons/hi'
import styled from 'styled-components'
import { addNewActivity, IActivity, ITaskCards } from '../../../state/board'
import CustomDropdown from '../../Customdropdown'
import CustomInput from '../../CustomInput'
// import CustomInput from '../../CustomInput'
import ProfilePicture from '../../ProfilePicture'
import ActivityCard from './ActivityCard'
import {v4 as uuidv4} from "uuid"
import { useDispatch, useSelector } from 'react-redux'
import { device } from '../../../config/theme'
import { useMutation } from '@apollo/client'
import { ADD_NEW_ACTIVITY } from '../../../graphql/mutation'
import { FETCH_TASK } from '../../../graphql/queries'
import { useRouter } from 'next/router'

const TaskPageMainContainer = styled.div`

        flex: 1;  
      	min-height: 0; 
      	display: flex;
        padding:0 5px;
        @media ${device.mobileM} {
          padding:0 50px;
        }
       
      	flex-direction: column;
`
const TaskPageMainHeader = styled.div`
 
    height:50px;
    color:#c4c0c0;
    padding:0 10px;
        @media ${device.mobileM} {
          padding:0 40px;
        }
    display:flex;
    justify-content:space-between;
    border-bottom:1px solid ${({theme})=>theme.border};
    margin-bottom:20px;
    align-items:center;
    `
const TaskPageHead = styled.div`
    display:flex;
    align-items:center;
    gap:5px;
    background-color: ${({theme})=>theme.sideNav};
    border-radius: 4px;
    p {
      font-size:14px;
    }
    & div {
        width:25px;
        height:25px;
        background-color: ${({theme})=>theme.sideNav};
        border-radius: 4px;
        display:flex;
        justify-content:center;
        align-items:center;
        cursor:pointer;
        &:hover {
            background-color: ${({theme})=>theme.cardHover};
            transition: 0.3s;
        }
      }
`
    const TaskPageMainSection = styled.div`
     margin:20px 0;
    padding:0 0px;
      	flex: 1;  
      	overflow-y: auto; 
    `
  const SubIssues = styled.div`
    margin-top:20px;
    display:flex;
    gap:10px;
    padding:5px 10px;
    cursor:pointer;
    color:#c4c0c0;
    width:130px;
    &:hover {
        color: ${({theme})=>theme.primary};
            background-color: ${({theme})=>theme.cardHover};
            transition: 0.3s;
        }
    p {
      font-size:12px;
      font-weight:700;
    }
  `

  const TaskPageActivity = styled.div`
      border-top:1px solid ${({theme})=>theme.border};
      padding: 20px;
      color:#c4c0c0;
      margin:20px 0;
      `
      const SubscribeTask = styled.div`
      display:flex;
      justify-content:space-between;
      p {
        font-size:12px;

      }
      & > div {
        display:flex;
      align-items:center;
        gap:10px;
      
      }
      `
      const Subscribe = styled.div`
      display:flex;
      gap:10px;
      align-items:center;
      cursor:pointer;
      padding:7px;
      border-radius:4px;
      &:hover {
        color: ${({theme})=>theme.primary};
        background-color: ${({theme})=>theme.cardHover};
        transition: 0.3s;
      }
      `
      const CommentInput = styled.div`
         display:grid;
    grid-template-columns: 25px 1fr;
    gap:30px;
      position:relative;
      margin-top:20px;
      padding:10px 0;
      border-radius:4px;
      /* background-color: ${({theme})=>"red"}; */
      &:hover {
        /* background-color: ${({theme})=>theme.cardHover}; */
        transition: 0.3s;
      }
      & > div:last-child {
        border:1px solid ${({theme})=>theme.border};
        background:#1F2130;
        width:100%;
        height:150px;
        align-items:center;
        position:relative;
        &> button {
          position:absolute;
          right:0;
          bottom:0;
          background-color: ${({theme})=>"#292A35"};
          border:1px solid ${({theme})=>theme.border};
          border-radius:4px;
          
          width:120px;
          height:35px;

          color:#c4c0c0;
          cursor:pointer;
          &:hover {
            background-color: ${({theme})=>theme.cardHover};
            transition: 0.3s;
          }

        }
      }
      `
      const Icon = styled.div`
      width:25px;
      height:20px;
      position:relative;
      border-radius:3px;
      display:flex;
      justify-content:center;
      align-items:center;
      cursor:pointer;
      background-color: ${({theme})=>theme.secondary};
      border:1px solid ${({theme})=>"#777474"};
      &:hover {
        background: ${({theme})=>theme.cardHover};
        transition: 0.3s;
      }
      
      `
      const FooterWrapper = styled.div `
       
      `

const CustomInputs = styled.textarea<{fontSize:string;type:string;}>`
    width:calc(100% - 20px);
    height:130px;
    border:none;
    outline:0;
    background-color: ${({theme})=>"#1F2130"};
    color: ${({theme})=>"white"};
    font-size: ${({fontSize}:{fontSize:string})=>fontSize};
    padding:10px;
    border-radius: 4px;
    margin-bottom:20px;
    
    &::placeholder {

        color: ${({theme})=>theme.text};
        font-size: ${({fontSize}:{fontSize:string})=>fontSize};
    }
    &:focus {
        border:1px solid ${({theme})=>theme.primary};
    }
    `
const TaskPageMain = ({task,setOpenCalenderModal}:
  {
  task:ITaskCards,setOpenCalenderModal:React.Dispatch<boolean>
}
) => {
  const dispatch = useDispatch()
  const [taskTitle,setTaskTitle] = React.useState(task.issueTitle)
  const [taskDescription,setTaskDescription] = React.useState(task.issueDescription ?? "")
  const [comment,setComment] = React.useState("")
  const [addNewActivity,{loading,error,data}] = useMutation(ADD_NEW_ACTIVITY)
  const router = useRouter()
  const [isOpen,setIsOpen] = useState(false)
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const openPage = (event:any,item:any) =>{
  
    if(item.name=== "Change due date..."){
      setOpenCalenderModal(true)
      setIsOpen(false)
    }
  }

  const submitComment = () => {
    const commentActivity = {
      // id: uuidv4(),
      nameOfActivity:"comment",
     description: comment,
    //  createdby: {
    //   name:user.name,
    //   id:user._id,
    //   email:user.email
    // },
      // time: Date.now(),

    }
    // dispatch(addNewActivity({id:task._id,activity:commentActivity}))
    addNewActivity({
      variables:{
        input:{
          taskID:task._id,
        activity:commentActivity
        }
        
      },
      refetchQueries:() => [{
        query: FETCH_TASK,
        variables: { 
         
           input: {
            id:router?.query.taskID,
            URL:router?.query.id
        }
        },
    }]
    })

    setComment("")
  }

  const list = [
    {
      name:"Change due date...",
      img:""
    }
  ]
  return (
    <TaskPageMainContainer>
      <TaskPageMainHeader>
        <TaskPageHead>
          <h5>{task.workspaceID.slice(0,6)}</h5>
        <BiChevronRight style={{marginTop:"1px"}} />
        <p>Task Description</p>
        <div>
           <AiOutlineStar />
        </div>
        </TaskPageHead>
        
       <CustomDropdown isOpen={isOpen} top="50%" left={device.mobileM ? "0%" :"145%" } noInput={true} setIsOpen={setIsOpen} items={list} selected={{name:""}} selectItem={(event,item:any)=>openPage(event,item)}>
    <FooterWrapper onClick={handleButtonClick}>
      <Icon>
        <BiDotsHorizontalRounded />
      </Icon>
       
       
    </FooterWrapper>
    </CustomDropdown>
      </TaskPageMainHeader>
      <TaskPageMainSection>
      <CustomInput
        type="textarea"
        placeholder="Issue Title"
        fontSize="22px"
        textvalue={taskTitle}
        // setTextValue={(val:any)=> setTaskTitle(val)}
        color="white"
        outline={true}
        fontWeight={700}
        maxLength={256}
        input="text"
        name="issue title"
        changeInput={(value,name)=>setTaskTitle(value)}
        
      />
      
      <CustomInput
        type="textarea"
        placeholder="Issue description..."
        fontSize="18px"
         textvalue={taskDescription}
        //  setTextValue={(val:any)=> setTaskDescription(val)}
        fontWeight={300}
        color="white"
        input="text"
        name="issue description"
        changeInput={(value,name)=>setTaskDescription(value)}
      />
        <SubIssues>
          <AiOutlinePlus /> <p>add sub-issues</p>
        </SubIssues>
          <TaskPageActivity>
          <SubscribeTask>
            <h4>Activity</h4>
            <div>
            <p>Subscribe</p>  
            <Subscribe>
               <ProfilePicture tooltip assigned={task.assigned} />
               <HiOutlineDotsHorizontal />
            </Subscribe>
           
            </div>
            

          </SubscribeTask>
          {task.activities ? task.activities?.map((activity:any,index:number)=>
            <ActivityCard key={index} activity={activity} workspaceURL={task.workspaceURL} />
          
          ) : null
          }
          <CommentInput>
            <ProfilePicture tooltip size="35px" assigned={task.assigned} />
            <div>
                 <CustomInputs
            type="textarea"
            fontSize="14px"
            placeholder="Leave a comment..."
            value={comment}
            onChange={(e)=>setComment(e.target.value)}
          />
          <button onClick ={submitComment}>Submit</button>
 
            </div>
           
            
         

          </CommentInput>
          </TaskPageActivity>
        
      </TaskPageMainSection>
       

    </TaskPageMainContainer>
  )
}

export default TaskPageMain