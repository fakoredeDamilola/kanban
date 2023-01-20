import React,{useRef,useEffect} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import styled from 'styled-components'



const CustomModalStyle = styled.div`
/* create a custom modal */
/* position: fixed; */
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y:scroll;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(3px);
  /* max-height: calc(100vh - 210px); */
    /* overflow-y: auto; */
  z-index: 1;
`
const SectionModal = styled.section`
  width: 450px;
  padding:1.3rem;
  min-height: 250px;
  position: fixed;
  top: 20%;
  left:30%;
  background-color: ${({theme}) => theme.nav};
  border: 1px solid #ddd;
  border-radius: 6px;
  z-index: 2;
`
const SectionText = styled.div`
  display: flex;
  justify-content: space-between;
`

const Wrapper = styled.div`
 z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  /* background-color: rgba(0, 0, 0, 0.2); */
  width: 100vw;
  height: 100%;
`

interface ICustomModal {
    children: React.ReactNode;
    closeNewBoardModal: () => void;
    title:string;
    openNewBoardModal:boolean
}

const CustomModal = ({children,closeNewBoardModal,title,openNewBoardModal}:ICustomModal) => {
  const ref = useRef<any>(null)
  const handleClick = (e:CustomEvent) => {
    console.log(e.target,ref.current)
    if (openNewBoardModal && ref.current && !ref.current.contains(e.target)) {
    
      closeNewBoardModal()
    }
  }
  useEffect(() => {
    document.addEventListener('mousedown', handleClick as EventListener)
    return () => {
      document.removeEventListener('mousedown', handleClick as EventListener)
    }
  }, [openNewBoardModal])
  return (
    <Wrapper>
     <SectionModal ref={ref}>
      <SectionText>
        <h3>{title}</h3>
        {/* <button onClick={closeNewBoardModal}><AiOutlineClose /></button> */}
      </SectionText>
    
      {children}
     </SectionModal>
    <CustomModalStyle/>
    </Wrapper>
   
  )
}

export default CustomModal