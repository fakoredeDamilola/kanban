import styled from "styled-components";
import CustomTooltip from "../Tooltip";

  
  const LinkStyle = styled.div`
    text-decoration:underline;
  `
  const copyText = (text:string) => {
    navigator.clipboard.writeText(text)
  }
  
  export const NotifyComponent = ({title,text,link,}:{title:string;text:string;link?:string}) => (
    <div>
      <h4>{title}</h4>
      <p style={{margin:"10px 0",fontSize:"12px"}}>{text}</p>
      {link &&
        <CustomTooltip toolTipText="copy workspace invite link">
          <p style={{margin:"10px 0",fontSize:"12px"}} onClick={()=>{
            copyText(`${link}`)
          }}>{link.slice(0,8)}...</p>
        </CustomTooltip>
      // <LinkStyle>{link}</LinkStyle> 
      }
    
    </div>
  )
