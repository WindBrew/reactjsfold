if(!localStorage.getItem("SubscribedUserbase")){
localStorage.setItem('SubscribedUserbase' , JSON.stringify(
  {"westwing@gmail.com":{plan : "Subscribed",expiry : 25000} ,"nyantroller@gmail.com":{plan : "none",expiry:""},"bringmehome@gmail.com":{plan : "Subscribed",expiry : 45000}},
    // loginCount : {}
    
) 
)}
if(!localStorage.getItem("theme",JSON)){
    localStorage.setItem("theme",JSON.stringify("light"))
}
export const saveTheme = (theme)=>{
    localStorage.setItem("theme",JSON.stringify(theme ? "dark" : ""))
} 
export const fetchTheme = ()=>{
    return JSON.parse(localStorage.getItem("theme"))
}
export const saveData = (data) =>{
    localStorage.setItem("SubscribedUserbase",JSON.stringify(data))
}
export const loadData = ()=>{
    return JSON.parse(localStorage.getItem("SubscribedUserbase"))
} 
