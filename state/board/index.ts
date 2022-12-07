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
  showSideNav: boolean;
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
    showSideNav:true
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    switchCurrentBoard: (state, action) => {
      state.currentBoard = action.payload;
    },
    setShowSideNav: (state, action) => {
      state.showSideNav = action.payload;
    },
    addNewBoard: (state, {payload:{ newBoard }}) =>{
     state.boardsDetails.push(newBoard)
     
    }
  },
});

export const {
  switchCurrentBoard,
  setShowSideNav,
  addNewBoard
} = boardSlice.actions;

export default boardSlice.reducer;
