import React, { useEffect, useState, useRef } from "react";
import {
  addScreenCode,
  BASE_URL,
  getCompositionById,
} from "../../../utils/api";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { io } from "socket.io-client";
import WebVideoPlayer from "./WebVideoPlayer";
import CompositionPlayer from "./compositionPlayer";
import useSWR from "swr";
const WebMain = ({ id, handleAddClass, onFullScreen }) => {
  const [media, setMedia] = useState("");
  // console.log(media, "media");
  const [code, seCode] = useState("");
  const [contentType, setContentType] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  console.log(`%c${contentType}`, "font-size:20px;color:red");
  const initiaload = useRef(true);
  // const [timeout, setApiTimeout] = useState("");
  useEffect(() => {
    console.log(contentType, "contentType check inside main.jsx");
  });
  const getScreenCode = async () => {
    let timeoutTimer;
    const getContent = await addScreenCode(id);
    console.log(getContent, "llllllll");
    setIsVerified(getContent?.isVerified);
    if (getContent.isVerified) {
      if (getContent?.content.length) {
        const getMedia =
          getContent?.content[getContent.content.length - 1].media;
        const mediaType =
          getContent?.content[getContent.content.length - 1].type;

        if (mediaType === "composition") {
          setMedia(getMedia);
          setContentType("composition");
        } else {
          setMedia(`${BASE_URL}${getMedia.title}`);
          setContentType(getMedia.type);
          clearTimeout(timeoutTimer);
          timeoutTimer = setTimeout(() => {
            console.log("normal timeout");
            getScreenCode();
          }, 6000);
        }
      } else {
        setContentType("default_media");
        setMedia(getContent.defaultComposition.media);
      }
    } else {
      setContentType("code");
      seCode(getContent.deviceCode);
    }
  };
  // useEffect(() => {
  //   if (!isVerified) {
  //     const interval = setInterval(() => {
  //       getScreenCode();
  //     }, 1000);

  //     return () => {
  //       clearInterval(interval); // Clear the interval when component unmounts
  //     };
  //   }
  // }, [isVerified]);
  //const defaultMediaUrl = `${BASE_URL}/default/file_1681896290177.png`;
  useEffect(() => {
    console.log("sdasd");
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
      console.log(value, "socket data");
      if (initiaload.current === true) {
        initiaload.current = false;
      } else {
        //  setContentType(null);
        getScreenCode();
      }
    }
    function onDisconnectDevice(value) {
      console.log("DisConnect")
      setContentType(null);
      getScreenCode();
    }
    socket.on("disconnectDevice", onDisconnectDevice);
    socket.on("receiveContent", onReceiveContent);
    socket.on("receiveComposition", onReceiveContent);
    return () => {
      socket.disconnect();
      socket.off("receiveContent", onReceiveContent);
    };
  });

  return (
    <>
      <div>
        {" "}
        <button
          id="Fullscreen"
          onClick={() => onFullScreen()}
          style={{ zIndex: 10 }}
        >
          <div class="full-text">
            <div class="sec-block">
              {" "}
              <i class="fa fa-expand"></i>
              <p>View Full Screen</p>
            </div>
          </div>
        </button>
      </div>
      {
        <>
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
          {contentType !== null && contentType === "image" && (
            <div className="basic-list-group image-preview-container media-content ">
              <img
                className="webplayer-preview-img"
                src={media}
                alt="media-img"
              />
            </div>
          )}
          {contentType !== null && contentType === "image" && (
            <div className="basic-list-group image-preview-container media-content ">
              <img
                className="webplayer-preview-img"
                src={media}
                alt="media-img"
              />
            </div>
          )}
          {contentType !== null && contentType === "video" && (
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
            <>
              <GetCompositionPlayer
                composition={media}
                handleAddClass={handleAddClass}
              />
            </>
            // <div className="basic-list-group image-preview-container media-content">
            //   <img
            //     className="webplayer-preview-img"
            //     src={defaultMediaUrl}
            //     alt="media-img"
            //   />
            // </div>
          )}

          {contentType !== null && contentType === "composition" && (
            <GetCompositionPlayer
              composition={media}
              handleAddClass={handleAddClass}
            />
          )}

          <div class="console-reg" id="consoleReg" style={{ zIndex: 10 }}>
            <p>
              Copy paste above Screen Registration Code in console{" "}
              <em class="ti-arrow-circle-up"></em>
            </p>
          </div>
        </>
      }
    </>
  );
};

export default WebMain;

const GetCompositionPlayer = ({ composition, handleAddClass }) => {
  // const fetcher = (url) => getCompositionById(url);
  // const { data: composition  } = useSWR(id ? `/vendor/layouts/composition?compositionId=${id}` : null, fetcher);

  useEffect(() => {
    if (composition && composition?.layout?.screenType) {
      handleAddClass(composition.layout.screenType);
    }
  }, [composition]);
  return (
    <>
      {composition && composition.referenceUrl && (
        <CompositionPlayer
          contents={composition}
          content={composition.zones[0].content}
          referenceUrl={composition.referenceUrl}
        />
      )}
    </>
  );
};
