import React from "react";
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

  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap flex-column">
        <h1 className="mb-3">Integrations</h1>
      </div>
      <div
        className="integration-container h-100"
        style={{ overflowY: "auto" }}
      >
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
            onClick={() => {
              setShowUrlApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>URL APP</p>
            </div>
          </div>
        </div>
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
            onClick={() => {
              setShowYoutubeApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>YOUTUBE </p>
            </div>
          </div>
        </div>

        {/* <div className="app-card ">
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
            onClick={() => {
              setShowRssFeedApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>RSS FEED</p>
            </div>
          </div>
        </div>

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
            onClick={() => {
              setShowScrollerTextApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>SCROLLER</p>
            </div>
          </div>
        </div>

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
            onClick={() => {
              setShowWeatherApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>WEATHER</p>
            </div>
          </div>
        </div>
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
            onClick={() => {
              setShowTextApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>Text</p>
            </div>
          </div>
        </div>
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
            onClick={() => {
              setShowClockApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>CLOCK APP</p>
            </div>
          </div>
        </div>
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
            onClick={() => {
              setShowStocksApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>STOCKS </p>
            </div>
          </div>
        </div>

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
            onClick={() => {
              setShowQrCodeApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>QR CODE </p>
            </div>
          </div>
        </div>
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
            onClick={() => {
              setShowAirQualityApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>AIR QUALITY APP </p>
            </div>
          </div>
        </div>
        
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
            // onClick={() => {
            //   setShowYoutubeApp(true);
            // }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>PEOPLE SPACE </p>
            </div>
          </div>
        </div>

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
            onClick={() => {
              setShowYoutubeApp(true);
            }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>GOOGLE SLIDES </p>
            </div>
          </div>
        </div>

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
            // onClick={() => {
            //   setShowYoutubeApp(true);
            // }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>QUOTES </p>
            </div>
          </div>
        </div>

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
            // onClick={() => {
            //   setShowYoutubeApp(true);
            // }}
          >
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>ALL NEWS APP </p>
            </div>
          </div>
        </div> */}
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
        setShowUrlApp={() => setShowScrollerTextApp(false)}
        show={showScrollerTextApp}
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
      <YoutubeAppModal
        setShowUrlApp={() => setShowYoutubeApp(false)}
        show={showYoutubeApp}
      />
      <BulletinBoardAppModal
        setShowUrlApp={() => setShowBulletinBoardApp(false)}
        show={showBulletinBoardApp}
      />
    </>
  );
}
