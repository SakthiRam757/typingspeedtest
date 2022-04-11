import React ,{useState,useEffect} from "react";
import TypingForm from "../TypingForm/TypingForm";
import random_words_str from "../GeneratedText/RandomWordsList";
import SpeedTrackers from "../Stats/SpeedTrackers/SpeedTrackers";
import "./Speedtest.css"
let startTime = new Date();
let time = 0;
let Clock = null;
let firstKeyPress = true;
const SpeedTest = (props)=>{
let words_gen = "";
let Acc = 0;
let additionalContent = null;
const [submitForm ,setSubmitForm] = useState(false);
const [shouldClear,setClear] = useState(false);
const [totalKeyStrokes,setKeyStrokes] = useState(0);
let random_words = random_words_str.split("\n");
const [text,setText] = useState(" ");
const [clength,setClength] = useState(0);
const [isWrong,setWrong] = useState(false);
const [wpm,setWpm] = useState(null);
const [wrongPos,setWrongPos] = useState(0);
const [WrongText,setWrongText]  = useState("");
let maxlength = 0;
const generateText = ()=>{
words_gen = ""


    for(let i = 0;i<props.length;i++)
    
{
    let temp = Math.floor(Math.random() * 2999);
    words_gen = words_gen+" "+random_words[temp];   
}
maxlength = words_gen.length;
setText(words_gen);

}
useEffect(()=>{
    generateText();
},[]);
useEffect(()=>{
    
    generateText();
},[props.length]);

const onTypingHandler=(event)=>{
const TypedString = event.target.value;
let is_wrong = false;
let l = 0;
setKeyStrokes(totalKeyStrokes+1);
if(firstKeyPress)
    {
    Clock = setInterval(()=>{
    time = time + 1;

    },1000)
    firstKeyPress = false;
    }
if(TypedString===text.substring(1))
    {
    setSubmitForm(true)
    clearInterval(Clock);
    setWpm(TypedString.length/time);
    }



    for(let i = 0;i<TypedString.length;i++)
    {
        if(TypedString[i]==text[i+1])
        {
        l++;
        }else{
         
            is_wrong = true;
            setWrongPos(i)
            setWrongText(TypedString.substring(i))
            
           break;
     
        }

    }
   setWpm((l/time)*60/5);
  setWrong(is_wrong)

setClength(l)
}


    return(
        <div>
            <div className="Timer">{time}</div>
            <TypingForm clength = {clength}GeneratedText = {text} 
            onChange = {onTypingHandler}
            isWrong = {isWrong}
            wrongPos = {wrongPos}
            wrongText = {WrongText}
            textLength = {props.length}
            submitted = {submitForm}
            clear = {shouldClear}
            ></TypingForm>
            
            <SpeedTrackers accuracy = {((clength/totalKeyStrokes)*100)
            ?((clength/totalKeyStrokes)*100).toFixed(2)
            :0} 
            gwpm = {((clength + WrongText.length||0)/time)*60/5?
            (((clength + WrongText.length||0)/time)*60/5).toFixed(2):0}
            wpm = {wpm?wpm.toFixed(2):null}
            completion = {(clength/text.length)*100}
            ></SpeedTrackers>
            
        </div>
    )
}
export default SpeedTest;