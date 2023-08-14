import React, { useEffect, useState, useRef } from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import { BASE_URL } from "../../../utils/api";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import { fontSize } from "@material-ui/system";
import moment from "moment";
import Moment from 'react-moment';
import Clock from "../Clock";
import Zone1 from './Zone1';
import Zone2 from './Zone2';
import Zone3 from './Zone3'
import { getWeather } from "../../../utils/api";
const CompositionPlayer = ({ contents, content, referenceUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [current1Index, setCurrent1Index] = useState(0);
  const [current2Index, setCurrent2Index] = useState(0);
  const timeout1Ref = useRef("");
  const timeoutRef = useRef("");

  const monthName = ['Jan', 'Feb', 'March', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  const dayName = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const handleScrollerApps = (data) => {
    const prp = JSON.parse(data);
    let speed = 5;
    let allignment = 'left';
    if(prp.speed && prp.speed == 'medium'){
      speed = 12;
    }
    else if(prp.spped && prp.speed == 'hight'){
      speed = 20;
    }
    if(prp.allign == 'Right-to-Left'){
      allignment = 'right'
    }
    let txt = '';
    if(prp.style == 'italic'){
      txt =  <i><marquee direction={allignment} scrollAmount={speed} style={{color:prp.textColor,fontSize:"50px"}}>{prp.url}</marquee></i>
    }else if(prp.style == 'bold'){
      txt =  <b><marquee direction={allignment} scrollAmount={speed}  style={{color:prp.textColor,fontSize:"50px"}}>{prp.url}</marquee></b>
    }else{
      txt = <marquee direction={allignment} scrollAmount={speed}  style={{color:prp.textColor,fontSize:"50px"}}>{prp.url}</marquee>
    }
    return <div className="basic-list-group image-preview-container media-content" style={{backgroundColor:prp.backGroundColor}}>{txt}</div>
  }

  const handleTextApps = (data) => {
    const prp = JSON.parse(data);
    let txt = "";
    if(prp.style == 'Italic'){
      return <div className="basic-list-group image-preview-container media-content" style={{backgroundColor:prp.backGroundColor,color:prp.textColor, fontWeight:prp.weight, textAlign:prp.allign}}><i>{prp.content}</i></div>
    }else if(prp.style == 'Bold'){
      return <div className="basic-list-group image-preview-container media-content" style={{backgroundColor:prp.backGroundColor,color:prp.textColor, fontWeight:prp.weight, textAlign:prp.allign}}><b>{prp.content}</b></div>
    }else{
      return <div className="basic-list-group image-preview-container media-content" style={{backgroundColor:prp.backGroundColor,color:prp.textColor, fontWeight:prp.weight, textAlign:prp.allign}}>{prp.content}</div>
    }
  }

  const handleClockApps = (data) => {
      const cdate = new Date();
      const prp = JSON.parse(data);
      let tF = '';
      
    console.log("timeFormat",prp.timeFormat)
      if(prp.timeFormat == 'lefAnalogue - 12 hourt'){ 
        return <div className="basic-list-group image-preview-container media-content" style={{fontSize:"50px", color:'white', textAlign:'center'}} ><div style={{position:'relative'}}><Clock /></div>{prp.hideDate ?<p style={{fontSize:"20px"}}>{`${cdate.getDate()} ${monthName[cdate.getDay()] } ${dayName[cdate.getDay()] } Indian Standard Time` }</p> : ''}</div>

      }else{
        if(prp.timeFormat == 'Digital - 12 hour'){
          tF = "hh:mm A";
        }else if(prp.timeFormat == 'Digital - 24 hour'){
          tF = "HH:MM A";
        }

        return <div className="basic-list-group image-preview-container media-content" style={{fontSize:"100px", color:'white', textAlign:'center'}} >
            <Moment format={tF} date={new Date()} />
            {!prp.hideDate ?<p style={{fontSize:"20px"}}>{`${cdate.getDate()} ${monthName[cdate.getDay()] } ${dayName[cdate.getDay()] } Indian Standard Time` }</p> : ''}
            
            </div>
      }
    
    // const prp = JSON.parse(data);
    // let txt = "";
    // if(prp.style == 'Italic'){
    //   return <div className="basic-list-group image-preview-container media-content" style={{backgroundColor:prp.backGroundColor,color:prp.textColor, fontWeight:prp.weight, textAlign:prp.allign}}><i>{prp.content}</i></div>
    // }else if(prp.style == 'Bold'){
    //   return <div className="basic-list-group image-preview-container media-content" style={{backgroundColor:prp.backGroundColor,color:prp.textColor, fontWeight:prp.weight, textAlign:prp.allign}}><b>{prp.content}</b></div>
    // }else{
    //   return <div className="basic-list-group image-preview-container media-content" style={{backgroundColor:prp.backGroundColor,color:prp.textColor, fontWeight:prp.weight, textAlign:prp.allign}}>{prp.content}</div>
    // }
  }

  const handleWeatherApps = (data) => {
    const prp = JSON.parse(data);
    return <div className="basic-list-group image-preview-container media-content" style={{fontSize:"50px", color:'white', textAlign:'center'}} >Weather Apps</div>
  }

  useEffect(() => {
    if (contents && contents.zones.length == 1) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
    } else if (contents && contents.zones.length == 2) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contents.zones[1].content[current1Index]) {
        const timeout1Duration =
          contents.zones[1].content[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current1Index === contents.zones[1].content.length - 1) {
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
    } else if (contents && contents.zones.length == 3) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contents.zones[1].content[current1Index]) {
        const timeout1Duration =
          contents.zones[1].content[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current1Index === contents.zones[1].content.length - 1) {
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
      if (contents.zones[2].content[current2Index]) {
        const timeout1Duration =
          contents.zones[2].content[current2Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current2Index === contents.zones[2].content.length - 1) {
            setCurrent2Index(0);
          } else {
            setCurrent2Index((current2Index) => current2Index + 1);
          }
        }, timeout1Duration);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, current1Index]);
  const viewImage = content[currentIndex]?.fitToScreen
    ? "fitScreen"
    : content[currentIndex]?.crop
    ? "crop"
    : "aspectRation";

  return (
    <>
      {" "}
      {contents && contents.zones.length == 1 ? (
          <Zone1 contents={contents} currentIndex={currentIndex} current1Index={current1Index}  current2Index={current2Index} viewImage={viewImage}/>
      ) : contents.zones.length == 2 ? (
          <Zone3 contents={contents} currentIndex={currentIndex} current1Index={current1Index}  current2Index={current2Index} viewImage={viewImage}/>
      ) : contents.zones.length == 3 ? (
          <Zone3 contents={contents} currentIndex={currentIndex} current1Index={current1Index}  current2Index={current2Index} viewImage={viewImage}/>
      ) : (
        <></>
      )}
    </>
  );
};

export default CompositionPlayer;
