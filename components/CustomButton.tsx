import React from 'react'
import styled from 'styled-components'

const Button = styled.button<{background:string,colors:string,hover:string,disabled?:boolean}>`
    background-color: ${({theme,background}) => theme[background]};
    color: ${({theme,colors}) => theme[colors]};
    border: 0;
    border-radius: 20px;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: 700;
    cursor: ${({disabled})=>disabled ? "not-allowed" : "pointer"};
    &:hover {
        /* background-color: ${({theme,colors}) => theme[colors]}; */
        color: ${({theme,background,hover}) => theme[hover]};
        transition:0.3s;
    }
    width:100%;
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
}
const CustomButton = ({children,color,background,onClick,style,hover,disabled}:IButton) => {
  return (
    <Button colors={color} background={background} hover={hover} onClick={onClick} disabled={disabled}>
        {children}
    </Button>
  )
}

export default CustomButton