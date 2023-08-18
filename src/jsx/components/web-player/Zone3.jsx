import React from "react";

import WebVideoPlayer from "./WebVideoPlayer";
import ReactPlayer from "react-player";
import Iframe from "react-iframe";
import { handleBulletinApps, handleScrollerApps, handleTextApps, handleClockApps, handleWeatherApps, handleQrApps, handleRssApps, handleAqiApps } from '../../../utils/UtilsService';
const Zone3 = ({ contents, currentIndex, current1Index, current2Index, viewImage}) => {

  return (
    <>
      {" "}
      {contents && contents.zones.length == 3 ? (
        <div
            style={{ height: "100vh" }}
        >
            <div className="third-compoition-container">
                <div
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
                        contents.zones[0].content[currentIndex].type === "scroller" && 
                    <>{handleScrollerApps(contents.zones[0].content[currentIndex].data)}</>
                    }
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
                        contents.zones[0].content[currentIndex].type === "weather-apps" && (
                        <>{handleWeatherApps(contents.zones[0].content[currentIndex].data)}</>
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
                            src={`http://144.126.143.140:5000/${contents.zones[1].content[current1Index].url}`}
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
                            src={`http://144.126.143.140:5000/${contents.zones[1].content[current1Index].url}`}
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
                    {contents.zones[1] &&
                        contents.zones[1].content[current1Index] &&
                        contents.zones[1].content[current1Index].type === "scroller" && (
                        <>{handleScrollerApps(contents.zones[1].content[currentIndex].data)}</>
                    )}
                    {contents.zones[1] &&
                        contents.zones[1].content[current1Index] &&
                        contents.zones[1].content[current1Index].type === "text-apps" && (
                        <>{handleTextApps(contents.zones[1].content[currentIndex].data)}</>
                    )}
                    {contents.zones[1] &&
                        contents.zones[1].content[current1Index] &&
                        contents.zones[1].content[current1Index].type === "clock-apps" && (
                        <>{handleClockApps(contents.zones[1].content[currentIndex].data)}</>
                    )}
                    {contents.zones[1] &&
                        contents.zones[1].content[current1Index] &&
                        contents.zones[1].content[current1Index].type === "bulletin-apps" && (
                        <>{handleBulletinApps(contents.zones[1].content[currentIndex].data)}</>
                    )}
                    {contents.zones[1] &&
                        contents.zones[1].content[current1Index] &&
                        contents.zones[1].content[current1Index].type === "qrcode-apps" && (
                        <>{handleQrApps(contents.zones[1].content[currentIndex].data)}</>
                    )}
                    {contents.zones[1] &&
                        contents.zones[1].content[current1Index] &&
                        contents.zones[1].content[current1Index].type === "weather-apps" && (
                        <>{handleWeatherApps(contents.zones[1].content[currentIndex].data)}</>
                    )}
                    {contents.zones[1] &&
                        contents.zones[1].content[current1Index] &&
                        contents.zones[1].content[current1Index].type === "rss-apps" && (
                        <>{handleRssApps(contents.zones[1].content[currentIndex].data)}</>
                    )}
                    {contents.zones[1] &&
                        contents.zones[1].content[current1Index] &&
                        contents.zones[1].content[current1Index].type === "aqi-apps" && (
                        <>{handleAqiApps(contents.zones[1].content[currentIndex].data)}</>
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
                        src={`http://144.126.143.140:5000/${contents.zones[2].content[current2Index].url}`}
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
                        src={`http://144.126.143.140:5000/${contents.zones[2].content[current2Index].url}`}
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
                {contents.zones[2] &&
                    contents.zones[2].content[current2Index] &&
                    contents.zones[2].content[current2Index].type === "scroller" && (
                    <>{handleScrollerApps(contents.zones[2].content[currentIndex].data)}</>
                )}
                {contents.zones[2] &&
                    contents.zones[2].content[current2Index] &&
                    contents.zones[2].content[current2Index].type === "text-apps" && (
                    <>{handleTextApps(contents.zones[2].content[currentIndex].data)}</>
                )}
                {contents.zones[2] &&
                    contents.zones[2].content[current2Index] &&
                    contents.zones[2].content[current2Index].type === "clock-apps" && (
                    <>{handleClockApps(contents.zones[2].content[currentIndex].data)}</>
                )}
                {contents.zones[2] &&
                    contents.zones[2].content[current2Index] &&
                    contents.zones[2].content[current2Index].type === "bulletin-apps" && (
                    <>{handleBulletinApps(contents.zones[2].content[currentIndex].data)}</>
                )}
                {contents.zones[2] &&
                    contents.zones[2].content[current2Index] &&
                    contents.zones[2].content[current2Index].type === "qrcode-apps" && (
                    <>{handleQrApps(contents.zones[2].content[currentIndex].data)}</>
                )}
                {contents.zones[2] &&
                    contents.zones[2].content[current2Index] &&
                    contents.zones[2].content[current2Index].type === "weather-apps" && (
                    <>{handleWeatherApps(contents.zones[2].content[currentIndex].data)}</>
                )}
                {contents.zones[2] &&
                    contents.zones[2].content[current2Index] &&
                    contents.zones[2].content[current2Index].type === "rss-apps" && (
                    <>{handleRssApps(contents.zones[2].content[currentIndex].data)}</>
                )}
                {contents.zones[2] &&
                    contents.zones[2].content[current2Index] &&
                    contents.zones[2].content[current2Index].type === "aqi-apps" && (
                    <>{handleAqiApps(contents.zones[2].content[currentIndex].data)}</>
                )}
            </div>
        </div>
      ) :
        <></>
      }
    </>
  );
};

export default Zone3;
