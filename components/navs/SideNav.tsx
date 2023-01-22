import styled from "styled-components"
import Image from "next/image"
import { SidebarData } from "./SidebarData"
import Link from "next/link"
import { RootState } from "../../state/store"
import { useSelector } from "react-redux"
import Toggle from "../Toggle"
import { useDarkMode } from "../../hooks/useDarkMode"
import HideSideNav from "../HideSideNav"
import { device } from "../../config/theme"


const NavWrapper = styled.div<{showSideNav:boolean}>`
 flex: 0 0 auto; /* fixed width */
  position: sticky;
  padding-top: 20px;
  box-sizing:border-box;
  background-color: ${({theme}) => theme.sidenav};
  width:250px;
  color: ${({theme}) => theme.primary};
  max-height:100%;
 /* right: ${({showSideNav}) => showSideNav ? '0' : '100%'}; */
 display:${({showSideNav}) => showSideNav ? 'block' : 'none'};
 @media ${device.mobileM} {
  display:block;
 }
 
`
const SideDataStyle = styled.ul`
list-style-type: none;
margin:20px 0;
`

const LI = styled.li<{selected: boolean}>`

  z-index:1;
  display:flex;
  align-items:center;
  position:relative;
  padding: 10px 0px;
  margin:15px 0;
  &::before{
    content:'';
    transform:scaleX(0);
      /* border-radius: ${({selected}) => selected && "0px 100px 100px 0px"};
      border: ${({theme,selected}) => selected && `1px solid ${theme.button}`}; */
    transform-origin:bottom right;
    display:block;
    position:absolute;
   
    width:200px;
      height:40px;
  
    background-color:${({theme}) => theme.button};
    border-radius:0px 100px 100px 0px;
    z-index:-1;
    transition:transform 0.25s ease-in-out;
  }

  &:hover::before{
    transform:scaleX(1);
    transform-origin:bottom left;
    transition:transform 0.25s ease-in-out;
  }
  p {
    position: relative;
  }
  &:hover{
    color:red;
    cursor: pointer;
  }
 

 
`
const NavBoards = styled.div`
    margin: 20px;
    margin-top:50px;
  
`
const Logo= styled.div`
  padding:0 20px;
  box-sizing:border-box;
  display:flex;
  & div{
    font-size:25px;
    margin-left:10px;
    margin-top:-5px;
  }
`
const SideNav = () => {
  const {currentBoard,boardsDetails} = useSelector((state: RootState) => state.board)
  const {showSideNav} = useSelector((state: RootState) => state.display)
  const {theme} = useSelector((state: RootState) => state.display)

  const boards = boardsDetails.map((board)=>board.name)

  return (
    <NavWrapper showSideNav={showSideNav} >
        <Logo>
              <Image src="/LOGO.svg" alt="logo" width={25} height={25} />
              <div>Kanban</div>
        </Logo>
      
        <NavBoards>
    <p>ALL BOARDS (8)</p>
    <SideDataStyle>
      {boards.map((item, index) => (
      <LI key={index} selected={currentBoard.toLowerCase()===item.toLowerCase()}>
        {/* <Image src={currentBoard.toLowerCase()===item.title.toLowerCase() ? "/board.svg" :"/board_light.svg"} alt="board" width={50} height={20} /> */}
        <Image src={"/board_light.svg"} alt="board" width={50} height={20} />
        <p>{item}</p>
      </LI>
    ))}
    </SideDataStyle>
    
    <HideSideNav />
        </NavBoards>
    </NavWrapper>
  )
}

export default SideNav