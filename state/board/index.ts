import { createSlice } from "@reduxjs/toolkit";

export interface ITask {
  name:string;

}

export interface IBoard {
  name:string;
  columns: {
    name:string;
    tasks:ITask[]
  }[]
}


interface boardIntialState {
  currentBoard: string;
  boards: string[];
  boardsDetails:IBoard[]
}

const initialState: boardIntialState = {
    currentBoard: "Product Launch",
    boards: [
      "Product Launch",
    ],
    boardsDetails:[
      {
        name:"Product Launch",
        columns: [
          {
            name:"Todo",
            tasks: []
          }
        ]
      }
    ],
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    switchCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    addNewBoard: (state, {payload:{ newBoard }}) =>{
     state.boardsDetails.push(newBoard)
     
    }
  },
});

export const {
  switchCurrentBoard,
  addNewBoard
} = boardSlice.actions;

export default boardSlice.reducer;
