import Image from 'next/image'
import React from 'react'
import styled from 'styled-components'

const Picture = styled.div`
width:100%;
padding:50px 0;
display:flex;
justify-content:center;
align-items:center;
flex-direction:column;

& >div{
  font-size:20px;
  margin-top:20px;
  color:white;
}    
`
const Container = styled.div`
  margin-top:40px;
`

const CenteredLogo = ({size,text}:{size?:number;text?:string}) => {
  return (
    <Container>
              <Picture>
        <Image alt="logo" src="/logo.svg" width={size ?? 100} height={size ?? 100} />
        {text && <div>{text}</div>}
        </Picture>
    </Container>

  )
}

export default CenteredLogo