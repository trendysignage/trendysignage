import React, { useEffect, useState } from "react";
import WebMain from "./main";
import { v4 as uuidv4 } from 'uuid';
import { useParams  } from "react-router-dom";
const Webplayer = () => {
  const { id } = useParams();
  const [screenId, setScreenId] = useState(id);
console.log("screenId:", screenId)
  useEffect(() => {
    if(!screenId){
      const localId = localStorage.getItem('myId');
      if (localId) {
        setScreenId(localId);
      } else {
        const newId = uuidv4(); // replace this with your own ID generation logic
        localStorage.setItem('myId', newId);
        setScreenId(newId);
      }
    }
  }, [screenId]);
  return (
    <React.Fragment>
    {screenId && <WebMain id={screenId}/>}
    </React.Fragment>
  );
};

export default Webplayer;
