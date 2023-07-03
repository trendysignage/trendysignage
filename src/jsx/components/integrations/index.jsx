import React from "react";
import weather from "../../../img/weather.svg";
import { Dropdown } from "react-bootstrap";
import menuIcon from "../../../img/menu-icon.png";

export default function Integrations() {
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap flex-column">
        <h1 className="mb-3">Integrations</h1>
      </div>
      <div className="integration-container">
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
          <div className="d-flex align-items-center justify-content-center">
            <div className="text-center">
              <img className="mb-3" src={weather} />
              <p>URL APP</p>
            </div>
          </div>
        </div>
        <div className="app-card d-flex align-items-center justify-content-center">
          <div className="text-center">
            <img className="mb-3" src={weather} />
            <p>RSS FEED</p>
          </div>
        </div>
        <div className="app-card d-flex align-items-center justify-content-center">
          <div className="text-center">
            <img className="mb-3" src={weather} />
            <p>SCROLLER</p>
          </div>
        </div>
        <div className="app-card d-flex align-items-center justify-content-center">
          <div className="text-center">
            <img className="mb-3" src={weather} />
            <p>WEATHER</p>
          </div>
        </div>
      </div>
    </>
  );
}
