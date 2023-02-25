import React,{useRef,useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'



const CustomModalStyle = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y:scroll;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  /* z-index: 99; */
  position: fixed;
`

const Wrapper = styled.div`
 z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  /* background-color: rgba(0, 0, 0, 0.2); */
  width: 100vw;
  height:100%;
`

interface ICustomModal {
    children: React.ReactNode;
    closeNewBoardModal?: (value?:string) => void;
    openNewBoardModal:boolean
}

const CustomModal = ({children,closeNewBoardModal,openNewBoardModal}:ICustomModal) => {
 
  useEffect(() => {
  }, [openNewBoardModal])
  return (
    <Wrapper>   
      {children}
    <CustomModalStyle/>
    </Wrapper>
   
  )
}

export default CustomModal