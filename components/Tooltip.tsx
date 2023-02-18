import React from "react";
import styled from "styled-components";

const ToolTipText = styled("span")({
  visibility: "hidden",
  width: "160px",
  backgroundColor: "#000",
  color: "#fff",
  textAlign: "center",
  borderRadius: "6px",
  padding: "5px 3px",
  position: "absolute",
  zIndex: 999,
  top: "130%",
  left: "50%",
  fontSize: "12px",
  marginLeft: "-60px",
  ":after": {
    content: '""',
    position: "absolute",
    top: "100%",
    left: "50%",
    marginLeft: "-5px",
  }
});

const ToolTip = styled("div")({
    cursor: "pointer",
  position: "relative",
  display: "inline-block",
  ":hover span": {
    visibility: "visible"
  }
});

const CustomTooltip = ({ children, toolTipText }:{children:React.ReactNode;toolTipText:string}) => (
  <ToolTip>
    {children}
    <ToolTipText>{toolTipText}</ToolTipText>
  </ToolTip>
);

export default CustomTooltip;
