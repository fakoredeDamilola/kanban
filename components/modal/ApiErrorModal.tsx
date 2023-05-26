import { AnimatePresence,motion } from 'framer-motion'
import Link from 'next/link'
import React from 'react'
import { IconContext } from 'react-icons'
import { BiError } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { device } from '../../config/theme'
import { setModalData } from '../../state/display'
import { RootState } from '../../state/store'
import { AiOutlineClose } from 'react-icons/ai'


const Backdrop = styled.div`
  position:fixed;
  top:0;
  left:0;
  width:100%;
  height:100%;
  background-color: rgba(0,0,0,0.5);
  z-index: 1;

`
const Model = styled.div`
position:relative;
  max-width:400px;
  margin:0 auto;
  background:${({theme})=>theme.modalBackground};
  border-radius: 5px;
  text-align: center;
  padding:15px 25px;
  /* display:flex; */
  z-index: 99;
  color:white;
  /* justify-content:space-between; */
  flex-direction:column;
  box-sizing:border-box;
  align-items:center;

& p {
  font-weight:bold;
  font-size:14px;
  /* margin-bottom:30px */
  margin:10px 0 14px 0;
}
`
const Cancel = styled.button`
   font-size:15px;
        border:none;
        position:absolute;
        right:10px;
        top:10px;
        /* background-color:transparent; */
        height:20px;
        color:#666BE1;
        border-radius:6px;
        cursor:pointer;
         width:20px;
         display:flex;
         justify-content:center;
         align-items:center;
         &:hover{
          background-color:#2A2B38;
         }
         
         transition:0.3s all;
`
const Confirm  = styled.button`
  color:white;
        font-size:15px;
        border:none;
        height:40px;
        background-color: #666BE1;
        border-radius:6px;
        cursor:pointer;
         width:80%;
         &:hover{
          background-color:#2A2B38;
         }
         margin-bottom:7px;
         transition:0.3s all;
`

const ApiErrorModal = () => {
    
const dispatch = useDispatch()
    const {modal,modalMessage,modalType,type,click} =  useSelector((state: RootState) => state.display)
const backdrop = {
    visible:{opacity:1},
    hidden: {opacity:0}
}


const modalVariants = {
    hidden:{
        y:"-100vh",
        opacity:0,
    },
    visible:{
        y:"300px",
        opacity:1,
        transition:{delay:0.5}
    }
}

const setErrorModal = ()=>{
  dispatch(setModalData({modalType:"",modalMessage:"",modal:false,type:"",click:null}))
}
  return (
    
      <> 
      <AnimatePresence>
        <Backdrop as={motion.div} className="backdrop"
        variants={backdrop}
        initial="hidden"
        animate="visible"
        exit="hidden"
        >
            <Model
             as={motion.div} 
            variants={modalVariants}

            >
              {/* {
                modalType==="error"?
                <IconContext.Provider
                value={{ color: 'red', size: '70px' }}
              >
                <BiError  style={{padding:"15px 0"}}/>
                </IconContext.Provider>
                 : null
              } */}
            <p>{modalMessage}</p>
           {type==="confirm" && <Confirm onClick={()=>{
            setErrorModal()
            click()
           }}> confirm</Confirm>}
            <Cancel onClick={setErrorModal}><AiOutlineClose /></Cancel>
           
            </Model>
        </Backdrop>
    
    </AnimatePresence> 
    
    </>

  )
}

export default ApiErrorModal