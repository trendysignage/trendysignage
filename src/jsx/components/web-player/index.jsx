import React, { useEffect, useRef, useState } from "react";
import WebMain from "./main";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import "../../custom.css";
const Webplayer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("id");
  const isMobile = queryParams.get("isMobile");
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
    const divElement = divRef.current;
    const className = divRef.current;
    if (className) {
      const videoPlayerPortraitElement = divElement.querySelector(
        "#video-player-portrait"
      );

      if (videoPlayerPortraitElement) {
        // Perform actions on the found element here
        // For example, you can add a class to it or manipulate it in some way
        videoPlayerPortraitElement.classList.add("video-js-rotate");
      }
    }

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
              isMobile={isMobile}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Webplayer;
