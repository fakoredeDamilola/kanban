import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'


const Loading = styled.div`
    color:white;
    background-image: linear-gradient(to right, #14143693, #4b00e029);
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100vh;
  position:fixed;
  z-index:999;

`
const LoadingPage = () => {
  return (
    <Loading>
<Image alt="logo" src="/logo.svg" width={100} height={100} />
    </Loading>
  )
}

export default LoadingPage