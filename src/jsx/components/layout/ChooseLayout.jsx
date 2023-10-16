import React from "react";
import useSWR from "swr";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import layoutSelected from "../../../img/layout-select-img.png";
import layoutSelected1 from "../../../img/Group 625949.png";
import layoutSelected2 from "../../../img/layout-select-img2.png";
import singleZone1 from "../../../img/single-timezone-img.png";
import singleZone2 from "../../../img/single-timezone-img1.png";
import { Link } from "react-router-dom";
import { getLayouts } from "../../../utils/api";
import LockScreen from "../../pages/LockScreen";

const ChooseLayout = ({ permission }) => {
  const { data: layouts } = useSWR("/vendor/layouts", getLayouts);
  const Landscape = layouts
    ? layouts.filter((layout) => layout.screenType === "landscape")
    : [];
  const potrait = layouts
    ? layouts.filter((layout) => layout.screenType === "potrait")
    : [];

  console.log("permission", permission);
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap flex-column">
        <h1 className="mb-1">Choose Layout</h1>
        <p className="three-layout-paragrapgh">
          Select layout for your composition
        </p>
      </div>
      <div className="layout-row">
        {permission && permission.permission.COMPOSITION.add ? (
          <Row>
            {layouts &&
              Landscape.map((layout, index) => {
                return (
                  <Col lg="4" md="4" sm="6" xs="12" key={layout._id}>
                    <Link
                      // to={
                      //   layout.title === "Single Zone Landscape" || layout.title === "Two Zone Landscape" ? `/createcomposition?id=${layout._id}`
                      //  : "#"}
                      to={`/createcomposition?id=${layout._id}`}
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

            {/* {layouts &&
              potrait.map((layout) => {
                console.log(layout, "ooo");
                return (
                  <Col lg="4" md="4" sm="6" xs="12" key={layout._id}>
                    <Link to={`/createcomposition?id=${layout._id}`}>
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
              })} */}

            {layouts &&
              potrait
                .filter((layout) => layout.title === "Single Zone Potrait")
                .map((layout) => {
                  console.log(layout, "ooo");
                  return (
                    <Col lg="4" md="4" sm="6" xs="12" key={layout._id}>
                      <Link to={`/createcomposition?id=${layout._id}`}>
                        <div className="layout-selected-column">
                          <div className="layout-selected-img text-center">
                            {layout.title === "Single Zone Potrait" && (
                              <img
                                className={`layout-select-img single-time-zone`}
                                src={singleZone1}
                                alt="menu-icon"
                              />
                            )}
                            {/* ... Other code ... */}
                          </div>
                          <h6>{layout.title}</h6>
                          <p>{layout.zones.length} Zones</p>
                        </div>
                      </Link>
                    </Col>
                  );
                })}
          </Row>
        ) : (
          <LockScreen
            message={" You don't have permission to access this !!! "}
          />
        )}
      </div>
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    permission: state.auth.permission,
  };
};
export default connect(mapStateToProps)(ChooseLayout);
