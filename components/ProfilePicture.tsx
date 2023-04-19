import React from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import styled from 'styled-components'
import { hslColor, randomColor } from '../utils/utilFunction'
import { Item } from './viewarea/IViewrea'

const ProfilePicture = ({assigned,tooltip,size}:{assigned:Item,tooltip:boolean,size?:string}) => {
console.log({assigned})
    const ProfilePictureStyle = styled.div<{color:string;tooltip:boolean;size?:string}>`

     position: relative;
  display: inline-block;
  & > span {
    visibility: hidden;
  width: 120px;
  background-color: #555;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  box-sizing:border-box;
  position: absolute;
  z-index: 1;
  display:flex;
            justify-content:center;
            align-items:center;
  font-size:12px;
  bottom: -35%;
  height:20px;
  z-index:99;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  transition: opacity 0.3s;
  }
  & >img {
    width:${({size}) => size ? size : "20px"};
    height:${({size}) => size ? size : "20px"};
    border-radius:50%;
    cursor:pointer;

  }
  & >span::after {
    content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  }
  &:hover > span {
    visibility: ${({tooltip}) => tooltip ? "visible" : "hidden"};
  opacity: 1;
  }
        & >div {
            width:${({size}) => size ? size : "20px"};
            height:${({size}) => size ? size : "20px"};
            font-size:${({size}) => size ? `calc(${size}/2)` : "8px"};
            color:${({theme,color}) => theme.text};
            display:flex;
            justify-content:center;
            align-items:center;
            border-radius:50%;
            box-sizing:border-box;
            background-color:${({theme,color}) => color};
            cursor:pointer;
        }
    `
  return (
  <ProfilePictureStyle color="#4c33bd" size={size} tooltip={tooltip}>
   
       {
        assigned?.img && assigned?.name!=="Assigned" 
        ? <img src={assigned.img} /> :
        assigned.name!=="Assigned"  ?
        <div>{assigned.name.split("")[0]}{assigned.name.split("")[assigned.name.length-1]}</div> :
        <FaRegUserCircle size="18px"/>
    } 
   <span>Assigned to {assigned.name ? `${assigned?.name.split("")[0]}${assigned?.name.split("")[assigned.name.length-1]}` : <div>A</div>}</span>
    
  </ProfilePictureStyle>
  )
}

export default React.memo(ProfilePicture)