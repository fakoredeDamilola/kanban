import React, { useState,useEffect } from 'react'
import { RootState } from '../../state/store';
import { useSelector } from 'react-redux';
import styled from 'styled-components';


const Container = styled.div`
   height:100%;
  min-height:100%;
  background-color: ${({theme}) => theme.background};
`
const SecondaryLayout = ({children}:{children:JSX.Element}) => {
    const [themes, setTheme] = useState<string>('light');
    const {theme} = useSelector((state:RootState)=>state.display)
    const setMode =( mode:string) => {
      window.localStorage.setItem('theme', mode)
      setTheme(mode)
  };
  const [mountedComponent, setMountedComponent] = useState(false)
  useEffect(() => {
      const localTheme = window.localStorage.getItem('theme');
      localTheme && setTheme(localTheme)
      setMountedComponent(true)
  }, []);
  return (
    <Container>
        {children}
    </Container>
  )
}

export default SecondaryLayout