import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { BASE_URL } from "../../../../utils/api";
import UrlAppModal from "../../../modals/UrlAppModal";
import YoutubeAppModal from "../../../modals/YoutubeAppModal";
import ScrollerTextAppModal from "../../../modals/ScrollerTextAppModal";
import TextAppModal from "../../../modals/TextAppModal";
import editBtnImg from "../../../../img/edit-btn.png";
import WeatherAppModal from "../../../modals/WeatherAppModal";
import ClockApp from "../../../modals/ClockApp";
import QrCodeModal from "../../../modals/QrCodeModal";
import StocksAppModal from "../../../modals/StocksAppModal";
import BulletinBoardAppModal from "../../../modals/BulletinBoardAppModal";
import RssFeedAppModal from "../../../modals/RssFeedAppModal";
import AirQualityAppModal from "../../../modals/AirQualityAppModal";
import QuoteModel from "../../../modals/QuoteModel";
import AllNewsAppModal from "../../../modals/AllNewsAppModal";
import GoogleSlideAppModal from "../../../modals/GoogleSlideAppModal";

const CompositionTable = ({ allMedia, addComposition }) => {
  const [showUrlApp, setShowUrlApp] = useState(false);
  const [showYoutubeApp, setShowYoutubeApp] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [showScrollerTextApp, setShowScrollerTextApp] = useState(false);
  const [showTextApp, setShowTextApp] = useState(false);
  const [showWeatherApp, setShowWeatherApp] = useState(false);
  const [showClockApp, setShowClockApp] = useState(false);
  const [showStocksApp, setShowStocksApp] = useState(false);
  const [showBulletinApp, setShowBulletinApp] = useState(false);
  const [showQrCodeApp, setShowQrCodeApp] = useState(false);
  const [showRssApp, setShowRssApp] = useState(false);
  const [showAqiApp, setShowAqiApp] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [showGoogleSlides, setShowGoogleSlides] = useState(false);

  const videoMetaDuration = (media) => {
    const properties = JSON.parse(media?.properties);
    if (properties && properties.length) {
      return (properties.length.toFixed(0) / 60).toFixed(0);
    }
    return null;
  };

  const handleEdit = (e, data) => {
    e.preventDefault();
    console.log(data.type);
    setSelectedMedia(data);
    if (data.type == "url-apps") {
      setShowUrlApp(true);
    } else if (data.type == "youtube-apps") {
      setShowYoutubeApp(true);
    } else if (data.type == "scroller") {
      setShowScrollerTextApp(true);
    } else if (data.type == "text-apps") {
      setShowTextApp(true);
    } else if (data.type == "weather-apps") {
      setShowWeatherApp(true);
    } else if (data.type == "clock-apps") {
      setShowClockApp(true);
    } else if (data.type == "qrcode-apps") {
      setShowQrCodeApp(true);
    } else if (data.type == "stocks-apps") {
      setShowStocksApp(true);
    } else if (data.type == "bulletin-apps") {
      setShowBulletinApp(true);
    } else if (data.type == "rss-apps") {
      setShowRssApp(true);
    } else if (data.type == "aqi-apps") {
      setShowAqiApp(true);
    } else if (data.type == "quote-apps") {
      setShowQuote(true);
    } else if (data.type == "news-apps") {
      setShowNews(true);
    } else if (data.type == "google-apps") {
      setShowGoogleSlides(true);
    }
  };

  return (
    <>
      <UrlAppModal
        setShowUrlApp={() => setShowUrlApp(false)}
        show={showUrlApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <YoutubeAppModal
        setShowUrlApp={() => setShowYoutubeApp(false)}
        show={showYoutubeApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <AllNewsAppModal
        setShowUrlApp={() => setShowNews(false)}
        show={showNews}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <ScrollerTextAppModal
        setShowScrollerTextApp={setShowScrollerTextApp}
        show={showScrollerTextApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <TextAppModal
        setShowUrlApp={() => setShowTextApp(false)}
        show={showTextApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <WeatherAppModal
        setShowUrlApp={() => setShowWeatherApp(false)}
        show={showWeatherApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <ClockApp
        setShowUrlApp={() => setShowClockApp(false)}
        show={showClockApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <QrCodeModal
        setShowUrlApp={() => setShowQrCodeApp(false)}
        show={showQrCodeApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <StocksAppModal
        setShowUrlApp={() => setShowStocksApp(false)}
        show={showStocksApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <BulletinBoardAppModal
        setShowUrlApp={() => setShowBulletinApp(false)}
        show={showBulletinApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <RssFeedAppModal
        setShowUrlApp={() => setShowRssApp(false)}
        show={showRssApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <AirQualityAppModal
        setShowUrlApp={() => setShowAqiApp(false)}
        show={showAqiApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <QuoteModel
        setShowUrlApp={() => setShowQuote(false)}
        show={showQuote}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <GoogleSlideAppModal
        setShowUrlApp={() => setShowGoogleSlides(false)}
        show={showGoogleSlides}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <Table
        responsive
        className="custom-table screen-table layout-table h-100"
      >
        <thead>
          <tr>
            <th>Media</th>
            <th>Type</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {allMedia &&
            allMedia.map((media) => {
              return (
                <tr
                  key={media._id}
                  onClick={() => {
                    addComposition(media);
                  }}
                >
                  <td>
                    <span className="td-content d-flex name-td-content">
                      <span
                        className={`name-img mr-2  ${
                          media.type === "video" && "videotableName"
                        }`}
                      >
                        {media.type === "image" && (
                          <img
                            className="media-img img-fluid"
                            src={`${BASE_URL}${media.title}`}
                            alt="media-img"
                          />
                        )}
                        {media.type === "video" && videoMetaDuration(media)}
                      </span>
                      <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>
                          {/* {
                            media.title.split("/")[
                              media.title.split("/").length - 1
                            ]
                          } */}

                          {media.title.split("/")[
                            media.title.split("/").length - 1
                          ].length > 11
                            ? media.title
                                .split("/")
                                [media.title.split("/").length - 1].slice(
                                  0,
                                  11
                                ) + "..."
                            : media.title.split("/")[
                                media.title.split("/").length - 1
                              ]}
                        </strong>
                        <span>{media.createdBy.name}</span>
                      </span>
                    </span>
                  </td>

                  <td>
                    <div className="d-flex align-items-center ">
                      <span>
                        {media.type.slice(0, 1).toUpperCase() +
                          media.type.slice(1)}
                      </span>

                      {media.type == "youtube-apps" ||
                      media.type == "url-apps" ||
                      media.type == "scroller" ||
                      media.type == "text-apps" ||
                      media.type == "weather-apps" ||
                      media.type == "clock-apps" ||
                      media.type == "qrcode-apps" ||
                      media.type == "rss-apps" ||
                      media.type == "aqi-apps" ||
                      media.type == "bulletin-apps" ||
                      media.type == "quote-apps" ||
                      media.type == "news-apps" ||
                      media.type == "google-apps" ||
                      media.type == "people-apps" ||
                      media.type == "stocks-apps" ? (
                        // <button
                        //   onClick={(e) => {
                        //     handleEdit(e, media);
                        //   }}
                        // >
                        //   Edi
                        // </button>
                        <span className="layout-edit-btn ml-3 ">
                          <img
                            className="edit-icon cursorPointer"
                            src={editBtnImg}
                            alt="icon"
                            onClick={(e) => {
                              handleEdit(e, media);
                            }}
                          />
                        </span>
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                  <td>
                    {media.tags.map((tag) => {
                      return (
                        <span className="my-phone-tag text-truncate ml-1">
                          {tag}
                        </span>
                      );
                    })}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default CompositionTable;
