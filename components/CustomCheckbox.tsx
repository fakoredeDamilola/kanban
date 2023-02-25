import React from 'react';
import styled from 'styled-components';

const CheckboxContainer = styled.div`
  display: inline-block;
  vertical-align: middle;
  & > input {
    padding: 0;
  height: initial;
  width: initial;
  margin-bottom: 0;
  display: none;
  cursor: pointer;
  }

  & > label {
    position: relative;
  cursor: pointer;
  }

  & > label:before{
    content:'';
  -webkit-appearance: none;
  background-color: transparent;
  border: 1px solid ${({theme}) => theme.border};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05), inset 0px -15px 10px -12px rgba(0, 0, 0, 0.05);
  width:15px;
  height:15px;
  box-sizing:border-box;
  display: inline-block;
  position: relative;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 5px;
  }

  & input:checked + label:before { 
  background:${({theme}) => theme.color1};
  }
  & input:checked + label:after {
  content: '';
  display: block;
  position: absolute;
  top: 1px;
  left: 5px;
  width: 3px;
  height: 8px;
  border: solid ${({theme}) => theme.white};
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
  }
`;



const Checkbox = ({ className, checked,name, ...props }:{className?:any,checked:boolean,name:string}) => (
  <CheckboxContainer className={className}>
    <input type="checkbox" id={name} />
    <label htmlFor={name}></label>
  </CheckboxContainer>
);

export default Checkbox;