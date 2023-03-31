import React from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { device } from '../config/theme'
import CustomButton from './CustomButton'
import CustomIcon from './CustomIcon'
import {setNewBoardModal} from "../state/display"

const NoTask = styled.div`
  color:${({theme}) => theme.primary};
  font-size:20px;
  font-weight:600;
  margin:0 auto;
  background: ${({theme}) => theme.modalBackground};
  /* allign div to center */
  width:90%; 
  padding:40px;
  position:absolute;
  top:50%;
  left:50%;
  transform: translate(-50%, -50%);
  h3{
    font-size:25px;
    margin-bottom:20px;
    color: ${({theme}) => theme.headingColor};
  }
  p{
    font-size:14px;
    margin: 20px 0;
    color:${({theme}) => theme.otherColor};
  }
  @media ${device.mobileS} {
  width:400px;
 }
`
const IconFlex = styled.div`
    display:flex;
    gap:5px;
    margin-bottom:20px;
`

const NOTask = () => {
    const dispatch= useDispatch()

    const openAddModal = () => {
        dispatch(setNewBoardModal({open:true}))
    }

  return (
    <NoTask>
        <IconFlex>
        {[{icon:"BiCircle",color:"#4C4F6B"},{icon:"FaDotCircle",color:"#B19442"},{icon:"AiFillCheckCircle",color:"white"}].map((item, index) => (
            <CustomIcon key={index} img={item.icon} color={item.color} fontSize="40px"  />
            ))

        }
        </IconFlex>
    <h3>All Issues</h3>
    <div>
      <p>All Issues in the place where you can see all of your team's work in one view</p>
      <p>Once you have created some issues for your team, they will show up here</p>
    </div>
    <CustomButton background="button" color="white" onClick={openAddModal} hover="border" width="30px">Create new task</CustomButton>
   </NoTask>
  )
}

export default NOTask