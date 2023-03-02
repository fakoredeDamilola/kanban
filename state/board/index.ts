import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../components/viewarea/IViewrea";
import { subItems } from "../../utils/utilData";



export interface IBoard {
  workspace:string;
  workspaceID:string;    
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
  
      id:string;
      assignee:string;
      assigned:Item;
      workspaceID:string,
  issueTitle:string,
  issueDescription?:string,
  dueDate?:string,
    status:Item;
    label:Item;
    others:Item;
    priority:Item;
    createdby:Item,
   time:string,
  imgURLArray:string[],
  activites?: IActivity[]
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
  URL:string;
  taskID:string[];
  totalTasks:number;
  subItems: subItem[];
  totalMembers:number;
  owner:Item;
  members:IMembers[]
}

export interface IUser {
  name:string;
  email:string;
  id:string;
  username:string;
  image:string;
  workspaces: IWorkspace[]
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
  
  user: IUser
  boardsDetails:IBoard
}

const initialState: boardIntialState = {
    currentWorkspace: {
      name:"Product Launch",
      URL:"product-yes",
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
    user: {
      name:"Fakorede Damilola",
      email:"dfakorede29@gmail.com",
      id:"87733",
      username:"dfakorede29",
      image:"",
      workspaces: [
        {
          name:"Product Launch",
          id:"PRO-L",
          URL:"euuue",
          taskID:[],
  totalTasks:0,
  subItems: subItems,
  totalMembers:0,
  owner:{
    name:"Fakorede Damilola",
    email:"dfakorede29@gmail.com"
  },
  members:[
    {
      name:"Fakorede Damilola",
      email:"dfakorede29@gmail.com",
      id:"8883",
      joined:"8377384849939",
      username:"ieoe",
      taskIDs:[],
      img:"",
    }
  ]

        }
      ]
    },
    boardsDetails: {
        workspace:"Product Launch",
        workspaceID:"PRO-L",
        
                  tasks:[
                      {
                          issueTitle:"task1",
                          issueDescription:"jejejhje jejjje",
                          workspaceID:"PRO-L",
                          id:"ueum",
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
                        id:"w89398",
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
                        id:"w8000j8",
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
        console.log({newTask},state.boardsDetails.workspaceID)
      if(state.boardsDetails.workspaceID === newTask.workspaceID){
        state.boardsDetails.tasks.push(newTask)
      }
    //  state.boardsDetails.push(NewTask)
     
    },
    selectSubItems: (state, {payload:{ name, item }}) =>{
      console.log({name,item})
      const subItem = state.currentWorkspace.subItems.find((item)=>item.name===name)
      console.log({subItem})
      if(subItem){
        subItem.selected =item
      }
    },
    increaseNumberOfTasks:(state,{payload:{id}}) => {
      console.log({id})
        state.currentWorkspace.totalTasks = id
    },
    changeTaskPriority:(state,{payload:{id,type,name}}) => {
      console.log({id,type,name})
      const task = state.boardsDetails.tasks.find((item)=>item.id===id)
      console.log({task})
      if(task){
        // task.priority = item
        // @ts-ignore
        task[name.toLowerCase()] = type
      }
    },
    changeTaskDueDate:(state,{payload:{id,duedate}}) => {
      console.log({id,duedate},"kejjejje")
      const task = state.boardsDetails.tasks.find((item)=>item.id===id)
      if(task){
        task.dueDate = duedate
      }
    },
    addNewActivity:(state,{payload:{id,activity}}) => {
      console.log({id,activity})
      const task = state.boardsDetails.tasks.find((item)=>item.id===id)
      if(task){
        task.activites?.push(activity)
      }
    },
    setCurrentWorkspaceStatus:(state,{payload:{selected,type}}) => {
      console.log({selected,type},'meke')
      const board = state.currentWorkspace.subItems.find(item=>item.name.toLowerCase() ===type)
      console.log({board})
      if(board){
        board.selected = selected
      }
    },
    clearCurrentWorkspaceStatus:(state,payload) => {
    //  mutate state to inital value
      state.currentWorkspace.subItems.map((item)=>{
        console.log({item})
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
    AddNewWorkspace:(state,{payload:{newWorkspace}}) =>{
      state.user.workspaces = [...state.user.workspaces, newWorkspace]
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
  AddNewWorkspace
} = boardSlice.actions;

export default boardSlice.reducer;
