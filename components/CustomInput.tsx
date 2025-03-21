import React from "react";
import styled from "styled-components";
import { useState, useRef } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { IconContext } from "react-icons";

const CustomTextareaStyles = styled.div<{
  disable?: boolean;
  fontSize: string;
  color: string;
  fontWeight: number;
  outline?: boolean;
}>`
  & > textarea {
    width: 100%;
    border: none;
    background: ${({ disable }) => (disable ? "red" : "transparent")};
    line-height: 1;
    width: 100%;
    padding: 6px;
    box-sizing: border-box;
    outline: none;
    resize: none;
    ::placeholder {
      color: ${({ color }) => color};
      font-size: ${({ fontSize }) => fontSize};
      font-weight: 600;
      opacity: 0.7;
    }
    color: ${({ color }) => color};
    font-size: ${({ fontSize }) => fontSize};
    &:focus {
      outline: ${({ outline }) => (outline ? "auto" : "none")};
      outline-width: 10px;
      outline-color: ${({ color }) => color};
    }
  }
`;
const Input = styled.div<{
  isError?: boolean;
  fontSize: string;
  color: string;
  fontWeight: number;
}>`
  position: relative;
  & > input {
    margin-top: 6px;
    border: ${({ isError }) =>
      isError ? "1px solid red" : "1px solid #666BE1"};
    width: 100%;
    height: 45px;
    box-sizing: border-box;
    padding: 0 10px;
    background: #151621;
    border-radius: 3px;
    outline: none;
    margin-top: 5px;
    line-height: 1;
    color: ${({ color }) => color};
    font-size: ${({ fontSize }) => fontSize};
    ::placeholder {
      color: ${({ color }) => color};
      font-size: 12px;
      opacity: 0.5;
      font-weight: 300;
    }
  }
`;
const PasswordIcon = styled.div<{}>`
  cursor: pointer;
  position: absolute;
  right: 10px;
  top: 18px;
`;
interface IInput {
  type?: string;
  placeholder: string;
  fontSize: string;
  color: string;
  maxLength?: number;
  fontWeight: number;
  textvalue: string;
  outline?: boolean;
  input: string;
  name: string;
  isError?: boolean;
  error?: string;
  setErrorTable?: React.Dispatch<React.SetStateAction<string[]>>;
  errors?: string[];
  disable?: boolean;
  changeInput: (value: string, name: string) => void;
}
const CustomInput = ({
  type,
  placeholder,
  fontSize,
  color,
  maxLength,
  fontWeight,
  textvalue,
  outline,
  input,
  isError,
  name,
  error,
  errors,
  setErrorTable,
  disable,
  changeInput,
}: IInput) => {
  console.log({ disable });

  const [showPassword, setShowPassword] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
    <>
      {input === "text" ? (
        <Input
          isError={isError}
          fontSize={fontSize}
          color={color}
          fontWeight={fontWeight}
        >
          <input
            type={type === "password" && showPassword ? "text" : type}
            value={textvalue}
            name={name}
            onChange={(event) =>
              changeInput(event.target.value, event.target.name)
            }
            placeholder={placeholder}
            disabled={disable ? true : false}
            onBlur={(e) => {
              if (errors?.includes("required") && e.target.value === "") {
                if (setErrorTable) {
                  setErrorTable((prev) =>
                    prev.includes(name) ? prev : [...prev, name]
                  );
                }
              }
              if (errors?.includes("length") && e.target.value.length < 5) {
                if (setErrorTable) {
                  setErrorTable((prev) =>
                    prev.includes(name) ? prev : [...prev, "length"]
                  );
                }
              }
              if (errors?.includes("password") && e.target.value.length < 8) {
                if (setErrorTable) {
                  setErrorTable((prev) =>
                    prev.includes(name) ? prev : [...prev, "passLength"]
                  );
                }
              }
            }}
          />
          {isError && (
            <div style={{ color: "red", fontSize: "12px" }}>
              {error ?? "This input is wrong"}
            </div>
          )}
          <IconContext.Provider
            value={{ color: color ?? "#1922a4", size: fontSize ?? "16px" }}
          >
            {type === "password" && (
              <PasswordIcon onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (
                  <BsEye size="20px" />
                ) : (
                  <BsEyeSlash size="20px" />
                )}
              </PasswordIcon>
            )}
          </IconContext.Provider>
        </Input>
      ) : input === "textarea" ? (
        <CustomTextareaStyles
          disable={disable}
          fontSize={fontSize}
          outline={outline}
          fontWeight={fontWeight}
          color={color}
        >
          <textarea
            placeholder={placeholder}
            value={textvalue}
            onChange={(event) =>
              changeInput(event.target.value, event.target.name)
            }
            // height={height}
            disabled={disable}
            ref={textAreaRef}
            // onChange={handleChange}
            maxLength={maxLength}
            rows={1}
          />
        </CustomTextareaStyles>
      ) : null}
    </>
  );
};

export default CustomInput;
