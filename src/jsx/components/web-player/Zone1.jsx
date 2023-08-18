import React from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import { handleBulletinApps, handleScrollerApps, handleTextApps, handleClockApps, handleWeatherApps, handleQrApps, handleRssApps, handleAqiApps } from '../../../utils/UtilsService';
const Zone1 = ({ contents, currentIndex, current1Index, current2Index, viewImage}) => {

  return (
    <>
      {" "}
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
                  src={`http://144.126.143.140:5000/${contents.zones[0].content[currentIndex].url}`}
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
                  src={`http://144.126.143.140:5000/${contents.zones[0].content[currentIndex].url}`}
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
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "scroller" && (
              <>{handleScrollerApps(contents.zones[0].content[currentIndex].data)}</>
          )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "text-apps" && (
              <>{handleTextApps(contents.zones[0].content[currentIndex].data)}</>
          )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "clock-apps" && (
              <>{handleClockApps(contents.zones[0].content[currentIndex].data)}</>
          )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "weather-apps" && (
              <>{handleWeatherApps(contents.zones[0].content[currentIndex].data)}</>
          )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "bulletin-apps" && (
              <>{handleBulletinApps(contents.zones[0].content[currentIndex].data)}</>
          )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "qrcode-apps" && (
              <>{handleQrApps(contents.zones[0].content[currentIndex].data)}</>
          )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "rss-apps" && (
              <>{handleRssApps(contents.zones[0].content[currentIndex].data)}</>
          )}
          {contents.zones[0] &&
            contents.zones[0].content[currentIndex] &&
            contents.zones[0].content[currentIndex].type === "aqi-apps" && (
              <>{handleAqiApps(contents.zones[0].content[currentIndex].data)}</>
          )}
        </>
      ) :
        <></>
      }
    </>
  );
};

export default Zone1;
