import { useState, useCallback, useEffect,ReactNode } from "react";
import ReactDOM from "react-dom";
const usePortal = (el:any) => {
  const [portal, setPortal] = useState({
    render: (el?:any) => null,
    remove: (el?:any) => null,
  });

  const createPortal = useCallback((el:any) => {
    const Portal = ({ children }:{children:ReactNode}) => ReactDOM.createPortal(children, el);
   
    const remove = (el:any) => ReactDOM.unmountComponentAtNode(el);
    return { render: Portal, remove };
  }, []);

  useEffect(() => {
    // if (el) portal.remove();
    const newPortal = createPortal(el);
    //@ts-ignore
    setPortal(newPortal);
    return () =>{
         newPortal.remove(el)
    };
  }, [el]);

  return portal.render;
};
export default usePortal; //link this Hook with the project