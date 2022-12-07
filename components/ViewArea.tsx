import React, {useEffect,useState} from 'react'
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { IBoard, ITask } from '../state/board';
import { RootState } from '../state/store';


interface IView {
    setOpenNewBoardModal:React.Dispatch<React.SetStateAction<boolean>>;
    openNewBoardModal:boolean
}

const FlexWrapper = styled.div`

   display:flex;
   background-color:yellow;
   min-width:100%;
   min-height:100%;
    padding:250px;
    overflow-x:scroll;
    gap:70px;
`
const Columns = styled.div`
    background:red;
    width:300px;
    height:100%;
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
        
        {[1,2,3,4].map((col,index)=>{
            return (
                <Columns>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Impedit esse dignissimos dolor voluptatem voluptate cupiditate eum ullam architecto dicta. Tempore nobis quibusdam velit cupiditate, suscipit vero corrupti exercitationem! Ducimus distinctio reprehenderit deserunt quae nobis ab exercitationem quasi delectus quas ad eos nostrum dolorem, inventore doloribus nam beatae nihil natus. Omnis et sit ad fuga ratione perspiciatis architecto sequi ut quasi ullam eius soluta alias quam magni, facilis praesentium quod officiis iusto. Error aliquam obcaecati alias excepturi vitae impedit possimus, aut delectus. Consequatur alias culpa omnis aliquid deleniti ab labore quos praesentium expedita consequuntur rem totam cupiditate beatae quidem quisquam asperiores, maxime vel! Numquam esse voluptatibus labore quis molestiae, inventore officia veritatis minima aut assumenda magni consequuntur nostrum sunt laudantium reprehenderit aspernatur, magnam maiores quidem dignissimos nemo nisi! Deserunt, consectetur possimus.
                </Columns>
            )
        })

        }
    </FlexWrapper>
    )
    
}
 
}

export default ViewArea