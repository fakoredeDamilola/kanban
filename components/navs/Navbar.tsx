import styled from "styled-components"
import {HiOutlineViewList,HiViewBoards} from 'react-icons/hi'
import { useDispatch, useSelector } from "react-redux"
import { device } from "../../config/theme"
import Harmburger from "../Harmburger"
import { switchTaskView, toggleSideNav } from "../../state/display"


const NavWrapper = styled.div<{showSideNav:boolean}>`
 
  background-color: ${({theme}) => theme.nav};
  justify-content:space-between;
  align-items:center;
  padding:0px 20px;
  flex: 0 0 auto; /* fixed width */
  position: fixed;
  right:0;
  box-sizing:border-box;
  border: 1px solid ${({theme}) => theme.border};
  height: 70px;
  display:flex;
  width:100%;
  color: ${({theme}) => theme.primary};
  
  @media ${device.mobileM} {
  width:calc(100% - 250px);
  }
`
const MenuNav = styled.div`
  display:flex;
  div:last-child {
    display:flex;
    align-items:center;
  }
`
const Hammenu = styled.div`

  display:flex;
  align-items:center;
  div {
    margin-right:5px;
  }
  `
  const BoardSwitchButton = styled.div<{taskView:string}>`
  display:flex;
  align-items:center;
  background-color: ${({theme}) => theme.button};
  /* height:30px; */
  border-radius:6px;
  /* padding:0px 10px; */
  & > div:first-child {
    background-color: ${({taskView,theme}) => taskView === "list" ? theme.secondary : theme.button};
  
  }
  & > div:last-child {
    background-color: ${({taskView,theme}) => taskView === "column" ? theme.secondary : theme.button};
  }
   & > div {
    cursor: pointer;
  box-sizing:border-box;
    width:30px; 
    display:flex;
    justify-content:center;
    align-items:center;
    border-radius:6px;
    /* min-height:100%; */
    height:30px;
    &:hover{
      background-color: ${({theme}) => theme.secondary};
    }
  }

  
  `

const Navbar = () => {
  const {currentBoard} = useSelector((state: any) => state.board)
  const {taskView,showSideNav} = useSelector((state: any) => state.display)
  const dispatch = useDispatch()

const changeBoardView = (view:string) => {
  dispatch(switchTaskView(view))

}


  const toggleNav = () => {
    console.log("toggleNav")
    dispatch(toggleSideNav(!showSideNav))
  }
  return (
    <NavWrapper showSideNav={showSideNav}>
      <Hammenu>
      <Harmburger ToggleNav={toggleNav}/>
        <h1>{currentBoard ?currentBoard :"Create New Board"}</h1>
      </Hammenu>
      <MenuNav>
        
        <BoardSwitchButton taskView={taskView}>
        <div>
          <HiOutlineViewList size="20px" onClick={()=>changeBoardView("list")}/>
        </div>
        <div>
          <HiViewBoards size="20px" onClick={()=>changeBoardView("column")}/>
        </div>
        </BoardSwitchButton>
      
      </MenuNav>
      
    </NavWrapper>
  )
}

export default Navbar