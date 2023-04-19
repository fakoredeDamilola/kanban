import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../components/viewarea/IViewrea";
import { subItems } from "../../utils/utilData";



export interface IBoard {
  workspace:string;
  workspaceID:string;  
  workspaceURL:string;  
    tasks: ITaskCards[]
 
}

export interface IActivity {
    nameOfActivity:string;
    id:string;
    createdby:Item;
    time:string | number;
    description:string,
    icon?:string,
    name?:string,
    color?:string,
}

// export interface IAssigned 
export interface ITaskCards {
  
      _id:string;
      assignee:string;
      assigned:Item;
      workspaceID:string;
      workspaceURL:string;
  issueTitle:string;
  issueDescription?:string;
  dueDate?:string;
    status:Item;
    label:Item;
    others:Item;
    priority:Item;
    createdby:Item;
    createdBy?:Item;
   time:string;
  imgURLArray:string[];
  activities?: IActivity[]
}

export interface subItem {
  name:string;
  icon:any;
  tooltip:boolean;
  text:string;
  selected:Item;
  items :Item[]
}
export interface IMembers {
  name:string;
  email:string;
  id:string;
  img:string;
  color?:string
  joined:string;
  username:string;
  taskIDs:any[]
}

export interface IWorkspace {
  name:string;
  id:string;
  _id?:string;
  URL:string;
  taskID:ITaskCards[];
  totalTasks:number;
  subItems: subItem[];
  totalMembers:number;
  owner:Item;
  members:IMembers[]
}
export interface IMinWorkspace{
  name:string;
  id:string;
  _id:string;
  URL:string;
  owner?:Item;
}


// export interface IWorkspaces  { 
//   name:string;
//   id:string;
//   noOfTasks?:number;
//   noOfMembers?:number;
//   owner?:Item;
// }[];

interface boardIntialState {
  currentWorkspace: IWorkspace
  boardsDetails:IBoard;
  refetch:boolean
}

const initialState: boardIntialState = {
  refetch:false,
    currentWorkspace: {
      name:"Product Launch",
      URL:"product-yes",
      _id:"ueu",
      id:"PRO-L",
      totalTasks:10,
      totalMembers:0,
      owner:{
        name:"Fakorede Damilola",
        email:""
      },
      subItems: subItems,
      taskID:[

      ],
      members: [
        {
          name:"Fakorede dayo",
          id:"iiieiie",
          img:"",
          color:"blue",
          email:"dayo.fakorede@gmail.com",
          username:"dayo.fakorede",
          taskIDs:[],
          joined:"1677034436637"
        },
        {
          name:"Fakorede Bernice",
          id:"iiieiie",
          img:"",
          color:"brown",
          email:"bernice.fakorede@gmail.com",
          username:"bernice.fakorede",
          taskIDs:[],
          joined:"1677034436637"
        },
        {
          name:"Fakorede ben",
          id:"iiieiie",
          img:"",
          color:"purple",
          email:"bernice11.fakorede@gmail.com",
          username:"bernice11.fakorede",
          taskIDs:[],
          joined:"1677034436637"
        },
      ]
    },
    boardsDetails: {
        workspace:"Product Launch",
        workspaceID:"PRO-L",
        workspaceURL:"ueuue",
        
                  tasks:[
                      {
                          issueTitle:"task1",
                          issueDescription:"jejejhje jejjje",
                          workspaceID:"PRO-L",
                          workspaceURL:"PRO-L",
                          _id:"ueum",
                          status:{
                            name:"todo",
                            img:"",
                            email:""
                          },
                          priority:{
                            name:"No Priority",
                            img:"",
                            email:""
                          },
                          others:{
                            name:"",
                            img:"",
                            email:""
                          },
                          label:{
                            name:""
                          },
                          assigned:{
                            name:"uu99ue",
                            img:"",
                            email:""
                          },
                          assignee:"uuuiie",
                         createdby: {
                          name:"dhhdje",
                          img:"jeiejiie",
                          email:"dfakorede29@gmail.com"
                         },

                          time:"777777777",
                          imgURLArray:[]
                          
                      },
                      {
                        issueTitle:"task1 behhhe hehhhe",
                        issueDescription:"jejejhje jejjje",
                        workspaceID:"PRO-L",
                        workspaceURL:"PRO-L",
                        _id:"w89398",
                        status:{
                          name:"done",
                          img:"",
                            email:""
                        },
                        priority:{
                          name:"No Priority",
                          img:"BiDotsHorizontalRounded"
                        },
                        others:{
                          name:"",
                          img:"",
                            email:""
                        },
                        label:{
                          name:"",
                          img:"",
                            email:""
                        },
                        assignee:"uuue",
                        assigned:{
                          name:"uu99ue",
                          img:"",
                            email:""
                        },
                       createdby: {
                        name:"dhhdje",
                        img:"jeiejiie",
                        email:"dfakorede29@gmail.com"
                       },
                        time:"777777777",
                        imgURLArray:[]
                      },
                      {
                        issueTitle:"task1",
                        issueDescription:"jejejhje jejjje",
                        workspaceID:"PRO-L",
                        workspaceURL:"PRO-L",
                        status:{
                          name:"cancelled",
                          img:"",
                            email:""
                        },
                        priority:{
                          name:"No Priority",
                          img:"BiDotsHorizontalRounded"
                        },
                        others:{
                          name:"",
                          img:"",
                            email:""
                        },
                        label:{
                          name:"",
                          img:"",
                            email:""
                        },
                        _id:"w8000j8",
                        assignee:"uuue",
                        assigned:{
                          name:"",
                          img:""
                        },
                       createdby: {
                        name:"dhhdje",
                        img:"jeiejiie",
                        email:"dfakorede29@gmail.com"
                       },
                        time:"777777777",
                        imgURLArray:[]
                      },
             ],
         
      },
    
}

const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addNewTask: (state, {payload:{ newTask }}) =>{
      if(state.boardsDetails.workspaceID === newTask.workspaceID){
        state.boardsDetails.tasks.push(newTask)
      }
    //  state.boardsDetails.push(NewTask)
     
    },
    selectSubItems: (state, {payload:{ name, item }}) =>{
      const subItem = state.currentWorkspace.subItems.find((item)=>item.name===name)
      if(subItem){
        subItem.selected =item
      }
    },
    increaseNumberOfTasks:(state,{payload:{id}}) => {
        state.currentWorkspace.totalTasks = id
    },
    changeTaskPriority:(state,{payload:{id,type,name}}) => {
      const task = state.boardsDetails.tasks.find((item)=>item._id===id)
      if(task){
        // task.priority = item
        // @ts-ignore
        task[name.toLowerCase()] = type
      }
    },
    changeTaskDueDate:(state,{payload:{id,duedate}}) => {
      const task = state.boardsDetails.tasks.find((item)=>item._id===id)
      if(task){
        task.dueDate = duedate
      }
    },
    addNewActivity:(state,{payload:{id,activity}}) => {
      const task = state.boardsDetails.tasks.find((item)=>item._id===id)
      if(task){
        task.activities?.push(activity)
      }
    },
    setCurrentWorkspaceStatus:(state,{payload:{selected,type}}) => {
      const board = state.currentWorkspace.subItems.find(item=>item.name.toLowerCase() ===type)
      if(board){
        board.selected = selected
      }
    },
    clearCurrentWorkspaceStatus:(state,payload) => {
    //  mutate state to inital value
      state.currentWorkspace.subItems.map((item)=>{
        if(item.name.toLowerCase() === "status"){
          item.selected = item.items[0]
        }
        if(item.name.toLowerCase() === "priority"){
          item.selected = item.items[0]
        }
        if(item.name.toLowerCase() === "others"){
          item.selected = {
            name:"",
            img:"BiDotsHorizontalRounded",
          }
        }
        if(item.name.toLowerCase() === "label"){
          item.selected = {
            name:"Label",
            img:"MdLabel",
          }
        }
        if(item.name.toLowerCase() === "assigned"){
          item.selected = {
            name:"Assigned",
            img:"FaRegUserCircle"
          }
        }
      })
      
      
    },
    setCurrentWorkspace:(state,{payload:{workspace,boardsDetails}}) => {

      // state.currentWorkspace = workspace
      state.currentWorkspace = {
        ...state.currentWorkspace,
        ...workspace
      }
      state.boardsDetails = boardsDetails
    },
   refetchWorkspace:(state,{payload:{refetchWorkspace}}) => {
      state.refetch=refetchWorkspace
   }
  },
 
});

export const {
  addNewTask,
  selectSubItems,
  increaseNumberOfTasks,
  changeTaskPriority,
  changeTaskDueDate,
  addNewActivity,
  setCurrentWorkspaceStatus,
  clearCurrentWorkspaceStatus,
  setCurrentWorkspace,
  refetchWorkspace

} = boardSlice.actions;

export default boardSlice.reducer;
