import React,{useState} from 'react'
import styled from 'styled-components'
import CustomDropdown from '../Customdropdown';
import { Item } from '../viewarea/IViewrea';
import { useDispatch } from 'react-redux';
import { selectSubItems } from '../../state/board';
import CustomIcon from '../CustomIcon';
import { device } from '../../config/theme';
import ProfilePicture from '../ProfilePicture';

const FooterIcon = styled.div`
 margin-left:10px;
    display:none;
    font-size:12px;
  @media ${device.mobileM} {
    display:block;
  }
`

const FooterWrapper = styled.div`
font-size:12px;
display:flex;
position:relative;
background-color:${({theme}) => theme.body};
color:#c4c0c0;
border-radius:6px;
align-items:center;
padding:7px;
border: 1px solid ${({theme}) => theme.border};
cursor:pointer;
&:hover {
    background-color:${({theme}) => theme.body};
    color:#f5f5f5;
}
& > div {

    margin-left:10px;
}
& > span {
visibility: hidden;
width: 100px;
background-color: #555;
color: #fff;
text-align: center;
border-radius: 6px;
padding: 5px 0;
box-sizing:border-box;
position: absolute;
z-index: 1;
display:flex;
       justify-content:center;
       align-items:center;
font-size:12px;
top:150%;
height:20px;
z-index:99;
left: 70%;
margin-left: -100px;
opacity: 0;
transition: opacity 0.3s;
}
& >span::after {
content: "";
position: absolute;
/* top: 130%;
left: 10%; */
margin-left: -5px;
}
&:hover > span {
visibility: visible;
opacity: 1;
}
& div:last-child{
            width:15px;
            height:15px;
            font-size:12px;
            color:${({theme,color}) => theme.text};
            display:flex;
            justify-content:center;
            align-items:center;
            margin-left:6px;
            border-radius:4px;
            background-color:${({theme,color}) => theme.background};
            cursor:pointer;
}
`
interface IFooter {
    item: {
        name:string;
        icon:any;
        tooltip:boolean;
        text:string;
        selected:Item;
        items?: Item[]
    }
}
const FooterMenu = ({item}:IFooter) => {
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const selectItem = (name:any,event:any,item:Item) => {
    item.type !== "color" && setIsOpen(false)
    dispatch(selectSubItems({name,item}))
   }
  return (
    <CustomDropdown 
    isOpen={isOpen}
    setIsOpen={setIsOpen}
    items={item.items}
    selected={item.selected}
    selectItem={(event:any,element:Item) =>selectItem(item.name,event,element)}
    left="80%"
    type={item.name==="Assigned" ? 'image' : 'icon'}
    checkBox={true}
    >
    <FooterWrapper onClick={handleButtonClick}>
       {item.name==="Assigned" && item.selected.name!=="Assigned" ? 
       <ProfilePicture assigned={item.selected} tooltip={false} size="15px" />
      : <CustomIcon img={item.selected.img ?? item.icon} type={item.selected.type} color="#D2D3E0" fontSize="12px"/>} 
     
         {item.text && <FooterIcon>{item.selected.name ?? item.name}</FooterIcon>}
      {item.text && <span>{item.text}<div>{item.name[0]}</div></span>}
     
      
    </FooterWrapper>
    </CustomDropdown>
     )
}

export default FooterMenu