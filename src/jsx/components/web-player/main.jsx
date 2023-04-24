import React, { useEffect, useState, useRef } from "react";
import { addScreenCode, BASE_URL } from "../../../utils/api";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { io } from "socket.io-client";
import WebVideoPlayer from "./WebVideoPlayer";
const WebMain = ({id}) => {
  const [media, setMedia] = useState("");
  const [code, seCode] = useState("");
  const [contentType, setContentType] = useState("");
  // const [timeout, setApiTimeout] = useState("");
  const divRef = useRef(null);
  const getScreenCode = async () => {
    let timeoutTimer;
    const getContent = await addScreenCode(id);
    if (getContent.isVerified) {
      if (getContent?.content.length) {
        const getMedia =
          getContent?.content[getContent.content.length - 1].media;
        setMedia(`${BASE_URL}${getMedia.title}`);
        setContentType(getMedia.type); 
        clearTimeout(timeoutTimer)
        timeoutTimer = setTimeout(() => {
          getScreenCode();
        }, 60000);
      } else {
        setContentType("default_media");
      }
    } else {
      setContentType("code");
      seCode(getContent.deviceCode);
    }
  };
  const defaultMediaUrl = `${BASE_URL}/default/file_1681896290177.png`;
  useEffect(() => {
    const socket = io(BASE_URL, {
      query: { deviceToken: id },
      autoConnect: false,
      transports: ["websocket"],
      secure: true,
    });
    getScreenCode();
    // no-op if the socket is already connected
    socket.connect();
    function onReceiveContent(value) {
        console.log("value:", value)
      setContentType(null);
      getScreenCode();
    }
    function onDisconnectDevice(value) {
      setContentType(null);
      getScreenCode();
    }
    socket.on("disconnectDevice", onDisconnectDevice);
    
    socket.on("receiveContent", onReceiveContent);
    return () => {
      socket.disconnect();
      socket.off("receiveContent", onReceiveContent);
    };
  }, []);

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
    <Col xl="12">
      <div>
        <div>
          <div>
            {" "}
            <button id="Fullscreen" onClick={() => onFullScreen()}>
              <div class="full-text">
                <div class="sec-block">
                  {" "}
                  <i class="fa fa-expand"></i>
                  <p>View Full Screen</p>
                </div>
              </div>
            </button>
          </div>
        </div>
        {<div ref={divRef}>
          {contentType === "code" && (
            <div className="basic-list-group ">
              <div className="main-block">
                <div className="registration-block">
                  <p className="registration-title">
                    Screen Registration Code{" "}
                  </p>
                  <p className="code">{code}</p>
                </div>
              </div>
              <div className="webrowerTextSection">
                <div className="how-to-register">
                  How to register this screen ?
                </div>
                <div className="guidelines-login">
                  1. Login to on your internet browser{" "}
                </div>
                <div className="guidelines-login">
                  2. Go to 'Screen' section &gt; Click on{" "}
                  <Link>
                    <span className="white-color">'+Add Screen</span>'
                  </Link>{" "}
                  &gt; Enter above{" "}
                  <Link>
                    <span className="white-color">
                      Screen Registration Code
                    </span>
                  </Link>{" "}
                  &gt; Click on{" "}
                  <Link>
                    <span className="white-color">'Next'</span>
                  </Link>
                </div>

                <div className="guidelines-login">
                  3. Enter screen name and other details &gt; Click on
                  <Link>
                    <span className="white-color"> 'Register Screen'</span>
                  </Link>
                </div>
              </div>
            </div>
          )}
          {contentType !==null &&  contentType === "image" && (
            <div className="basic-list-group image-preview-container media-content">
              <img
                className="webplayer-preview-img"
                src={media}
                alt="media-img"
              />
            </div>
          )}
          {contentType !==null &&  contentType === "video" && (
            <div className="basic-list-group video-container media-content">
            <WebVideoPlayer src={media}></WebVideoPlayer>
              {/* <video
                title="video"
                width="100%"
                height="440px"
                src={}
              ></video> */}
            </div>
          )}
          {contentType === "default_media" && (
            <div className="basic-list-group image-preview-container media-content">
              <img
                className="webplayer-preview-img"
                src={defaultMediaUrl}
                alt="media-img"
              />
            </div>
          )}

          <div class="console-reg" id="consoleReg">
            <p>
              Copy paste above Screen Registration Code in console{" "}
              <em class="ti-arrow-circle-up"></em>
            </p>
          </div>
        </div>}

      </div>
    </Col>
  );
};

export default WebMain;
