import React from 'react'
import styled from 'styled-components'
import { ITaskCards, subItem } from '../../../state/board'
import CustomDropdown from '../../Customdropdown'
import {useState} from "react"
import { Item } from '../../viewarea/IViewrea'
import CustomIcon from '../../CustomIcon'
import ProfilePicture from '../../ProfilePicture'

const TaskPageItem = styled.div`
  display:grid;
    grid-template-columns: 1fr 1fr;
  font-size:12px;
  gap:15px;
  margin:10px 0;
  & > div:first-child {
    display: flex;
    align-items: center;
  }
  & > div:last-child {
    color: ${({theme})=>theme.secondaryColor};
    width:150px;
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
const Icon = styled.div`
  display:flex;
  gap:10px;
`

const AsideItems = ({
    changeTaskTodo,
    workspace,
    name,
    value,
    selected
}:{
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
  return (
    <CustomDropdown isOpen={isOpen} setIsOpen={setIsOpen} selected={selected} selectItem={(e:any,item:Item)=>{
      changeTaskTodo(name,item)
      setIsOpen(false)
    }} top="30%" left="-70%" items={workspace} >
      <TaskPageItem onClick={handleButtonClick}>
<div>{name}</div>
<Icon>
  {name.toLowerCase() === "assigned" ?
    <ProfilePicture assigned={selected} tooltip={true} />
   : <CustomIcon img={selected.img} type={selected.type} />}
   <div>{value}</div>
   
   </Icon>
</TaskPageItem>
    </CustomDropdown>
  )
}

export default AsideItems