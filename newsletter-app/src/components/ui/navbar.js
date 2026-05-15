import React, { Component } from "react";
import { NavLink} from "react-router-dom";
import {ReactComponent as Hamburgerbutton} from "../media/hamburger.svg"

export default class navbar extends Component {
   toggles = () =>{
    this.props.planToggle("Plans")
    
   }
   //to fix that categories modal stays open even after page is next or prev clicked
   state = {
    categories : false,
    prevActive: "All",
    active: "All",
    cats: ["All",
      'World',
  'Politics', 
  'Technology',
  'Science',
  'Business',
  'Football',
  'Sport',
  'Film',
  'Music',
  'Books',
  'Fashion',
  'Food',
  'Travel',
  'Environment',
  'Education',
  'Health',
  'Society',
  'Law',
  'Media',
  'Opinion']
  ,
  menu:false,

    
   }

     
  


   //add lowercaser for  rest of e.target.content
  
  passCategory = (e) => {
    this.setState({active: e.target.textContent},()=>{
    if(this.state.prevActive === this.state.active)
      {
        //temp load no category passed 
        // i can directly trigger fetch to fetch the same category again when its clicked
        //but because im using a free api with limited queries
        //its more efficient to not fetch so often but in a real scenario
        //its efficient to trigger fetch on every category click even if its the same category 
        this.props.loader(true)
        setTimeout(()=>this.props.loader(false),350)
      }  
      else{
        this.setState({prevActive: this.state.active})
           if (e.target.textContent !== 'Sports'){

    this.props.category(e.target.textContent.toLowerCase())
    
    }
    else if((e.target.textContent === 'Sports')){
      this.props.category('sport')
      
    }
      }
    })
 
}
componentDidUpdate(prevProp){
  if (prevProp.page !== this.props.page){
    this.setState({categories: false , menu: false})
  } 
}
// explained reduce and some function nature here  
//toDesignTitle = () =>{
//   this.props.webTitle.reduce((acc , item) =>{
//     //reduce fetches this.props.webTitle via acc= this
// //     Array.prototype.reduce = function(callback, startingValue) {
// //   let arr = this  // 'this' is the array before the dot
// //   let acc = startingValue

// //   for (let i = 0; i < arr.length; i++) {
// //     acc = callback(acc, arr[i])
// //   }

// //   return acc
// // }
// //in the above working example of reduce func
// //i shall elaborate why callback has an acc var inside it and when it can be ommited
// //its there cus sometimes the callback needs the previous value for determining 
// // and callback cannot access the main acc inside of main reduce func
// //and for simple stuff or things where your values dont depend on previous and you just wanna add
// //Array.prototype.reduce = function(callback, startingValue) {
// //   let arr = this  // 'this' is the array before the dot
// //   let acc = startingValue

// //   for (let i = 0; i < arr.length; i++) {
// //     acc += callback( arr[i])
// //   }

// //   return acc
// // } works without the acc inside of callbck by adding the += in main func but 
// //now the callback func cant read its prev val while acc did both adding and access to prev value
    
//   })
// }
//explained why we pass callback(acc,arr[i]) 
// acc starts at 0
//   → callback gets (0, 1)  → returns 1   → main acc is now 1
//   → callback gets (1, 2)  → returns 3   → main acc is now 3
//   → callback gets (3, 3)  → returns 6   → main acc is now 6
// done, return 6
//in simple words the acc in sub or user func returns acc + array item
//the main funcs acc stores the returned acc and returns the value to the
//callback so callbacks acc always has a updated acc to add more value to until valid
//and arr[i] is simply there to take each array item individually
// someloop(x = func(x,y){return x+y}=> next session of loop x = func(x(=passes in the prev x+y 
//that was returned by func and stored in x ) , y
//))) 


  loadCategories = () =>{
    return(
    this.state.cats.map(item=>{
                return(
                      <div className={`${this.state.active === item ? "text-blue-900" : ""} hover:text-blue-700 hover:cursor-pointer`} 
                      onClick={(e)=>{this.passCategory(e); this.setState({categories: false,menu: false})}}>{item}</div>
                    
     ) })
   )}
  render() {
    return (
      <div className="w-full bg-stone-100 text-black dark:text-white dark:bg-slate-900 fixed z-40 ">
      <nav className={`  w-full  top-0 start-0 shadow-lg dark:shadow-gray-800 dark:shadow-md `}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
          <h4
            
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-heading font-bold whitespace-nowrap">
             {this.props.pageName()}
            </span>
            
          </h4>
          <div className="md:hidden " >
          <Hamburgerbutton className="h-8 w-8 absolute right-2 top-3 dark:text-white" onClick={()=>{this.setState({menu: !this.state.menu, categories: !this.state.menu ? false : ""});}}/>
          {
            this.state.menu && 
            <div id="dropdownDelay" className="z-30 bg-gray-300/90  dark:bg-gray-800/90 rounded-xl right-[2%] top-[8%] min-w-[88px] min-h-58 fixed shadow-lg w-auto">
              <ul className="p-2 space-y-3 text-sm text-body text-center font-lg" aria-labelledby="dropdownDelayButton">
               <li onClick={this.toggles} className="border-bottom border-1 ">
                Plans
               </li>
               <li onClick={()=>{this.setState({categories : this.state.categories ? false : true})}}>
                Categories
               </li>
              
               <li className="text-red-500" onClick={this.props.logout}>
                Logout
               </li>
              </ul>
            
            </div>
          }
            
          
          </div> 
          <div>
             {
                this.state.categories && <div className="md:right-[10%] md:top-[8%] m-2 fixed right-[13%]  bg-gray-200/85 dark:bg-gray-800/95 border-none rounded-md p-4">
                  <div className="grid text-black dark:text-gray-400 grid-cols-3 span-col-2 gap-x-4 gap-y-4">
                    {this.loadCategories()}
                    </div>
                      </div>
                      }
          </div>
          <div className="hidden select-none md:flex  md:w-auto  " id="navbar-default">

            <ul className=" font-medium flex flex-col md:flex-row  mt-4 border border-default rounded-base bg-neutral-secondary-soft  space-x-8 rtl:space-x-reverse mt-0 border-0 bg-neutral-primary">
             
              <li>
                <span className="hover:text-blue-900 hover:scale-105 hover:cursor-pointer" onClick={()=>{this.setState({categories : !this.state.categories})}}>Categories</span>
                {"   "}
          
                 </li>
              <li >
                <NavLink to="/Plans"
                end
                  className="relative  overflow-hidden h-6 group inline-block  align-top"
                  aria-current="page"
                >
                  {" "}
                  <span className="block  group-hover:-translate-y-full transition-transform duration-300 font-small">
                    Plans
                  </span>
                  {"          "}
                  <span onClick={this.toggles} className="text-blue-900 block absolute top-full left-0 group-hover:translate-y-[-90%] transition-transform duration-300">
                    Plans
                  </span>
                </NavLink>
              </li>
          
              
               
          
            </ul>
             <button  onClick={this.props.logout} className="ml-4 mt-3 right-0 py-1 px-2 rounded font-medium select-none border-none text-gray-900 dark:text-white bg-slate-300 dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white">
            Log out
          </button>
           
            
       
         
          </div>
            
          
        </div>
      </nav>
      </div>
    );
  }
}
