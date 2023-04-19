import React from 'react'
import styled from 'styled-components'


const Indicators = styled.div`
width:100%;
background-color: #191A23;
  display:flex;
  justify-content:center;
  align-items:end;
  margin-top:10px;
  gap:30px;
  padding:10px 0;
`
const Indicator = styled.div<{selected:boolean}>`
    min-width:10px;
    min-height:10px;border-radius:50%;
    background-color:${({selected})=>selected ? "#4658B4": "#c4c4c4"};

`

const OnboardingIndicator = ({currentIndicator,indicator}:{
  currentIndicator:number,
  indicator:number
}) => {
  return (
    <Indicators>
     
      {new Array(indicator).fill("a").map((item,index)=> {
        return (
          <Indicator selected= {currentIndicator===index? true : false } key={index}/>
        )
      })

      }
    </Indicators>
  )
}

export default OnboardingIndicator