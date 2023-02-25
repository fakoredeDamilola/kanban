export interface IBarContent{
    name: string;
    quantity:number; 
    img?:string;
    }
export interface ITaskbar {
      taskbar:IBarContent
      view:string;
      newTask:(task:IBarContent)=>void    
  
  }

  export interface Item {
    name:string;
    email?:string;
    img?:string;
    type?:string
    id?:string;
    username?:string
  }