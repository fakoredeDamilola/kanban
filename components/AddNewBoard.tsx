import React, { useRef, useState } from "react";
import { AiOutlineClose, AiOutlinePaperClip } from "react-icons/ai";
import { BsArrowsAngleExpand } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { IMembers, IWorkspace, selectSubItems } from "../state/board";

import CustomInput from "./CustomInput";
import CustomModal from "./CustomModal";
import FooterMenu from "./Footer/FooterMenu";
import CustomButton from "./CustomButton";
import { handleFile } from "../utils/utilFunction";
import { Item } from "./viewarea/IViewrea";
import dynamic from "next/dynamic";
import { device } from "../config/theme";

// const MyEditor = dynamic(() => import('../components/Editor/MyEditor'), { ssr: false })

const Cover = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;
const Header = styled.header`
  /* position:absolute; */

  width: 100%;
`;
const Container = styled.div`
  display: flex;
  font-size: 12px;
  justify-content: space-between;
  & > div {
    display: flex;
  }
`;
const Workspace = styled.div`
  margin-right: 10px;
  font-weight: 500;
  background-color: ${({ theme }) => theme.body};
  color: #f5f5f5;
  padding: 5px 10px;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.border};
  & + div {
    font-weight: 500;
    color: ${({ theme }) => theme.secondaryColor};
    display: flex;
    align-items: center;
  }
`;
const Icon = styled.div`
  display: flex;
  gap: 10px;
  & > div {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 6px;
    color: ${({ theme }) => theme.secondaryColor};
    &:hover {
      background-color: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.secondaryColor};
      cursor: pointer;
    }
  }
`;
const ModalBody = styled.div`
  margin-bottom: 20px;
  height: 45%;
  margin: 0 auto;
  width: 95%;
`;
const Image = styled.div`
  cursor: pointer;
  position: relative;
  & span {
    position: absolute;
    top: -10px;
    right: -10%;
    background-color: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.secondaryColor};
    box-sizing: border-box;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    &:hover {
      background-color: ${({ theme }) => theme.body};
      color: ${({ theme }) => theme.secondaryColor};
      cursor: pointer;
    }
  }
`;
const ImageContainer = styled.div`
  display: flex;
  gap: 15px;
  padding: 10px 0;
`;
const IssueTitle = styled.div`
  margin: 0 auto;
  margin-top: 10px;
  width: 95%;
`;
const IssueDescription = styled.div`
  height: 90%;
  overflow-y: auto;
  margin-top: 10px;
`;
const ModalFooter = styled.div`
  position: absolute;
  top: 73%;
  width: 100%;
`;
const FooterLinks = styled.div`
  margin: 20px auto;
  width: 95%;
  display: flex;
  gap: 15px;
`;
const SectionModal = styled.section`
  width: 96%;

  box-shadow: rgba(0, 0, 0, 0.5) 0px 16px 70px;
  @media ${device.mobileM} {
    width: 70%;
  }
  padding: 1.3rem;
  min-height: 250px;
  position: fixed;
  /* top: 10%;
  left:15%; */
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 80%;
  max-height: 80%;
  box-sizing: border-box;
  /* overflow-y: auto; */
  background-color: ${({ theme }) => theme.nav};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 6px;
  z-index: 2;
`;

const Footer = styled.div`
  width: 95%;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.border};
  padding-top: 10px;
  & div:first-child {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: ${({ theme }) => theme.secondaryColor};
  }
`;
const ImageCLip = styled.div`
  & input {
    display: none;
  }
`;
const CustomTextareaStyles = styled.div<{
  fontSize: string;
  color: string;
  fontWeight: number;
  outline?: boolean;
}>`
  & > textarea {
    width: 100%;
    border: none;
    /* background:transparent; */
    line-height: 1;
    width: 100%;
    padding: 6px;
    box-sizing: border-box;
    /* outline:none; */
    resize: none;
    ::placeholder {
      color: ${({ color }) => color};
      font-size: ${({ fontSize }) => fontSize};
      font-weight: 600;
      opacity: 0.7;
    }
    /* color:${({ color }) => color}; */
    font-size: ${({ fontSize }) => fontSize};
    &:focus {
      outline: ${({ outline }) => (outline ? "auto" : "none")};
      outline-width: 10px;
      outline-color: ${({ color }) => color};
    }
  }
`;
interface IBoard {
  closeNewBoardModal: () => void;
  openNewBoardModal: boolean;
  createNewIssue: () => void;
  issueTitle: string;
  issueDescription: string;
  setIssueTitle: React.Dispatch<React.SetStateAction<string>>;
  setIssueDescription: React.Dispatch<React.SetStateAction<string>>;
  imgURLArray: string[];
  setImgURLArray: React.Dispatch<React.SetStateAction<string[]>>;
  currentWorkspace: {
    name: string;
    id: string;
  };
  workspaces: IWorkspace;
  user?: IMembers;
}

const AddNewBoard = ({
  closeNewBoardModal,
  openNewBoardModal,
  createNewIssue,
  issueTitle,
  issueDescription,
  setIssueTitle,
  setIssueDescription,
  imgURLArray,
  setImgURLArray,
  currentWorkspace,
  workspaces,
  user,
}: IBoard) => {
  const dispatch = useDispatch();
  const hiddenFileInput = useRef<any>();

  const handleClick = () => {
    hiddenFileInput.current.click();
  };

  const removeImage = (idx: number) => {
    setImgURLArray((prev) => prev.filter((item, index) => index !== idx));
  };

  const handleChange = (event: any, input: string) => {
    const fileUploaded = event.target.files[0];
    handleFiles(fileUploaded, input);
  };

  const handleFiles = async (event: any, input: string) => {
    try {
      const data = await handleFile(event, input);

      setImgURLArray((prev) => [...prev, data.secure_url]);
    } catch (e) {}
  };

  return (
    <>
      <CustomModal
        closeNewBoardModal={closeNewBoardModal}
        openNewBoardModal={openNewBoardModal}
      >
        <SectionModal>
          <Cover>
            <Header>
              <Container>
                <div>
                  <Workspace>{currentWorkspace.id}</Workspace>
                  <div>New Issue</div>
                </div>
                <Icon>
                  <div>
                    <BsArrowsAngleExpand />
                  </div>
                  <div onClick={() => closeNewBoardModal()}>
                    <AiOutlineClose />
                  </div>
                </Icon>
              </Container>
              <IssueTitle>
                <CustomTextareaStyles
                  color="white"
                  fontSize="22px"
                  fontWeight={700}
                >
                  <CustomInput
                    type="textarea"
                    input="textarea"
                    placeholder="Issue Title"
                    fontSize="22px"
                    changeInput={(value, name) => setIssueTitle(value)}
                    name="issueTitle"
                    textvalue={issueTitle}
                    color="white"
                    fontWeight={700}
                    maxLength={256}
                    // height={false}
                  />
                </CustomTextareaStyles>
              </IssueTitle>
            </Header>
            <ModalBody>
              <ImageContainer>
                {imgURLArray.length > 0 &&
                  imgURLArray.map((url, index) => (
                    <Image key={index}>
                      <img src={url} width="100px" />
                      <span onClick={() => removeImage(index)}>
                        <AiOutlineClose fontSize="13px" />
                      </span>
                    </Image>
                  ))}
              </ImageContainer>

              <IssueDescription>
                <CustomInput
                  changeInput={(value, name) => setIssueDescription(value)}
                  input="textarea"
                  placeholder="Issue description"
                  fontSize="18px"
                  textvalue={issueDescription}
                  fontWeight={300}
                  color="white"
                  name="description"
                />
              </IssueDescription>
            </ModalBody>
            <ModalFooter>
              <FooterLinks>
                {workspaces.subItems &&
                  workspaces.subItems.map((item, index) => {
                    return (
                      <FooterMenu
                        key={index}
                        item={
                          item.name === "Assigned"
                            ? {
                                ...item,
                                items: [...item.items, ...workspaces.members],
                              }
                            : item
                        }
                      />
                    );
                  })}
              </FooterLinks>

              <Footer>
                <ImageCLip>
                  <input
                    type="file"
                    ref={hiddenFileInput}
                    onChange={(e) => handleChange(e, "image")}
                    style={{ display: "none" }}
                  />
                  <AiOutlinePaperClip onClick={handleClick} />
                </ImageCLip>

                <div>
                  {/* <Checkbox width="9px" height="9px" name="subIssue"  toggleTheme={toggleSubIssues} theme={subIssues}/> */}
                  <CustomButton
                    background="button"
                    color="white"
                    hover="secondaryColor"
                    onClick={() => createNewIssue()}
                  >
                    Create Issue
                  </CustomButton>
                </div>
              </Footer>
            </ModalFooter>
          </Cover>
        </SectionModal>
      </CustomModal>
    </>
  );
};

export default React.memo(AddNewBoard);
