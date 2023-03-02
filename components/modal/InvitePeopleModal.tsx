import React from 'react'
import styled from 'styled-components'
import CustomModal from '../CustomModal'
import {useState} from 'react'
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineClose } from 'react-icons/ai';

const MainBox = styled.div`
  color:white;
  padding:10px 0;
  width:100%;
  margin:0 auto;
 border-radius:4px;
    box-sizing:border-box;
 margin-top:20px;


`
const TextArea = styled.div`
width:90%;
margin:0 auto;
font-size:13px;
& > textarea {
    margin-top:5px;
    width:100%;
    height:80px; 
    color: #c4c4c4;
    background:#151621;
    padding:10px;
    border:1px solid rgb(57, 58, 75);
    border-radius:4px;
    resize: none; 
    box-sizing:border-box;
}

`
const InviteBtn = styled.div`
  text-align:right;
  padding:20px 0;
  width:90%;
  margin:0 auto;
  & button {
    width:120px;
    border:0;
    color:white;
    border-radius:4px;
    background-color:#666BE1;
    height:40px;
    cursor:pointer;
  }
`
const InviteWrapper = styled.div`
      display:flex;
    flex-direction:column;
    /* gap:20px; */
    width: 50%;
  padding: 0;
  /* min-height: 250px; */
  position: fixed;
  top:50%;
    left:50%;
    transform:translate(-50%,-50%);
  /* height:90%; */
  background:#1D1E2B;
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 12px;
  z-index: 2;
  box-sizing:border-box;
`
const CustomHeader = styled.div`
    padding:20px;
    border-bottom:1px solid ${({theme}) => theme.border};
    display:flex;
    color:white;
    justify-content:space-between;
    box-sizing:border-box;
    
`
const InvitePeopleModal = ({openInvitePeople,closeInvitePeople,saveInvitePeople}:{openInvitePeople:boolean,closeInvitePeople:() => void,saveInvitePeople:(e:any,date:any) => void}) => {
   
  return (
       <CustomModal  closeNewBoardModal={closeInvitePeople} openNewBoardModal={openInvitePeople}>
        <InviteWrapper>
            <CustomHeader>
                <div>Invite people</div>
                <AiOutlineClose cursor="pointer" onClick={closeInvitePeople} />
            </CustomHeader>
             <MainBox>
  <TextArea>
    Email
    <textarea
    placeholder='email@example.com, email2@example.com...'
    />
  </TextArea>
 <InviteBtn>
 <button onClick ={()=>{}}>
Send Invite
</button>
 </InviteBtn>
 </MainBox> 
        </InviteWrapper>
               
        </CustomModal>
  )
}

export default InvitePeopleModal