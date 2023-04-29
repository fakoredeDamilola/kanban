import {createSlice} from "@reduxjs/toolkit"

export enum SIGNUPPAGESTATE {
    SIGN_UP_PAGE_INDEX = "SIGN_UP_PAGE_INDEX",
    SIGN_UP_VERIFY_EMAIL = "SIGN_UP_VERIFY_EMAIL",
    SIGN_UP_CREATE_WORKSPACE = "SIGN_UP_CREATE_WORKSPACE" 
  }
interface displayState {
showSideNav: boolean;
taskView:string,
profileView:string,
theme:string,
openNewBoardModal:boolean;
modal:boolean;
modalMessage:string;
modalType:string;
current_signup_page:SIGNUPPAGESTATE
}

const initialState: displayState = {
showSideNav:true,
taskView: "column",
profileView:"column",
theme:"light",
modal:false,
modalMessage:"",
modalType:"",
current_signup_page:SIGNUPPAGESTATE.SIGN_UP_PAGE_INDEX,
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
        },
        setCurrentSignupPage:(state,{payload:{current}}) =>{
            state.current_signup_page = current
        },
        setModalData:(state,{payload:{modal,modalType,modalMessage}})=>{
            state.modal = modal
            state.modalMessage = modalMessage
            state.modalType = modalType
        }
    }
})

export const {
    toggleSideNav,
    switchTheme,
    switchTaskView,
    setNewBoardModal,
    switchProfileView,
    setCurrentSignupPage,
    setModalData
} = displaySlice.actions

export default displaySlice.reducer