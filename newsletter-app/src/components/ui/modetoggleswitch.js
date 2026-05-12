import { Component } from "react";
import lighticon from "../media/lighticon.svg";
import darkicon from "../media/darkicon.svg";

export default class modetoggle extends Component {
   
    render(){
        return(
              <div className={`${!this.props.loginStat ? "top-2 right-[1%]" : this.props.toggleplanCheck === "Plans" ? "lg:right-[8%] top-4 md:right-[10%] right-[50%]" : "top-4 lg:right-[24%] md:right-[39%] right-[12%]"} fixed z-50`}> 
                  
                <button
                //use target blur when u dont want the button to be focused on
                //issue i faced :
                //after toggling mode the enter key at start page instead of submission kept toggling
                //mode i.e. it was focused and blur unfocuses the target
      onClick={(e)=>{e.target.blur(); this.props.switchTheme()}}// faced a syntaxx issue for future ref
      // i did onClick={()=>func} valid when u do ()=>func() but because we already
      //sent a func theres no need to wrap it in another func that would just give the funcs val
      //not execute it like it will when we dont use the arrow func in onClick
      //because the passed prop is a func already
      // and if parent passes it as func() instead of func
// it fires on render instantly, child's arrow cant undo it
// child just holds the return value (usually undefined) not the func itself
      
      // className={`relative inline-flex items-center w-12 h-7 rounded-full transition-colors duration-600 focus:outline-none ${
      //   this.props.darkCheck ? "bg-blue-900" : "bg-yellow-300"
      // }`}
    >
      <span
        // className={`inline-block w-5 h-5 bg-slate-200 rounded-full shadow transform transition-transform duration-300 ${
        //   this.props.darkCheck ? "translate-x-6" : "translate-x-1"
        // }`}
        >
        <img className={`rounded-full h-8 w-8 p-[5px] ${!this.props.darkCheck ? "bg-stone-300" : "bg-gray-800"}`} src={this.props.darkCheck ? lighticon : darkicon} alt="dark/light switch"/>
      </span>
    </button>
  
              </div>
        )
    }
}