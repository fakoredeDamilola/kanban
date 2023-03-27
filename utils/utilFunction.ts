export const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`

export const hslColor = (str:string,s:number,l:number)=>{
  let hash = 0;
  console.log(str)
  for (let i=0; i <str.length;i++){
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  let h =  hash% 360;
  console.log('hsl('+h+'. '+s+'% ,'+l+'%)')
  return 'hsl('+h+', '+s+'% ,'+l+'%)'
}


export const handleFile = async (event:any,input:string) => {
    const formData = new FormData()
    formData.append('file', event)
    formData.append('upload_preset', 'sxzy4k1p')
    formData.append('folder', 'twf')


  try {
      const data = await fetch('https://api.cloudinary.com/v1_1/fakorede29/image/upload', {
          method: "POST",
          body: formData
        }).then(r => r.json())
       return data

      } catch (error) {
        console.log(error)
      }

  }
  export const CloudImage=async(form_data:FormData)=>{
    const cloudinary_url = process.env.NEXT_PUBLIC_CLOUDINARY_URL
    const cloudName = process.env.NEXT_PUBLIC_CLOUDNAME
    try{
        const imgUpload = await fetch(`${cloudinary_url}/${cloudName}/image/upload`,{
            method:"POST",
            body:form_data
        })
         const data = await imgUpload.json()
    
         if(data){
             return data.secure_url
         }

     }catch(err){

     }

     
}

// get month and day from date
export const getTextDate = (date:Date | any,type?:string) => {
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  console.log({date})
if(!date){
  return
}else {
  const dateInfo = new Date(parseInt(date) *1000)
  console.log({dateInfo})
  let month = months[dateInfo.getMonth()];
  let day = dateInfo.getDate();
  let year = `${dateInfo.getFullYear()}`;
  console.log({month,day,year})
  return type ?
  `${month} ${day}` :
  `${month} ${day}, ${year}`

}
}

export const confirmPassword = (value:string) => {
  const strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");

  const mediumRegex = new RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");

  if(strongRegex.test(value)){
      return "strong"
  }else if(mediumRegex.test(value)){
      return "medium"
  }else{
      return "weak"
  }

  }


  export const checkForError = (
    inputInfo:any,
    setErrorTable:React.Dispatch<React.SetStateAction<string[]>>,
    excludeInput:string[]
    ) =>{
    let value:keyof typeof inputInfo
      let arr:string[]=[]
    for( value in inputInfo){
      let str = inputInfo[value]
    if(str==="" && !excludeInput.includes(value)){
        arr.push(value)
      }
    }
      setErrorTable([...arr])
      return arr
  }