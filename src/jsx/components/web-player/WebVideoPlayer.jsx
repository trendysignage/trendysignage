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
  }, [props]);

  useEffect(() => {
    if (playerRef.current) {
        console.log("playerRef.current.src", playerRef.current.src)
      playerRef.current.src({ src: props.src });
    }
  }, [props.src]);

  return (
    <div>
      <video ref={videoRef} className="video-js" />
    </div>
  );
};

export default WebVideoPlayer;
