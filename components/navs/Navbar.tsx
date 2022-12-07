import styled from "styled-components"
import {HiOutlineEllipsisVertical} from 'react-icons/hi2'
import { useSelector } from "react-redux"


const NavWrapper = styled.div<{showSideNav:boolean}>`
  background-color: ${({theme}) => theme.nav};
  padding: 20px;
  box-sizing:border-box;
  color: ${({theme}) => theme.primary};
  display:flex;
  box-sizing:border-box;
  right:0;
  top:0;
  left:${({showSideNav}) => showSideNav ? '230px' : '0'};
  position:fixed;
  align-items:center;
  border-bottom: ${({theme})=> `2px solid ${theme.border}`};
  border-left: ${({theme})=> `2px solid ${theme.border}`};
  justify-content:space-between;
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
const Navbar = () => {
  const {currentBoard,showSideNav} = useSelector((state: any) => state.board)
  return (
    <NavWrapper showSideNav={showSideNav}>
      <div>
        <h1>{currentBoard ?currentBoard :"Create New Board"}</h1>
      </div>
      <MenuNav>
        <Button>
          + Add New Task
        </Button>
        <div>
            <HiOutlineEllipsisVertical size="23px"/>
        </div>
      
      </MenuNav>
      
    </NavWrapper>
  )
}

export default Navbar