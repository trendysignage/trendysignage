import React, { useEffect, useRef, useState } from "react";
import WebMain from "./main";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import "../../custom.css";
const Webplayer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const [screenId, setScreenId] = useState(id);
  const [divClass, setDivClass] = useState("landscape");
  const divRef = useRef(null);
  const handleAddClass = (string) => {
    setDivClass(string);
  };

  useEffect(() => {
    if (!screenId) {
      const localId = localStorage.getItem("myId");
      if (localId) {
        setScreenId(localId);
      } else {
        const newId = uuidv4(); // replace this with your own ID generation logic
        localStorage.setItem("myId", newId);
        setScreenId(newId);
      }
    }
  }, [screenId]);

  const onFullScreen = () => {
    console.log(divRef.current, "divRef.currenttttttttt");
    const className = divRef.current;
    console.log(className, "class name");
    if (className.getElementsByClassName("webplayer-composition-full-screen")) {
      // divRef.current.requestFullscreen();
      if (className.requestFullscreen) {
        className.requestFullscreen();
      } else if (className.webkitRequestFullscreen) {
        className.webkitRequestFullscreen();
      } else if (className.msRequestFullscreen) {
        className.msRequestFullscreen();
      } else if (className.mozRequestFullScreen) {
        className.mozRequestFullScreen();
      }
    }
  };

  // new function onFullScreen

  // const videoRef = useRef(null);
  // const onFullScreen = () => {
  //   console.log("iii", videoRef);
  //   const videoElement = videoRef.current;
  //   if (!videoElement) return; // Make sure the videoRef is defined

  //   const aspectRatio = videoElement.videoWidth / videoElement.videoHeight;
  //   const isPortrait = aspectRatio < 1; // Check if the video is in portrait mode

  //   if (isPortrait) {
  //     videoElement.classList.add("rotate-class");
  //   } else {
  //     videoElement.classList.remove("rotate-class");
  //   }

  //   if (videoElement.requestFullscreen) {
  //     videoElement.requestFullscreen();
  //   } else if (videoElement.webkitRequestFullscreen) {
  //     videoElement.webkitRequestFullscreen();
  //   } else if (videoElement.msRequestFullscreen) {
  //     videoElement.msRequestFullscreen();
  //   } else if (videoElement.mozRequestFullScreen) {
  //     videoElement.mozRequestFullScreen();
  //   }
  // };

  return (
    <div id={`main-wrapper`} className={`show`}>
      <div
        ref={divRef}
        className={`content-body content-body-custom web-player-body webplayer-composition-full-screen ${divClass}-view`}
      >
        <div
          className={`container-fluid`}
          style={{ minHeight: window.screen.height - 60 }}
        >
          {screenId && (
            <WebMain
              id={screenId}
              handleAddClass={handleAddClass}
              onFullScreen={onFullScreen}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Webplayer;
