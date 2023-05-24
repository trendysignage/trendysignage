import React from "react";
import { Col, Row } from "react-bootstrap";
import scheduleIcon from "../../../img/schedule-icon.png";
import quickPlayIcon from "../../../img/quickplay-icon.png";
import defaultComparisonIcon from "../../../img/comparison-icon.png";
import { Link } from "react-router-dom";

const PushScreen = () => {
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap flex-column">
        <h1 className="mb-1">Push</h1>
        <p className="three-layout-paragrapgh">
          How would you like to publish your content?
        </p>
      </div>
      <div className="layout-row push-row">
        <Row>
          <Col lg="4" md="4" sm="12" xs="12">
          <Link
          to={{
            pathname: `/SelectComparison`,
          }}>
            <div className="push-column text-center">
              <div className="push-column-icon d-flex align-items-center justify-content-center">
                <img
                  className="layout-select-img"
                  src={scheduleIcon}
                  alt="menu-icon"
                />
              </div>
              <h6>Schedule</h6>
              <p>Scheduled content gets displayed only for time you choose</p>
            </div>
            </Link>
          </Col>
          <Col lg="4" md="4" sm="12" xs="12">
            <div className="push-column text-center">
              <div className="push-column-icon d-flex align-items-center justify-content-center">
                <img
                  className="layout-select-img"
                  src={quickPlayIcon}
                  alt="menu-icon"
                />
              </div>
              <h6>Quickplay</h6>
              <p>Quickplay let's you display content instantly. Can be used Emergency cases</p>
            </div>
          </Col>
          <Col lg="4" md="4" sm="12" xs="12">
            <div className="push-column text-center">
              <div className="push-column-icon d-flex align-items-center justify-content-center">
                <img
                  className="layout-select-img"
                  src={defaultComparisonIcon}
                  alt="menu-icon"
                />
              </div>
              <h6>Default Composition</h6>
              <p>Default content keeps on playing irrespective of the time when there is no active</p>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default PushScreen;
