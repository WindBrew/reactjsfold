import { Component } from "react"
import loading from "../media/loading.gif"

export default class Loader extends Component{

render(){
    return(
<div className=" w-full h-full fixed justify-center items-center z-50 inset-0 flex bg-white dark:bg-black">
   
        <img className="w-34 h-36"src={loading} alt="loader"/>

    </div>)}
}