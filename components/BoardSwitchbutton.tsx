import React from 'react'
import { HiOutlineViewList, HiViewBoards } from 'react-icons/hi';
import styled from 'styled-components'

const BoardSwitchButton = styled.div<{taskView:string}>`
display:flex;
align-items:center;
background-color: ${({theme}) => theme.button};
border-radius:6px;
& > div:first-child {
  background-color: ${({taskView,theme}) => taskView === "list" ?  theme.button : theme.secondary};
  
  border-radius:6px 0 0 6px;
}
& > div:last-child {
  background-color: ${({taskView,theme}) => taskView === "column" ?  theme.button: theme.secondary};
  border-radius:0px 6px 6px 0px;
}
 & > div {
  cursor: pointer;
box-sizing:border-box;
  width:30px; 
  display:flex;
  justify-content:center;
  align-items:center;
  /* min-height:100%; */
  height:30px;
  &:hover{
    background-color: ${({theme}) => theme.secondaryColor};
  }
}


`
const BoardSwitchbutton = ({taskView,changeBoardView}:{taskView:string;changeBoardView:(view:string)=>void}) => {
  return (
    <BoardSwitchButton taskView={taskView}>
    <div>
      <HiOutlineViewList color="white" size="20px" onClick={()=>changeBoardView("list")}/>
    </div>
    <div>
      <HiViewBoards size="20px" color="white" onClick={()=>changeBoardView("column")}/>
      
    </div>
    </BoardSwitchButton>
  
  )
}

export default BoardSwitchbutton