export const randomColor = () => `#${Math.floor(Math.random()*16777215).toString(16)}`


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
if(!date){
  return
}else {
  let month = months[date.getMonth()];
  let day = date.getDate();
  let year = `${date.getFullYear()}`;
  console.log({month,day,year})
  return type ?
  `${month} ${day}` :
  `${month} ${day}, ${year}`

}
}