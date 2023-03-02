import styled from "styled-components"
import Image from "next/image"

import { RootState } from "../../state/store"
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
import HideSideNav from "../HideSideNav"
import { device } from "../../config/theme"
import ProfilePicture from "../ProfilePicture"
import CustomDropdown from "../Customdropdown"
import { Item } from "../viewarea/IViewrea"
import { IBoard, IWorkspace, setCurrentWorkspace } from "../../state/board"
import { BiEdit, BiSearch } from "react-icons/bi"
import { setNewBoardModal, toggleSideNav } from "../../state/display"
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai"
import { useRouter } from "next/router"
import usePortal from "../../hooks/usePortal"
import InvitePeopleModal from "../modal/InvitePeopleModal"


const NavWrapper = styled.div<{showSideNav:boolean}>`
 flex: 0 0 auto; /* fixed width */
 
  padding:0 10px;
  padding-top: 20px;
  box-sizing:border-box;
  background-color: ${({theme}) => theme.sidenav};
  width:250px;
  color: ${({theme}) => theme.primary};
  max-height:100%;
  height:100%;
  z-index:99;
 left:${({showSideNav}) => showSideNav ? '0' : '-310px'};
 transition:all 0.3s;
 position:absolute;
 @media ${device.mobileM} {
  display:block !important;
   position: sticky;
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
const WorkspaceInfo = styled.div`
  display:flex;
  justify-content:space-between;
  align-items:center;
  `
  const Workspaces = styled.div`
  display:flex;
  gap:6px;
  align-items:center;
    font-size:12px;
   cursor:pointer;
    box-sizing:border-box;
    padding: 8px 7px;

  &  > div:first-child {
    background: ${({theme})=>"red"};
    color: ${({theme})=>theme.primary};
    border-radius: 3px;
    padding: 2px 5px;
    box-sizing:border-box;
  }
  &:hover{
    color: ${({theme})=>theme.button};
    background: ${({theme})=>theme.background};
    border-radius:4px;
  }
`
const NewIssueButton = styled.div`
  display:flex;
  align-items:center;
  gap:5px;
  padding: 10px 5px;
  & > div{
    border: 1px solid ${({theme})=>theme.border};
  background: ${({theme})=>theme.background};
    font-size:13px;
  height:30px;
  box-sizing:border-box;
  border-radius: 4px;
  &:hover{
    cursor:pointer;
    background: ${({theme})=>theme.button};
  }
}
`
const Search = styled.div`
  display:flex;
  align-items:center;
  justify-content:center;
  width:40px;
 
`
const Button = styled.div`
  width:100%;
  display:flex;
  align-items:center;
  gap:10px;
  padding: 10px 5px;
  
`
const CancelBtn = styled.div`
          width:18px;
        height:18px;
        background-color: ${({theme})=>theme.sideNav};
        border-radius: 4px;
        display:flex;
        font-size:12px;
        justify-content:center;
        align-items:center;
        border:1px solid ${({theme})=>theme.border};
        cursor:pointer;
        &:hover {
            background-color: ${({theme})=>theme.cardHover};
            transition: 0.3s;
        }
        margin-bottom:30px;
        @media ${device.mobileM} {
          display:none;
        }
`
const InviteButton = styled.div`
  display:flex;
  gap:3px;
  cursor:pointer;
  align-items:center;
  font-size:12px;
`

const SideNav = () => {
  const {currentWorkspace,user} = useSelector((state: RootState) => state.board)
  const {showSideNav,openNewBoardModal} = useSelector((state: RootState) => state.display)
  
  const [isOpen, setIsOpen] = useState(false);

  const [openInviteMembers,setOpenInviteMembers] = useState(false)
  const Portal = usePortal(document.querySelector("#portal"));

  const dispatch = useDispatch()
  const router = useRouter()
  const closeSideNav = () => {
    dispatch(toggleSideNav(!showSideNav))
  }

  const selectItem = (event:any,element:any) => {
    if(element.name==="create workspace"){
        router.push("/join")
    }else{
      router.push(`/${element?.URL}`)
    const currentWorkspace:Partial<IWorkspace> = {
      id:element.id ? element?.id :"29",
      name:element.name,
      totalTasks:0,
      totalMembers:0,
      owner:{
        name:"",
        email:""
      },
      taskID:[],
      members:[],
      // subItems:[]
    }
    // recieve data from backend

    const boardDetails:IBoard = {
      workspaceID:element.id ? element?.id :"29",
      workspace:element.name,
      tasks:[]
    }
    dispatch(setCurrentWorkspace({workspace:currentWorkspace,boardsDetails:boardDetails})) 
    }
    
   
  }

  const closeInviteModal = () =>{
    setOpenInviteMembers(false)
  }
  const saveInvitePeople = () =>{

  }
  return (
    <NavWrapper showSideNav={showSideNav} >
      <CancelBtn>
      <AiOutlineClose fontSize="12px" onClick={closeSideNav}/>
      </CancelBtn>
        <WorkspaceInfo>
        <CustomDropdown 
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    items={user.workspaces}
    selected={{
      name:currentWorkspace.name,
      id:currentWorkspace.id
    }}
    selectItem={(event,element:Item) =>selectItem(event,element)}
    left="0%"
    top="100%"
    type="sidenav"
    noInput={true}
    user={{
      name:user.name,
      email:user.email
    }}
    >
    <Workspaces onClick={()=>setIsOpen(!isOpen)}>
      <div>{currentWorkspace.id}</div>
      <div>{currentWorkspace.name}</div>
    </Workspaces>
    </CustomDropdown>
      <ProfilePicture assigned={{
        name: user.name,
      
      }} tooltip={false} />
        </WorkspaceInfo>
      
        <NewIssueButton>
          <Button onClick={()=> dispatch(setNewBoardModal({open:!openNewBoardModal})) }>
            <BiEdit />
            <p>New issue</p>
          </Button>
          <Search>
            <BiSearch  />
          </Search>
        </NewIssueButton>
          <NavBoards>
    <p>ALL BOARDS ({currentWorkspace.totalTasks})</p>
    <SideDataStyle>
      {user.workspaces.map((item, index) => (
      <LI key={index} 
      onClick={()=>router.push(`/${item?.URL}`)}
      selected={currentWorkspace.id.toLowerCase()===item.id.toLowerCase()}>
        <Image src={"/board_light.svg"} alt="board" width={50} height={20} />
        <p>{item.name}</p>
      </LI>
    ))}
    </SideDataStyle>
        <InviteButton onClick={()=>setOpenInviteMembers(true)}>
         <AiOutlinePlus /> <div>invite people</div> 
        </InviteButton>
    {/* <HideSideNav /> */}
    <Portal>
       {openInviteMembers ? <InvitePeopleModal saveInvitePeople={saveInvitePeople} openInvitePeople={openInviteMembers} closeInvitePeople={closeInviteModal} /> : null}
    </Portal>
        </NavBoards>
    </NavWrapper>
  )
}

export default SideNav