import React, { useEffect, useState } from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import { BASE_URL, getWeather } from "../../../utils/api";
import {
  handleBulletinApps,
  handleScrollerApps,
  handleTextApps,
  handleClockApps,
  handleWeatherApps,
  handleQrApps,
  handleRssApps,
  handleAqiApps,
} from "../../../utils/UtilsService";

const Zone1 = ({ contents, currentIndex, viewImage }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [location1, setLocation1] = useState(null);
  const getWeatherDetail = async(lat, long) => {
    const locationData  = await getWeather(lat, long);
    setWeatherInfo(locationData)
   // console.log('getLocation', locationData);
  }
  const getWeatherDataZone1 = (data, index) => {
    const prp = JSON.parse(data);
    console.log("location",prp.location.address)

    if(!weatherInfo){
      console.log("Hello Weather Calling")
      getWeatherDetail(prp.location.latitude, prp.location.longitude);
    }
    return handleWeatherApps(data, weatherInfo);
    
  }
  return (
    <>
      {" "}
      {contents && contents.zones.length == 1 ? (
        <>
          {contents?.zones[0]?.content[currentIndex] ? (
            <>
              {contents.zones[0].content[currentIndex].type === "image" ? (
                <div className="basic-list-group image-preview-container media-content nnnn">
                  <img
                    className="webplayer-preview-img"
                    style={{
                      objectFit: `${
                        viewImage === "fitScreen" ? "fill" : "contain"
                      }`,
                    }}
                    src={`${BASE_URL}/${contents.zones[0].content[currentIndex].url}`}
                    alt="media-img"
                  />
                </div>
              ) : contents.zones[0].content[currentIndex].type === "video" ? (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <WebVideoPlayer
                    src={`${BASE_URL}/${contents.zones[0].content[currentIndex].url}`}
                  ></WebVideoPlayer>
                </div>
              ) : contents.zones[0].content[currentIndex].type ===
                "youtube-apps" ? (
                <div
                  className={`basic-list-group video-container media-content ${viewImage} ${
                    viewImage === "fitScreen" ? "fitImage" : "containImage"
                  }`}
                >
                  <ReactPlayer
                    url={`${contents.zones[0].content[currentIndex].url}`}
                    width="100%"
                    height="100%"
                    light={false}
                    loop={true}
                    playing={true}
                    controls={true}
                    muted={true}
                    
                  />
                </div>
              ) : contents.zones[0].content[currentIndex].type ===
                "url-apps" ? (
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
              ) : contents.zones[0].content[currentIndex].type ===
                "scroller" ? (
                <>
                  {handleScrollerApps(
                    contents.zones[0].content[currentIndex].data
                  )}
                </>
              ) : contents.zones[0].content[currentIndex].type ===
                "text-apps" ? (
                <>
                  {handleTextApps(contents.zones[0].content[currentIndex].data)}
                </>
              ) : contents.zones[0].content[currentIndex].type ===
                "clock-apps" ? (
                <>
                  {handleClockApps(
                    contents.zones[0].content[currentIndex].data
                  )}
                </>
              ) : contents.zones[0].content[currentIndex].type ===
                "bulletin-apps" ? (
                <>
                  {handleBulletinApps(
                    contents.zones[0].content[currentIndex].data
                  )}
                </>
              ) : contents.zones[0].content[currentIndex].type ===
                "qrcode-apps" ? (
                <>
                  {handleQrApps(contents.zones[0].content[currentIndex].data)}
                </>
              ) : contents.zones[0].content[currentIndex].type ===
                "weather-apps" ? (
                <>
                  {/* {handleWeatherApps(
                    contents.zones[0].content[currentIndex].data
                  )} */}

                  {
                    getWeatherDataZone1(contents.zones[0].content[currentIndex].data)
                  }
                </>
              ) : contents.zones[0].content[currentIndex].type ===
                "rss-apps" ? (
                <>
                  {handleRssApps(contents.zones[0].content[currentIndex].data)}
                </>
              ) : contents.zones[0].content[currentIndex].type ===
                "aqi-apps" ? (
                <>
                  {handleAqiApps(contents.zones[0].content[currentIndex].data)}
                </>
              ) : (
                <></>
              )}
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Zone1;
