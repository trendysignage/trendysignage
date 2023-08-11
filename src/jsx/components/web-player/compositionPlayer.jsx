import React, { useEffect, useState, useRef } from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import { BASE_URL } from "../../../utils/api";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
const CompositionPlayer = ({ contents, content, referenceUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [current1Index, setCurrent1Index] = useState(0);
  const [current2Index, setCurrent2Index] = useState(0);
  const timeout1Ref = useRef("");
  const timeoutRef = useRef("");

  useEffect(() => {
    if (contents && contents.zones.length == 1) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
    } else if (contents && contents.zones.length == 2) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contents.zones[1].content[current1Index]) {
        const timeout1Duration =
          contents.zones[1].content[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current1Index === contents.zones[1].content.length - 1) {
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
    } else if (contents && contents.zones.length == 3) {
      if (contents.zones[0].content[currentIndex]) {
        const timeoutDuration =
          contents.zones[0].content[currentIndex].duration * 1000;
        timeoutRef.current = setTimeout(() => {
          if (currentIndex === contents.zones[0].content.length - 1) {
            setCurrentIndex(0);
          } else {
            setCurrentIndex((currentIndex) => currentIndex + 1);
          }
        }, timeoutDuration);
      }
      if (contents.zones[1].content[current1Index]) {
        const timeout1Duration =
          contents.zones[1].content[current1Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current1Index === contents.zones[1].content.length - 1) {
            setCurrent1Index(0);
          } else {
            setCurrent1Index((current1Index) => current1Index + 1);
          }
        }, timeout1Duration);
      }
      if (contents.zones[2].content[current2Index]) {
        const timeout1Duration =
          contents.zones[2].content[current2Index].duration * 1000;
        timeout1Ref.current = setTimeout(() => {
          if (current2Index === contents.zones[2].content.length - 1) {
            setCurrent2Index(0);
          } else {
            setCurrent2Index((current2Index) => current2Index + 1);
          }
        }, timeout1Duration);
      }
    }

    return () => clearTimeout(timeoutRef.current);
  }, [currentIndex, current1Index]);
  const viewImage = content[currentIndex]?.fitToScreen
    ? "fitScreen"
    : content[currentIndex]?.crop
    ? "crop"
    : "aspectRation";

  return (
    <>
      {" "}
      {/* {content[currentIndex] && content[currentIndex].type === "image" && (
        <div className="basic basic-list-group image-preview-container media-content">
          <img
            className="webplayer-preview-img"
            style={{
              objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
            }}
            src={`${BASE_URL}${referenceUrl[currentIndex]}`}
            alt="media-img"
          />
        </div>
      )}
      {content[currentIndex] && content[currentIndex].type === "video" && (
        <div className={`basic-list-group video-container media-content ${viewImage === "fitScreen" ? "fitImage" : "containImage"}`}>
          <WebVideoPlayer src={`${BASE_URL}${referenceUrl[currentIndex]}`}></WebVideoPlayer>
        </div>
      )} */}
      {contents && contents.zones.length == 1 ? (
        <>
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "image" && (
              <div className="basic-list-group image-preview-container media-content nnnn">
                <img
                  className="webplayer-preview-img"
                  style={{
                    objectFit: `${
                      viewImage === "fitScreen" ? "fill" : "contain"
                    }`,
                  }}
                  src={`https://dsapi.trendysignage.com/${contents.zones[0].content[currentIndex].url}`}
                  alt="media-img"
                />
              </div>
            )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "video" && (
              <div
                className={`basic-list-group video-container media-content ${viewImage} ${
                  viewImage === "fitScreen" ? "fitImage" : "containImage"
                }`}
              >
                <WebVideoPlayer
                  src={`https://dsapi.trendysignage.com/${contents.zones[0].content[currentIndex].url}`}
                ></WebVideoPlayer>
              </div>
            )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "youtube-apps" && (
              <div
                className={`basic-list-group video-container media-content ${viewImage} ${
                  viewImage === "fitScreen" ? "fitImage" : "containImage"
                }`}
              >
                <ReactPlayer
                  url={`${contents.zones[0].content[currentIndex].url}`}
                  width="100%"
                  height="100%"
                />
              </div>
            )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "url-apps" && (
              <div className="basic-list-group image-preview-container media-content">
                <Iframe
                  url={`${contents.zones[0].content[currentIndex].url}`}
                  width="100%"
                  height="100%"
                  // id=""
                  // className=""
                  display="block"
                  position="relative"
                />
              </div>
            )}
        </>
      ) : contents.zones.length == 2 ? (
        <div
          style={{ height: "100vh" }}
          // className="webplayer-composition-full-screen"
        >
          <div className="top-div">
            {contents.zones[0] &&
              contents.zones[0].content[currentIndex] &&
              contents.zones[0].content[currentIndex].type === "image" && (
                <div className="basic-list-group image-preview-container media-content">
                  <img
                    className="webplayer-preview-img"
                    style={{
                      objectFit: `${
                        viewImage === "fitScreen" ? "fill" : "contain"
                      }`,
                    }}
                    src={`https://dsapi.trendysignage.com/${contents.zones[0].content[currentIndex].url}`}
                    alt="media-img"
                  />
                </div>
              )}
            {contents.zones[0] &&
              contents.zones[0].content[currentIndex] &&
              contents.zones[0].content[currentIndex].type === "video" && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer
                    src={`https://dsapi.trendysignage.com/${contents.zones[0].content[currentIndex].url}`}
                  ></WebVideoPlayer>
                </div>
              )}
            {contents.zones[0] &&
              contents.zones[0].content[currentIndex] &&
              contents.zones[0].content[currentIndex].type === "url-apps" && (
                <div className="basic-list-group image-preview-container media-content">
                  <Iframe
                    url={`${contents.zones[0].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                    // id=""
                    // className=""
                    display="block"
                    position="relative"
                  />
                </div>
              )}
            {contents.zones[0] &&
              contents.zones[0].content[currentIndex] &&
              contents.zones[0].content[currentIndex].type ===
                "youtube-apps" && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <ReactPlayer
                    url={`${contents.zones[0].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
          </div>
          <div className="bottom-div">
            {contents.zones[1] &&
              contents.zones[1].content[current1Index] &&
              contents.zones[1].content[current1Index].type === "image" && (
                <div className="basic-list-group image-preview-container media-content">
                  <img
                    className="webplayer-preview-img"
                    style={{
                      objectFit: `${
                        viewImage === "fitScreen" ? "fill" : "contain"
                      }`,
                    }}
                    src={`https://dsapi.trendysignage.com/${contents.zones[1].content[currentIndex].url}`}
                    alt="media-img"
                  />
                </div>
              )}
            {contents.zones[1] &&
              contents.zones[1].content[current1Index] &&
              contents.zones[1].content[current1Index].type === "video" && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer
                    src={`https://dsapi.trendysignage.com/${contents.zones[1].content[currentIndex].url}`}
                  ></WebVideoPlayer>
                </div>
              )}
            {contents.zones[1] &&
              contents.zones[1].content[current1Index] &&
              contents.zones[1].content[current1Index].type === "url-apps" && (
                <div className="basic-list-group image-preview-container media-content">
                  <Iframe
                    url={`${contents.zones[1].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                    // id=""
                    // className=""
                    display="block"
                    position="relative"
                  />
                </div>
              )}
            {contents.zones[1] &&
              contents.zones[1].content[current1Index] &&
              contents.zones[1].content[current1Index].type ===
                "youtube-apps" && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <ReactPlayer
                    url={`${contents.zones[1].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
          </div>
        </div>
      ) : contents.zones.length == 3 ? (
        <div
          style={{ height: "100vh" }}
          // className="webplayer-composition-full-screen"
        >
          <div className="third-compoition-container">
            <div
              //  style={{ width: "50%", height: "70%", display: "inline-block" }}
              className="third-composition-top-div"
            >
              {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type === "image" && (
                  <div className="basic-list-group image-preview-container media-content">
                    <img
                      className="webplayer-preview-img"
                      style={{
                        objectFit: `${
                          viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                      }}
                      src={`https://dsapi.trendysignage.com/${contents.zones[0].content[currentIndex].url}`}
                      alt="media-img"
                    />
                  </div>
                )}
              {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type === "video" && (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <WebVideoPlayer
                      src={`https://dsapi.trendysignage.com/${contents.zones[0].content[currentIndex].url}`}
                    ></WebVideoPlayer>
                  </div>
                )}
              {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type === "url-apps" && (
                  <div className="basic-list-group image-preview-container media-content">
                    <Iframe
                      url={`${contents.zones[0].content[currentIndex].url}`}
                      width="100%"
                      height="100%"
                      // id=""
                      // className=""
                      display="block"
                      position="relative"
                    />
                  </div>
                )}
              {contents.zones[0] &&
                contents.zones[0].content[currentIndex] &&
                contents.zones[0].content[currentIndex].type ===
                  "youtube-apps" && (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <ReactPlayer
                      url={`${contents.zones[0].content[currentIndex].url}`}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
            </div>
            <div
              // style={{ width: "50%", height: "70%", display: "inline-block" }}
              className="third-composition-second-div"
            >
              {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type === "image" && (
                  <div className="basic-list-group image-preview-container media-content">
                    <img
                      className="webplayer-preview-img"
                      style={{
                        objectFit: `${
                          viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                      }}
                      src={`https://dsapi.trendysignage.com/${contents.zones[1].content[current1Index].url}`}
                      alt="media-img"
                    />
                  </div>
                )}
              {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type === "video" && (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <WebVideoPlayer
                      src={`https://dsapi.trendysignage.com/${contents.zones[1].content[current1Index].url}`}
                    ></WebVideoPlayer>
                  </div>
                )}
              {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type ===
                  "url-apps" && (
                  <div className="basic-list-group image-preview-container media-content">
                    <Iframe
                      url={`${contents.zones[1].content[current1Index].url}`}
                      width="100%"
                      height="100%"
                      // id=""
                      // className=""
                      display="block"
                      position="relative"
                    />
                  </div>
                )}
              {contents.zones[1] &&
                contents.zones[1].content[current1Index] &&
                contents.zones[1].content[current1Index].type ===
                  "youtube-apps" && (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <ReactPlayer
                      url={`${contents.zones[1].content[current1Index].url}`}
                      width="100%"
                      height="100%"
                    />
                  </div>
                )}
            </div>
          </div>

          <div
            // style={{ width: "100%", height: "30%", minHeight: "18%" }}
            className="third-composition-third-div"
          >
            {contents.zones[2] &&
              contents.zones[2].content[current2Index] &&
              contents.zones[2].content[current2Index].type === "image" && (
                <div className="basic-list-group image-preview-container media-content">
                  <img
                    className="webplayer-preview-img"
                    style={{
                      objectFit: `${
                        viewImage === "fitScreen" ? "fill" : "contain"
                      }`,
                    }}
                    src={`https://dsapi.trendysignage.com/${contents.zones[2].content[current2Index].url}`}
                    alt="media-img"
                  />
                </div>
              )}
            {contents.zones[2] &&
              contents.zones[2].content[current2Index] &&
              contents.zones[2].content[current2Index].type === "video" && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer
                    src={`https://dsapi.trendysignage.com/${contents.zones[2].content[current2Index].url}`}
                  ></WebVideoPlayer>
                </div>
              )}
            {contents.zones[2] &&
              contents.zones[2].content[current2Index] &&
              contents.zones[2].content[current2Index].type === "url-apps" && (
                <div className="basic-list-group image-preview-container media-content">
                  <Iframe
                    url={`${contents.zones[2].content[current2Index].url}`}
                    width="100%"
                    height="100%"
                    // id=""
                    // className=""
                    display="block"
                    position="relative"
                  />
                </div>
              )}
            {contents.zones[2] &&
              contents.zones[2].content[current2Index] &&
              contents.zones[2].content[current2Index].type ===
                "youtube-apps" && (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <ReactPlayer
                    url={`${contents.zones[2].content[current2Index].url}`}
                    width="100%"
                    height="100%"
                  />
                </div>
              )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default CompositionPlayer;
