import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'



const CustomModalStyle = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y:scroll;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
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
  display:flex;
  justify-content:center;
  align-items:center;
`
const NoAuth = () => {
  return (
     <Wrapper>   
     <Image alt="logo" src="/logo.svg" width={100} height={100} />
     <h2>No auth</h2>
   <CustomModalStyle/>
   </Wrapper>
  )
}

export default NoAuth