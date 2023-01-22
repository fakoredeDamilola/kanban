import {createSlice} from "@reduxjs/toolkit"

interface displayState {
showSideNav: boolean;
taskView:string,
theme:string
}

const initialState: displayState = {
showSideNav:false,
taskView: "column",
theme:"light"
}



const displaySlice = createSlice({
    name:"display",
    initialState,
    reducers:{
        toggleSideNav: (state,{payload:{sideNav}}) => {
            state.showSideNav = sideNav ?? !state.showSideNav
        },
        switchTheme: (state,{payload:{theme}}) =>{
            state.theme = theme
        }
    }
})

export const {
    toggleSideNav,
    switchTheme
} = displaySlice.actions

export default displaySlice.reducer