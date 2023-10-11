import React, { useEffect, useState } from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import {
  BASE_URL,
  getWeather,
  getStock,
  getQuotes,
  getNews,
} from "../../../utils/api";
import {
  handleBulletinApps,
  handleScrollerApps,
  handleTextApps,
  handleClockApps,
  handleWeatherApps,
  handleQrApps,
  handleRssApps,
  handleAqiApps,
  handleStockApps,
  handleQuoteApps,
  handleNewsApps,
  handleGoogleApps,
} from "../../../utils/UtilsService";
import { dividerClasses } from "@mui/material";

const Zone1 = ({ contents, currentIndex, viewImage }) => {
  const [weatherInfo, setWeatherInfo] = useState(null);
  const [quoteData, setQuoteData] = useState(null);
  const [stock, setStock] = useState(null);
  const [newsData, setNewsData] = useState(null);
  const getWeatherDetail = async (lat, long) => {
    const locationData = await getWeather(lat, long);
    setWeatherInfo(locationData);
  };

  const getQuoteData = async (data) => {
    const quoteResult = await getQuotes(data);
    setQuoteData(quoteResult);
  };

  const getNewsData = async (data) => {
    const newsResult = await getNews(data);
    setNewsData(newsResult);
  };

  const getStockDetail = async (lat, long) => {
    const locationData = await getStock(lat, long);
    setStock(locationData);
    // console.log('getLocation', locationData);
  };

  const getWeatherDataZone1 = (data, index) => {
    const prp = JSON.parse(data);
    console.log("location", prp.location.address);

    if (!weatherInfo) {
      console.log("Hello Weather Calling");
      getWeatherDetail(prp.location.latitude, prp.location.longitude);
    }
    return handleWeatherApps(data, weatherInfo);
  };

  const getAqiDataZone1 = (data) => {
    const prp = JSON.parse(data);
    console.log("location", prp.location.address);

    if (!weatherInfo) {
      console.log("Hello Weather Calling");
      getWeatherDetail(prp.location.latitude, prp.location.longitude);
    }
    return handleAqiApps(data, weatherInfo);
  };

  const getStockDataZone1 = (data) => {
    const prp = JSON.parse(data);
    console.log("location", prp);
    let stockType = "gainers";
    if (prp.stockType === '"Day Losers"') {
      stockType = "losers";
    } else if (prp.stockType === "Most Actives") {
      stockType = "actives";
    }

    if (!stock) {
      console.log("Hello Stock Calling");
      getStockDetail(stockType);
    }
    return handleStockApps(data, stock);
  };

  const getQuoteDataZone1 = (data) => {
    const prp = JSON.parse(data);

    if (!quoteData) {
      const prms = {
        cat: "famous",
        count: "10",
      };
      console.log("Hello Quote Calling");
      getQuoteData(prms);
    }
    return handleQuoteApps(data, quoteData);
  };

  const getNewsDataZone1 = (data) => {
    const prp = JSON.parse(data);

    if (!newsData) {
      getNewsData(prp.topic.value);
    }
    return handleNewsApps(data, newsData);
  };

  const rotateMode = "potrait";

  return (
    <>
      {" "}
      {contents && contents.zones.length == 1 ? (
        <>
          {contents?.zones[0]?.content[currentIndex] ? (
            <div className="h-100">
              <div
                style={{
                  transform:
                    contents.layout.screenType === rotateMode
                      ? "rotate(270deg)"
                      : "rotate(0deg)",

                  height: "100%",
                }}
              >
                {contents.zones[0].content[currentIndex].type === "image" ? (
                  <div className="basic-list-group image-preview-container media-content ">
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
                    className={`basic-list-group video-container  ${
                      contents.layout.screenType === rotateMode
                        ? "media-content-rotate"
                        : "media-content"
                    } ${viewImage} ${
                      viewImage === "fitScreen" ? "fitImage" : "containImage"
                    }`}
                  >
                    <WebVideoPlayer
                      src={`${BASE_URL}/${contents.zones[0].content[currentIndex].url}`}
                      layout={contents.layout.screenType}
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
                  <div
                    // className="basic-list-group image-preview-container media-content"
                    className={`basic-list-group image-preview-container ${
                      contents.layout.screenType === rotateMode
                        ? "media-content-rotate"
                        : "media-content"
                    }`}
                  >
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
                    {/* {handleWeatherApps(
                    contents.zones[0].content[currentIndex].data
                  )} */}

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
                  "quote-apps" ? (
                  <>
                    {getQuoteDataZone1(
                      contents.zones[0].content[currentIndex].data
                    )}
                  </>
                ) : contents.zones[0].content[currentIndex].type ===
                  "aqi-apps" ? (
                  <>
                    {getAqiDataZone1(
                      contents.zones[0].content[currentIndex].data
                    )}
                  </>
                ) : contents.zones[0].content[currentIndex].type ===
                  "news-apps" ? (
                  <>
                    {getNewsDataZone1(
                      contents.zones[0].content[currentIndex].data
                    )}
                  </>
                ) : contents.zones[0].content[currentIndex].type ===
                  "google-apps" ? (
                  <>
                    {handleGoogleApps(
                      contents.zones[0].content[currentIndex].data
                    )}
                  </>
                ) : contents.zones[0].content[currentIndex].type ===
                  "stocks-apps" ? (
                  <>
                    {getStockDataZone1(
                      contents.zones[0].content[currentIndex].data
                    )}
                    handleGoogleApps
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
      ) : (
        <></>
      )}
    </>
  );
};

export default Zone1;
