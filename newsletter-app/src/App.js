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
import InactivePage from "./components/ui/InactivePage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import React, { Component } from "react";


//usable logic shall live there with easy readibility
//no fuss or confusion easy to maintain and modify and !ebug
//and isloggedIn && <Navigate to="/" replace />
// sustained by itself when complexity increases!//tomorrow isloggedIn && <Navigate to="/" replace />
// a journey not to build as you reached
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
     webTitle: "NewsBy10Tacles",
     page: "Active"

      }
      get user(){ // use get func when u dont wanna pass parameters and call it directly
        //not preffered for complex funcs as it can be confusing
        //clean for returning simple outputs just clean
        //i used it to obtain a global val
         return this.state.subscriber[this.state.email]
      }
   
  
  
  setMails = (mails)=>{
    //react setState runs like setState(updates , callback) why call back?
    //so that the function doesnt run too soon on the old state but runs after th! 
// state isloggedIn && <Navigate to="/" replace />
// updated , useful for state dependant functions to run instantly instead
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
    this.setState({category: category,loader: true},async ()=>{console.log(this.state.category)
          console.log("called loader in App.category")
    // this.setState({category:(await fetch(`api/news?section=${this.state.category}`)).json().results.length <=0 ?  "missing" : this.state.category}
  
  //)
  
  const res = await fetch(`/api/news?section=${this.state.category}&page=1`)
  const data = await res.json()
  console.log("category length : ",data.response.total)
  if(data.response.total<=0){
  this.setState({page:"Inactive"})
  }
  else{
    this.setState({page:"Active"})
  }
    }
  ) 

    
  }
    planPage = (bool) =>{// using arrow funcs ensure
      
      //else it passes an erro! that this isloggedIn && <Navigate to="/" replace />
      // not found
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
  else{
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
   
    this.setState({dark: true},()=>saveTheme(this.state.dark))
  }
}
toShowtitle = () =>{
  return(
  [...this.state.webTitle].map((item,index)=>{
   if(["N","1","0"].includes(item)){
    return (<span className="text-red-800 text-3xl" key={index}>{item}</span>)

   }
  else if(["B","y"].includes(item)){
    return (<span className="text-blue-600 text-2xl" key={index}>{item}</span>)

   }
   else{
    return (<span className="text-xl" key={index}>{item}</span>)

   }//index is imp cus it needs to keep track every re render whether an element is there or gone
   //and it does it via index
  
}))
  }

  render() {
    
      //read at top if u havent
    //fix the button overlapping logout button in newscontpage
    //add a no news page for empty categories as some categories 
    // aren't always updated with new news
    //if you want the child to access the parents funcs return value
    //passing it in pro! as func() isloggedIn && <Navigate to="/" replace />
    // valid else always pass the func without calling it via ()
    //in cases where the parent has to pass args wrap it in a ()=>{func(args)} while sending as props
    // //      {/* {this.state.isloggedIn ? 
    //      (this.state.togglePlanNews==="News"? 
    //       (<Navigate to="/NewsPage"/>) : (<Navigate to="/Plans"/>)
        
    //       ) : (<Navigate to="/"/>)
    // } switching to conditional rendering as this renders every re render in the back */}
    return (
      <Router>
      <div className=" bg-white text-black h-full dark:bg-black dark:text-white w-full flex-[1_0_auto]">
    
     <Modetoggle darkCheck={this.state.dark} loginStat={this.state.isloggedIn} toggleplanCheck={this.state.togglePlanNews} switchTheme = {this.setTheme}/>
      
      {this.state.loader && <Loader/>}
     
        <Routes>
          <Route path="/InactivePage" element = {<><InactivePage loader={this.doLoad} load={this.state.load}/> <Navbar pageName = {this.toShowtitle}  category={this.passCategory} planToggle = {this.planPage} logout = {()=>logout(this,saveData)}/> </>}/>
        <Route path="/" index element = {<StartPage pageTitle={this.toShowtitle} mailtoparent = {this.setMails} loader = {this.doLoad} />}/>
      
        <Route path="/NewsPage" element={<><Navbar pageName = {this.toShowtitle}  category={this.passCategory} planToggle = {this.planPage} logout = {()=>logout(this,saveData)}/> <NewsContent category={this.state.category} loader = {this.doLoad}/>  </>}/>  
        <Route path="/Plans" element={<Plans planStats = {(planrecv,expiry)=>planData(planrecv,expiry,this,saveData)} loader = {this.doLoad}/>}/>
        </Routes>
 
    {!this.state.isloggedIn && (<Navigate to="/" replace />)}
    {this.state.isloggedIn && this.state.page !== "Inactive" &&
         this.state.togglePlanNews==="News" && (<Navigate to="/NewsPage" replace />) }
          {this.state.isloggedIn && 
          this.state.togglePlanNews==="Plans" && (<Navigate to="/Plans" replace />) 
          /* prefer conditional rendering over ? : ternary as it re renders everything each 
          re-render 
          i was suggested to look at using window.location.href instead so i shall
          look into it in later sessions
          //signing off :) Tue 7 Apr 2026 5:57AM
          */
          }
          {this.state.page === "Inactive" && (<Navigate to="/InactivePage" replace/>)}
    
      </div>
      
      </Router>
    );
  }
     
}

// note for nextt togglePlanNews - store login status in local storage add multiple subscribers and make the plans page pop up if 
// subscrip!ion status isloggedIn && <Navigate to="/" replace />
// not sub and add loading checking api status and element loaded ? if no show loading
