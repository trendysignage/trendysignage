import React, { useEffect } from "react";
import { connect } from "react-redux";
import weather from "../../../img/weather.svg";
import urlapp from "../../../img/urlapp.svg";

import menuIcon from "../../../img/menu-icon.svg";
import UrlAppModal from "../../modals/UrlAppModal";
import youtube from "../../../img/youtube.svg";
import scroller from "../../../img/Scroller.svg";
import text from "../../../img/text.svg";
import clock from "../../../img/clock.svg";
import news from "../../../img/news.svg";

import google from "../../../img/Google.svg";
import Stocks from "../../../img/Stocks.svg";
import qr from "../../../img/qr.svg";
import aqi from "../../../img/aqi.svg";
import rss from "../../../img/rss.svg";
import people from "../../../img/people.svg";

import quote from "../../../img/quote 1.svg";
import bulletin from "../../../img/Bulletin.svg";
import { useState } from "react";
import RssFeedAppModal from "../../modals/RssFeedAppModal";
import ScrollerTextAppModal from "../../modals/ScrollerTextAppModal";
import WeatherAppModal from "../../modals/WeatherAppModal";
import TextAppModal from "../../modals/TextAppModal";
import ClockApp from "../../modals/ClockApp";
import StocksAppModal from "../../modals/StocksAppModal";
import QrCodeModal from "../../modals/QrCodeModal";
import AirQualityAppModal from "../../modals/AirQualityAppModal";
import YoutubeAppModal from "../../modals/YoutubeAppModal";
import BulletinBoardAppModal from "../../modals/BulletinBoardAppModal";
import { getWeather } from "../../../utils/api";
import GoogleSlideAppModal from "../../modals/GoogleSlideAppModal";
import QuoteModel from "../../modals/QuoteModel.jsx";
import AllNewsAppModal from "../../modals/AllNewsAppModal";
import { Button, Dropdown } from "react-bootstrap";
// import Form from "react-bootstrap/Form";
// import { usePlacesWidget } from "react-google-autocomplete";
import { useHistory } from "react-router-dom";
import Carousel from "react-material-ui-carousel";
import Box from "@mui/material/Box";
import Switch from "@mui/material/Switch";
import Paper from "@mui/material/Paper";
import Slide from "@mui/material/Slide";
import FormControlLabel from "@mui/material/FormControlLabel";

const Integrations = ({ permission, auth }) => {
  console.log("auth", auth);
  const history = useHistory();
  console.log("React ENV", process.env.REACT_APP_TITLE);
  const [showUrlApp, setShowUrlApp] = useState(false);
  const [showRssFeedApp, setShowRssFeedApp] = useState(false);
  const [showScrollerTextApp, setShowScrollerTextApp] = useState(false);
  const [showWeatherApp, setShowWeatherApp] = useState(false);
  const [showTextApp, setShowTextApp] = useState(false);
  const [showClockApp, setShowClockApp] = useState(false);
  const [showStocksApp, setShowStocksApp] = useState(false);
  const [showQrCodeApp, setShowQrCodeApp] = useState(false);
  const [showAirQualityApp, setShowAirQualityApp] = useState(false);
  const [showYoutubeApp, setShowYoutubeApp] = useState(false);
  const [showBulletinBoardApp, setShowBulletinBoardApp] = useState(false);
  const [showGoogleSlideApp, setShowGoogleSlideApp] = useState(false);
  const [showQuotesApp, setShowQuotesApp] = useState(false);
  const [showNewsApp, setShowNewsApp] = useState(false);

  const appList = [
    { title: "URL APP", slug: "url-app", icon: urlapp },
    { title: "YOUTUBE", slug: "youtube", icon: youtube },

    { title: "SCROLLER", slug: "scroller", icon: scroller },
    { title: "WEATHER", slug: "weather", icon: weather },
    { title: "TEXT", slug: "text", icon: text },
    { title: "CLOCK APP", slug: "clock-app", icon: clock },

    { title: " BULLETIN APP", slug: "bulletin-app", icon: bulletin },
    { title: "GOOGLE SLIDES", slug: "google-slides", icon: google },
    { title: "All NEWS APP", slug: "all-news-app", icon: news },
    { title: "QUOTES", slug: "quotes", icon: quote },

    // { title: "STOCKS", slug: "stocks", icon: Stocks },
    // { title: "QR CODE", slug: "qr-code", icon: qr },

    // { title: "AIR QUALITY APP", slug: "air-quality-app", icon: aqi },
    // { title: "RSS FEED", slug: "rss-feed", icon: rss },
    // { title: "PEOPLE SPACE", slug: "people-space", icon: people },
  ];

  const handleChange = (e, type) => {
    e.preventDefault();
    console.log(type);
    if (permission && permission.permission.APPS.add) {
      if (type && type == "url-app") {
        setShowUrlApp(true);
      }
      if (type && type == "rss-feed") {
        setShowRssFeedApp(true);
      }
      if (type && type == "youtube") {
        setShowYoutubeApp(true);
      }
      if (type && type == "scroller") {
        setShowScrollerTextApp(true);
      }
      if (type && type == "text") {
        setShowTextApp(true);
      }
      if (type && type == "clock-app") {
        setShowClockApp(true);
      }
      if (type && type == "weather") {
        setShowWeatherApp(true);
      }
      if (type && type == "qr-code") {
        setShowQrCodeApp(true);
      }
      if (type && type == "air-quality-app") {
        setShowAirQualityApp(true);
      }
      if (type && type == "stocks") {
        setShowStocksApp(true);
      }
      if (type && type == "all-news-app") {
        setShowNewsApp(true);
      }
      if (type && type == "bulletin-app") {
        setShowBulletinBoardApp(true);
      }
      if (type && type == "bulletin-app") {
        setShowBulletinBoardApp(true);
      }
      if (type && type == "google-slides") {
        setShowGoogleSlideApp(true);
      }
      if (type && type == "quotes") {
        setShowQuotesApp(true);
      }
      if (type && type == "people-space") {
        history.push("/people-space");
      }
    }
  };

  const data = {
    slideDuration: 10,
    theame: {
      value: "classic",
      label: "Classic",
    },
  };
  console.log("data rss", data);
  //const prp = JSON.parse(data);
  const list = [
    {
      title:
        " title 1We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
    {
      title:
        " title 2We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
    {
      title:
        " title 3We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
    {
      title:
        " title 4We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
    {
      title:
        " title 5We Consider Requests As They Come': United Nations On Row Over 'Bharat Vs India' Name",
      content:
        "'Testament To Our Shared Vision And Collaboration For Better Future': PM Modi At ASEAN-India Summit In Jakarta",
    },
  ];

  const [checked, setChecked] = useState(true);

  // const interval = setInterval(() => {
  //   setChecked(!checked);
  //   setInterval(() => {
  //     setChecked(!checked);
  //   }, 1000)
  // }, 10000);
  // return (
  //   <div
  //     className="basic-list-group image-preview-container media-content"
  //     style={{ color: "white"}}
  //   >
  //     {(
  //       <>

  //         <div
  //           className={`h-100 ${data.theame.value == 'White Background' ? 'bg-white' : 'bg-black'} `}
  //           style={{ padding: "5% 2% 2% 2%" }}
  //         >

  //           <Carousel
  //             interval={(data.slideDuration) * 1000}
  //             indicators={false}
  //             animation={"slide"}
  //             className="h-100"
  //           >
  //             {list.map((item, i) => {
  //               return (
  //                 <>
  //                 <Slide direction="right" in={checked} timeout={1000}>
  //                   <div style={{
  //                     maxWidth: "100%",
  //                     minWidth:"70%",
  //                     height:"5px",
  //                     background: "#fff",
  //                     margin: "2rem 0",
  //                     display: "inline-block"
  //                   }}></div>
  //                 </Slide>
  //                 <div className="h-100">
  //                   <div className=" h-100">
  //                     <div
  //                       className="text-center  "
  //                     >
  //                       <div className="mt-2 hhhhhh" key={i}>
  //                         <h1 className={`${data.theame.value == 'White Background' ? 'text-black' : 'text-white'} `}>
  //                           {item.title}
  //                         </h1>
  //                         <p className={`${data.theame.value == 'White Background' ? 'text-black' : 'text-white'} `}>{item.content}</p>
  //                       </div>
  //                     </div>
  //                   </div>
  //                 </div>
  //                 </>
  //               );
  //             })}
  //           </Carousel>
  //           <div style={{position:'absolute',bottom:'20px',right:'10%'}}>
  //           <Slide direction="up" in={checked} mountOnEnter unmountOnExit timeout={1000}>
  //             <img style={{
  //               width:'100px', height:"100px"
  //             }} src={"https://ssapi.trendysignage.com/6436ac4945920161d6b13dab/image/trendy_1694100200126.png"} />
  //           </Slide>
  //           </div>
  //         </div>
  //       </>
  //     )}
  //   </div>
  // );

  return (
    <>
      {/* <div className="col-md-6">                 
          <div >
              <Form.Group controlId="formBasicEmail" className="">
                  <label className="text-label" >Address</label>
                  
                  <Form.Control 
                      type="text" 
                      ref={bootstrapRef} 
                      onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
                      autoComplete="off" 
                      //value={values.address.address} 
                  />
              </Form.Group>
              <div
                      id="val-username1-error"
                      className="invalid-feedback animated fadeInUp"
                      style={{ display: "block" }}
                  >
                      {}
              </div>
          </div>
      </div> */}

      <div className="custom-content-heading d-flex flex-wrap flex-column">
        <h1 className="mb-3">Integrations</h1>
      </div>
      <div
        className="integration-container h-100"
        style={{ overflowY: "auto" }}
      >
        {appList.map((item) => {
          return (
            <div className="app-card ">
              <div className="d-flex justify-content-end mr-3 mt-3">
                <Dropdown
                  className="dropdown-toggle-menu app-card-menu"
                  drop="left"
                >
                  <Dropdown.Toggle variant="left" className="p-0">
                    <span className="table-menu-icon">
                      <img
                        className="app-card-menu-img img-fluid"
                        src={menuIcon}
                        alt="menu-icon"
                      />
                    </span>
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      href="#"
                      className=""
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="d-flex align-items-center justify-content-between mb-2">
                        <label htmlFor="favourite" className="mb-0">
                          {" "}
                          Mark as favourite
                        </label>
                        <input
                          type="checkbox"
                          id="favourite"
                          name="favourite"
                          value="favourite"
                        />
                      </div>
                      <div className="d-flex align-items-center justify-content-between">
                        <label htmlFor="learn" className="mb-0">
                          {" "}
                          Learn More
                        </label>
                        <input type="checkbox" id="learn" name="learn" />
                      </div>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div
                className="d-flex align-items-center justify-content-center"
                onClick={(e) => {
                  handleChange(e, item.slug);
                }}
              >
                <div className="text-center">
                  <img className="mb-3 app-icon" src={item.icon} />
                  <p>{item.title}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <UrlAppModal
        setShowUrlApp={() => setShowUrlApp(false)}
        show={showUrlApp}
      />
      <RssFeedAppModal
        setShowUrlApp={() => setShowRssFeedApp(false)}
        show={showRssFeedApp}
      />
      <ScrollerTextAppModal
        show={showScrollerTextApp}
        setShowScrollerTextApp={setShowScrollerTextApp}
      />
      <WeatherAppModal
        setShowUrlApp={() => setShowWeatherApp(false)}
        show={showWeatherApp}
      />
      <TextAppModal
        setShowUrlApp={() => setShowTextApp(false)}
        show={showTextApp}
      />
      <ClockApp
        setShowUrlApp={() => setShowClockApp(false)}
        show={showClockApp}
      />
      <StocksAppModal
        setShowUrlApp={() => setShowStocksApp(false)}
        show={showStocksApp}
      />
      <QrCodeModal
        setShowUrlApp={() => setShowQrCodeApp(false)}
        show={showQrCodeApp}
      />
      <AirQualityAppModal
        setShowUrlApp={() => setShowAirQualityApp(false)}
        show={showAirQualityApp}
      />
      {showYoutubeApp && (
        <YoutubeAppModal
          setShowUrlApp={() => setShowYoutubeApp(false)}
          show={showYoutubeApp}
        />
      )}
      <BulletinBoardAppModal
        setShowUrlApp={() => setShowBulletinBoardApp(false)}
        show={showBulletinBoardApp}
      />
      <GoogleSlideAppModal
        setShowUrlApp={() => setShowGoogleSlideApp(false)}
        show={showGoogleSlideApp}
      />
      <QuoteModel
        setShowUrlApp={() => setShowQuotesApp(false)}
        show={showQuotesApp}
      />
      <AllNewsAppModal
        setShowUrlApp={() => setShowNewsApp(false)}
        show={showNewsApp}
      />
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // errorMessage: state.auth.errorMessage,
    // successMessage: state.auth.successMessage,
    auth: state.auth.auth,
    permission: state.auth.permission,
  };
};
export default connect(mapStateToProps)(Integrations);
