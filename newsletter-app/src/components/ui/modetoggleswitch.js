import { Component } from "react";

export default class modetoggle extends Component {
    componentDidMount(){
        console.log(this.props)
    }
    render(){
        return(
              <div className={`${this.props.toggleplanCheck === "Plans" ? "top-2 right-0" : "top-4 right-[40%]"} absolute z-50`}> 
                   <span className="px-4">Light</span>
                <button
      onClick={this.props.switchTheme}// faced a syntaxx issue for future ref
      // i did onClick={()=>func} valid when u do ()=>func() but because we already
      //sent a func theres no need to wrap it in another func that would just give the funcs val
      //not execute it like it will when we dont use the arrow func in onClick
      //because the passed prop is a func already
      // and if parent passes it as func() instead of func
// it fires on render instantly, child's arrow cant undo it
// child just holds the return value (usually undefined) not the func itself
      
      className={`relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none ${
        this.props.darkCheck ? "bg-blue-900" : "bg-yellow-300"
      }`}
    >
      <span
        className={`inline-block w-3 h-3 bg-slate-200 rounded-full shadow transform transition-transform duration-300 ${
          this.props.darkCheck ? "translate-x-7" : "translate-x-1"
        }`}
      />
    </button>
    <span className="px-4">Dark</span>
              </div>
        )
    }
}