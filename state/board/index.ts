import { createSlice } from "@reduxjs/toolkit";
import { Item } from "../../components/viewarea/IViewrea";



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
interface IMembers {
  name:string;
  email:string;
  id:string;
  img:string;
}

export interface IWorkspace {
  name:string;
  id:string;
  taskID:string[];
  totalTasks:number;
  subItems: subItem[];
  totalMembers:number;
  owner:Item;
  members?:IMembers[]
}
export interface IWorkspaces  { 
  name:string;
  id:string;
  noOfTasks?:number;
  noOfMembers?:number;
  owner?:Item;
}[];

interface boardIntialState {
  currentWorkspace: IWorkspace
  
  user: {
    name:string;
    email:string;
    id:string;
    workspaces: IWorkspaces[]
  }
  boardsDetails:IBoard
}

const initialState: boardIntialState = {
    currentWorkspace: {
      name:"Product Launch",
      id:"PRO-L",
      totalTasks:10,
      totalMembers:0,
      owner:{
        name:"Fakorede Damilola",
        email:""
      },
      subItems: [
        {
          name:"Status",
          icon:'BiCircle',
          tooltip:true,
          text:"Set Status",
          selected:{
            name:"Todo", 
            img:"BiCircle"
          },
          items:[
            {
              name:"Backlog",
              img:"TbCircleDotted"
            },
            {
              name:"Todo",
              img:"BiCircle"
            },
            {
              name:"In progress",
              img:"FaDotCircle"
            },
            {
              name:"Done",
              img:"AiOutlineCheckCircle"
            },
            {
              name:"Cancelled",
              img:"MdOutlineCancel"
            },
          ]
        },
        {
          name:"Priority",
          icon:'BsFillBarChartFill',
          tooltip:true,
          text:"Set Priority",
          selected:{
            name:"No Priority",
            img:"BiDotsHorizontalRounded"
          },
          items:[
            {
              name:"No Priority",
              img:"BiDotsHorizontalRounded"
            },
            {
              name:"Urgent",
              img:"GrStatusInfo"
            },
            {
              name:"High",
              img:"BsFillBarChartFill"
            },
            {
              name:"Medium",
              img:"FiBarChart"
            },
            {
              name:"Low",
              img:"BsBarChart"

            },
          ]
        },
        {
          name:"Assigned",
          icon:'FaRegUserCircle',
          tooltip:true,
          text:"Assign To",
          selected:{
            name:"Assigned",
            img:"FaRegUserCircle"
          },
          items:[

            {
              name:"Unassign",
              email:"",
              img:"FaRegUserCircle"
            },
            {
              name:"Fakorede Damilola",
              email:"dfakorede29@gmail.com",
              img:"FaRegUserCircle"
            },
            {
              name:"e Damilola",
              email:"de29@gmail.com",
              img:"FaRegUserCircle"
            },
            {
              name:"oladayo ife",
              email:"ojek@gmail.com",
              img:"FaRegUserCircle"
            },
          ]
        },
        {
          name:"Label",
          icon:'MdLabel',
          tooltip:true,
          text:'Add Label',
          selected:{
            name:"Label",
            img:"MdLabel",
          },
          items:[
            {
              name:"Bug",
              type:"color",
              img:"red"
            },
            {
              name:"Feature",
              type:"color",
              img:"purple"
            },
            {
              name:"Improvement",
              type:"color",
              img:"blue"
            },
          ]
        },
        {
          name:"Others",
          icon:'BiDotsHorizontalRounded',
          tooltip:true,
          text:"",
          selected:{
            name:"",
            img:"BiDotsHorizontalRounded",
          },
          items:[ ]
        },
      
      
      ],
      taskID:[

      ]
    },
    user: {
      name:"Fakorede Damilola",
      email:"dfakorede29@gmail.com",
      id:"87733",
      workspaces: [
        {
          name:"Product Launch",
          id:"PRO-L",
          noOfTasks:10,
          noOfMembers:0,
          owner:{
            name:"Fakorede Damilola",
            email:""
          }

        },
        {
          name:"FAST VOTE",
          id:"FAS-V"
        },
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
         
      }
    ,
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
  setCurrentWorkspace
} = boardSlice.actions;

export default boardSlice.reducer;
