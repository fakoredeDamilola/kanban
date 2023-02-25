import React from 'react'
import styled from 'styled-components'

const Icon = styled.div<{width?:string;height?:string;}>`

  display:flex;
  align-items:center;
  justify-content:center;
  width:${({width})=>width || '20px'};
  height:${({height})=>height || '20px'};
  border-radius:6px;
  color:${({theme})=>theme.secondaryColor};
  &:hover{
    background-color:${({theme})=>theme.body};
    color:${({theme})=>theme.secondaryColor};
    cursor:pointer;
  }
`

const IconsWrapper = ({children,onClick,width,height}:{children:React.ReactNode,onClick:any,width?:string;height?:string;}) => {
  return (
    <Icon onClick={onClick} width={width} height={height}>{children}</Icon>
  )
}

export default IconsWrapper