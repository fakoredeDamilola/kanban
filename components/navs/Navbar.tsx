import styled from "styled-components"
import {HiOutlineEllipsisVertical} from 'react-icons/hi2'
import { useDispatch, useSelector } from "react-redux"
import { device } from "../../config/theme"
import Harmburger from "../Harmburger"
import { toggleSideNav } from "../../state/display"


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
  
  @media ${device.mobileM} {
  width:calc(100% - 250px);
  }
`
const Button = styled.button`
  background-color: ${({theme}) => theme.button};
  color: ${({theme}) => theme.white};
  padding:0px 20px;
  border-radius:24px;
  border:none;
  font-size:16px;
  cursor:pointer;
  width:164px;
  height:48px;
  margin-right:6px;
  opacity:0.25;
  transition: all 0.50s linear;
  &:hover{
    background-color: ${({theme}) => theme.secondary};
    color: ${({theme}) => theme.button};
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
const Navbar = () => {
  const {currentBoard,showSideNav} = useSelector((state: any) => state.board)
  const dispatch = useDispatch()

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
        
        <div>
            <HiOutlineEllipsisVertical size="23px"/>
        </div>
      
      </MenuNav>
      
    </NavWrapper>
  )
}

export default Navbar