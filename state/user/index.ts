import { createSlice } from "@reduxjs/toolkit";
import { IMinWorkspace } from "../board";
import { RootState } from "../store";

export interface IUser {
  name?: string;
  email: string;
  _id: string;
  username?: string;
  image?: string;
  workspaces: IMinWorkspace[];
  created_workspaces?: IMinWorkspace[];
  types: string;
  theme: string;
}
const initialState: IUser = {
  name: "",
  email: "",
  _id: "",
  username: "",
  image: "",
  workspaces: [],
  types: "",
  theme: "dark",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddNewWorkspace: (state, { payload: { newWorkspace } }) => {
      state.workspaces = [...state.workspaces, newWorkspace];
    },
    setCurrentUser: (state, { payload: { user } }) => {
      state._id = user._id;
      state.image = user.image;
      state.username = user.username;
      state.email = user.email;
      state.workspaces = user.workspaces;
    },
    setTypes: (state, { payload: { type } }) => {
      state.types = type;
    },
    setThemeColor: (state, { payload: { theme } }) => {
      state.theme = theme;
    },
  },
});

export const { AddNewWorkspace, setCurrentUser, setThemeColor, setTypes } =
  userSlice.actions;

export default userSlice.reducer;
