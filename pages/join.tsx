import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DashboardLayout from "../components/Dashboardlayout";
import CreateWorkspace from "../components/signup/CreateWorkspace";
import { IWorkspace } from "../state/board";
import { AddNewWorkspace, setTypes } from "../state/user";
import { RootState } from "../state/store";
import { subItems } from "../utils/utilData";
import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { CREATE_NEW_WORKSPACE } from "../graphql/mutation";
import { setCurrentSignupPage, setModalData } from "../state/display";
import LoadingPage from "../components/LoadingPage";
import { storeDataInLocalStorage } from "../utils/localStorage";

const NavWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  box-sizing: border-box;
  align-items: center;
  /* height:100%; */
  min-height: 100%;
  background-color: ${({ theme }) => theme.background};
  min-width: 100%;
  padding-top: 10px;
  padding-bottom: 20px;
`;
const join = () => {
  const [workspaceName, setWorkspaceName] = useState("");
  const [workspaceURL, setWorkspaceURL] = useState("");
  const { user } = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const router = useRouter();
  const [errorTableWorkspace, setErrorTableWorkspace] = useState([]);
  const [disableWorkspaceBtn, setDisableWorkspaceBtn] = useState(false);

  const [createWorkspace, { loading }] = useMutation(CREATE_NEW_WORKSPACE, {
    variables: {
      input: {
        workspaceName: workspaceName,
        workspaceURL: workspaceURL,
        subItems: subItems,
      },
    },
    onCompleted: (data) => {
      const workspace = data.createNewWorkspace.workspace;
      dispatch(AddNewWorkspace({ newWorkspace: workspace }));

      router.push(`/${workspace.URL}`);
    },
    onError: (err) => {
      dispatch(
        setModalData({
          modalType: "error",
          modalMessage: "no auth found,sign up again",
          modal: true,
        })
      );
    },
  });

  const createNewWorkspace = async () => {
    await createWorkspace();
  };
  const logOut = () => {
    dispatch(setTypes({ type: "" }));
    storeDataInLocalStorage("kanbanToken", "");
    router.push(`/signin`);
  };
  return (
    <NavWrapper>
      {!loading ? (
        <CreateWorkspace
          errorTableWorkspace={errorTableWorkspace}
          setErrorTableWorkspace={setErrorTableWorkspace}
          disableWorkspaceBtn={disableWorkspaceBtn}
          setDisableWorkspaceBtn={setDisableWorkspaceBtn}
          email={user.email}
          logOut={logOut}
          createNewWorkspace={createNewWorkspace}
          workspaceName={workspaceName}
          setWorkspaceName={setWorkspaceName}
          workspaceURL={workspaceURL}
          setWorkspaceURL={setWorkspaceURL}
        />
      ) : (
        <LoadingPage />
      )}
    </NavWrapper>
  );
};

export default join;
