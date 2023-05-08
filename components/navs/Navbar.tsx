import styled from "styled-components"
import { useDispatch, useSelector } from "react-redux"
import { device } from "../../config/theme"
import Harmburger from "../Harmburger"
import { switchTaskView, toggleSideNav } from "../../state/display"
import BoardSwitchbutton from "../BoardSwitchbutton"


const NavWrapper = styled.div<{showSideNav:boolean}>`
 background-color: ${({theme}) => theme.background};
  justify-content:space-between;
  align-items:center;
  padding:0px 20px;
  flex: 0 0 auto; /* fixed width */
  position: fixed;
  right:0;
  box-sizing:border-box;
  border: 1px solid ${({theme}) => theme.border};
  height: 70px;
  z-index:999;
  display:flex;
  width:calc(100% - 250px);
  color: ${({theme}) => theme.primary};
  width:100%;
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
position:relative;
  display:flex;
  
  align-items:center;
  div {
    margin-right:5px;
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
    dispatch(toggleSideNav(!showSideNav))
  }
  return (
    <NavWrapper showSideNav={showSideNav}>
      <Hammenu>
      <Harmburger ToggleNav={toggleNav}/>
        <h1>{currentWorkspace ?currentWorkspace.name :"Create New Board"}</h1>
      </Hammenu>
      <MenuNav>
        
       <BoardSwitchbutton taskView={taskView} changeBoardView={changeBoardView}/>
      </MenuNav>
      
    </NavWrapper>
  )
}

export default Navbar