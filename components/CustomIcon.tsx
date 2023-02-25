import React from 'react'
import { BiCircle, BiDotsHorizontalRounded } from 'react-icons/bi'
import { BsBarChart, BsCalendar2, BsFillBarChartFill } from 'react-icons/bs'
import {GrStatusInfo} from 'react-icons/gr'
import { FiBarChart } from "react-icons/fi"
import { FaDotCircle, FaRegUserCircle } from 'react-icons/fa'
import {TbCircleDotted} from "react-icons/tb"
import { MdLabel, MdOutlineCancel } from 'react-icons/md'
import { AiOutlineCheckCircle } from 'react-icons/ai'

const CustomIcon = ({img,fontSize,type}:{img?:string,fontSize?:string,type?:string}) => {
  return (
    <>
    {type ==="color" ? 
       <div style={{width:"8px",height:"8px",borderRadius:"50%", background:img}} /> :
    
    img ==="BiDotsHorizontalRounded" ? <BiDotsHorizontalRounded size={fontSize ?? "20px"} /> :
     img === "GrStatusInfo" ? <GrStatusInfo size={fontSize ?? "20px"} color="white" /> :
     img === "BsFillBarChartFill" ? <BsFillBarChartFill size={fontSize ?? "20px"} /> :
     img === "BsBarChart" ? <BsBarChart size={fontSize ?? "20px"} /> :
     img === "FiBarChart" ? <FiBarChart size={fontSize ?? "20px"} /> :
     img === 'FaRegUserCircle' ? <FaRegUserCircle size={fontSize ?? "20px"}/> :
        img === 'MdLabel' ? <MdLabel size={fontSize ?? "20px"}/> : 
        img==="BsFillBarChartFill" ? <BsFillBarChartFill size={fontSize ?? "20px"}/> : 
        img==="FaDotCircle" ? <FaDotCircle  size={fontSize ?? "20px"} />:
        img === "BiCircle" ? <BiCircle size={fontSize ?? "20px"}/> :
        img === "TbCircleDotted" ? <TbCircleDotted size={fontSize ?? "20px"}/> :
        img === "AiOutlineCheckCircle" ? <AiOutlineCheckCircle size={fontSize ?? "20px"}/> :
        img === "MdOutlineCancel" ? <MdOutlineCancel size={fontSize ?? "20px"}/> :
        img === "BsCalendar2" ? <BsCalendar2 size={fontSize ?? "20px"}/> :
    
       
        
     null


    }
    </>
  )
}

export default CustomIcon