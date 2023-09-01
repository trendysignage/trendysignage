import React, {useState} from "react";

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

const Zone2 = ({
  contents,
  currentIndex,
  current1Index,
  current2Index,
  viewImage,
}) => {
  const [weatherInfo1, setWeatherInfo1] = useState(null);
  const [weatherInfo2, setWeatherInfo2] = useState(null);
  const [locationIndex1, setLocationIndex1] = useState(0);
  const [locationIndex2, setLocationIndex2] = useState(0);
  const getWeatherDetail1 = async(lat, long, index) => {
    const locationData  = await getWeather(lat, long);
    setWeatherInfo1(locationData);
    //setLocationIndex1(index)
   // console.log('getLocation', locationData);
  }
  const getWeatherDetail2 = async(lat, long) => {
    const locationData  = await getWeather(lat, long);
    setWeatherInfo2(locationData)
   // console.log('getLocation', locationData);
  }
  const getWeatherDataZone1 = (data, index) => {
    const prp = JSON.parse(data);
    
    if(!weatherInfo1){
      console.log("Hello Weather Calling", locationIndex1, index)
      //console.log("Hi",prp.location.longitude.toFixed(2), weatherInfo1.city.coord.lon.toFixed(2));
      getWeatherDetail1(prp.location.latitude, prp.location.longitude, index);
    }
    return handleWeatherApps(data, weatherInfo1);
    
  }
  const getWeatherDataZone2 = (data) => {
    const prp = JSON.parse(data);

    if(!weatherInfo2){
      console.log("Hello Weather Calling")
      getWeatherDetail2(prp.location.latitude, prp.location.longitude);
    }
    return handleWeatherApps(data, weatherInfo2);
    
  }
  return (
    <>
      {" "}
      {contents && contents.zones.length == 2 ? (
        <div style={{ height: "100vh" }}>
          <div className="top-div">
            {contents?.zones[0]?.content[currentIndex] ? (
              <>
                {contents.zones[0].content[currentIndex].type === "image" ? (
                  <div className="basic-list-group image-preview-container media-content">
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
                  "scroller" ? (
                  <>
                    {handleScrollerApps(
                      contents.zones[0].content[currentIndex].data
                    )}
                  </>
                ) : contents.zones[0].content[currentIndex].type ===
                  "text-apps" ? (
                  <>
                    {handleTextApps(
                      contents.zones[0].content[currentIndex].data
                    )}
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
                    {getWeatherDataZone1(
                      contents.zones[0].content[currentIndex].data, currentIndex
                    )}
                  </>
                ) : contents.zones[0].content[currentIndex].type ===
                  "rss-apps" ? (
                  <>
                    {handleRssApps(
                      contents.zones[0].content[currentIndex].data
                    )}
                  </>
                ) : contents.zones[0].content[currentIndex].type ===
                  "aqi-apps" ? (
                  <>
                    {handleAqiApps(
                      contents.zones[0].content[currentIndex].data
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="bottom-div">
            {contents?.zones[1]?.content[current1Index] ? (
              <>
                {contents.zones[1].content[current1Index].type === "image" ? (
                  <div className="basic-list-group image-preview-container media-content">
                    <img
                      className="webplayer-preview-img"
                      style={{
                        objectFit: `${
                          viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                      }}
                      src={`${BASE_URL}/${contents.zones[1].content[current1Index].url}`}
                      alt="media-img"
                    />
                  </div>
                ) : contents.zones[1].content[current1Index].type ===
                  "video" ? (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <WebVideoPlayer
                      src={`${BASE_URL}/${contents.zones[1].content[currentIndex].url}`}
                    ></WebVideoPlayer>
                  </div>
                ) : contents.zones[1].content[current1Index].type ===
                  "url-apps" ? (
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
                ) : contents.zones[1].content[current1Index].type ===
                  "youtube-apps" ? (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <ReactPlayer
                      url={`${contents.zones[1].content[currentIndex].url}`}
                      width="100%"
                      height="100%"
                      light={false}
                      loop={true}
                      playing={true}
                      controls={true}
                      muted={true}
                      
                    />
                  </div>
                ) : contents.zones[1].content[current1Index].type ===
                  "scroller" ? (
                  <>
                    {handleScrollerApps(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : contents.zones[1].content[current1Index].type ===
                  "text-apps" ? (
                  <>
                    {handleTextApps(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : contents.zones[1].content[current1Index].type ===
                  "clock-apps" ? (
                  <>
                    {handleClockApps(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : contents.zones[1].content[current1Index].type ===
                  "bulletin-apps" ? (
                  <>
                    {handleBulletinApps(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : contents.zones[1].content[current1Index].type ===
                  "weather-apps" ? (
                  <>
                    {getWeatherDataZone2(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : contents.zones[1].content[current1Index].type ===
                  "qr-apps" ? (
                  <>
                    {handleQrApps(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : contents.zones[1].content[current1Index].type ===
                  "rss-apps" ? (
                  <>
                    {handleRssApps(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : contents.zones[1].content[current1Index].type ===
                  "aqi-apps" ? (
                  <>
                    {handleAqiApps(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Zone2;
