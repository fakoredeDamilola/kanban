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
import { CHANGE_TASK_DETAIL } from "../../graphql/mutation"
import { useMutation } from "@apollo/client"
import { FETCH_TASK } from "../../graphql/queries"


const TaskCardStyle = styled.div<{isDrag:boolean;view:string}>`
    padding:12px 14px;
    box-sizing:border-box;
    z-index:9;
    border:0px;
    overflow-x:hidden;
overflow-y:hidden;
    /* background: ${({theme})=>theme.cardBackground}; */
    background: #1C1D2A;
    min-height:${({view}) => view==="list" ? "40px" : "110px"};
    border-radius:${({view}) => view==="list" ? "0%" : "6px"};
    /* border:${({view,theme}) => view==="list" ? `1px solid ${theme.border}` : "none"}; */
    border:${({view,theme}) => view==="list" ? `1px solid #212234` : "none"};
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

// position:${({view}) => view==="list" ? "absolute" : "static"};
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

/* background-color: ${({theme})=>theme.secondary}; */
border:1px solid ${({theme})=>"#777474"};
&:hover {
  background: ${({theme})=>theme.cardHover};
  transition: 0.3s;
}

`
const TaskStyleContainer = styled.div<{list:string}>`
display:flex;
position:${({list})=>list==="view"?"absolute":"static"};
width:${({list})=>list==="view"?"97%":"auto"};
justify-content:space-between;
align-items:center;
word-wrap:break-word;
overflow-x:hidden;
overflow-y:hidden;

`
const FooterWrapper = styled.div<{view:string}>`
  position:absolute;
  display:flex; 
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
const TaskTitle = styled.p`
  word-wrap:break-word;
`
const ProfilePictureWrapper = styled.div`
  margin-top:-10px;
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
  const {currentWorkspace,boardsDetails} = useSelector((state:RootState)=>state.board)
  const user = useSelector((state:RootState)=>state.user)
  const [openCalenderModal, setOpenCalenderModal] = useState(false)

  const [changeTaskDetail,{data,error,loading}] = useMutation(CHANGE_TASK_DETAIL)


  const saveCalenderModal = (e:any,startDate:any) => {
    // e.stopPropagation()
    dispatch(changeTaskDueDate({id:card?._id,duedate:startDate}))
    
        const CalenderActivity:IActivity = {
            id: uuidv4(),
            nameOfActivity:card?.dueDate? "changed due date" : "added due date",
           description:card?.dueDate ? `changed due date from ${getTextDate(card?.dueDate)} to ${getTextDate(startDate)}` :startDate ? `set due date ${getTextDate(startDate)}` : "removed due date",
            createdby: {
              name:user.name ?? "name",
              id:user._id,
              email:user.email
            },
            time:Date.now()
        }
        dispatch(addNewActivity({id:card?._id,activity:CalenderActivity}))
         setOpenCalenderModal(false)
    }
    const closeCalenderModal = () => {
        setOpenCalenderModal(false)
    }

  const selectTaskPriority = (e:any,id:string,priority:Item,name:string) =>{
    e.stopPropagation()
    setIsPriorityOpen(false)
    setIsFeatureOpen(false)
    // dispatch(changeTaskPriority({id,type:priority,name}))
    const selectedItem = {
      name:priority.name,
      email:priority.email ?? "",
      img:priority.img ?? "",
      _id:priority?._id ??""
    }
    changeTaskDetail({
      variables:{
          input: {
            // taskInput:{}
              _id:id,
              type:selectedItem,
              name
          },
          
      },
      refetchQueries:() => [{
        query: FETCH_TASK,
        variables: { 
         
           input: {
            id:router?.query.taskID,
            URL:router?.query.id
        }
        },
    }]
  })

    let newActivity:IActivity
    if(name ==="Label") {
      newActivity = {
        id: uuidv4(),
        nameOfActivity:"Changed Label",
        // @ts-ignore
        description: `added label`,
        createdby: {
          name:user.name ?? "name",
          id:user._id,
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
      name:user.name ??"name",
      id:user._id,
      email:user.email
    },
      time:Date.now(),
      icon:priority.img
  }
    }
  dispatch(addNewActivity({id:card?._id,activity:newActivity}))
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
        onClick={()=>router.push(`/${card?.workspaceURL}/${card?._id}`)}
        ref={drag}
        >
      <TaskStyleContainer list={view}>
        <TaskId view={view}>
   {view!=="list" && <p>{card._id.slice(0,5)}</p>}
   {view==="list" &&   <CustomDropdown 
      isOpen={isPriorityOpen} 
      setIsOpen={setIsPriorityOpen} 
      left="10%" 
      type="icon"
      items={currentWorkspace.subItems.find((item)=>item.name.toLowerCase()==="priority")?.items} selected={card.priority ?? {name:"no priority"}} 
      selectItem={(e,element:Item) =>selectTaskPriority(e,card._id,element,"priority")}>
        <Icon onClick={(e)=>handleButtonClick(e,"priority")}>
           <CustomIcon img={card.priority?.img ?? "BiDotsHorizontalRounded"} fontSize="12px" />
         </Icon> 
    </CustomDropdown>
        }
       
    <TaskTitle>{view ==="list" ? card.issueTitle.slice(0,40) : card.issueTitle.slice(0,82)} </TaskTitle>
      </TaskId>
      <ProfilePictureWrapper>
        <ProfilePicture assigned={card.assigned} tooltip size={view==="list" ? "15px" : "20px"} />
      </ProfilePictureWrapper>
      
      </TaskStyleContainer>
      <TaskStyleList>
    
    <FooterWrapper view={view}>
     
      
          {card.priority &&   <CustomDropdown 
      isOpen={isPriorityOpen} 
      setIsOpen={setIsPriorityOpen} 
      left="10%" 
      type="icon"
      items={currentWorkspace.subItems.find((item)=>item.name.toLowerCase()==="priority")?.items} selected={card.priority ?? {name:"no priority"}} 
      selectItem={(e,element:Item) =>selectTaskPriority(e,card._id,element,"priority")}>
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
         <CustomIcon img="BsCalendar2" fontSize="13px" /> {getTextDate(card.dueDate,"MM, yy")}
       </Icon>
    }
        {card.label && card.label.name !== "Label" &&
          <CustomDropdown
          isOpen={isFeatureOpen}
          setIsOpen={setIsFeatureOpen}
          selected={card.label}
          type="icon"
          selectItem={(e:any,item:Item)=>{
            e.stopPropagation()
            selectTaskPriority(e,card._id,item,"Label")
            setIsFeatureOpen(false)
          }}
          top="30%"
          left="-70%"
          items={currentWorkspace.subItems.find(item=>item.name.toLowerCase()==="label")?.items}
          >
      <Label  onClick={(e)=>handleButtonClick(e,"feature")}>
        <CustomIcon img={card.label?.img} fontSize="12px" type="color" /> <div>{card.label?.name}</div>
      </Label>
      </CustomDropdown>
    }
      <Portal>
                 {openCalenderModal ? <CalenderModal date={card.dueDate ?new Date(parseInt(card?.dueDate)*1000): Date.now()} saveCalenderModal={saveCalenderModal} openCalenderModal={openCalenderModal} closeCalenderModal={closeCalenderModal} /> : null}
            </Portal>
       
    </FooterWrapper>
   
      </TaskStyleList>
    </TaskCardStyle>
   

  )
}

export default TaskCard