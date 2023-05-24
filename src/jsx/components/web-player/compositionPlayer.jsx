import React, { useEffect, useState, useRef } from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import {  BASE_URL } from "../../../utils/api";
const CompositionPlayer = ({ content, referenceUrl }) => {

  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef("");
  useEffect(() => {
    
    if (content[currentIndex]) {
     
      const timeoutDuration = content[currentIndex].duration * 1000;
      timeoutRef.current = setTimeout(() => {
        if(currentIndex === (content.length -1) ){
          setCurrentIndex(0);
        } else {
          setCurrentIndex((currentIndex) => currentIndex + 1);
        }
      }, timeoutDuration);
    } 
    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex]);
console.log(currentIndex, content.length)
  const viewImage = content[currentIndex].fitToScreen
    ? "fitScreen"
    : content[currentIndex].crop
    ? "crop"
    : "aspectRation";

  return (
    <>
      {" "}
      {content[currentIndex] && content[currentIndex].type === "image" && (
        <div className="basic-list-group image-preview-container media-content">
          <img
            className="webplayer-preview-img"
            style={{
              objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
            }}
            src={`${BASE_URL}${referenceUrl[currentIndex]}`}
            alt="media-img"
          />
        </div>
      )}
      {content[currentIndex] && content[currentIndex].type === "video" && (
        <div className={`basic-list-group video-container media-content ${viewImage === "fitScreen" ? "fitImage" : "containImage"}`}>
          <WebVideoPlayer src={`${BASE_URL}${referenceUrl[currentIndex]}`}></WebVideoPlayer>
        </div>
      )}
    </>
  );
};

export default CompositionPlayer;
