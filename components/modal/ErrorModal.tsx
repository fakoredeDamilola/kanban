import React from 'react'
import styled from 'styled-components'
import CustomButton from '../CustomButton'

const CustomModal = styled.div`
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  width:100%;
  height:100%;
  backdrop-filter:blur(1px);
  z-index:99;
  & > div {
    width:40%;
  padding:30px 40px;
  box-sizing:border-box;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    height:160px;
    color:#fff;
    
  background-color: ${({theme}) => theme.nav};
  border: 1px solid ${({theme}) => theme.border};
  border-radius: 6px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);

  }

`
const ButtonCover = styled.div`
  display:flex;
  margin-top:20px;
  gap:20px;
  justify-content:flex-end;
`
const Button = styled.button<{background:string,color:string,hover:string,disabled?:boolean;width?:string}>`
    background-color: ${({theme,background}) => theme[background]};
    color: ${({theme,color}) => theme[color]};
    border: 0;
    border-radius: 6px;
    /* padding: 10px 20px; */
    box-sizing:border-box;
    font-size: 14px;
    font-weight: 700;
    cursor: ${({disabled})=>disabled ? "not-allowed" : "pointer"};
    &:hover {
        color: ${({theme,background,hover}) => theme[hover]};
        transition:0.3s;
    }
    width: ${({width})=>width ? width : "100%"};
    height:40px;
`
const CustomText = styled.div`
margin-bottom:15px;
 h4 {
  font-size:18px;
 }
 p {
  font-size:14px;
  margin-top:10px;
 }
`
const ErrorModal = ({openErrorModal,closeErrorModal}:{openErrorModal:boolean,closeErrorModal:(text:string) => void}) => {


  return (
       <CustomModal>
          <div>
            <CustomText>
                       <h4>Discard Issue</h4>
            <p>Are you sure you want to discard issue</p>
            </CustomText>
   
            <ButtonCover>
             

            <Button disabled={false} width="100px" background='color1' color="white" hover="secondaryColor" onClick={() =>closeErrorModal("cancel")}>
        Cancel
    </Button>
            <Button disabled={false} width="100px" background='button' color="white" hover="secondaryColor" onClick={() =>closeErrorModal("Discard")}>
        Discard
    </Button>
            </ButtonCover>
           
          </div>
       </CustomModal>
  )
}

export default ErrorModal