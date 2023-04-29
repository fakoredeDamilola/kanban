import styled from "styled-components"

const Container = styled.div<{background:string}>`
margin-top:5px;
    color:${({background})=>background};
    font-size:12px;
`
const Test = styled.div<{background:string}>`
    width:160px;
    height:5px;
    background-color:${({background})=>background};
    border-radius:10px;
`
const PasswordIndicator = ({strength,colorbackground}:{strength?:string;colorbackground:string}) => {
   
    if(strength!=="empty"){
        return (
     <Container background={colorbackground}>
        <Test  background={colorbackground} />
        {strength}
    </Container>
  )
    }else{
        return null
    }
  
}

export default PasswordIndicator