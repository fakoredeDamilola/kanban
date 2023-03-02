import React from 'react'
import styled from 'styled-components'


const Indicators = styled.div`
width:100%;
  background-color: #000313;
  display:flex;
  justify-content:center;
  gap:30px;
  padding:20px 0;
`
const Indicator = styled.div<{selected:boolean}>`
    min-width:10px;
    min-height:10px;border-radius:50%;
    background-color:${({selected})=>selected ? "red": "#c4c4c4"};

`

const OnboardingIndicator = ({currentIndicator,indicator}:{
  currentIndicator:number,
  indicator:number
}) => {
  console.log({currentIndicator,indicator})
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