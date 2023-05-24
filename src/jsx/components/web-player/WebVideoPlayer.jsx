import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

const WebVideoPlayer = (props) => {

  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    playerRef.current = videojs(videoRef.current, {
      autoplay: true,
      controls: false,
      muted:true,
      loop:true,
      src: props.src
    });
    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [props.src]);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.src({ src: props.src });
    }
  }, [props.src]);

  return (
  <> <video ref={videoRef} className="video-js" /></>
     

  );
};

export default WebVideoPlayer;
