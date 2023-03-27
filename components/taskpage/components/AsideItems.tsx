import React from 'react'
import styled from 'styled-components'
import { ITaskCards, subItem } from '../../../state/board'
import CustomDropdown from '../../Customdropdown'
import {useState} from "react"
import { Item } from '../../viewarea/IViewrea'
import CustomIcon from '../../CustomIcon'
import ProfilePicture from '../../ProfilePicture'
import { AiOutlineArrowRight } from 'react-icons/ai'
import { useRouter } from 'next/router'

const TaskPageItem = styled.div`
  display:grid;
    grid-template-columns: 20% 80%;
  font-size:12px;
  gap:15px;
  margin:10px 0;
  & > div:first-child {
    display: flex;
    align-items: center;
  }
  & > div:last-child {
    color: ${({theme})=>theme.secondaryColor};
    max-width:170px;
    width:160px;
    height:35px;
    display: flex;
    
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
  }
`
const Container = styled.div<{hover:boolean}>`
  display:flex;
  align-items:center;
  gap:5px;
  &:hover{
    & >div:last-child{
        /* width:${({theme,hover})=>hover ?"40px":"0"}; */
  background-color: ${({theme,hover})=>hover ?"#1B1D29": "transparent"};
      transition: 0.3s;
      display:flex;
  visibility:visible;
    border: 1px solid ${({theme,hover})=>hover ?theme.secondaryColor:"none"};
    }
  }
`
const ProfileIcon = styled.div`
  font-size:17px;
  display:flex;
  height:35px;
  padding:0 3px;
  justify-content:center;
  align-items:center;
  cursor:pointer;
  visibility:hidden;
`
const Icon = styled.div`
  display:flex;
  gap:10px;
`

const AsideItems = ({
  workspaceID,
    changeTaskTodo,
    workspace,
    name,
    value,
    selected
}:{
    workspaceID:string;
    changeTaskTodo:(name:string,item:Item)=>void,
    workspace:Item[],
    name:string,
    value:string,
    selected:Item

}) => {
  const [isOpen,setIsOpen] = useState(false)
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const router = useRouter()
  return (
    <CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen} selected={selected} selectItem={(e:any,item:Item)=>{
      changeTaskTodo(name,item)
      setIsOpen(false)
    }} top="30%" left="-70%" items={workspace} >
      <Container hover={name.toLowerCase() === "assigned" ? true : false}>
           <TaskPageItem onClick={handleButtonClick}>
<div>{name}</div>
<Icon>
  {name.toLowerCase() === "assigned" ?
    <ProfilePicture assigned={selected} tooltip={true} />
   : <CustomIcon img={selected.img} type={selected.type} />}
   <div>{value}</div>
   </Icon>
</TaskPageItem>
{name.toLowerCase() === "assigned" &&

   <ProfileIcon onClick={()=>router.push(`/${workspaceID}/profiles/${selected.username}`)}>
     <AiOutlineArrowRight fontSize="15px" />
  </ProfileIcon>
 
  }
      </Container>
   
    </CustomDropdown>
  )
}

export default AsideItems