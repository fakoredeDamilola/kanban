
import React,{useState,useEffect} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import SideNav from './navs/SideNav'

import Toggle from '../components/Toggle';
import { darkTheme,lightTheme } from '../config/theme';
import { useSelector } from 'react-redux';
import { RootState } from '../state/store';
import { useRouter } from 'next/router';
import NoAuth from './NoAuth';

const Container = styled.div`
   height:100%;
  min-height:100%;
  background-color: ${({theme}) => theme.background};
`
const NavWrapper = styled.div`
   display: flex;
  flex-wrap: nowrap;
  box-sizing:border-box;
  height:100%;
  min-height:100%;
  background-color: ${({theme}) => theme.background};
  max-width:100%;
  &>div:last-child{
  width: 100%;
  min-height:100%;
  overflow-x: hidden;
  height:100%;

  }
  & >div{
    height:100%;
  }
`
const Layout = ({children}:{children:JSX.Element}) => {
  const [themes, setTheme] = useState<string>('light');
  const {theme} = useSelector((state:RootState)=>state.display)
  const router = useRouter()
  const setMode =( mode:string) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
};
const [mountedComponent, setMountedComponent] = useState(false)


const [token,setToken] = useState<string | null>("")
useEffect(()=>{
  const tokens = window.localStorage.getItem("kanbanToken")
  setToken(tokens)
  if(!tokens){
    router.push("/signup")
  }
},[token])


const themeToggler = (e:any) => {
  // et.stopPropagation()
    themes === 'light' ? setMode('dark') : setMode('light')
};


  return (
    
    <>
      {token ? 
      <Container>
        
      <NavWrapper>
           <SideNav />
            <div>
               {children}
            </div>
            
      
       
      </NavWrapper> 
      <Toggle toggleTheme={themeToggler}  theme={theme} />
      </Container>
      :
      <NoAuth />
      }
      
   
    </>

  )
}

export default Layout