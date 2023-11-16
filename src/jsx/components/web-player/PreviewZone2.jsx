import React, { useState } from "react";
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
const PreviewZone2 = ({
  layout,
  content,
  currentIndex,
  current1Index,
  viewImage,
  contentnew,
}) => {
  const [weatherInfo1, setWeatherInfo1] = useState(null);
  const [weatherInfo2, setWeatherInfo2] = useState(null);
  const [stock, setStock] = useState(null);
  const [stock2, setStock2] = useState(null);
  const [quotes, setQuotes] = useState(null);
  const [quotes2, setQuotes2] = useState(null);
  const [news, setNews] = useState(null);
  const [news2, setNews2] = useState(null);

  const getStockDetail = async (lat, long) => {
    const locationData = await getStock(lat, long);
    setStock(locationData);
  };
  const getStockDetail2 = async (lat, long) => {
    const locationData = await getStock(lat, long);
    setStock2(locationData);
  };

  const getNewsDetail = async (data) => {
    const locationData = await getNews(data);
    setNews(locationData);
  };
  const getNewsDetail2 = async (data) => {
    const locationData = await getNews(data);
    setNews2(locationData);
  };

  const getQuotesDetail = async (data) => {
    const locationData = await getQuotes(data);
    setQuotes(locationData);
  };
  const getQuotesDetail2 = async (data) => {
    const locationData = await getQuotes(data);
    setQuotes2(locationData);
  };

  const getWeatherDetail1 = async (lat, long, index) => {
    const locationData = await getWeather(lat, long);
    setWeatherInfo1(locationData);
  };
  const getWeatherDetail2 = async (lat, long) => {
    const locationData = await getWeather(lat, long);
    setWeatherInfo2(locationData);
    // console.log('getLocation', locationData);
  };

  const getWeatherDataZone1 = (data, index) => {
    const prp = JSON.parse(data);

    if (!weatherInfo1) {
      //console.log("Hi",prp.location.longitude.toFixed(2), weatherInfo1.city.coord.lon.toFixed(2));
      getWeatherDetail1(prp.location.latitude, prp.location.longitude, index);
    }
    return handleWeatherApps(data, weatherInfo1);
  };
  const getWeatherDataZone2 = (data) => {
    const prp = JSON.parse(data);

    if (!weatherInfo2) {
      console.log("Hello Weather Calling");
      getWeatherDetail2(prp.location.latitude, prp.location.longitude);
    }
    return handleWeatherApps(data, weatherInfo2);
  };

  const getAqiDataZone1 = (data) => {
    const prp = JSON.parse(data);

    if (!weatherInfo1) {
      getWeatherDetail1(prp.location.latitude, prp.location.longitude);
    }
    return handleAqiApps(data, weatherInfo1);
  };
  const getAqiDataZone2 = (data) => {
    const prp = JSON.parse(data);

    if (!weatherInfo2) {
      getWeatherDetail2(prp.location.latitude, prp.location.longitude);
    }
    return handleAqiApps(data, weatherInfo2);
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

  const getStockDataZone2 = (data) => {
    const prp = JSON.parse(data);
    console.log("location", prp);
    let stockType = "gainers";
    if (prp.stockType === '"Day Losers"') {
      stockType = "losers";
    } else if (prp.stockType === "Most Actives") {
      stockType = "actives";
    }

    if (!stock2) {
      console.log("Hello Stock Calling");
      getStockDetail2(stockType);
    }
    return handleStockApps(data, stock2);
  };

  const getQuoteDataZone1 = (data) => {
    const prp = JSON.parse(data);

    if (!quotes) {
      const prms = {
        cat: "famous",
        count: "10",
      };
      console.log("Hello Quote Calling");
      getQuotesDetail(prms);
    }
    return handleQuoteApps(data, quotes);
  };
  const getQuoteDataZone2 = (data) => {
    const prp = JSON.parse(data);

    if (!quotes2) {
      const prms = {
        cat: "famous",
        count: "10",
      };
      console.log("Hello Quote Calling");
      getQuotesDetail2(prms);
    }
    return handleQuoteApps(data, quotes2);
  };

  const getNewsDataZone1 = (data) => {
    const prp = JSON.parse(data);

    if (!news) {
      getNewsDetail(prp.topic.value);
    }
    return handleNewsApps(data, news);
  };

  const getNewsDataZone2 = (data) => {
    const prp = JSON.parse(data);

    if (!news2) {
      getNewsDetail2(prp.topic.value);
    }
    return handleNewsApps(data, news2);
  };
  const rotateMode = "potrait";
  return (
    <div className="modal-priview-composition" style={{ height: "80vh" }}>
      <div className="top-div">
        {contentnew["Zone1"][currentIndex] &&
        contentnew["Zone1"][currentIndex].type === "image" ? (
          <div className="basic-list-group image-preview-container media-content">
            <img
              className="webplayer-preview-img"
              style={{
                objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
              }}
              //src={`https://ssapi.trendysignage.com/${contentnew.Zone1[currentIndex].url}`}
              src={`${BASE_URL}/${contentnew["Zone1"][currentIndex].url}`}
              alt="media-img"
            />
          </div>
        ) : contentnew["Zone1"][currentIndex].type === "video" ? (
          <div
            className={`basic-list-group video-container media-content ${viewImage} ${
              viewImage === "fitScreen" ? "fitImage" : "containImage"
            }`}
            style={{ height: "100%" }}
          >
            <WebVideoPlayer
              //src={`https://ssapi.trendysignage.com/${contentnew.Zone1[currentIndex].url}`}
              src={`${BASE_URL}/${contentnew["Zone1"][currentIndex].url}`}
            ></WebVideoPlayer>
          </div>
        ) : contentnew["Zone1"][currentIndex].type === "url-apps" ? (
          <div className="basic-list-group image-preview-container media-content">
            <Iframe
              url={`${contentnew["Zone1"][currentIndex].url}`}
              width="100%"
              height="100%"
              // id=""
              // className=""
              display="block"
              position="relative"
              styles={{ height: "100%", border: "0px" }}
            />
          </div>
        ) : contentnew["Zone1"][currentIndex].type === "youtube-apps" ? (
          <div
            className={`basic-list-group video-container ${viewImage} ${
              viewImage === "fitScreen" ? "fitImage" : "containImage"
            }`}
          >
            <ReactPlayer
              url={`${contentnew["Zone1"][currentIndex].url}`}
              width="100%"
              height="100%"
              light={false}
              loop={true}
              playing={true}
              controls={true}
              muted={true}
            />
          </div>
        ) : contentnew["Zone1"][currentIndex].type === "scroller" ? (
          <>
            <div className={`basic-list-group image-preview-container `}>
              {handleScrollerApps(contentnew["Zone1"][currentIndex].data)}
            </div>
          </>
        ) : contentnew["Zone1"][currentIndex].type === "text-apps" ? (
          <>{handleTextApps(contentnew["Zone1"][currentIndex].data)}</>
        ) : contentnew["Zone1"][currentIndex].type === "clock-apps" ? (
          <>{handleClockApps(contentnew["Zone1"][currentIndex].data)}</>
        ) : contentnew["Zone1"][currentIndex].type === "bulletin-apps" ? (
          <>{handleBulletinApps(contentnew["Zone1"][currentIndex].data)}</>
        ) : contentnew["Zone1"][currentIndex].type === "qrcode-apps" ? (
          <div>{handleQrApps(contentnew["Zone1"][currentIndex].data)}</div>
        ) : contentnew["Zone1"][currentIndex].type === "weather-apps" ? (
          <>
            {getWeatherDataZone1(
              contentnew["Zone1"][currentIndex].data,
              currentIndex
            )}
          </>
        ) : contentnew["Zone1"][currentIndex].type === "rss-apps" ? (
          <>
            {handleRssApps(JSON.parse(contentnew["Zone1"][currentIndex].data))}
          </>
        ) : contentnew["Zone1"][currentIndex].type === "aqi-apps" ? (
          <>{getAqiDataZone1(contentnew["Zone1"][currentIndex].data)}</>
        ) : contentnew["Zone1"][currentIndex].type === "news-apps" ? (
          <>{getNewsDataZone1(contentnew["Zone1"][currentIndex].data)}</>
        ) : contentnew["Zone1"][currentIndex].type === "google-apps" ? (
          <>{handleGoogleApps(contentnew["Zone1"][currentIndex].data)}</>
        ) : contentnew["Zone1"][currentIndex].type === "stocks-apps" ? (
          <div className={`basic-list-group image-preview-container`}>
            {getStockDataZone1(contentnew["Zone1"][currentIndex].data)}
          </div>
        ) : contentnew["Zone1"][currentIndex].type === "quote-apps" ? (
          <div className={`basic-list-group image-preview-container`}>
            {getQuoteDataZone1(contentnew["Zone1"][currentIndex].data)}
          </div>
        ) : contentnew["Zone1"][currentIndex].type === "people-apps" ? (
          <>{handlePeopleSpace(contentnew["Zone1"][currentIndex].data)}</>
        ) : (
          <></>
        )}
      </div>
      <div className="bottom-div">
        {contentnew["Zone2"] &&
        contentnew["Zone2"][current1Index] &&
        contentnew["Zone2"][current1Index].type === "image" ? (
          <div
            className="basic-list-group image-preview-container media-content"
            style={{ height: "100%" }}
          >
            <img
              className="webplayer-preview-img"
              style={{
                objectFit: `${viewImage === "fitScreen" ? "fill" : "contain"}`,
              }}
              src={`${BASE_URL}/${contentnew["Zone2"][current1Index].url}`}
              alt="media-img"
            />
          </div>
        ) : contentnew["Zone2"][current1Index].type === "video" ? (
          <div
            className={`basic-list-group video-container media-content ${viewImage} ${
              viewImage === "fitScreen" ? "fitImage" : "containImage"
            }`}
            style={{ height: "100%" }}
          >
            <WebVideoPlayer
              src={`${BASE_URL}/${contentnew["Zone2"][current1Index].url}`}
            ></WebVideoPlayer>
          </div>
        ) : contentnew["Zone2"][current1Index].type === "url-apps" ? (
          <div className="basic-list-group image-preview-container media-content">
            <Iframe
              url={`${contentnew["Zone2"][current1Index].url}`}
              width="100%"
              height="100%"
              // id=""
              // className=""
              display="block"
              position="relative"
            />
          </div>
        ) : contentnew["Zone2"][current1Index].type === "youtube-apps" ? (
          <div
            className={`basic-list-group video-container media-content ${viewImage} ${
              viewImage === "fitScreen" ? "fitImage" : "containImage"
            }`}
          >
            <ReactPlayer
              url={`${contentnew["Zone2"][current1Index].url}`}
              width="100%"
              height="100%"
              light={false}
              loop={true}
              playing={true}
              controls={true}
              muted={true}
            />
          </div>
        ) : contentnew["Zone2"][current1Index].type === "scroller" ? (
          <>{handleScrollerApps(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "text-apps" ? (
          <>{handleTextApps(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "clock-apps" ? (
          <>{handleClockApps(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "bulletin-apps" ? (
          <>{handleBulletinApps(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "weather-apps" ? (
          <>{getWeatherDataZone2(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "qr-apps" ? (
          <>{handleQrApps(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "rss-apps" ? (
          <>
            {handleRssApps(JSON.parse(contentnew["Zone2"][current1Index].data))}
          </>
        ) : contentnew["Zone2"][current1Index].type === "aqi-apps" ? (
          <>{getAqiDataZone2(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "stocks-apps" ? (
          <>{getStockDataZone2(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "google-apps" ? (
          <>{handleGoogleApps(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "news-apps" ? (
          <>{getNewsDataZone2(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "quote-apps" ? (
          <>{getQuoteDataZone2(contentnew["Zone2"][current1Index].data)}</>
        ) : contentnew["Zone2"][current1Index].type === "people-apps" ? (
          <>
            <div className="h-100 w-100 zone-not-supported-people-space d-flex justify-content-center align-items-center">
              <h1 className="text-center text-white">
                This app is not supported in this zone.
              </h1>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default PreviewZone2;
