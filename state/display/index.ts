import {createSlice} from "@reduxjs/toolkit"

interface displayState {
showSideNav: boolean;
taskView:string
}

const initialState: displayState = {
showSideNav:false,
taskView: "column"
}



const displaySlice = createSlice({
    name:"display",
    initialState,
    reducers:{
        toggleSideNav: (state,{payload:{sideNav}}) => {
            state.showSideNav = sideNav ?? !state.showSideNav
        }
    }
})

export const {
    toggleSideNav
} = displaySlice.actions

export default displaySlice.reducer