import React, { useEffect, useRef } from 'react';
import videojs from 'video.js';

import 'video.js/dist/video-js.css';
const WebVideoPlayer = (props) => {
console.log(props, "WebVideoPlayer.jsx props")
  const videoRef = useRef(null);
  console.log(videoRef,"WebVideoPlayer .jsx")
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

  // useEffect(() => {
  //   if (playerRef.current) {
  //     playerRef.current.src({ src: props.src });
  //   }
  // }, [props.src]);

  useEffect(() => {
    if (playerRef.current && playerRef.current.tech()) {
      playerRef.current.tech().src({ src: props.src });
      playerRef.current.load();
    }
  }, [props.src]);




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
  <> <video ref={videoRef} className="video-js" /></>
  // <> <video ref={videoRef}   className="video-js" </video></>

//   <video ref={videoRef} className="video-js">
//   <source src={props.src} type="video/mp4" />
//   Your browser does not support the video tag.
// </video>
  );
};

export default WebVideoPlayer;
