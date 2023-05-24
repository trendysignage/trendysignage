import React from "react";
import useSWR from "swr";
import { Col, Row } from "react-bootstrap";
import layoutSelected from "../../../img/layout-select-img.png";
import layoutSelected1 from "../../../img/layout-select-img1.png";
import layoutSelected2 from "../../../img/layout-select-img2.png";
import singleZone1 from "../../../img/single-timezone-img.png";
import singleZone2 from "../../../img/single-timezone-img1.png";
import { Link } from "react-router-dom";
import { getLayouts } from "../../../utils/api";

const ChooseLayout = () => {
  const { data: layouts } = useSWR("/vendor/layouts", getLayouts);
  const Landscape = layouts ? layouts.filter(
    (layout) => layout.screenType === "landscape"
  ) : [];
  const potrait = layouts ? layouts.filter((layout) => layout.screenType === "potrait") : [];
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap flex-column">
        <h1 className="mb-1">Choose Layout</h1>
        <p className="three-layout-paragrapgh">
          Select one of three layout for your composition
        </p>
      </div>
      <div className="layout-row">
        <Row>
          {layouts &&
            Landscape.map((layout, index) => {
              return (
                <Col lg="4" md="4" sm="6" xs="12" key={layout._id}>
                  <Link
                    to={
                      layout.title === "Single Zone Landscape" ? `/createcomposition?id=${layout._id}`
                     : "#"}
                  >
                    {/* <div className="layout-selected-column active"> */}
                    <div
                      className={`layout-selected-column ${
                        index === 0 && "active"
                      }`}
                    >
                      <div className="layout-selected-img text-center">
                        {layout.title === "Single Zone Landscape" && (
                          <img
                            className={`layout-select-img`}
                            src={layoutSelected}
                            alt="menu-icon"
                          />
                        )}
                        {layout.title === "Two Zone Landscape" && (
                          <img
                            className={`layout-select-img`}
                            src={layoutSelected1}
                            alt="menu-icon"
                          />
                        )}
                        {layout.title === "Three Zone Landscape" && (
                          <img
                            className={`layout-select-img`}
                            src={layoutSelected2}
                            alt="menu-icon"
                          />
                        )}
                      </div>
                      <h6>{layout.title}</h6>
                      <p>{layout.zones.length} Zone</p>
                    </div>
                  </Link>
                </Col>
              );
            })}

          {layouts &&
            potrait.map((layout) => {
              return (
                <Col lg="4" md="4" sm="6" xs="12" key={layout._id}>
                  <Link
                           to={
                      layout.title === "Single Zone Potrait" ? `/createcomposition?id=${layout._id}`
                     : "#"}
                  >
                    <div className="layout-selected-column">
                      <div className="layout-selected-img text-center">
                      {layout.title === "Single Zone Potrait" && (
                          <img
                            className={`layout-select-img single-time-zone`}
                            src={singleZone1}
                            alt="menu-icon"
                          />
                        )}
                        {layout.title === "Two Zone Potrait" && (
                          <img
                            className={`layout-select-img single-time-zone`}
                            src={singleZone2}
                            alt="menu-icon"
                          />
                        )}
                        
                      </div>
                      <h6>{layout.title}</h6>
                      <p>{layout.zones.length} Zones</p>
                    </div>
                  </Link>
                </Col>
              );
            })}
        </Row>
      </div>
    </>
  );
};

export default ChooseLayout;
