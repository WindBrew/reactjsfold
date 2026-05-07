 export const logout = (comp,saveData) =>{
    //add logout functionality to show subpage and save the expiry stuff well it already saves just manage it
     
   clearInterval(comp.timecount)
  
    comp.setState(prevState=>({subscriber: {...prevState.subscriber , [prevState.email]: 
      {...prevState.subscriber[prevState.email], 
        expiry: prevState.subscriber[prevState.email].expiry - prevState.counter}},
      
        
        togglePlanNews: "Plans",
        loader: true, 
        isloggedIn: false,
        category: "all",
        page:"Active"
      }

      
      
      
      )
        ,
      ()=>{
       saveData(comp.state.subscriber);
        console.log("counter is",comp.state.counter)
        comp.setState({counter: 0,
     
      }); 
      
      clearTimeout(comp.timeout);
      clearTimeout(comp.logouttime);
      
     
  })
   
  }