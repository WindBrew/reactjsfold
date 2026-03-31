if(!localStorage.getItem("SubscribedUserbase")){
localStorage.setItem('SubscribedUserbase' , JSON.stringify(
  {"westwing@gmail.com":{plan : "Subscribed",expiry : 25000} ,"nyantroller@gmail.com":{plan : "none",expiry:""},"bringmehome@gmail.com":{plan : "Subscribed",expiry : 45000}},
    // loginCount : {}
    
) 
)}
export const saveData = (data) =>{
    localStorage.setItem("SubscribedUserbase",JSON.stringify(data))
}
export const loadData = ()=>{
    return JSON.parse(localStorage.getItem("SubscribedUserbase"))
} 