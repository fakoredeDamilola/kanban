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
  width:calc(100% - 250px);
  color: ${({theme}) => theme.primary};
  width:${({showSideNav}) => showSideNav ? `calc(100% - 250px)` : "100%"};
  @media ${device.mobileM} {
  width:calc(100% - 250px) !important;
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
      background-color: ${({theme}) => theme.secondary};
    }
  }

  
  `

const Navbar = () => {
  const {currentWorkspace} = useSelector((state: any) => state.board)
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
        <h1>{currentWorkspace ?currentWorkspace.name :"Create New Board"}</h1>
      </Hammenu>
      <MenuNav>
        
        <BoardSwitchButton taskView={taskView}>
        <div>
          <HiOutlineViewList color="white" size="20px" onClick={()=>changeBoardView("list")}/>
        </div>
        <div>
          <HiViewBoards size="20px" color="white" onClick={()=>changeBoardView("column")}/>
        </div>
        </BoardSwitchButton>
      
      </MenuNav>
      
    </NavWrapper>
  )
}

export default Navbar