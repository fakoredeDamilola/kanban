import styled from "styled-components"
import {useState} from "react"
import Toggle from "../components/Toggle"
import { useDarkMode } from "../hooks/useDarkMode";
import AddNewBoard from "../components/AddNewBoard";
import ViewArea from "../components/ViewArea";


const Wrapper = styled.div`
 
  width:100%;
    /* margin-left:150px; */
    padding:20px;
    box-sizing:border-box;
    min-height:100vh;
    color:white;
  margin-top:90px;
  background-color: ${({theme}) => theme.background};
    border-bottom: ${({theme})=> `2px solid ${theme.border}`};
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    & p {
      color: ${({theme}) => theme.secondaryColor};
      font-weight:700;
    }
  & button {
    width:180px;
    height:48px;
    border-radius:24px;
    border:0;
    cursor:pointer;
    background-color:${({theme})=>theme.button};
    color:white;
    font-size:14px;
    font-weight:900;
    margin:25px 0;
    &:hover {
      background:#A8A4FF;

    }
  }

`

export default function Home() {
const [openNewBoardModal, setOpenNewBoardModal] = useState(false)
const closeNewBoardModal = () => {
  setOpenNewBoardModal(false)
}
  return (
    <>
     <Wrapper>
     <ViewArea 
      openNewBoardModal={openNewBoardModal}
      setOpenNewBoardModal={setOpenNewBoardModal}

      />

   </Wrapper>
   {openNewBoardModal && 
   <AddNewBoard
   closeNewBoardModal={closeNewBoardModal}
   openNewBoardModal={openNewBoardModal}
   />}
    </>
  
  )
}
