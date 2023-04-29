import { useMutation } from '@apollo/client';
import React, {useEffect,useState} from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CHANGE_TASK_DETAIL } from '../../graphql/mutation';
import { FETCH_TASK } from '../../graphql/queries';
import { changeTaskPriority } from '../../state/board';
import { setNewBoardModal } from '../../state/display';
import { RootState } from '../../state/store';
import TaskCard from './TaskCard';


interface IView {
    openNewBoardModal:boolean;
    col:any;
    task:any
}
const ColumnTask = styled.div<{view:string;isOver:boolean}>`
    flex-shrink: 0;
    /* background-color:${({theme,isOver})=> isOver ? theme.color1 : "transparent"}; */
    background-color:red;
    flex:1;
    overflow-y: auto;
    overflow-x:hidden;    
    max-height:100%;
    min-height:100%; 
    width:${({view}) => view==="list" ? "100%" : "330px"};
    box-sizing:border-box;
    padding:${({view}) => view==="list" ? "0" : "0 10px"};
    position:relative;
`
const LayerTask = styled.div`
 background-color: ${({theme}) => theme.nav};
 width:85%;
 height:30px;
 box-sizing:border-box;
    padding: 10px;
    color:${({theme}) => theme.white};
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:10px;
    font-size:14px;
  border: 4px solid blue;
  border-radius: 6px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
h4 {
    color:#c4c0c0;
}
`
const ViewArea = ({col,task}:IView) => {

const [changeTaskDetail,{data,error,loading,}] = useMutation(CHANGE_TASK_DETAIL)

    const {currentWorkspace} = useSelector((state: RootState) => state.board)
    const {taskView,openNewBoardModal} = useSelector((state: RootState) => state.display)
    const dispatch = useDispatch()
    console.log({data,error,loading})
    const [columns,setColumns] = useState<{
        name:string;
        email?:string
        img?:string
      }[]>([])

    useEffect(()=>{
        const cols =currentWorkspace.subItems[0].items
        setColumns(cols)
    },[])
   
   
    const changeStatusOfTask = (card:any) => {
        // dispatch(changeTaskPriority({id:card.id,type:col,name:"status"}))
        console.log({card})
        const selectedItem = {
            name:col.name,
            email:col.email ?? "",
            img:col.img ?? "",
            _id:col?._id ??""
          }
        changeTaskDetail({
            variables:{
                input: {
                    _id:card._id,
                    type:selectedItem,
                    name:"status"
                }
            },
        })
    }
    
    console.log({task})
const [{ isOver,canDrop,getItem }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => changeStatusOfTask(item),
    collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        getItem:monitor.getItem()
      })
}));

if(columns.length===0) {
 return (
    <>
     <p>This board is empty. Create a new column to get started.</p>
    <button onClick={()=> dispatch(setNewBoardModal({open:!openNewBoardModal})) }>
    + Add New Column
    </button>
    </>
  )
}else {
    return (
               <ColumnTask view={taskView} isOver={isOver}  ref={drop} >
                {task.map((card:any,index:any)=> (
               <TaskCard card={card} key={index} view={taskView} />
            ))
            }
           {isOver && <LayerTask>
            <div>Drop here to move to this column</div>
            <h4>This board is ordered by prioity</h4>
            </LayerTask>
            }
               </ColumnTask>       
    
    )
    
}
 
}

export default React.memo(ViewArea)