import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'


const Loading = styled.div`
    color:white;
  background-color: #000313;
  display:flex;
  justify-content:center;
  align-items:center;
  width:100%;
  height:100%;

`
const LoadingPage = () => {
  return (
    <Loading>
<Image alt="logo" src="/logo.svg" width={100} height={100} />
    </Loading>
  )
}

export default LoadingPage