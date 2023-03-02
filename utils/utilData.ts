



export const iconStyle = { color:'#828FA3', fontSize:"14px", margin:"0 10px" }
   

export const subItems = [
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
  
  
  ]