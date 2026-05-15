import { Component } from "react";
import {ReactComponent as Loading} from "../media/loader.svg";

export default class Loader extends Component{

render(){
    return(
<div className="no-transition w-full h-full fixed justify-center items-center z-50 inset-0 flex bg-white dark:bg-black">
   
        <Loading className="w-34 h-36"/>

    </div>)}
}