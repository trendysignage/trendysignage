import React, { useEffect, useRef } from "react";
import videojs from "video.js";

import "video.js/dist/video-js.css";
const WebVideoPlayer = (props) => {
  console.log(props, "WebVideoPlayer.jsx props");
  const rotateMode = "potrait";
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    videoRef.current?.load();
    // playerRef.current = videojs(videoRef.current, {
    //   autoplay: true,
    //   controls: false,
    //   muted:true,
    //   loop:true,
    //   src: props.src
    // });
    // console.log("test",playerRef.current, videoRef.current)
    return () => {
      videoRef.current?.load();
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

  // useEffect(() => {
  //   if (playerRef.current && playerRef.current.tech()) {
  //     playerRef.current.tech().src({ src: props.src });
  //     playerRef.current.load();
  //   }
  // }, [props.src]);

  // const videoRef = useRef(null);
  // const playerRef = useRef(null);

  // useEffect(() => {
  //   // Create the Video.js player instance
  //   playerRef.current = videojs(videoRef.current, {
  //     autoplay: true,
  //     controls: false,
  //     loop: true,
  //     muted: true,
  //     sources: [{
  //       src: props.src,

  //     }],
  //   });

  //   // Cleanup when component unmounts
  //   return () => {
  //     if (playerRef.current) {
  //       playerRef.current.dispose();
  //       playerRef.current = null;
  //     }
  //   };
  // }, []);

  // const videoRef = useRef(null);
  // useEffect(() => {
  //   const video = videoRef.current;

  //   const handleEnded = () => {
  //     video.currentTime = 0; // Restart the video from the beginning
  //     video.play(); // Start playing the video again
  //   };

  //   video.addEventListener('ended', handleEnded);

  //   return () => {
  //     video.removeEventListener('ended', handleEnded);
  //   };
  // }, []);
  return (
    //<> <video ref={videoRef} className="video-js" /></>
    // <> <video ref={videoRef}   className="video-js" </video></>

    <video
      ref={videoRef}
      className="video-js"
      id={`${
        props.layout && props.layout === rotateMode
          ? "video-player-portrait"
          : ""
      }`}
      // id="video-player-portrait"
      autoPlay
      muted
      loop
    >
      <source src={props.src} type="video/mp4" />
    </video>
  );
};

export default WebVideoPlayer;
