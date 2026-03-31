export const counterInitiate = (end,comp) => {
  if(comp.state.counter < end){
  
    comp.timecount = setInterval(()=>{comp.setState(prevState=>({counter: prevState.counter+1000}),
    ()=>{console.log(comp.state.counter)});//prints latest counter else
      //it would always show counter - 1000 of current if not in callback
     if(comp.state.counter >= end){
      clearInterval(comp.timecount)
     }
  //   
  // 
   },1000)
  }
   else{
    comp.setState({counter: 0})
  }
   }

