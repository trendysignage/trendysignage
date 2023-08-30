import React, { useEffect } from "react";
import weather from "../../../img/weather.svg";
import { Dropdown } from "react-bootstrap";
import menuIcon from "../../../img/menu-icon.png";
import UrlAppModal from "../../modals/UrlAppModal";
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

// import Form from "react-bootstrap/Form";
// import { usePlacesWidget } from "react-google-autocomplete";

export default function Integrations() {
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

  const appList = [
    { title: "URL APP", slug: "url-app", icon: weather },
    { title: "YOUTUBE", slug: "youtube", icon: weather },
    { title: "RSS FEED", slug: "rss-feed", icon: weather },
    { title: "SCROLLER", slug: "scroller", icon: weather },
    { title: "WEATHER", slug: "weather", icon: weather },
    { title: "TEXT", slug: "text", icon: weather },
    { title: "CLOCK APP", slug: "clock-app", icon: weather },
    { title: "STOCKS", slug: "stocks", icon: weather },
    { title: "QR CODE", slug: "qr-code", icon: weather },
    { title: "Bulletin App", slug: "all-news-app", icon: weather },
    { title: "AIR QUALITY APP", slug: "air-quality-app", icon: weather },
    { title: "PEOPLE SPACE", slug: "people-space", icon: weather },
    { title: "GOOGLE SLIDES", slug: "google-slides", icon: weather },
    { title: "QUOTES", slug: "quotes", icon: weather },
  ];

  const handleChange = (e, type) => {
    e.preventDefault();
    console.log(type);
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
      setShowBulletinBoardApp(true);
    }
    if (type && type == "google-slides") {
      setShowGoogleSlideApp(true);
    }
    // if(type && type == 'quotes'){
    //   setShowUrlApp(true);
    // }
  };

  // const getWeatherDetail = async() => {
  //   const locationData  = await getWeather('noida');
  //   console.log('getLocation', locationData);
  // }
  // useEffect(() => {
  //   getWeatherDetail()
  // },[])

  // const [addressError, setAddressError] = useState("");
  // const { ref: bootstrapRef } = usePlacesWidget({
  //     apiKey : "AIzaSyA_JO9H6JEScutFurdvFw1t-v31GIf2Q2o",
  //     onPlaceSelected: (place) => {handleLocation(place)},
  //     options: {
  //         types: ["(regions)"],
  //         componentRestrictions: { country: ["IN", 'AE'] },
  //     },
  // });

  // const handleLocation = (place) => {
  //   let location = JSON.parse(JSON.stringify(place?.geometry?.location));
  //   console.log("location",location )
  //   const adres = {
  //       address : place.formatted_address,
  //       latitude : location.lat,
  //       longitude : location.lng
  //   }
  //   //handleUpdate({...values,['address'] : adres})
  //   //setAdd(adres);
  // }

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
                  <img className="mb-3" src={weather} />
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
    </>
  );
}
