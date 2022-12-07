import styled from "styled-components"
import Image from "next/image"
import { SidebarData } from "./SidebarData"
import Link from "next/link"
import { RootState } from "../../state/store"
import { useSelector } from "react-redux"
import Toggle from "../Toggle"
import { useDarkMode } from "../../hooks/useDarkMode"
import HideSideNav from "../HideSideNav"


const NavWrapper = styled.div<{showSideNav:boolean}>`
  background-color: ${({theme}) => theme.nav};
  padding:20px 0;
  width:300px;  
  /* position:fixed; */
  box-sizing:border-box;
  min-height:100vh;
  color: ${({theme}) => theme.primary};
  border-bottom: ${({theme})=> `2px solid ${theme.border}`};
  border-left: ${({theme})=> `2px solid ${theme.border}`};
  justify-content:space-between;
 position:relative;
 right: ${({showSideNav}) => showSideNav ? '0' : '100%'};
 display:${({showSideNav}) => showSideNav ? 'block' : 'none'};
 
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
  transition:1s all ease;
  & ::before{
      content:'';
      width:${({selected}) => selected ? "200px": 0};
      height:${({selected}) => selected && "100%"};
      border-radius: ${({selected}) => selected && "0px 100px 100px 0px"};
      border: ${({theme,selected}) => selected && `1px solid ${theme.button}`};
      color:red;
      position:${({selected}) => selected && "absolute"};
      left:0;
      top:-1px;
    }
  cursor:pointer;
  color:white;
  &:hover{
  p{
    color:red;
  
    z-index:100;
  }
  & ::before{
      content:'';
      transition:width 0.5s cubic-bezier(0.22, 0.61, 0.36, 1);
      width:200px;
      height:100%;
      border-radius: 0px 100px 100px 0px;
      border:1px solid ${({theme}) => theme.button};
      position:absolute;
      left:0;
      top:-1px;
    }
    
  }
  
  p{
    font-size: 15px;
    font-weight: 500;
    z-index:30;
    /* position:relative; */
    color: ${({theme}) => theme.primary};
  }
`
const NavBoards = styled.div`
    margin: 20px;
    margin-top:50px;
  
`
const Logo= styled.div`
  padding:0 20px;
  box-sizing:border-box;
`
const SideNav = () => {
  const {currentBoard,boardsDetails,showSideNav} = useSelector((state: RootState) => state.board)

  const boards = boardsDetails.map((board)=>board.name)
  const [theme, themeToggler] = useDarkMode();
  return (
    <NavWrapper showSideNav={showSideNav} >
        <Logo>
              <Image src={theme==="light"? "/logoLight.svg" : "/logo.svg"} alt="logo" width={130} height={30} />
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
    
    <Toggle toggleTheme={themeToggler} theme={theme} />
    {/* <HideSideNav /> */}
        </NavBoards>
    </NavWrapper>
  )
}

export default SideNav