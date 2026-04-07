import { Component } from "react";

export default class InactivePage extends Component{
    componentDidMount(){
         this.props.loader(true)
             console.log("called loader in inactivepage")
        setTimeout(()=>{
        this.props.loader(false)
        },2000)
    }
    componentDidUpdate(x){
        if(x.loadStat !== this.props.load){
            this.props.loader(false)
        }

    }
    componentWillUnmount(){
        this.props.loader(true)
    }
    render(){
        return(
            <div className="flex fixed w-full h-full justify-center items-center  bg-white text-gray-700 dark:bg-black dark:text-gray-300">
                <h4 >Sorry Page Not Found</h4>
            </div>

        )
    }
}