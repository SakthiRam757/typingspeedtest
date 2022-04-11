import React, { useEffect, useState,useRef } from "react";
import './TypingForm.css'
import GeneratedText from "../GeneratedText/GeneratedText";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const TypingForm = (props)=>{
let formElement = useRef(null);

    if(props.clear)
    {
    formElement.current.value = ""
    }


const style =null;
let typingForm = (<div className="TypingForm">
<GeneratedText clength = {props.clength} 
GeneratedText = {props.GeneratedText} length={props.textLength} 
onChange = {props.onChange}
isWrong = {props.isWrong}
wrongText = {props.wrongText}
wrongPos = {props.wrongPos}
toggleHandler = {props.toggle}
></GeneratedText>
<textarea id="wordsInput" 
disabled = {props.submitted}
style = {style} className="TextArea" onChange={props.onChange} ref = {formElement}></textarea>

<button><FontAwesomeIcon icon = {faRefresh}></FontAwesomeIcon></button>

</div>)

return typingForm 

}
export default TypingForm;