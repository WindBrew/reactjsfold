import React, { Component } from 'react'

import noimg from "../media/noimg.jpg";

export default class newsContent extends Component {
    state = {
       
       
        page: 1,
        lastPage: false,
        data : {},
        date: new Date(),
        newsContdata: ""
       
       
     
     
    };
    checkNew = (targetDate) =>{
        //no need to split new Date handles iso dates
        //use new Date if u use just Date it wont give proper millisecs for calc
       
        return (this.state.date - new Date(targetDate))/(1000*60*60*24 )
    }
   
    get apikey  () {return process.env.REACT_APP_NEWSLETTER_APIKEY}
    
    nextCheck = async () =>{
        const res =  await fetch(`/api/news?page=${this.state.page+1}${this.props.category && this.props.category !== "all" ? `&section=${this.props.category}` : ""}`)
        this.localdata = await res.json()
        console.log(this.localdata.response.results.length)
        this.setState({lastPage: this.localdata.response.results.length === 0 || this.state.page > 4},()=>{console.log(this.state.lastPage)
            
        })
        
        
    }
  loadPagedata = async () =>{
    if(this.instance){
        this.instance.abort(new Error("Deleted old instance"))//new Error is a js class and 
        // new Error creates its object for us here its used to format whatever arg passed as an error msg 
        //and return as an error object when logged to console
        //theres also throw used for throwing errors 
        //it sets whatever u pass in its parameter as arguement into an error format
        //good for debugging and throwing your specific errors efficient in try catch
    }//abort if an instance already exists aka kill it
    //helps fix loading issues like switching categories too fast can cause multiple fetches
    //this will kill all previous fetches till latest 
    //the arg passed in abort parameter is just a reason nothing significant
    //might help with not throwing the error 'aborted without a reason'
    //we use try and catch to handle abortError as aborting a previous fetch will always throw an error
    //not a critical error yet 
    //here what i mean by  an error is if an error is unhandled
    // it turns the page red overlay with error msg making ui unusable
    //catch handles it like a champ and gives u info about the error in my case
    //we can also use catch to act on whatever went wrong 
    //abort("") error -> "" abort(new Error(""))-> Error: "" (formatted as error obj) abort() -> 
    // (->AbortError: aborted without a reason)
    //returns an error "signal aborted for no reason"

    this.instance = new AbortController()//begin a new instance
        this.props.loader(true)
            console.log("called loader in newspage")
      
    try{
          const res =  await fetch(`/api/news?page=${this.state.page}${this.props.category && this.props.category !== "all" ? `&section=${this.props.category}` : ""}`,
            {signal: this.instance.signal}
          )
        this.setState({data : await res.json()},
      
    ()=>{  console.log(this.state.data);
        this.max = this.state.data.response.results.length
        console.log(this.max,"full")
        while(this.max % 3 !== 0){
            this.max -= 1
            console.log(this.max)
        }
        this.setState({newsContdata : //when i used !(item.content === null && item.urlToImage === null) instead
        // it checked if both are not present instead of individual checking if either was present
        //it would bypass and get sent like image present content not true false = false then true 
        // here after they are seperate they check dont pass because and doesnt get reversed 
        //another approach would be doing !== on both sides instead of !()
        
         this.state.data.response.results.slice(0,this.max).map((item) =>
            // if u do onEvent = () => func then it is valid but if u do directly
         //onEvent = func then it runs once immedietly on assignment
         //use window.location.href when u want link to open in the current tab replacing the current window
         //or use window.open works just the same like a href how does it open link in a new tab?
         //same way we use target blank in html 

             {return ( <div onClick={()=>{window.open(item.webUrl,"_blank")}} key={item.webUrl}  className={`transition-all duration-500 bg-stone-300 dark:shadow-gray-700 dark:shadow-sm dark:bg-[#10151c]  cursor-pointer rounded-xl shadow-md pb-2 shadow-sm border-gray-400 dark:border-none border-[1px] overflow-hidden`}>
        <div className="relative">
            <img className="w-full h-48 object-cover" src={item.fields.thumbnail ? item.fields.thumbnail : noimg} alt="newsImage" />
            {this.checkNew(item.fields.lastModified) <= 1 &&
            <div className="absolute top-0 right-0 bg-indigo-500 text-white 
            font-bold px-2 py-1 m-2 rounded-md">
                New
            </div>
             }
            <div className="absolute bottom-0 right-0 bg-gray-800/70 text-white pbgx-2 px-2  dark:bg-gray-500/70 dark:text-white  py-1 m-2 rounded-md text-xs">{Math.ceil(item.fields.wordcount /200)} min's read
            </div>
        </div>
        <div className="p-4">
            <div className="text-lg font-medium text-stone-900 dark:text-stone-300 mb-2 ">{item.webTitle}</div>
            <p className="text-gray-800 dark:text-stone-400 text-sm">{item.fields.trailText ? item.fields.trailText : "no description..." }</p>
        </div>
    </div>)
    }

)},()=>this.props.loader(false))

    
  
    
    }
    )}
    catch(error){
        if(error.name === "Error"){
        console.log(error.name ,": Error Message : ",error.message)
        }
        //try catch - if x works nice if something goes wrong do this
    }
   
       
        


        
  }
   
    async componentDidMount(){
        await this.loadPagedata()
        this.windowToTop()
        
        console.log("reached news content")
  
       
    }
    async componentDidUpdate(x){
        if(x.category !== this.props.category){
            
            this.setState({page: 1},()=>{
                 this.windowToTop()
                this.loadPagedata()
                this.props.passPage(this.state.page)


            })
            
        }
    }
    windowToTop = () =>{
        window.scrollTo({top: 0,behavior:'smooth'}) 
    }
    
    handlePrev = async () => {
      this.setState(prevState=>({page : prevState.page <= 1 ? prevState.page : prevState.page-1}),()=>{ this.loadPagedata(); this.windowToTop(); this.setState({lastPage: false}); this.props.passPage(this.state.page)})
     

    }
    handleNext = async () => {
       this.setState(prevState=>({page : prevState.lastPage ? prevState.page : prevState.page+1}),()=>{ this.loadPagedata(); this.windowToTop();   this.nextCheck(); this.props.passPage(this.state.page)})
      
    }
    
  
  render() {

   
    return (
      
      <div className='flex pb-16 min-h-screen flex-col pt-[70px] w-full h-full dark:bg-gray-900'>
        
            <>
            <div className="grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 ml-2 mr-2 py-2 p-4 gap-4 dark:text-white dark:bg-gray-900">
    {this.state.newsContdata}
    
    </div>
    <div className='flex justify-center fixed bottom-2 bg-primary-default w-full mt-auto'>
        <nav className="flex space-x-2.5 justify-between w-full mx-4 my-2 bottom-0 mt-auto">

     {this.state.page > 1  &&
    <button disabled={this.state.page <= 1} className=" bg-gray-400/90   py-2 px-3 rounded font-medium select-none border-none text-gray-900 dark:text-white bg-slate-300/60 dark:bg-gray-800 transition-colors md:hover:border-blue-600 md:hover:bg-blue-400 md:hover:text-white dark:md:hover:text-white"
        onClick={this.handlePrev}>
        ⪻
        Previous
    </button>  }{!this.state.lastPage && <button disabled={true}></button>}
    {!this.state.lastPage &&
    <button disabled={this.state.lastPage} className=" bg-gray-400/90 py-2 px-3 rounded font-medium select-none border-none text-gray-900 dark:text-white bg-slate-300/60 dark:bg-gray-800 transition-colors md:hover:border-blue-600 md:hover:bg-blue-400 md:hover:text-white dark:md:hover:text-white"
        onClick={this.handleNext}>
        Next
        ⪼
    </button>}
</nav>

    </div>
    </>

    
    
  
    
 
 
     </div>
  
  
    )
}
}
