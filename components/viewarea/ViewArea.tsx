import React, {useEffect,useState} from 'react'
import { FaTasks } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { device } from '../../config/theme';
import { IBoard, ITask } from '../../state/board';
import { RootState } from '../../state/store';
import TaskBar from './TaskBar';
import TaskCard from './TaskCard';


interface IView {
    setOpenNewBoardModal:React.Dispatch<React.SetStateAction<boolean>>;
    openNewBoardModal:boolean
}

const FlexWrapper = styled.div<{view:string}>`
/* @media ${device.mobileM} { */
  overflow-x: scroll; /* enable horizontal scrolling */
  background-color: ${({theme}) => theme.body};
  display:${({view}) => view==="list" ? "block" : "flex"};
  padding:${({view}) => view==="list" ? "50px 0px" : "100px 20px"};
  gap:40px; 
  margin-top:${({view}) => view==="list" ? "20px" : "0px"};
/* } */
 flex: 1 1 auto;
  /*
  margin-top:70px;
  box-sizing: border-box;
  height: 100%;
    min-height: 100%; */
   
`
const Columns = styled.div<{view:string}>`
     background-color: blue;
     /* width:100%; */
     /* @media ${device.mobileM} { */
    width:${({view}) => view==="list" ? "100%" : "300px"};
     /* } */
`
const ColumnTask = styled.div<{view:string}>`
    background-color: yellow;
    flex-shrink: 0;
    overflow-y: auto;
    height:100%;
    
    max-height:100%;
    width:100%;
  
    /* & > div {
        width:100%;
        margin:0px auto;
        height:40px;
        background-color:blue;
    min-height:40px;
    box-sizing:border-box;
    border-radius:0px;
    border-top:1px solid white;
    border-bottom:1px solid white;
    } */
     /* @media ${device.mobileM} { */
        width:${({view}) => view==="list" ? "100%" : "300px"};
    & > div {
    border:0px;
    background-color:red;
    width:${({view}) => view==="list" ? "100%" : "95%"};
    height:70px;
    min-height:70px;
    border-radius:${({view}) => view==="list" ? "0%" : "6px"};
    border-top:${({view}) => view==="list" ? "1px solid white" : "none"};
    border-bottom:${({view}) => view==="list" ? "1px solid white" : "none"};
        margin:${({view}) => view==="list" ? "0" : "30px auto"};
    }
     /* } */
`
const ViewArea = ({setOpenNewBoardModal,openNewBoardModal}:IView) => {
    const {currentBoard,boardsDetails} = useSelector((state: RootState) => state.board)
    const {taskView} = useSelector((state: RootState) => state.display)

    const [columns,setColumns] = useState<{
        name:string;
        tasks:ITask[]
      }[]>([])

    useEffect(()=>{
        const cols = boardsDetails.filter((board:IBoard) =>board.name===currentBoard)[0]?.columns
        console.log({cols})
        setColumns(cols)
    },[])
    const data = [
        {
            name:"todo",
            quantity:7,
            tasks:[
                {
                    name:"task1"
                },
                {
                    name:"task1"
                },
                {
                    name:"task1"
                },
                {
                    name:"task1"
                },
                {
                    name:"task1"
                },
            ]
        },
        {
            name:"progress",
            quantity:5,
            tasks:[
                {
                    name:"progress1"
                },
                {
                    name:"progress1"
                },
                {
                    name:"progress1"
                },
                {
                    name:"progress1"
                },
                {
                    name:"progress1"
                },
            ]
        }
    ]
    const list = data.map((item,index)=>({name:item.name,quantity:item.tasks.length}))
    const tasks = data.map((item,index)=>item.tasks)

if(columns.length===0) {
 return (
    <>
     <p>This board is empty. Create a new column to get started.</p>
    <button onClick={()=>setOpenNewBoardModal(!openNewBoardModal)}>
    + Add New Column
    </button>
    </>
  )
}else {
    return (
        <FlexWrapper view={taskView}>
        
        {list.map((col,index)=>{
            return (
               <Columns view={taskView}>
               <TaskBar taskbar={col} view={taskView} />
               <ColumnTask view={taskView} >
                {tasks[index].map((cards,index)=> (
               <TaskCard cards={cards} />
            ))
            }
               </ColumnTask>
              
               </Columns> 
            )
        })

        }
       


    </FlexWrapper>
    )
    
}
 
}

export default ViewArea