const storeDataInLocalStorage = (key:string,value:string) => {
    return window.localStorage.setItem(key,value)
}


const retrieveDataInLocalStorage = (key:string) => {
   return  window.localStorage.getItem(key)
}

export {storeDataInLocalStorage,retrieveDataInLocalStorage}