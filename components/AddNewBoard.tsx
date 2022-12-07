import React from 'react'
import { AiOutlineClose, AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { addNewBoard } from '../state/board'
import { RootState } from '../state/store'
import CustomButton from './CustomButton'
import CustomModal from './CustomModal'


const AddNewBoardStyles = styled.div`
box-sizing:border-box;
margin-bottom:30px;
& button {
  margin-top:7px;
}
`

const InputdivStyles = styled.div<{created:boolean}>`
margin:${({created})=>created ? "13px 0px" : "30px 0"};
display:${({created})=>created ? "flex" : "auto"};
gap:30px;
justify-content:${({created})=>created ? "space-between" : "auto"};
align-items:${({created})=>created ? "center" : "auto"};
label {
  font-weight:400;
  color:${({theme})=>theme.secondaryColor};
}
input{
  width:${({created})=>created ? "97%" : "95%"};
  margin-top:${({created})=>created ? "0px" : "10px"};
  display:block;
  padding:0 10px;
  height:40px;
  border-radius:4px;
  border: 1px solid rgba(130, 143, 163, 0.25);
  input::placeholder{
    color:#000012;
    font-size:13px;
    font-weight:500;
  }
}
`
const Columns = styled.div`
padding:0px 0;
`
const Cancel = styled.div`
width:40px;
    color:red;
    height:40px;
    border-radius:6px;
    display:flex;
    justify-content:center;
    border: 1px solid rgba(130, 143, 163, 0.25);
    align-items:center;
    &:hover{
      background-color:red;
      color:#f5f5f5;
      cursor:pointer;
    }
`


interface IBoard {
closeNewBoardModal:()=>void;
openNewBoardModal:boolean
}

const AddNewBoard = ({closeNewBoardModal,openNewBoardModal}:IBoard) => {

  const [BoardInput, setBoardInput] = React.useState<string>("")
  const [BoardColumn, setBoardColumn] = React.useState<string[]>([])
  const dispatch = useDispatch()
  const {boardsDetails} = useSelector((state:RootState)=>state.board)

const addNewColumn = () => {
  setBoardColumn(prev=>[...prev,""])
}

const removeBoardColumn = (idx:number) => {
setBoardColumn(prev=>prev.filter((item,index)=>index!==idx))
}

const createNewBoard = () => {
  const boards = boardsDetails.map((board)=>board.name)
  console.log({boards})
  if(!boards.includes(BoardInput)){
   const newBoard = {
    name:BoardInput,
    columns: BoardColumn.map((column)=>({
      name: column,
      tasks:[]
    }))
   }
  dispatch(addNewBoard({newBoard}))
  closeNewBoardModal()
  }
}

  return (
    <CustomModal title="Add New Board" closeNewBoardModal={closeNewBoardModal} openNewBoardModal={openNewBoardModal}>
 <AddNewBoardStyles>
       <InputdivStyles created={false}>
       <label>Name</label>
       <input type="text" placeholder="e.g Web Design"   
       value={BoardInput} 
      onChange={(e)=>setBoardInput(e.target.value)} />
       </InputdivStyles>
       <Columns>
       <p>Column</p>
       </Columns>
       {BoardColumn?.map((item,idx)=>(
         <InputdivStyles key={idx} created={true}>
          <input type="text" placeholder="e.g Web Design" 
         value={item}
          onChange={(e)=>setBoardColumn(prev=>prev.map((item,index)=>index===idx ? e.target.value : item))}
          />
          <Cancel onClick={()=>removeBoardColumn(idx)}><AiOutlineClose /></Cancel>
          </InputdivStyles>
          ))}

      <CustomButton 
      background="secondButton"
      color="button"
      onClick={addNewColumn}
      hover="secondaryColor"
      disabled={BoardInput.length < 1}
      >
      <AiOutlinePlus  />  Add New Column
      </CustomButton>
      
    </AddNewBoardStyles>
    <CustomButton 
      background="button"
      color="white"
      onClick={createNewBoard}
      hover="secondaryColor"
      >
        Create New Board
      </CustomButton>
    </CustomModal>
   
  )
}

export default AddNewBoard