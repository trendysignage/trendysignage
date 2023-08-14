import React from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import moment from "moment";
import Moment from 'react-moment';
import Clock from "../Clock";
const Zone2 = ({ contents, currentIndex, current1Index, current2Index, viewImage}) => {


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


  return (
    <>
      {" "}
      {contents && contents.zones.length == 2 ? (
        <div
            style={{ height: "100vh" }}
        >
            <div className="top-div">
            {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type === "image" && (
                <div className="basic-list-group image-preview-container media-content">
                    <img
                    className="webplayer-preview-img"
                    style={{
                        objectFit: `${
                        viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                    }}
                    src={`http://144.126.143.140:5000/${contents.zones[0].content[currentIndex].url}`}
                    alt="media-img"
                    />
                </div>
            )}
            {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type === "video" && (
                <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                >
                    <WebVideoPlayer
                    src={`http://144.126.143.140:5000/${contents.zones[0].content[currentIndex].url}`}
                    ></WebVideoPlayer>
                </div>
            )}
            {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type === "url-apps" && (
                <div className="basic-list-group image-preview-container media-content">
                    <Iframe
                    url={`${contents.zones[0].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                    // id=""
                    // className=""
                    display="block"
                    position="relative"
                    />
                </div>
            )}
            {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type ===
                "youtube-apps" && (
                <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                >
                    <ReactPlayer
                    url={`${contents.zones[0].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                    />
                </div>
            )}
            {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type === "scroller" && (
                <>{handleScrollerApps(contents.zones[0].content[currentIndex].data)}</>
            )}
            {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type === "text-apps" && (
                <>{handleTextApps(contents.zones[0].content[currentIndex].data)}</>
            )}
            {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "clock-apps" && (
                <>{handleClockApps(contents.zones[0].content[currentIndex].data)}</>
            )}
            </div>
            <div className="bottom-div">
            {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type === "image" && (
                <div className="basic-list-group image-preview-container media-content">
                    <img
                    className="webplayer-preview-img"
                    style={{
                        objectFit: `${
                        viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                    }}
                    src={`http://144.126.143.140:5000/${contents.zones[1].content[currentIndex].url}`}
                    alt="media-img"
                    />
                </div>
            )}
            {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type === "video" && (
                <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                >
                    <WebVideoPlayer
                    src={`http://144.126.143.140:5000/${contents.zones[1].content[currentIndex].url}`}
                    ></WebVideoPlayer>
                </div>
            )}
            {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type === "url-apps" && (
                <div className="basic-list-group image-preview-container media-content">
                    <Iframe
                    url={`${contents.zones[1].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                    // id=""
                    // className=""
                    display="block"
                    position="relative"
                    />
                </div>
            )}
            {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type ===
                "youtube-apps" && (
                <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                >
                    <ReactPlayer
                    url={`${contents.zones[1].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                    />
                </div>
            )}
            {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type === "scroller" && (
                <>{handleScrollerApps(contents.zones[1].content[currentIndex].data)}</>
            )}
            {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type === "text-apps" && (
                <>{handleTextApps(contents.zones[1].content[currentIndex].data)}</>
            )}
            {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type === "clock-apps" && (
                <>{handleClockApps(contents.zones[1].content[currentIndex].data)}</>
            )}
            </div>
        </div>
      ) :
        <></>
      }
    </>
  );
};

export default Zone2;
