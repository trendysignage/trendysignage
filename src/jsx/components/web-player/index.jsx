import React, { useEffect, useState } from "react";
import WebMain from "./main";
import { v4 as uuidv4 } from "uuid";
import { useParams } from "react-router-dom";
import "../../custom.css";
const Webplayer = () => {
  const { id } = useParams();
  const [screenId, setScreenId] = useState(id);

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
  return (
    <div id={`main-wrapper`} className={`show`}>
      <div className={`content-body content-body-custom web-player-body`}>
        <div
          className={`container-fluid`}
          style={{ minHeight: window.screen.height - 60 }}
        >
          {screenId && <WebMain id={screenId} />}
        </div>
      </div>
    </div>
  );
};

export default Webplayer;
