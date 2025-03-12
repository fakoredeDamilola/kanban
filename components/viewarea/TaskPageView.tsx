import React from "react";
import styled from "styled-components";
import { ITaskCards } from "../../state/board";
import NOTask from "../NOTask";
import TaskBar from "./TaskBar";
import ViewArea from "./ViewArea";

const FlexWrapper = styled.div<{
  view: string;
  margin?: string;
  type?: string;
}>`
  color: ${({ theme }) => theme.primary};
  /* background-color:${({ theme }) => theme.background}; */
  background-color: #21232e;
  overflow-x: scroll; /* enable horizontal scrolling */
  overflow-y: ${({ view }) => (view === "list" ? "auto" : "hidden")};
  display: ${({ view }) => (view === "list" ? "block" : "flex")};
  padding: ${({ view, margin }) =>
    view === "list" ? margin ?? "50px 0px" : margin ?? "0px 20px"};
  max-height: 100%;
  height: calc(100%-70px);
  /* margin-top:70px; */
  gap: 40px;
  margin-top: ${({ view, type }) =>
    view === "list" && type !== "profile"
      ? "20px"
      : view !== "list" && type !== "profile"
      ? "70px"
      : "0px"};
  flex: 1 1 auto;
`;

const Columns = styled.div<{ view: string }>`
  width: ${({ view }) => (view === "list" ? "100%" : "330px")};
  height: ${({ view }) => (view === "list" ? "auto" : "90%")};
  /* height:90%; */
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.body};
  display: flex;
  width: 100%;
  min-height: 100%;
  height: 100%;
`;

const TaskPageView = ({
  tasks,
  taskView,
  type,
  columns,
  newTask,
  openNewBoardModal,
  margin,
}: {
  tasks: ITaskCards[];
  newTask: any;
  taskView: string;
  columns: any[];
  openNewBoardModal: boolean;
  margin?: string;
  type?: string;
}) => {
  return (
    <Container>
      {tasks.length > 0 ? (
        <FlexWrapper type={type} view={taskView} margin={margin}>
          {columns.map((col, index) => {
            const task = tasks.filter(
              (item) =>
                item?.status?.name?.toLowerCase() === col.name.toLowerCase()
            );

            return (
              <Columns view={taskView} key={index}>
                <TaskBar
                  taskbar={{
                    name: col.name,
                    quantity: task.length,
                    img: col?.img,
                  }}
                  view={taskView}
                  newTask={newTask}
                />
                <ViewArea
                  openNewBoardModal={openNewBoardModal}
                  col={col}
                  task={task}
                />
              </Columns>
            );
          })}
        </FlexWrapper>
      ) : (
        <NOTask />
      )}
    </Container>
  );
};

export default TaskPageView;
