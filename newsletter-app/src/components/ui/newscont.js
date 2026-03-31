import React, { Component } from 'react'

import noimg from "../media/noimg.jpg";

export default class newsContent extends Component {
    state = {
       
       
        page: 1,
        lastPage: false,
        data : {},
     
     
    };
    get apikey  () {return process.env.REACT_APP_NEWSLETTER_APIKEY}
    
    nextCheck = async () =>{
        const res =  await fetch(`/api/news?page=${this.state.page+1}`)
        this.localdata = await res.json()
        console.log(this.localdata.articles.length)
        this.setState({lastPage: this.localdata.articles.length === 0 || this.state.page > 4},()=>{console.log(this.state.lastPage)
            
        })
        
        
    }
  loadPagedata = async () =>{
        this.props.loader(true)
   
          const res =  await fetch(`/api/news?page=${this.state.page}`)
        this.setState({data : await res.json()},
    ()=>{
        this.max = this.state.data.articles.length
        console.log(this.max,"full")
        while(this.max % 3 !== 0){
            this.max -= 1
            console.log(this.max)
        }
        this.newsContdata = //when i used !(item.content === null && item.urlToImage === null) instead
        // it checked if both are not present instead of individual checking if either was present
        //it would bypass and get sent like image present content not true false = false then true 
        // here after they are seperate they check dont pass because and doesnt get reversed 
        //another approach would be doing !== on both sides instead of !()
        
         this.state.data.articles.slice(0,this.max).map((item) =>
            // if u do onEvent = () => func then it is valid but if u do directly
         //onEvent = func then it runs once immedietly on assignment
         //use window.location.href when u want link to open in the current tab replacing the current window
         //or use window.open works just the same like a href how does it open link in a new tab?
         //same way we use target blank in html 

             {return ( <div onClick={()=>{window.open(item.url,"_blank")}} key={item.url}  className={`dark:shadow-gray-700 dark:shadow-sm dark:bg-black dark:text-white cursor-pointer rounded-xl shadow-md py-2shadow-sm border-gray-700 border-[1px] overflow-hidden`}>
        <div className="relative">
            <img className="w-full h-48 object-cover" src={item.urlToImage ? item.urlToImage : noimg} alt="newsImage" />
            <div className="absolute top-0 right-0 bg-indigo-500 text-white font-bold px-2 py-1 m-2 rounded-md">New
            </div>
            <div className="absolute bottom-0 right-0 bg-gray-800 text-white pbgx-2 py-1 m-2 rounded-md text-xs">3 min read
            </div>
        </div>
        <div className="p-4">
            <div className="text-lg font-medium text-gray-800 mb-2 ">{item.title}</div>
            <p className="text-gray-500 text-sm">{item.description ? item.description : "no description..." }</p>
        </div>
    </div>)
    }

);
    setTimeout(()=>{ this.props.loader(false)},300)
   
    
    }
    );
   
       
        


        
  }
   
    async componentDidMount(){
        await this.loadPagedata()
        this.windowToTop()
        
        console.log("reached news content")
  
       
    }
    windowToTop = () =>{
        window.scrollTo({top: 0,behavior:'smooth'}) 
    }
    
    handlePrev = async () => {
      this.setState(prevState=>({page : prevState.page <= 1 ? prevState.page : prevState.page-1}),()=>{ this.loadPagedata(); this.windowToTop(); this.setState({lastPage: false})})
     

    }
    handleNext = async () => {
       this.setState(prevState=>({page : prevState.lastPage ? prevState.page : prevState.page+1}),()=>{ this.loadPagedata(); this.windowToTop();   this.nextCheck(); })
      
    }
    
  
  render() {

   
    return (
      
      <div className='flex flex-col pt-[65px] w-full h-full'>
        
            <>
            <div className="grid  grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 ml-2 mr-2 py-2 p-4 gap-4 bg-black">
    {this.newsContdata}
    
    </div>
    <div className='flex justify-center w-full mt-auto'>
        <nav className="flex space-x-2.5 justify-between w-full mx-4 my-2 bottom-0 mt-auto">

     {this.state.page > 1  &&
    <button disabled={this.state.page <= 1} className="flex   py-2 px-3 rounded font-medium select-none border-none text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white"
        onClick={this.handlePrev}>
        ⪻
        Previous
    </button>  }{!this.state.lastPage && <button disabled={true}></button>}
    {!this.state.lastPage &&
    <button disabled={this.state.lastPage} className="flex  py-2 px-3 rounded font-medium select-none border-none text-gray-900 dark:text-white bg-white dark:bg-gray-800 transition-colors hover:border-blue-600 hover:bg-blue-400 hover:text-white dark:hover:text-white"
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
