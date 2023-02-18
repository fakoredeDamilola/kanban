import React from 'react'
import styled from 'styled-components'

const Button = styled.button<{background:string,colors:string,hover:string,disabled?:boolean;width?:string}>`
    background-color: ${({theme,background}) => theme[background]};
    color: ${({theme,colors}) => theme[colors]};
    border: 0;
    border-radius: 6px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 700;
    cursor: ${({disabled})=>disabled ? "not-allowed" : "pointer"};
    &:hover {
        /* background-color: ${({theme,colors}) => theme[colors]}; */
        color: ${({theme,background,hover}) => theme[hover]};
        transition:0.3s;
    }
    width: ${({width})=>width ? width : "100%"};
    height:40px;

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
}
const CustomButton = ({children,color,background,onClick,style,hover,disabled,width}:IButton) => {
  return (
    <Button colors={color} background={background} hover={hover} width={width} onClick={onClick} disabled={disabled}>
        {children}
    </Button>
  )
}

export default CustomButton