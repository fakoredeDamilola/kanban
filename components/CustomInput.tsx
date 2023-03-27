import React from 'react'
import styled from 'styled-components'
import {useState,useRef} from 'react'
import useAutosizeTextArea from '../hooks/useAutosizeTextarea';


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
const Input = styled.div<{isError?:boolean;fontSize:string;color:string;fontWeight:number;}>`
& > input {
  margin-top:6px;
  border:${({isError})=>isError ? "1px solid red" : "1px solid #666BE1"};
width:100%;
    height:45px;
    box-sizing:border-box;
    padding:0 10px; 
    background:#151621;
    border-radius:3px;
    outline:none;
    margin-top:5px;
line-height:1;
    color:${({color})=>color};
    font-size:${({fontSize})=>fontSize};
::placeholder{
    color:${({color})=>color};
    font-size:${({fontSize})=>fontSize};
    font-weight:${({fontWeight})=>fontWeight};
}
}
  
`

interface IInput {
    type?: string;
    placeholder: string;
    fontSize: string;
    color: string;
    maxLength?:number;
    fontWeight:number;
    textvalue:string;
    setTextValue:React.Dispatch<React.SetStateAction<string>>
    outline?:boolean;
    input:string;
    name:string;
    isError?:boolean;
    error?:string
    setErrorTable?:React.Dispatch<React.SetStateAction<string[]>>
    errors?:string[],
    disable?:boolean,
    changeInput:(value:string,name:string) =>void

}
const CustomInput = ({
  type,
  placeholder,
  fontSize,color,maxLength,fontWeight,textvalue,setTextValue,outline,input,isError,name,error,errors,setErrorTable,disable,changeInput}:IInput) => {


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
  {
    input==="text" ?
    <Input isError={isError} fontSize={fontSize} color={color} fontWeight={fontWeight}>
              <input
            type={type}
            value={textvalue}
            
            name={name}
            onChange={(event)=>changeInput(event.target.value, event.target.name)}
            placeholder={placeholder}
            disabled = {disable ?true : false}
            onBlur={(e)=>{
              if(errors?.includes("required") && e.target.value === ""){
                console.log({name})
                if(setErrorTable){
                  setErrorTable(prev=>prev.includes(name) ? prev : [...prev,name])
                }
              }
              if(errors?.includes("length") && e.target.value.length < 5){
                console.log(e.target.value.length)
                if(setErrorTable){
                  setErrorTable(prev=>prev.includes(name) ? prev : [...prev,"length"])
                }
              }
              if(errors?.includes("password") && e.target.value.length <8){
               
                if(setErrorTable){
                  setErrorTable(prev=>prev.includes(name) ? prev : [...prev,"passLength"])
                }
              }
            }}
            />
            {isError && <div style={{color:"red",fontSize:"12px"}}>
{error ?? "This input is wrong"}
            </div> }
            </Input>
    :
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