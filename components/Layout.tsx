
import React from 'react'
import styled from 'styled-components'
import HideSideNav from './HideSideNav'

import Navbar from './navs/Navbar'
import SideNav from './navs/SideNav'


const NavWrapper = styled.div`
  display:flex;
  position:relative;
  /* gap:40px; */
  
`

const Layout = ({children}:{children:JSX.Element}) => {
 
  return (
    <div>
      <NavWrapper>
           <SideNav />
        {children}
        <Navbar/>
      </NavWrapper>
   
<HideSideNav />
    </div>
  )
}

export default Layout