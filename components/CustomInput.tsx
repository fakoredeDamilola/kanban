import React from 'react'
import styled from 'styled-components'
import {useState,useRef} from 'react'
import useAutosizeTextArea from '../hooks/useAutosizeTextarea';

const CustomInputStyles = styled.input<{fontSize:string;color:string;fontWeight:number;}>`
width:100%;
border:none;
background:transparent;
line-height:1;
outline:none;
::placeholder{
    color:${({color})=>color};
    font-size:${({fontSize})=>fontSize};
    font-weight:${({fontWeight})=>fontWeight};
}
    color:${({color})=>color};
    font-size:${({fontSize})=>fontSize};
`
const CustomTextareaStyles = styled.textarea<{fontSize:string;color:string;fontWeight:number;outline?:boolean}>`
width:100%;
border:none;
background:transparent;
line-height:1;
width:100%;
padding:6px;
box-sizing:border-box;
outline:none;
resize: none; 
::placeholder{
    color:${({color})=>color};
    font-size:${({fontSize})=>fontSize};
    font-weight:${({fontWeight})=>fontWeight};
opacity:0.7;
}
    color:${({color})=>color};
    font-size:${({fontSize})=>fontSize};
    &:focus{
        outline:${({outline})=>outline ? "auto" : "none"};
        outline-width:10px;
        outline-color:${({color})=>color};

    }
`

interface IInput {
    type: string;
    placeholder: string;
    fontSize: string;
    color: string;
    maxLength?:number;
    fontWeight:number;
    height:boolean;
    textvalue:string;
    setTextValue:React.Dispatch<React.SetStateAction<string>>
    outline?:boolean;

}
const CustomInput = ({type,placeholder,fontSize,color,maxLength,fontWeight,height,textvalue,setTextValue,outline}:IInput) => {


  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = evt.target?.value;

    setValue(val);
    setTextValue(val)
  };
  const [value, setValue] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
//   const textAreaRef1 = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);
//   useAutosizeTextArea(null, value);


  return (
  <>
  {type==="input" ? 
  
    <CustomInputStyles
        type="text"
        placeholder={placeholder}
        fontSize={fontSize}
        color={color}
        fontWeight={fontWeight}
    /> : 
    <CustomTextareaStyles
        placeholder={placeholder}
        fontSize={fontSize}
        value={textvalue}
        // height={height}
        outline={outline}
        fontWeight={fontWeight}
        color={color}
        ref={textAreaRef}
        onChange={handleChange}
        maxLength={maxLength}
        rows={1}
    />
    
   

}
  </>
  )
}

export default CustomInput