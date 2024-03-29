import { useMutation } from '@apollo/client';
import React, {useEffect,useState} from 'react'
import { useDrop } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { CHANGE_TASK_DETAIL } from '../../graphql/mutation';

import { changeTaskPriority, changeTaskStatus } from '../../state/board';
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
  height:90px;
   margin-top:10px;
   margin:0 auto;
    flex:1;
    overflow-y: auto;
    overflow-x:hidden;  
    /* background:red;   */
    
    opacity:${({isOver}) => isOver ? "0.2" : "1"};
    height:${({view}) => view==="list" ? "auto" : "100%"};
    min-height:${({view}) => view==="list" ? "auto" : "100%"};
    /* margin-bottom:390px; */
    width:${({view}) => view==="list" ? "100%" : "330px"};
    box-sizing:border-box;
    padding:${({view}) => view==="list" ? "0" : "0 10px"};
    padding-bottom:${({view}) => view==="list" ? "1px" : "40px"};
    position:${({view}) => view==="list" ? "static" : "relative"};
    
    /* position:relative; */
`
const LayerTask = styled.div`
 background-color: ${({theme}) => theme.nav};
 width:85%;
 box-sizing:border-box;
    padding: 10px;
    color:${({theme}) => theme.white};
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:10px;
    font-size:14px;
  border: 2px solid ${({theme}) => theme.border};
  border-radius: 6px;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
h4 {
    color:#c4c0c0;
    margin-top:30px;
}
`
const TaskCardWrapper = styled.div<{view:string}>`
position:${({view}) => view==="list" ? "static" : "relative"};
`
const ViewArea = ({col,task}:IView) => {

const [changeTaskDetail,{data,error,loading,}] = useMutation(CHANGE_TASK_DETAIL)
const {types} = useSelector((state:RootState) =>state.user)

    const {currentWorkspace} = useSelector((state: RootState) => state.board)
    const {taskView,openNewBoardModal} = useSelector((state: RootState) => state.display)
    const dispatch = useDispatch()
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
        if(types!=="guest"){
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
        }else{
            const selectedItem = {
                name:col.name,
                email:col.email ?? "",
                img:col.img ?? "",
                _id:col?._id ??""
              }
                console.log({col,card})
                dispatch(changeTaskStatus({id:card._id,name:"status",type:selectedItem}))
        }

       
    }
const [{ isOver,canDrop,getItem }, drop] = useDrop(() => ({
    accept: "card",
    drop: (item) => changeStatusOfTask(item),
    collect: monitor => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
        getItem:monitor.getItem()
      })
}));


    return (
               <ColumnTask view={taskView} isOver={isOver}  ref={drop} >
                {task.map((card:any,index:any)=> {
                    return(
                    <TaskCardWrapper view={taskView}>
                         <TaskCard card={card} key={index} view={taskView} />
                    </TaskCardWrapper>
              
            )})
            }
           {isOver && <LayerTask>
            <div>Drop here to move to this column</div>
            <h4>This board is ordered by prioity</h4>
            </LayerTask>
            }
               </ColumnTask>       
    
    )
    

}

export default React.memo(ViewArea)