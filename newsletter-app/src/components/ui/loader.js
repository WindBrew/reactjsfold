import { Component } from "react"
import loading from "../media/loading.gif"

export default class Loader extends Component{

render(){
    return(
<div className=" w-full h-full fixed justify-center items-center z-50 inset-0 flex bg-black">
   
        <img className="w-24 h-26"src={loading} alt="loader"/>

    </div>)}
}