import {createSlice} from "@reduxjs/toolkit"

interface userState {

}

const initialState: userState = {

}



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
    }
})

export const {
} = userSlice.actions

export default userSlice.reducer