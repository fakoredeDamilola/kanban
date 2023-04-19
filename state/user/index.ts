import {createSlice} from "@reduxjs/toolkit"
import { IMinWorkspace } from "../board";

export interface IUser {
    name?:string;
    email:string;
    _id:string;
    username?:string;
    image?:string;
    workspaces: IMinWorkspace[]
    created_workspaces?: IMinWorkspace[]
  }
const initialState: IUser = {

        name:"",
        email:"",
        _id:"",
        username:"",
        image:"",
        workspaces: []
    
}



const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        AddNewWorkspace:(state,{payload:{newWorkspace}}) =>{
            state.workspaces = [...state.workspaces, newWorkspace]
          },
          setCurrentUser:(state,{payload:{user}})=> {
            state._id = user._id
            state.username = user.username
            state.email=user.email
            state.workspaces = user.workspaces
          }
      
    }
})

export const {
    AddNewWorkspace,
    setCurrentUser
} = userSlice.actions

export default userSlice.reducer