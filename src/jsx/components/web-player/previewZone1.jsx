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
  handlePeopleSpace,
} from "../../../utils/UtilsService";

const PreviewZone1 = ({
  layout,
  content,
  currentIndex,
  viewImage,
  contentnew,
}) => {
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
    console.log("quoteResult", quoteResult);
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
      {content[currentIndex] && content[currentIndex].type === "image" ? (
        <div
          className="basic-list-group image-preview-container media-content modal-priview-composition"
          style={{ height: "560px" }}
        >
          <img
            className="webplayer-preview-img"
            style={{
              objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
            }}
            src={`${BASE_URL}/${contentnew["Zone1"][currentIndex].url}`}
            alt="media-img"
          />
        </div>
      ) : content[currentIndex].type === "video" ? (
        <div
          className={`basic-list-group video-container media-content ${viewImage} ${
            viewImage === "fitScreen" ? "fitImage" : "containImage"
          }`}
        >
          <WebVideoPlayer
          //src={url}
          ></WebVideoPlayer>
        </div>
      ) : content[currentIndex].type === "youtube-apps" ? (
        <div
          className={`basic-list-group video-container  
                      ${viewImage} ${
            viewImage === "fitScreen" ? "fitImage" : "containImage"
          }`}
        >
          <ReactPlayer
            url={`${BASE_URL}/${contentnew["Zone1"][currentIndex].url}`}
            width="100%"
            height="700px"
            light={false}
            loop={true}
            playing={true}
            controls={true}
            muted={true}
          />
        </div>
      ) : content[currentIndex].type === "url-apps" ? (
        <div className={`basic-list-group image-preview-container`}>
          <Iframe
            url={`${BASE_URL}/${contentnew["Zone1"][currentIndex].url}`}
            width="100%"
            height="700px"
            // id=""
            // className=""
            display="block"
            position="relative"
          />
        </div>
      ) : content[currentIndex].type === "scroller" ? (
        <div
          className={`basic-list-group image-preview-container ${
            content.screenType === "rotateMode"
              ? "media-content-rotate"
              : "media-content"
          }`}
          style={{ width: "100%", height: "700px" }}
        >
          {handleScrollerApps(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "text-apps" ? (
        <div
          className={`basic-list-group image-preview-container ${
            content.screenType === "rotateMode"
              ? "media-content-rotate"
              : "media-content"
          }`}
          style={{ height: "700px", width: "100%" }}
        >
          {handleTextApps(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "clock-apps" ? (
        <div
          className={`basic-list-group image-preview-container ${
            contentnew.screenType === "rotateMode"
              ? "media-content-rotate"
              : "media-content"
          }`}
          style={{ height: "700px", width: "100%" }}
        >
          {handleClockApps(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "bulletin-apps" ? (
        <div
          className={`basic-list-group image-preview-container ${
            contentnew.screenType === "rotateMode"
              ? "media-content-rotate"
              : "media-content"
          }`}
          style={{ height: "700px", width: "100%" }}
        >
          {handleBulletinApps(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "qrcode-apps" ? (
        <div style={{ height: "700px", width: "100%" }}>
          {handleQrApps(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "weather-apps" ? (
        <div
          className={`basic-list-group image-preview-container ${
            contentnew.screenType === "rotateMode"
              ? "media-content-rotate"
              : "media-content"
          }`}
          style={{ background: "black", height: "700px" }}
        >
          {/* {handleWeatherApps(
                        contents.zones[0].content[currentIndex].data
                    )} */}

          {getWeatherDataZone1(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "rss-apps" ? (
        <div
          className={`basic-list-group image-preview-container ${
            contentnew.screenType === rotateMode
              ? "media-content-rotate"
              : "media-content"
          }`}
        >
          {handleRssApps(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "quote-apps" ? (
        <div style={{ height: "700px", width: "100%" }}>
          {getQuoteDataZone1(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "aqi-apps" ? (
        <div style={{ height: "700px", width: "100%" }}>
          {getAqiDataZone1(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "news-apps" ? (
        <div
          className={`basic-list-group image-preview-container ${
            content.screenType === rotateMode
              ? "media-content-rotate"
              : "media-content"
          }`}
          style={{ height: "700px", width: "100%" }}
        >
          {getNewsDataZone1(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "google-apps" ? (
        <div style={{ height: "700px", width: "100%" }}>
          {handleGoogleApps(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "stock-apps" ? (
        <div style={{ height: "700px", width: "100%" }}>
          {getStockDataZone1(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : content[currentIndex].type === "people-apps" ? (
        <div style={{ height: "700px", width: "100%", overflowY: "auto" }}>
          {handlePeopleSpace(contentnew["Zone1"][currentIndex].data)}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PreviewZone1;
