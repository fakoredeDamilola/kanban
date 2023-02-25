import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import Navbar from '../../components/navs/Navbar'
import { ITaskCards } from '../../state/board'
import { RootState } from '../../state/store'

const Wrapper =styled.div`
  background-color: ${({theme}) => theme.body};
  display:flex;
  width:100%;
  max-height:100%;
  height:100%;

`
const FlexWrapper = styled.div<{view:string}>`
 color:${({theme}) => theme.primary};
  overflow-x: scroll; /* enable horizontal scrolling */
  display:${({view}) => view==="list" ? "block" : "flex"};
  padding:${({view}) => view==="list" ? "50px 0px" : "70px 20px"};
  max-height:100%;
  gap:40px; 
  margin-top:${({view}) => view==="list" ? "20px" : "0px"};
 flex: 1 1 auto;
   
`

const Search = () => {
    
  const {boardsDetails} = useSelector((state:RootState)=>state.board)
    const router = useRouter()
    const [workspace,setWorkspace] = useState<any>("")
    const [tasks,setTasks] = useState([])
    useEffect(()=>{
        if(router?.query.id){
           setWorkspace(router.query.id)
        }
        console.log(router.query)
      },[router.query])
      useEffect(()=>{
        if(boardsDetails){
          if(router?.query?.id){
             // @ts-ignore
             setTasks(boardsDetails.tasks)

          }
        }
      },[boardsDetails,workspace])
  return (
    <Wrapper>
        <Navbar/>
        <FlexWrapper view="red">
        {tasks.length> 0 ? tasks.map((item:ITaskCards,index)=>{
            return (
                <div >
                    {item.issueTitle}
                </div>
            )
        }):null

        }
        </FlexWrapper>
    </Wrapper>
  )
}

export default Search