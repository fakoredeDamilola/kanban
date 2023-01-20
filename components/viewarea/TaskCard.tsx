import styled from "styled-components"

interface ITaskCards {
    cards: Partial<{
        name:string
    }>
}

const TaskCardStyle = styled.div`
    
    background-color:purple;
    
`
const TaskCard = ({cards}:ITaskCards) => {
  return (
    <TaskCardStyle>

    </TaskCardStyle>
  )
}

export default TaskCard