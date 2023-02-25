import styled from "styled-components"
import { addNewActivity, changeTaskDueDate, changeTaskPriority, IActivity, ITaskCards } from "../../state/board"
import CustomDropdown from "../Customdropdown"
import {forwardRef} from "react"
import ProfilePicture from "../ProfilePicture"
import {useState} from "react"
import { BiDotsHorizontalRounded } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../state/store"
import { Item } from "./IViewrea"
import CustomIcon from "../CustomIcon"
import { useRouter } from "next/router"
import usePortal from "../../hooks/usePortal"
import "react-datepicker/dist/react-datepicker.css";
import {v4 as uuidv4} from "uuid"
import { getTextDate } from "../../utils/utilFunction"
import { useDrag } from "react-dnd";
import CalenderModal from "../modal/CalenderModal"


const TaskCardStyle = styled.div<{isDrag:boolean;view:string}>`
    padding:12px 14px;
    box-sizing:border-box;
    position:relative;
    border:0px;

    background: ${({theme})=>theme.sidenav};
    min-height:${({view}) => view==="list" ? "40px" : "130px"};
    border-radius:${({view}) => view==="list" ? "0%" : "6px"};
    border:${({view,theme}) => view==="list" ? `1px solid ${theme.border}` : "none"};
    border-left:0;
    border-right:0;
    cursor:pointer;
        margin:${({view}) => view==="list" ? "0" : "10px auto"};
        &:hover {
            background: ${({theme})=>theme.cardHover};
            transition: 0.3s;
        }
    
`
const TaskStyleList = styled.div`
  
`
const TaskId = styled.div<{view:string}>`
display:${({view})=>view==="list"?"flex":"block"};
gap:10px;
p:first-child{
font-weight:200;
font-size:12px;
}
p:last-child {
font-weight:800;
font-size:12px;
margin-top:${({view})=>view==="list" ? "0px": "7px"};
}
`
const Icon = styled.div<{fontSize?:string}>`
min-width:25px;
height:20px;
border-radius:3px;
padding:5px;
box-sizing:border-box;
display:flex;
gap:4px;
font-size:${({fontSize})=>fontSize ?? "12px"};
justify-content:center;
align-items:center;
cursor:pointer;
background-color: ${({theme})=>theme.secondary};
border:1px solid ${({theme})=>"#777474"};
&:hover {
  background: ${({theme})=>theme.cardHover};
  transition: 0.3s;
}

`
const TaskStyleContainer = styled.div`
display:flex;
justify-content:space-between;

`
const FooterWrapper = styled.div<{view:string}>`
  position:absolute;
  /* display:flex; */
  gap:10px;
  display:${({view}) => view==="list" ? "none" : "flex"};
  /* top:10px; */
  bottom:10%;
`
const Label = styled.div`
  display:flex;
  border:1px solid ${({theme})=>theme.border};
  border-radius:10px;
  font-size:11px;
  padding:3px 6px;
  box-sizing:border-box;
  gap:3px;
  align-items:center;

`

const TaskCard = ({card,view}:{view:string,card:ITaskCards}) => {
  const [isPriorityOpen,setIsPriorityOpen] = useState(false)
  const [isFeatureOpen,setIsFeatureOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | null>(card?.dueDate ? new Date(card?.dueDate) : null);
  const handleButtonClick = (e:any,type:string) => {
    e.stopPropagation()
    if(type==="priority"){
       setIsPriorityOpen(!isPriorityOpen);
    }else if(type==="feature"){
      setIsFeatureOpen(!isFeatureOpen)
    }
   
  };
  const router = useRouter()
  const Portal = usePortal(document.querySelector("#portal"));

  const dispatch = useDispatch()
  const {currentWorkspace,boardsDetails,user} = useSelector((state:RootState)=>state.board)
  const [openCalenderModal, setOpenCalenderModal] = useState(false)
  const saveCalenderModal = (e:any,startDate:any) => {
   console.log(startDate)
    // e.stopPropagation()
    dispatch(changeTaskDueDate({id:card?.id,duedate:startDate}))
    
        const CalenderActivity:IActivity = {
            id: uuidv4(),
            nameOfActivity:card?.dueDate? "changed due date" : "added due date",
           description:card?.dueDate ? `changed due date from ${getTextDate(card?.dueDate)} to ${getTextDate(startDate)}` :startDate ? `set due date ${getTextDate(startDate)}` : "removed due date",
            createdby: {
              name:user.name,
              id:user.id,
              email:user.email
            },
            time:Date.now()
        }
        dispatch(addNewActivity({id:card?.id,activity:CalenderActivity}))
         setOpenCalenderModal(false)
    }
    const closeCalenderModal = () => {
        setOpenCalenderModal(false)
    }

  const selectTaskPriority = (e:any,id:string,priority:Item,name:string) =>{
    e.stopPropagation()
    setIsPriorityOpen(false)
    setIsFeatureOpen(false)
    console.log({id,type:priority,name})
    dispatch(changeTaskPriority({id,type:priority,name}))

    let newActivity:IActivity
    if(name ==="Label") {
      newActivity = {
        id: uuidv4(),
        nameOfActivity:"Changed Label",
        // @ts-ignore
        description: `added label`,
        createdby: {
          name:user.name,
          id:user.id,
          email:user.email
        },
        time:Date.now(),
        icon:"MdLabel",
        color:priority.img,
        name:priority.name
      }
    }else{
      newActivity = {
      id: uuidv4(),
      nameOfActivity:"Changed Status",
      // @ts-ignore
     description: `changed ${name} from ${card[name?.toLowerCase() as keyof typeof card].name} to ${priority.name}`,
     createdby: {
      name:user.name,
      id:user.id,
      email:user.email
    },
      time:Date.now(),
      icon:priority.img
  }
    }
  dispatch(addNewActivity({id:card?.id,activity:newActivity}))
  }
 

  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item:card,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    }),
    
  }));

  

  return (

        <TaskCardStyle
        view={view} 
        isDrag={isDragging}
        onClick={()=>router.push(`/${card?.workspaceID}/${card?.id}`)}
        ref={drag}
        >
      <TaskStyleContainer>
        <TaskId view={view}>
   {view!=="list" && <p>{card.id}</p>}
   {view==="list" &&   <CustomDropdown 
      isOpen={isPriorityOpen} 
      setIsOpen={setIsPriorityOpen} 
      left="10%" 
      items={currentWorkspace.subItems.find((item)=>item.name.toLowerCase()==="priority")?.items} selected={card.priority ?? {name:"no priority"}} 
      selectItem={(e,element:Item) =>selectTaskPriority(e,card.id,element,"priority")}>
       <div onClick={(e)=>handleButtonClick(e,"priority")}>
         <CustomIcon img={card.priority?.img ?? "BiDotsHorizontalRounded"} fontSize="12px" />
       </div>
          
        
    </CustomDropdown>
        }
       
    <p>{card.issueTitle.slice(0,82)}...</p>
      </TaskId>
      <ProfilePicture assigned={card.assigned} tooltip size={view==="list" ? "15px" : "20px"} />
      </TaskStyleContainer>
      <TaskStyleList>
    
    <FooterWrapper view={view}>
     
      
          {card.priority &&   <CustomDropdown 
      isOpen={isPriorityOpen} 
      setIsOpen={setIsPriorityOpen} 
      left="10%" 
      items={currentWorkspace.subItems.find((item)=>item.name.toLowerCase()==="priority")?.items} selected={card.priority ?? {name:"no priority"}} 
      selectItem={(e,element:Item) =>selectTaskPriority(e,card.id,element,"priority")}>
        <Icon onClick={(e)=>handleButtonClick(e,"priority")}>
           <CustomIcon img={card.priority?.img ?? "BiDotsHorizontalRounded"} fontSize="12px" />
         </Icon> 
    </CustomDropdown>
        }
       
     
        {card.dueDate &&
         <Icon  onClick={(e:any)=>{
          e.stopPropagation()
          setOpenCalenderModal(true)
        }}  fontSize="12px">
         <CustomIcon img="BsCalendar2" fontSize="13px" /> {getTextDate(new Date(card.dueDate),"MM, yy")}
       </Icon>
    }
        {card.label &&
          <CustomDropdown isOpen={isFeatureOpen} setIsOpen={setIsFeatureOpen} selected={card.label} selectItem={(e:any,item:Item)=>{
          
          e.stopPropagation()
            selectTaskPriority(e,card.id,item,"Label")
            setIsFeatureOpen(false)
          }} top="30%" left="-70%" items={currentWorkspace.subItems.find(item=>item.name.toLowerCase()==="label")?.items} >
      <Label  onClick={(e)=>handleButtonClick(e,"feature")}>
        <CustomIcon img={card.label?.img} fontSize="12px" type="color" /> <div>{card.label?.name}</div>
      </Label>
      </CustomDropdown>
    }
      <Portal>
                 {openCalenderModal ? <CalenderModal date={card?.dueDate} saveCalenderModal={saveCalenderModal} openCalenderModal={openCalenderModal} closeCalenderModal={closeCalenderModal} /> : null}
            </Portal>
       
    </FooterWrapper>
   
      </TaskStyleList>
    </TaskCardStyle>
   

  )
}

export default TaskCard