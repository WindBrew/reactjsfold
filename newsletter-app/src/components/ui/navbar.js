import React, { Component } from "react";
import { NavLink} from "react-router-dom";

export default class navbar extends Component {
   toggles = () =>{
    this.props.planToggle("Plans")
   }
   state = {
    categories : false,
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

    
   }

     
  


   //add lowercaser for  rest of e.target.content
  
  passCategory = (e) => {
    this.setState({active: e.target.textContent})
    if (e.target.textContent !== 'Sports'){
    this.props.category(e.target.textContent.toLowerCase())
    
    }
    else if((e.target.textContent === 'Sports')){
      this.props.category('sport')
      
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
                      onClick={(e)=>{this.passCategory(e); this.setState({categories: false})}}>{item}</div>
                    
     ) })
   )}
  render() {
    return (
      <div className="w-full  bg-stone-100 text-black dark:text-white dark:bg-slate-900 fixed z-40 ">
      <nav className={`  w-full  top-0 start-0 shadow-lg dark:shadow-gray-800 dark:shadow-md `}>
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <h4
            
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-xl text-heading font-bold whitespace-nowrap">
             {this.props.pageName()}
            </span>
            
          </h4>
          
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body rounded-base md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-width="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          <div className="hidden w-full select-none md:flex md:w-auto" id="navbar-default">

            <ul className=" font-medium flex flex-col p-4 md:p-0 mt-4 border border-default rounded-base bg-neutral-secondary-soft md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-neutral-primary">
             
              <li>
                <span className="hover:text-blue-900 hover:scale-105 hover:cursor-pointer" onClick={()=>{this.setState({categories : this.state.categories ? false : true})}}>Categories</span>
                {"   "}
                {
                this.state.categories && <div className="absolute bg-gray-200/85 dark:bg-gray-900/95 border-none rounded-md p-4">
                  <div className="grid text-black dark:text-gray-400 grid-cols-3 span-col-2 gap-x-4 gap-y-4">
                    {this.loadCategories()}
                    </div>
                      </div>
                      }
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
              <li>
                <NavLink to="/AboutUs"
                  className="relative overflow-hidden h-6  group inline-block  align-top"
                  aria-current="page"
                >
                  {" "}
                  <span className="block group-hover:-translate-y-full transition-transform duration-300 font-small">
                    About Us
                  </span>
                  {"          "}
                  <span className="text-blue-900 font-small block absolute top-full left-0 group-hover:translate-y-[-90%] transition-transform duration-300">
                    About Us
                  </span>
                </NavLink>
              </li>
              <li>
                <NavLink to="/ContactUs"
                  className="relative overflow-hidden h-6  group inline-block  align-top"
                  aria-current="page"
                >
                  {" "}
                  <span className="block group-hover:-translate-y-full transition-transform duration-300 font-small">
                    Contact Us
                  </span>
                  <span className="text-blue-900 font-small block absolute top-full left-0 group-hover:translate-y-[-90%] transition-transform duration-300">
                    Contact Us
                  </span>
                </NavLink>
              </li>
              
               
          
            </ul>
             <button  onClick={this.props.logout} className="ml-4 flex right-0 py-1 px-2 rounded font-medium select-none border-none text-gray-900 dark:text-white bg-slate-300 dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white">
            Log out
          </button>
           
            
       
         
          </div>
            
          
        </div>
      </nav>
      </div>
    );
  }
}
