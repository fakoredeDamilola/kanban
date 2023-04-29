import Image from 'next/image';
import React from 'react'
import styled from 'styled-components'

const Picture = styled.div<{color?:string;size?:string}>`
    width:${({size})=>size ??"60px"};
   height:${({size})=>size ??"60px"};
   border-radius:50%;
   background:${({color})=> color ?? "red"};
   font-size:24px;
   display:flex;
   justify-content:center;
   align-items:center;
   color:white;
`

const PictureLogo = ({type,src,color,size}:{type:string,src:string,size?:string,color?:string}) => {
  return (
    <Picture color={color} size={size}>
        {type==="img" ? <Image alt={src} src={src} width={80} height={80} />:
        src
        }
    </Picture>
  )
}

export default PictureLogo