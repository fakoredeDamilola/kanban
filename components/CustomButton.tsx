import React from 'react'
import styled from 'styled-components'
import { device } from '../config/theme';

const Button = styled.button<{background:string,colors:string,hover:string,disabled?:boolean;width?:string;mobileWidth?:string;margin?:string}>`
    background-color: ${({theme,background}) => theme[background]};
    color: ${({theme,colors}) => colors};
    border: 0;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 700;
    cursor: ${({disabled})=>disabled ? "not-allowed" : "pointer"};
    width: ${({width})=>width ? width : "100%"};
    margin:${({margin})=>margin ? margin : 0};
        transition:0.3s all; 
        &:hover{
    box-shadow: 10px -3px 52px 1px rgba(79,82,180,0.75);
  }

    @media ${device.mobileM} {
      width: ${({mobileWidth})=>mobileWidth ? mobileWidth : "100%"};
  }
    height:44px;

`
interface IButton {
    children:React.ReactNode;
    color:string;
    background:string;
    onClick:()=>void;
    style?:React.CSSProperties;
    hover:string;
    disabled?:boolean;
    width?:string;
    mobileWidth?:string;
    margin?:string
}
const CustomButton = ({children,color,background,onClick,style,hover,disabled,width,mobileWidth,margin}:IButton) => {
  return (
    <Button margin={margin} colors={color} background={background} hover={hover} width={width} mobileWidth={mobileWidth} onClick={onClick} disabled={disabled}>
        {children}
    </Button>
  )
}

export default CustomButton