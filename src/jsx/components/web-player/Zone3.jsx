import React, { useState } from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import {
  BASE_URL,
  getWeather,
  getStock,
  getNews,
  getQuotes,
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
  const [stock, setStock] = useState(null);
  const [stock2, setStock2] = useState(null);
  const [stock3, setStock3] = useState(null);

  const [quotes, setQuotes] = useState(null);
  const [quotes2, setQuotes2] = useState(null);
  const [quotes3, setQuotes3] = useState(null);
  const [news, setNews] = useState(null);
  const [news2, setNews2] = useState(null);
  const [news3, setNews3] = useState(null);

  const getWeatherDetail1 = async (lat, long, index) => {
    const locationData = await getWeather(lat, long);
    setWeatherInfo1(locationData);
  };
  const getWeatherDetail2 = async (lat, long) => {
    const locationData = await getWeather(lat, long);
    setWeatherInfo2(locationData);
  };
  const getWeatherDetail3 = async (lat, long, index) => {
    const locationData = await getWeather(lat, long);
    setWeatherInfo3(locationData);
  };
  const getStockDetail = async (lat, long) => {
    const locationData = await getStock(lat, long);
    setStock(locationData);
  };
  const getStockDetail2 = async (lat, long) => {
    const locationData = await getStock(lat, long);
    setStock2(locationData);
  };
  const getStockDetail3 = async (lat, long) => {
    const locationData = await getStock(lat, long);
    setStock3(locationData);
  };
  const getWeatherDataZone1 = (data) => {
    const prp = JSON.parse(data);

    if (!weatherInfo1) {
      console.log("Hello Weather Calling");
      getWeatherDetail1(prp.location.latitude, prp.location.longitude);
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
  const getWeatherDataZone3 = (data) => {
    const prp = JSON.parse(data);

    if (!weatherInfo3) {
      console.log("Hello Weather Calling");
      getWeatherDetail3(prp.location.latitude, prp.location.longitude);
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
  const getAqiDataZone3 = (data) => {
    const prp = JSON.parse(data);

    if (!weatherInfo3) {
      getWeatherDetail3(prp.location.latitude, prp.location.longitude);
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
  const getStockDataZone3 = (data) => {
    const prp = JSON.parse(data);
    console.log("location", prp);
    let stockType = "gainers";
    if (prp.stockType === '"Day Losers"') {
      stockType = "losers";
    } else if (prp.stockType === "Most Actives") {
      stockType = "actives";
    }

    if (!stock3) {
      console.log("Hello Stock Calling");
      getStockDetail3(stockType);
    }
    return handleStockApps(data, stock3);
  };

  const getNewsDetail = async (data) => {
    const locationData = await getNews(data);
    setNews(locationData);
  };
  const getNewsDetail2 = async (data) => {
    const locationData = await getNews(data);
    setNews2(locationData);
  };

  const getNewsDetail3 = async (data) => {
    const locationData = await getNews(data);
    setNews3(locationData);
  };

  const getQuotesDetail = async (data) => {
    const locationData = await getQuotes(data);
    setQuotes(locationData);
  };
  const getQuotesDetail2 = async (data) => {
    const locationData = await getQuotes(data);
    setQuotes2(locationData);
  };
  const getQuotesDetail3 = async (data) => {
    const locationData = await getQuotes(data);
    setQuotes3(locationData);
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

  const getQuoteDataZone3 = (data) => {
    const prp = JSON.parse(data);

    if (!quotes3) {
      const prms = {
        cat: "famous",
        count: "10",
      };
      console.log("Hello Quote Calling");
      getQuotesDetail3(prms);
    }
    return handleQuoteApps(data, quotes3);
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

  const getNewsDataZone3 = (data) => {
    const prp = JSON.parse(data);

    if (!news3) {
      getNewsDetail3(prp.topic.value);
    }
    return handleNewsApps(data, news3);
  };
  return (
    <>
      {" "}
      {contents && contents.zones.length == 3 ? (
        <div style={{ height: "100%" }}>
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
                        styles={{ height: "100%", border: "none" }}
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
                      {getAqiDataZone1(
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
                    "quote-apps" ? (
                    <div
                      className={`d-flex justify-content-center align-items-center h-100 `}
                      style={{
                        paddingTop: "45%",
                        backgroundColor: JSON.parse(
                          contents.zones[0].content[currentIndex].data
                        ).color.value,
                      }}
                    >
                      {getQuoteDataZone1(
                        contents.zones[0].content[currentIndex].data
                      )}
                    </div>
                  ) : contents.zones[0].content[currentIndex].type ===
                    "news-apps" ? (
                    <div
                      className={`h-100  ${
                        JSON.parse(contents.zones[0].content[currentIndex].data)
                          .theame.value == "white"
                          ? "news-app-bg"
                          : "bg-black"
                      } `}
                      // style={{ paddingTop: "20%" }}
                    >
                      {getNewsDataZone1(
                        contents.zones[0].content[currentIndex].data
                      )}
                    </div>
                  ) : contents.zones[0].content[currentIndex].type ===
                    "stocks-apps" ? (
                    <>
                      {getStockDataZone1(
                        contents.zones[0].content[currentIndex].data
                      )}
                    </>
                  ) : contents.zones[0].content[currentIndex].type ===
                    "people-apps" ? (
                    <>
                      {handlePeopleSpace(
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
                        styles={{ height: "100%", border: "0px" }}
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
                      {getAqiDataZone2(
                        contents.zones[1].content[current1Index].data
                      )}
                    </>
                  ) : contents.zones[1].content[currentIndex].type ===
                    "google-apps" ? (
                    <>
                      {handleGoogleApps(
                        contents.zones[1].content[current1Index].data
                      )}
                    </>
                  ) : contents.zones[1].content[currentIndex].type ===
                    "stocks-apps" ? (
                    <>
                      {getStockDataZone2(
                        contents.zones[1].content[currentIndex].data
                      )}
                    </>
                  ) : contents.zones[0].content[currentIndex].type ===
                    "quote-apps" ? (
                    <div
                      className={`d-flex justify-content-center align-items-center h-100`}
                      style={{
                        paddingTop: "45%",
                        backgroundColor: JSON.parse(
                          contents.zones[0].content[currentIndex].data
                        ).color.value,
                      }}
                    >
                      {getQuoteDataZone2(
                        contents.zones[1].content[current1Index].data
                      )}
                    </div>
                  ) : contents.zones[0].content[currentIndex].type ===
                    "news-apps" ? (
                    <div
                      className={`h-100  ${
                        JSON.parse(contents.zones[0].content[currentIndex].data)
                          .theame.value == "white"
                          ? "news-app-bg"
                          : "bg-black"
                      } `}
                      // style={{ paddingTop: "35%" }}
                    >
                      {getNewsDataZone2(
                        contents.zones[1].content[current1Index].data
                      )}
                    </div>
                  ) : contents.zones[0].content[currentIndex].type ===
                    "people-apps" ? (
                    <>
                      {handlePeopleSpace(
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
          </div>

          <div className="third-composition-third-div">
            {contents?.zones[2]?.content[current2Index] ? (
              <>
                {contents.zones[2].content[current2Index].type === "image" ? (
                  <div className="basic-list-group image-preview-container ">
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
                    className={`basic-list-group video-container  ${viewImage} ${
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
                      styles={{ height: "100%", border: "0px" }}
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
                    {getAqiDataZone3(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[currentIndex].type ===
                  "quote-apps" ? (
                  <>
                    {getQuoteDataZone3(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[currentIndex].type ===
                  "news-apps" ? (
                  <>
                    {getNewsDataZone3(
                      contents.zones[2].content[current2Index].data
                    )}
                  </>
                ) : contents.zones[2].content[current2Index].type ===
                  "google-apps" ? (
                  <>
                    {handleGoogleApps(
                      contents.zones[1].content[current1Index].data
                    )}
                  </>
                ) : contents.zones[2].content[currentIndex].type ===
                  "stocks-apps" ? (
                  <>
                    {getStockDataZone3(
                      contents.zones[2].content[currentIndex].data
                    )}
                  </>
                ) : contents.zones[0].content[currentIndex].type ===
                  "people-apps" ? (
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
