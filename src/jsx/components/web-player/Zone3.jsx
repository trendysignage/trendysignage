import React, {useState} from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import { BASE_URL,getWeather } from "../../../utils/api";
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
const Zone3 = ({
  contents,
  currentIndex,
  current1Index,
  current2Index,
  viewImage,
}) => {
  const [weatherInfo1, setWeatherInfo1] = useState(null);
  const [weatherInfo2, setWeatherInfo2] = useState(null);
  const [weatherInfo3, setWeatherInfo3] = useState(null);
  const getWeatherDetail1 = async(lat, long, index) => {
    const locationData  = await getWeather(lat, long);
    setWeatherInfo1(locationData);
  }
  const getWeatherDetail2 = async(lat, long) => {
    const locationData  = await getWeather(lat, long);
    setWeatherInfo2(locationData)
  }
  const getWeatherDetail3 = async(lat, long, index) => {
    const locationData  = await getWeather(lat, long);
    setWeatherInfo3(locationData);
  }
  const getWeatherDataZone1 = (data) => {
    const prp = JSON.parse(data);
    
    if(!weatherInfo1){
      console.log("Hello Weather Calling")
      getWeatherDetail1(prp.location.latitude, prp.location.longitude);
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
  const getWeatherDataZone3 = (data) => {
    const prp = JSON.parse(data);

    if(!weatherInfo3){
      console.log("Hello Weather Calling")
      getWeatherDetail3(prp.location.latitude, prp.location.longitude);
    }
    return handleWeatherApps(data, weatherInfo2);
    
  }
  return (
    <>
      {" "}
      {contents && contents.zones.length == 3 ? (
        <div style={{ height: "100vh" }}>
          <div className="third-compoition-container">
            <div className="third-composition-top-div">
              {contents?.zones[0]?.content[currentIndex] ? (
                <>
                  {contents.zones[0].content[currentIndex].type === "image" ? (
                    <>
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
                    </>
                  ) : contents.zones[0].content[currentIndex].type ===
                    "video" ? (
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
                        scrolling="no"
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
                      {handleQrApps(
                        contents.zones[0].content[currentIndex].data
                      )}
                    </>
                  ) : contents.zones[0].content[currentIndex].type ===
                    "weather-apps" ? (
                    <>
                      {getWeatherDataZone1(
                        contents.zones[0].content[currentIndex].data
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
            <div
              // style={{ width: "50%", height: "70%", display: "inline-block" }}
              className="third-composition-second-div"
            >
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
                        src={`${BASE_URL}/${contents.zones[1].content[current1Index].url}`}
                      ></WebVideoPlayer>
                    </div>
                  ) : contents.zones[1].content[current1Index].type ===
                    "url-apps" ? (
                    <div className="basic-list-group image-preview-container media-content">
                      <Iframe
                        url={`${contents.zones[1].content[current1Index].url}`}
                        width="100%"
                        height="100%"
                        display="block"
                        position="relative"
                        scrolling="no"
                        loading="no"
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
                        url={`${contents.zones[1].content[current1Index].url}`}
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
                    "qrcode-apps" ? (
                    <>
                      {handleQrApps(
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
                    <>NoContent21</>
                  )}
                </>
              ) : (
                <></>
              )}
            </div>
          </div>

          <div className="third-composition-third-div">
            {contents?.zones[2]?.content[current2Index] ? (
              <>
                {contents.zones[2].content[current2Index].type === "image" ? (
                  <div className="basic-list-group image-preview-container media-content">
                    <img
                      className="webplayer-preview-img"
                      style={{
                        objectFit: `${
                          viewImage === "fitScreen" ? "fill" : "contain"
                        }`,
                      }}
                      src={`${BASE_URL}/${contents.zones[2].content[current2Index].url}`}
                      alt="media-img"
                    />
                  </div>
                ) : contents.zones[2].content[current2Index].type ===
                  "video" ? (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <WebVideoPlayer
                      src={`${BASE_URL}/${contents.zones[2].content[current2Index].url}`}
                    ></WebVideoPlayer>
                  </div>
                ) : contents.zones[2].content[current2Index].type ===
                  "url-apps" ? (
                  <div className="basic-list-group image-preview-container media-content">
                    <Iframe
                      url={`${contents.zones[2].content[current2Index].url}`}
                      width="100%"
                      height="100%"
                      // id=""
                      // className=""
                      display="block"
                      position="relative"
                      scrolling="no"
                    />
                  </div>
                ) : contents.zones[2].content[current2Index].type ===
                  "youtube-apps" ? (
                  <div
                    className={`basic-list-group video-container media-content ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <ReactPlayer
                      url={`${contents.zones[2].content[current2Index].url}`}
                      width="100%"
                      height="100%"
                      light={false}
                      loop={true}
                      playing={true}
                      controls={true}
                      muted={true}
                    />
                  </div>
                ) : contents.zones[2].content[current2Index].type ===
                  "scroller" ? (
                  <>
                    {handleScrollerApps(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[current2Index].type ===
                  "text-apps" ? (
                  <>
                    {handleTextApps(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[current2Index].type ===
                  "clock-apps" ? (
                  <>
                    {handleClockApps(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[current2Index].type ===
                  "bulletin-apps" ? (
                  <>
                    {handleBulletinApps(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[current2Index].type ===
                  "qrcode-apps" ? (
                  <>
                    {handleQrApps(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[current2Index].type ===
                  "weather-apps" ? (
                  <>
                    {getWeatherDataZone3(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[current2Index].type ===
                  "rss-apps" ? (
                  <>
                    {handleRssApps(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[current2Index].type ===
                  "aqi-apps" ? (
                  <>
                    {handleAqiApps(
                      contents.zones[2].content[current2Index].data
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

export default Zone3;
