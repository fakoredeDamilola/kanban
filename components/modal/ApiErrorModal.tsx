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
  max-width:400px;
  margin:0 auto;
  background:white;
  border-radius: 10px;
  text-align: center;
  padding:20px;
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
& button{
  color:white;
        font-size:15px;
        border:none;
        height:45px;
        background-color:#666BE1;
        border-radius:6px;
        cursor:pointer;
         width:250px;
         &:hover{
          background-color:#2A2B38;
         }
         
         transition:0.3s all;
        @media ${device.mobileS} {
     width:250px;
}
}
& p {
  color:#444;
  font-weight:bold;
  font-size:14px;
  margin-bottom:30px
}
`

const ApiErrorModal = () => {
    
const dispatch = useDispatch()
    const {modal,modalMessage,modalType} =  useSelector((state: RootState) => state.display)
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
        y:"200px",
        opacity:1,
        transition:{delay:0.5}
    }
}

const setErrorModal = ()=>{
  dispatch(setModalData({modalType:"",modalMessage:"",modal:false}))
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
              {
                modalType==="error"?
                <IconContext.Provider
                value={{ color: 'red', size: '70px' }}
              >
                <BiError  style={{padding:"15px 0"}}/>
                </IconContext.Provider>
                 : null
              }
            <p>{modalMessage}</p>
            
            <button onClick={setErrorModal}>Close</button>
           
            </Model>
        </Backdrop>
    
    </AnimatePresence> 
    
    </>

  )
}

export default ApiErrorModal