import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineCheck } from 'react-icons/ai';
import styled from 'styled-components';
import Checkbox from './CustomCheckbox';
import CustomIcon from './CustomIcon';
import ProfilePicture from './ProfilePicture';
import { Item } from './viewarea/IViewrea';

const Wrapper = styled.div`
    position: relative;
`
const Dropdown = styled.div<{top?:string;left?:string;bottom:string}>`
border: 0.5px solid ${({theme})=>theme.border};
    background-color:${({theme}) => theme.dropdownButton};
    position:absolute;
    top:${({top})=> top ?? "-300%"};
    left:${({left})=> left ?? "0%"};
    padding:15px 0;
  z-index:9999;
    font-size:12px;
    height:auto;
    width:240px;
    
    border-radius:6px; 
    & input {
        width:100%;
        height:30px;
        color:${({theme}) => theme.primary};
        padding:0px 8px;
        background:transparent;
        border:0;
  border-bottom:${({theme}) => `1px solid ${theme.nav}`};
        outline:none;
    }
`
const List = styled.ul`
  list-style-type:none;
 padding:5px 0px;
  margin:auto;
    & h4{
      margin-left:20px;
      padding:4px 0;
      font-weight:900;
    }
  & li {
    padding: 9px 20px;
  color:${({theme}) => theme.primary};
  cursor:pointer;
  transition:all 0.3s;
  margin: 0px 9px;
  display:flex;
  justify-content:space-between;
  align-items:center;
  &:hover {
    background:${({theme}) => theme.nav};
    color:${({theme}) => theme.white};

  }
 

  }  
   & > div {
    border:0.5px solid ${({theme}) => theme.border};
    position:absolute;
    min-width:100%;
    margin-top:10px;
  }
`
const Icon = styled.div`
    display:flex;
    gap:10px;
    align-items:center;
`
const User = styled.div`
   padding:4px 9px;
   color:${({theme}) => theme.primary};
   margin: 4px 9px;
  cursor:pointer;
  transition:all 0.3s;
  display:flex;
  justify-content:space-between;
  &:hover {
    background:${({theme}) => theme.nav};
    color:${({theme}) => theme.white};

  }
`

interface IDropdown {
    children:any;
    isOpen:boolean;
    setIsOpen:any;
    selected:Item;
    items?: Item[]
    selectItem:(e:any,item:Item)=>void
    top?:string;
    left?:string;
    noInput?:boolean;
    type?:string;
    checkBox?:boolean;
    user?:Item
}


const CustomDropdown = ({children,isOpen,top,left,noInput, setIsOpen,items,selected,selectItem,checkBox,type,user}:IDropdown) => {
  const [searchValue, setSearchValue] = useState('');
  const dropdownRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const handleClickOutside = (event:any) => {
      if (dropdownRef.current && !dropdownRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const handleSearchChange = (event:any) => {
    setSearchValue(event.target.value);
  };
  

  const filteredItems = items?.filter(
    (item) =>
      item?.name?.toLowerCase().indexOf(searchValue?.toLowerCase()) !== -1
  );


  const style = {
    bottom:"",
    top:""
  };
  if (isOpen) {
    // @ts-ignore
    // const rect = dropdownRef?.current.getBoundingClientRect();
    // if (rect.top > window.innerHeight / 2) {
    //     // @ts-ignore
    //   style.bottom = `${window.innerHeight - rect.top}px`;
    // } else {
    //     // @ts-ignore
    //   style.top = `${rect.bottom}px`;
    // }
  }

  const [checked,setChecked] = useState(false)
  return (
    <Wrapper ref={dropdownRef}>
      {children}
      {isOpen && (
        <Dropdown top={top} bottom={style.bottom}  left={left}>
         {!noInput ? <input
            type="text"
            className="dropdown-search"
            value={searchValue}
            onChange={handleSearchChange}
            placeholder="Search item"
          />: null}
          {user && 
          <User>
            {user.email}
          </User>}
          { type==="sidenav" ?
           <List className="dropdown-list">
            <h4>Your workspace</h4>
           {filteredItems?.filter((workspace)=>workspace?.owner?._id === user?._id).map((item, index) =>{
          
               return (
             <li key={index} onClick={(e:any)=>selectItem(e,item)}>  
              <Icon>
               <ProfilePicture assigned={item} tooltip={false} /> 
               <div>{item.name}</div> 
             </Icon>          
              {selected.name &&( selected.name?.toLowerCase() === item?.name?.toLowerCase() || selected.name?.toLowerCase() === item?.email?.toLowerCase()) && !item.type ? <AiOutlineCheck color="white" /> : null}
             
             </li>
           )
           } )}
            <h4>Invited workspace</h4>
           {filteredItems?.filter((workspace)=>workspace?.owner?._id !== user?._id).map((item, index) =>{
               return (
             <li key={index} onClick={(e:any)=>selectItem(e,item)}> 
              <Icon>
               <ProfilePicture assigned={item} tooltip={false} /> 
               <div>{item?.name}</div> 
             </Icon>
                        
              {selected.name &&( selected.name?.toLowerCase() === item?.name?.toLowerCase() || selected.name?.toLowerCase() === item?.email?.toLowerCase()) && !item.type ? <AiOutlineCheck color="white" /> : null}
            
             </li>
           )
           } )}
             <>
              <div />
              <li onClick={(e:any)=>selectItem(e,{name:"create workspace"})} style={{marginTop:"10px"}}>Create or Join a workspace   </li>
              <li onClick={(e:any)=>selectItem(e,{name:"Add new"})}>Log out</li>
              </>
         </List>
              :
            
 <List className="dropdown-list">
            {filteredItems?.map((item, index) =>{
                return (
              <li key={index} onClick={(e:any)=>selectItem(e,item)}>
              
              
             <Icon>
               {type==="image" && item.name !=="Unassign" ? 
               <ProfilePicture assigned={item} tooltip={false} /> :
               item.name && item.name !=="Unassign" && type!=="icon" ?
               <ProfilePicture assigned={item} tooltip={false} /> :
               item.type ==="color" ? 
               <>
                   <Checkbox checked={checked} name={item.name} />
                <CustomIcon img={item.img} type={item?.type} />
               </>
            : <CustomIcon img={item.img} />}  <div>{item.name}</div> {/* {item.email && <div>{item.email}</div>} */}
             </Icon>
             
               {selected.name &&( selected.name?.toLowerCase() === item?.name?.toLowerCase() || selected.name?.toLowerCase() === item?.email?.toLowerCase()) && !item.type ? <AiOutlineCheck color="white" /> : null}
              </li>
            )
            } )}
             
          </List>

            }
         
         
        </Dropdown>
      )}
    </Wrapper>
  );
};

export default CustomDropdown;
