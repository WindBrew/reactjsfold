  export const planData = (planrec,exp,comp,saveData)=>{

    //read at top if u havent count
    comp.setState((prevState=>({subscriber : {...prevState.subscriber , 
      [prevState.email] : 
      {expiry: (prevState.subscriber[prevState.email].expiry ?? 0) + exp - prevState.counter
          , plan: planrec}}})),
          ()=>{
        saveData(comp.state.subscriber)

      
       console.log("comp is current expiry : ",comp.user.expiry)
     comp.setState({loader: true},()=>{comp.checkUser()});
      

        
        
      clearTimeout(comp.timeout);
      clearTimeout(comp.logouttime);
      comp.setState({counter: 0})
     
    
    
      console.log("Reached clear timers")
      
    
       
      
     
   
      
    })
    
    
    // comp adds the expiry and plan status to current mail
     
     
    
     // comp was added to access the granted permission
     // comp is necessary so that it doesnt directly show plans and asks the user to enter
     //email before anything without comp directly plans is shown as our render has a 
     //only two outputs cond 

  //  comp.setState(prevState=> ({subscriber : {...prevState.subscriber, [prevState.email] : {...prevState.subscriber[prevState.email], expiry : exp}}}), () =>{console.log("Current subs",comp.state.subscriber)
  //   console.log("mail check", comp.state.email)
  //   })     
   
  }