
  export const NotifyComponent = ({title,text,type}:{title:string;text:string;type?:string}) => (
    <div>
      <h4>{title}</h4>
      <p style={{margin:"10px 0",fontSize:"12px"}}>{text}</p>
    </div>
  )
