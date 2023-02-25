import {createSlice} from "@reduxjs/toolkit"

interface displayState {
showSideNav: boolean;
taskView:string,
profileView:string,
theme:string,
openNewBoardModal:boolean
}

const initialState: displayState = {
showSideNav:true,
taskView: "column",
profileView:"column",
theme:"light",
openNewBoardModal:false,
}



const displaySlice = createSlice({
    name:"display",
    initialState,
    reducers:{
        toggleSideNav: (state,{payload:{sideNav}}) => {
            state.showSideNav = sideNav ?? !state.showSideNav
        },
        switchTaskView: (state,action) => {
            state.taskView = action.payload
        },
        switchProfileView: (state,action) => {
            state.profileView = action.payload
        },
        switchTheme: (state,{payload:{theme}}) =>{
            state.theme = theme
        },
        setNewBoardModal: (state,{payload:{open}}) =>{
            state.openNewBoardModal = open
        }
    }
})

export const {
    toggleSideNav,
    switchTheme,
    switchTaskView,
    setNewBoardModal,
    switchProfileView
} = displaySlice.actions

export default displaySlice.reducer