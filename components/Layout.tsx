
import React from 'react'
import styled from 'styled-components'
import SideNav from './navs/SideNav'


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
`
const Layout = ({children}:{children:JSX.Element}) => {

  return (
      <NavWrapper>
           <SideNav />
            <div>
               {children}
            </div>
            
      
       
      </NavWrapper>
   

  )
}

export default Layout