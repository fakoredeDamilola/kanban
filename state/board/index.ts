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
    addNewBoard: (state, {payload:{ newBoard }}) =>{
     state.boardsDetails.push(newBoard)
     
    }
  },
});

export const {
  addNewBoard
} = boardSlice.actions;

export default boardSlice.reducer;
