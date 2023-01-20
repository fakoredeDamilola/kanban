
import React from 'react'
import styled from 'styled-components'
import HideSideNav from './HideSideNav'

import Navbar from './navs/Navbar'
import SideNav from './navs/SideNav'


const NavWrapper = styled.div`
   display: flex;
  flex-wrap: nowrap;
  box-sizing:border-box;
  height:100%;
  max-height:100%;
  background-color: aqua;
`
const Layout = ({children}:{children:JSX.Element}) => {

  return (
      <NavWrapper>
           <SideNav />
          
              <Navbar />
             {children}
      
       
      </NavWrapper>
   

  )
}

export default Layout