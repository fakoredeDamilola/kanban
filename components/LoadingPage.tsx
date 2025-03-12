import Image from "next/image";
import React from "react";
import styled, { keyframes } from "styled-components";
import { motion } from "framer-motion";

const CustomModalStyle = styled.div`
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: scroll;
  width: 100%;
  height: 100%;
  background: rgba(46, 47, 50, 0.812);
  backdrop-filter: blur(1px);
  /* z-index: 99; */
  position: fixed;
`;

const Wrapper = styled.div`
  z-index: 99;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: absolute;
  /* background-color: rgba(0, 0, 0, 0.2); */
  width: 100vw;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const BounceAnimation = keyframes`
  0% { 
    margin-bottom: 0; 
  }

  50% { 
    margin-bottom: 1rem;
  }

  100% { 
    margin-bottom: 0;
  }
`;
const LoadingWrapper = styled.div`
  h3 {
    color: white;
  }
  display: flex;
  align-items: flex-end;
  justify-content: center;
`;

const Dot = styled.div<{ delay: string }>`
  background-color: #635fc7;
  border-radius: 50%;
  width: 0.75rem;
  height: 0.75rem;
  margin: 0 0.25rem;
  /*Animation*/
  animation: ${BounceAnimation} 0.5s linear infinite;
  animation-delay: ${(props) => props.delay};
`;
const LoadingPage = () => {
  const menuVariants = {
    open: {
      opacity: 1,
      transition: {
        duration: 1,
      },
    },
    closed: {
      opacity: 0,
      transition: {
        duration: 1,
      },
    },
  };

  return (
    <Wrapper>
      <LoadingWrapper>
        <h3>Loading</h3>
        <Dot delay="0s" />
        <Dot delay="0.1s" />
        <Dot delay="0.2s" />
      </LoadingWrapper>
      <CustomModalStyle />
    </Wrapper>
  );
};

export default LoadingPage;
