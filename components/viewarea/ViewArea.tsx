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

const FlexWrapper = styled.div`
@media ${device.mobileM} {
  overflow-x: scroll; /* enable horizontal scrolling */
  background-color: ${({theme}) => theme.body};
  display:flex;
  padding:100px 20px;
  gap:40px; 
  margin-top:0;
}
    margin-top:70px;
 flex: 1 1 auto;
  box-sizing: border-box;
  height: 100%;
    min-height: 100%;
   
`
const Columns = styled.div`
     background-color: blue;
     width:100%;
     @media ${device.mobileM} {
    width:300px;
     }
`
const ColumnTask = styled.div`
    background-color: yellow;
    flex-shrink: 0;
    overflow-y: auto;
    height:100%;
    
    max-height:100%;
    width:100%;
    & > div {
        width:100%;
        margin:0px auto;
        height:40px;
    min-height:40px;
    box-sizing:border-box;
    border-radius:0px;
    border-top:1px solid white;
    border-bottom:1px solid white;
    }
     @media ${device.mobileM} {
    width:300px;
    & > div {
    border:0px;
    width:95%;
    height:70px;
    min-height:70px;
    border-radius:6px;
        margin:30px auto;
    }
     }
`
const ViewArea = ({setOpenNewBoardModal,openNewBoardModal}:IView) => {
    const {currentBoard,boardsDetails} = useSelector((state: RootState) => state.board)

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
        <FlexWrapper>
        
        {list.map((col,index)=>{
            return (
               <Columns>
               <TaskBar taskbar={col} />
               <ColumnTask>
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