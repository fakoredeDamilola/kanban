import React from 'react'
import { BiCircle, BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsBarChart, BsCalendar2, BsFillBarChartFill } from 'react-icons/bs'
import {GrStatusInfo} from 'react-icons/gr'
import { FiBarChart } from "react-icons/fi"
import { FaDotCircle, FaRegUserCircle } from 'react-icons/fa'
import {TbCircleDotted} from "react-icons/tb"
import { MdLabel, MdOutlineCancel } from 'react-icons/md'
import { AiFillCheckCircle } from 'react-icons/ai'
import { IconContext } from 'react-icons'

const CustomIcon = ({img,fontSize,type,color}:{img?:string,fontSize?:string,type?:string,color?:string}) => {
  console.log({img,type})
  return (
    <IconContext.Provider
      value={{ color: color ?? '#D2D3E0', size: fontSize ?? "16px" }}
    >
 {type ==="color" ? 
       <div style={{width:"8px",height:"8px",borderRadius:"50%", background:img}} /> :
    
    img ==="BiDotsHorizontalRounded" ? <BiDotsHorizontalRounded /> :
     img === "GrStatusInfo" ? <GrStatusInfo color="white" /> :
     img === "BsFillBarChartFill" ? <BsFillBarChartFill /> :
     img === "BsBarChart" ? <BsBarChart /> :
     img === "FiBarChart" ? <FiBarChart /> :
     img === 'FaRegUserCircle' ? <FaRegUserCircle/> :
        img === 'MdLabel' ? <MdLabel/> : 
        img==="BsFillBarChartFill" ? <BsFillBarChartFill/> : 
        img==="FaDotCircle" ? <FaDotCircle  />:
        img === "BiCircle" ? <BiCircle/> :
        img === "TbCircleDotted" ? <TbCircleDotted/> :
        img === "AiFillCheckCircle" || img==="AiOutlineCheckCircle" ? <AiFillCheckCircle /> :
        img === "MdOutlineCancel" ? <MdOutlineCancel/> :
        img === "BsCalendar2" ? <BsCalendar2/> :
    
       
        
     null


    }

    </IconContext.Provider>
   
  )
}

export default CustomIcon