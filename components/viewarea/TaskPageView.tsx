import React from 'react'
import styled from 'styled-components'
import { IBoard, ITaskCards } from '../../state/board'
import NOTask from '../NOTask'
import TaskBar from './TaskBar'
import ViewArea from './ViewArea'




const FlexWrapper = styled.div<{view:string;margin?:string}>`
 color:${({theme}) => theme.primary};
  overflow-x: scroll; /* enable horizontal scrolling */
  overflow-y:hidden;
  display:${({view}) => view==="list" ? "block" : "flex"};
  padding:${({view,margin}) => view==="list" ? margin ?? "50px 0px" : margin?? "0px 20px"};
  max-height:100%;
  height:calc(100%-70px);
  /* margin-top:70px; */
  gap:40px; 
  margin-top:${({view}) => view==="list" ? "20px" : "70px"};
 flex: 1 1 auto;
   
`

const Columns = styled.div<{view:string}>`
    width:${({view}) => view==="list" ? "100%" : "330px"};
    height:90%;

`

const Container = styled.div`
  background-color: ${({theme}) => theme.body};
  display:flex;
  width:100%;
  min-height:100%;
  height:100%;
`

const TaskPageView = ({tasks,taskView,columns,newTask,openNewBoardModal,margin}:{tasks:ITaskCards[],newTask:any;taskView:string,columns:any[];openNewBoardModal:boolean;margin?:string;}) => {
  return (
    <Container>
    
   {tasks.length >0 ?
    <FlexWrapper view={taskView} margin={margin}>
    {columns.map((col,index)=>{
            const task = tasks.filter((item)=>item?.status?.name?.toLowerCase() === col.name.toLowerCase())
          
            return (

              <Columns view={taskView}>
                  <TaskBar taskbar={{name:col.name,quantity:task.length,img:col?.img}} view={taskView} newTask={newTask} />
                <ViewArea
      openNewBoardModal={openNewBoardModal}
      col={col}
      task={task}

      />
      </Columns>
        )
      })
      

      }
      </FlexWrapper>
   :  
   <NOTask />
   }
   
        
     

    </Container>
  )
}

export default TaskPageView