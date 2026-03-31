export const setSub = (comp,plan,expiry,saveData) =>{
      comp.setState(prevState=>({subscriber: {...prevState.subscriber ,
               [prevState.email] :  {plan: plan,expiry: expiry}}}),
               ()=>{
                
             saveData(comp.state.subscriber)
             
           

            })
}