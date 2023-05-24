import React, { useEffect, useRef, useState } from "react";
import WebMain from "./main";
import { v4 as uuidv4 } from "uuid";
import { useLocation } from "react-router-dom";
import "../../custom.css";
const Webplayer = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const [screenId, setScreenId] = useState(id);
  const [divClass, setDivClass] = useState('landscape');
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
    if (divRef.current) {
      // divRef.current.requestFullscreen();
      if (divRef.current.requestFullscreen) {
        divRef.current.requestFullscreen();
      } else if (divRef.current.webkitRequestFullscreen) {
        divRef.current.webkitRequestFullscreen();
      } else if (divRef.current.msRequestFullscreen) {
        divRef.current.msRequestFullscreen();
      }
    }
  };
  return (
    <div id={`main-wrapper`} className={`show`}>
      <div ref={divRef} className={`content-body content-body-custom web-player-body ${divClass}-view`}>
        <div
          className={`container-fluid`}
          style={{ minHeight: window.screen.height - 60 }}
        >
          {screenId && <WebMain id={screenId} handleAddClass={handleAddClass} onFullScreen={onFullScreen}/>}
        </div>
      </div>
    </div>
  );
};

export default Webplayer;
