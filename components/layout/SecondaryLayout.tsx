import React, { useState,useEffect } from 'react'
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import ApiErrorModal from '../modal/ApiErrorModal';


const Container = styled.div`
   height:100%;
  min-height:100%;
  background-color: ${({theme}) => theme.background};
`
const SecondaryLayout = ({children}:{children:JSX.Element}) => {
  
const {modal} = useSelector((state:RootState)=>state.display)
  const [mountedComponent, setMountedComponent] = useState(false)
  // useEffect(() => {
  //     const localTheme = window.localStorage.getItem('theme');
  //     localTheme && setTheme(localTheme)
  //     setMountedComponent(true)
  // }, []);
  return (
    <Container>
        {children}
        {modal &&  <ApiErrorModal />}
    </Container>
  )
}

export default SecondaryLayout