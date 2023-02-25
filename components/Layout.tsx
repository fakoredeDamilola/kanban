
import React,{useState,useEffect} from 'react'
import styled, { ThemeProvider } from 'styled-components'
import SideNav from './navs/SideNav'

import Toggle from '../components/Toggle';
import { switchTheme } from '../state/display';
import { darkTheme,GlobalStyles,lightTheme } from '../config/theme';


const NavWrapper = styled.div`
   display: flex;
  flex-wrap: nowrap;
  box-sizing:border-box;
  height:100%;
  max-height:100%;
  background-color: aqua;
  max-width:100%;
  &>div:last-child{
  width: 100%;
  min-height:100%;
  overflow-x: scroll;

  }
  & >div{
    height:100%;
  }
`
const Layout = ({children}:{children:JSX.Element}) => {
  const [theme, setTheme] = useState<string>('light');
  const setMode =( mode:string) => {
    window.localStorage.setItem('theme', mode)
    setTheme(mode)
};

const themeToggler = (e:any) => {
  // et.stopPropagation()
    theme === 'light' ? setMode('dark') : setMode('light')
};

const [mountedComponent, setMountedComponent] = useState(false)
useEffect(() => {
    const localTheme = window.localStorage.getItem('theme');
    console.log({localTheme})
    localTheme && setTheme(localTheme)
    setMountedComponent(true)
}, []);






if(!mountedComponent) return <div/>
  return (
    
    <ThemeProvider theme={theme == 'light' ? lightTheme : darkTheme} >
      <NavWrapper>
           <SideNav />
            <div>
               {children}
            </div>
            
      
       
      </NavWrapper>
    <Toggle toggleTheme={themeToggler}  theme={theme} />
    </ThemeProvider>

  )
}

export default Layout