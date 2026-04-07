export const expirationTimer = (comp,saveData,counter,subUpdtr,categoryPass) =>{
         
          clearInterval(comp.timecount)
          counter(comp.user.expiry,comp)
          
       
         comp.timeout = setTimeout(()=>{
            console.log("TIMEOUT INITIATED")
            console.log(comp.state.subscriber[comp.state.email].expiry)
           subUpdtr(comp,"none",0,saveData)
                
            console.log("TO LOGOUT IN 4 SECONDS")
           comp.logouttime =  setTimeout(()=>{
          
              
              comp.checkUser()
              comp.setState({counter: 0,togglePlanNews: "Plans"})
              clearInterval(comp.timecount)
              categoryPass("all","Active")
             
            },4000)
          }, comp.state.subscriber[comp.state.email].expiry)
       
        }
