import { useRouter } from 'next/router'
import React from 'react'
import { AiOutlineCalendar } from 'react-icons/ai'
import styled from 'styled-components'
import { IActivity } from '../../../state/board'
import CustomIcon from '../../CustomIcon'
import ProfilePicture from '../../ProfilePicture'

const ActivityWrapper = styled.div`
    width: 100%;
    display:grid;
    grid-template-columns: 25px 1fr;
    gap:30px;
    color:#c4c0c0;
    font-size:12px;
    padding:10px 0;
    align-items:center;
    & span {
        color: #fff;
        font-weight:700;

    }
    & > div:last-child {
        display:flex;
        gap:5px;
    }
    
    `
    const Comment = styled.div`
   background:#1F2130;
    padding:10px;
    border-radius:4px;
    border:1px solid ${({theme})=>theme.border};
    box-sizing:border-box;
    width:100%;
    color:white;
    & > div:last-child {
        color: #c4c0c0;
        display:flex;
        align-items:center;
    }
    `
  const Color =styled.div`
  gap:8px;
  margin-left:4px;
  display:flex;
  & > div:first-child {
    margin-top:4px;
  }
  `
  const NameDiv = styled.div`
    color:#c4c0c0;
    cursor: pointer;
    &:hover{
      text-decoration:underline
    }
  `
  const Name = ({name,workspaceURL,username}:{name:string,workspaceURL:string,username?:string})=>{
    const router = useRouter()
    return (
      <NameDiv onClick={()=>router.push(`/${workspaceURL}/profiles/${name}`)}>{name}</NameDiv>
    )
  }
const ActivityCard = ({activity,workspaceURL}:{activity:IActivity,workspaceURL:string}) => {
  console.log({activity})
  return (
    <ActivityWrapper>
        {activity.nameOfActivity==="created" ?
        <>
         <ProfilePicture assigned={activity.createdby} size="25px" tooltip={true} /> 
       
       <div><Name name={activity.createdby.name}  username={activity.createdby.username} workspaceURL={workspaceURL} /> {activity.description}</div>
        </> :
        activity.nameOfActivity==="comment" ?
        <>
         <ProfilePicture assigned={activity.createdby} size="25px" tooltip={true} /> 
       
       <Comment>
        <div>{activity.createdby.name}</div> 
      <div>{activity.description}</div> 
       </Comment>
        </> :
        activity.nameOfActivity==="Changed Status" ?
          <>
          {<CustomIcon img={activity?.icon} />}
          <div><Name name={activity.createdby.name}  username={activity.createdby.username} workspaceURL={workspaceURL}/> {activity.description}</div>
          </> :
        activity.nameOfActivity==="Changed Label" ?
          <>
          {<CustomIcon img={activity?.icon} />}
          <div>
            <Name name={activity.createdby.name} username={activity.createdby.username} workspaceURL={workspaceURL}/> {activity.description} 
            <Color>
           <CustomIcon type="color" img={activity.color} /> {activity.name} 
           </Color>
           </div>
          </> :
           activity.nameOfActivity==="Changed Due Date" || "Added Due Date" ?
        <>
        <AiOutlineCalendar />
        <div><Name name={activity.createdby.name}  username={activity.createdby.username} workspaceURL={workspaceURL} /> {activity.description}</div>
        </>
        :
        
        null
   
        }
   
    </ActivityWrapper>
  )
}

export default React.memo(ActivityCard)