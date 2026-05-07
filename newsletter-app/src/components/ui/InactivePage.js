import { Component } from "react";

export default class InactivePage extends Component{
    componentDidMount(){
         this.props.loader(true)
             console.log("called loader in inactivepage")
        setTimeout(()=>{
        this.props.loader(false)
        },350)
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
            <div className="flex fixed w-full h-full justify-center items-center  bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-300">
                 <div className="text-center">
                    <h1 className="text-4xl font-black " >No New News</h1>
                <br/>
                <h4 className="font-semibold">Sorry Page Not Found</h4></div>
            </div>

        )
    }
}