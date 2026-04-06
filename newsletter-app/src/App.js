import "./App.css";
import Navbar from "./components/ui/navbar";
// import IndexPage from "./components/indexpagecontent";
import NewsContent from "./components/ui/newscont";
import StartPage from "./components/ui/startPage";
import Plans from "./components/ui/plans";
import Loader from "./components/ui/loader";
import {saveData,loadData,saveTheme, fetchTheme} from "./components/utils/storage";
import { logout } from "./components/utils/logout";
import { planData } from "./components/utils/planData";
import {counterInitiate} from "./components/utils/counter";
import { setSub } from "./components/utils/setSubscriber";
import { expirationTimer } from "./components/utils/expiration";
import Modetoggle from "./components/ui/modetoggleswitch";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React, { Component } from "react";

//next step is to divide this logic in utils file
//usable logic shall live there with easy readibility
//no fuss or confusion easy to maintain and modify and debug
//and is sustained by itself when complexity increases
//tomorrow is a journey not to build as you reached
//the peak a new level unlocked well thats the point
//new level (btw keep it readable code easy to understand)
//a journey of rearrangement and organizing what we built
//to the advanced
export default class App extends Component {
  state = {
    email : "",
    subscriber: loadData(),
   
    
    // loginCount : JSON.parse(localStorage.getItem("Subscribedthis.userbase")).subscribers.map((subs) =>{
    //   return {subs : 0}
    // }) later make a login count system
     counter : 0,
     togglePlanNews: "Plans",
     isloggedIn: false,
     category: "",
     dark: false,
     webTitle: "NewsBy10Tacles"
      }
      get user(){ // use get func when u dont wanna pass parameters and call it directly
        //not preffered for complex funcs as it can be confusing
        //clean for returning simple outputs just clean
        //i used it to obtain a global val
         return this.state.subscriber[this.state.email]
      }
   
  
  
  setMails = (mails)=>{
    //react setState runs like setState(updates , callback) why call back?
    //so that the function doesnt run too soon on the old state but runs after the 
// state is updated , useful for state dependant functions to run instantly instead
//of needing a second run to act on the updated state
//just runs a function after the state updates , avoids reading prev state and only updated state
// for state reliant functions  
    this.setState({email: (mails)}, () => {
        console.log(this.state.email)
         
     
      console.log("after mail rec",this.state.loader)
      this.setState({togglePlanNews: "Plans",isloggedIn: true},()=>{this.checkUser()})
        }) 
        
         
       
  }
  passCategory = (category) =>{
    this.setState({category: category},()=>console.log(this.state.category))  
    
  }
    planPage = (bool) =>{// using arrow funcs ensure
      // your this is bound to parent (app)
      //else it passes an error that this is not found
      //a normal planPage(){} would not bind this to parent
      //but a planPage = () =>{} some react magic 
      
        this.setState({togglePlanNews: bool})// displays plan page 
        
    }
  

  
    //read at top if u havent
 checkUser = () => { 
  
  
  console.log(this.state.email)
    console.log(this.state.subscriber)
     console.log("This local storage as whole 1 : ",loadData())
    if(  this.user && this.user.plan === "Subscribed" && this.user.expiry > 0) {
      
      console.log("reachingMatched")
        console.log("matched")
        this.setState({togglePlanNews: "News"}

        ) // made home page display
        //condition false as soon as page gets displayed by it being true so that it doesn't prevent
        //other pages from loading 17-03-26
        
       expirationTimer(this,saveData,counterInitiate,setSub)//keep eye for inf loops // fix for expiration its not working ???
        



}
else if(!(this.user)){ // used to define the mail in database even with plan being none
   
  console.log("Not a subscriber yet",this.state.subscriber)
   setSub(this,"none",0,saveData)
}   

}
setTheme = () =>{
  this.setState({dark: !this.state.dark},
    ()=>{saveTheme(this.state.dark);
    console.log("toggling func");
    if(fetchTheme() === "dark"){
    document.documentElement.classList.add("dark")
    }
  else if(fetchTheme() === ""){
    document.documentElement.classList.remove("dark")
  }
    
    }
  )
  
}

doLoad = (load) =>{
  this.setState({loader: load})
 
}
componentDidMount(){
  if(fetchTheme() === "dark"){
    document.documentElement.classList.add("dark") 
    this.setState({dark: true})
  }
}
toShowtitle = () =>{
  return(
  [...this.state.webTitle].map((item)=>{
   if(["N","1","0"].includes(item)){
    return (<span className="text-red-800 text-3xl">{item}</span>)

   }
  else if(["B","y"].includes(item)){
    return (<span className="text-blue-600 text-2xl">{item}</span>)

   }
   else{
    return (<span className="text-xl">{item}</span>)

   }
  
}))
  }

  render() {
    
      //read at top if u havent
    //fix the button overlapping logout button in newscontpage
    //add a no news page for empty categories as some categories 
    // aren't always updated with new news
    //if you want the child to access the parents funcs return value
    //passing it in prop as func() is valid else always pass the func without calling it via ()
    //in cases where the parent has to pass args wrap it in a ()=>{func(args)} while sending as props
    //
    return (
      <Router>
      <div className=" bg-white text-black h-full dark:bg-black dark:text-white w-full flex-[1_0_auto]">
    
     <Modetoggle darkCheck={this.state.dark} toggleplanCheck={this.state.togglePlanNews} switchTheme = {this.setTheme}/>
      
      {this.state.loader && <Loader/>}
     
        <Routes>
        <Route path="/" index element = {<StartPage webTitle="NewsBy10Tacles" mailtoparent = {this.setMails} loader = {this.doLoad} />}/>
      
        <Route path="/NewsPage" element={<><Navbar webTitle = "NewsBy10Tacles"  category={this.passCategory} planToggle = {this.planPage} logout = {()=>logout(this,saveData)}/> <NewsContent category={this.state.category} loader = {this.doLoad}/>  </>}/>  
        <Route path="/Plans" element={<Plans planStats = {(planrecv,expiry)=>planData(planrecv,expiry,this,saveData)} loader = {this.doLoad}/>}/>
        </Routes>
       {this.state.isloggedIn ? 
         (this.state.togglePlanNews==="News"? 
          (<Navigate to="/NewsPage"/>) : (<Navigate to="/Plans"/>)
        
          ) : (<Navigate to="/"/>)
    }
      </div>
      
      </Router>
    );
  }
     
}

// note for nextt togglePlanNews - store login status in local storage add multiple subscribers and make the plans page pop up if 
// subscription status is not sub and add loading checking api status and element loaded ? if no show loading
