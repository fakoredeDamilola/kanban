import React, { useMemo, useRef, useState } from 'react'
import { FaRegUserCircle } from 'react-icons/fa'
import styled from 'styled-components'
import { handleFile, hslColor, randomColor } from '../utils/utilFunction'
import { Item } from './viewarea/IViewrea'
import { BsPencil } from 'react-icons/bs'
import { useMutation } from '@apollo/client'
import { ADD_IMAGE_TO_MEMBER } from '../graphql/mutation'

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

`

const ImgImage = styled.div<{size?:string;color:string}>`
& >img {
width:${({size}) => size ? size : "20px"};
height:${({size}) => size ? size : "20px"};
border-radius:50%;
cursor:pointer;

}
`
const WordImage = styled.div<{size?:string;color:string}>`
position: relative;
display: inline-block;
         & >div:first-child {
       width:${({size}) => size ? size : "20px"};
       height:${({size}) => size ? size : "20px"};
       font-size:${({size}) => size ? `11px` : "8px"};
       color:${({theme,color}) => theme.text};
       display:flex;
       justify-content:center;
       align-items:center;
       border-radius:50%;
       box-sizing:border-box;
       background-color:${({theme,color}) => color};
       cursor:pointer;
       position: relative;
   }
`
const Edit = styled.div`
& input{
 display:none;
}
cursor: pointer;
 position:absolute;
 bottom:-8px;
 right:40%;
`


const ProfilePicture = ({assigned,tooltip,size,edit}:{assigned:Item,tooltip:boolean,size?:string;edit?:boolean}) => {


  const [imgArray,setImgArray] = useState("kkkkk")
  const [addImageToMember,{data,loading,error}] = useMutation(ADD_IMAGE_TO_MEMBER)

const hiddenFileInput = useRef<any>();

const handleClick = () => {
  hiddenFileInput.current.click();
};
const handleFiles = async (event:any,input:string) => {
  
  try {
    const data = await handleFile(event,input)
    setImgArray(data.secure_url)

    if(data.secure_url){
       addImageToMember({
      variables:{
        input:{
           imageURL:data.secure_url
        }
       
      }
    })
    }
   
  }catch(e){

  }
}


const handleChange = (event:any,input:string) => {
  const fileUploaded = event.target.files[0];
  handleFiles(fileUploaded,input);
};

  return (
  <ProfilePictureStyle color="#4c33bd" size={size} tooltip={tooltip}>
   
       {
        assigned?.img && assigned?.name!=="Assigned" 
        ? 
        <ImgImage  size={size} color="#4c33bd">
         <img src={assigned.img} />
             {edit &&    <Edit>

        <>
          <input
          type="file"
          ref={hiddenFileInput}
          onChange={(e) =>handleChange(e,"image")}
          style={{display: 'none'}} 
        />
        <BsPencil size="14px" onClick={handleClick} />
        </> 
       
        </Edit> }
        </ImgImage>
        :
        assigned?.name!=="Assigned"  ?
        <WordImage size={size} color="#4c33bd">
           <div>{assigned?.name?.split("")[0]}{assigned?.name.split("")[assigned?.name.length-1]}</div>
           <Edit>
           {edit && 
           <>
             <input
             type="file"
             ref={hiddenFileInput}
             onChange={(e) =>handleChange(e,"image")}
             style={{display: 'none'}} 
           />
           <BsPencil size="14px" onClick={handleClick} />
           </> 
           }
           </Edit>
          
        </WordImage>
        : 
        <FaRegUserCircle size="18px"/>
    } 
   <span>Assigned to {assigned?.name ? `${assigned?.name.split("")[0]}${assigned?.name.split("")[assigned?.name.length-1]}` : <div>A</div>}</span>
    
  </ProfilePictureStyle>
  )
}

export default React.memo(ProfilePicture)