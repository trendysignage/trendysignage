import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Dropdown } from "react-bootstrap";
import scheduleIcon from "../../../img/Vector.png";
import computer from "../../../img/computer.png";
import logs from "../../../img/logs.png";
import GenerateReportModal from "../../modals/generateReportModal";
import { useHistory } from "react-router-dom";
import { getReports } from "../../../utils/api";
import Uptime from "./Uptime";
import Media from "./Media";
import Audit from "./Audit";

const Reports = () => {
  const history = useHistory();
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [reportType, setReportType] = useState("");
  const [filter, setFilter] = useState({});
  const [reportData, setReportData] = useState([]);
  const [dropValue, setDropValue] = useState("Filter");
  let params = new URLSearchParams(history.location.search);
  let reportSlug = params.get("report");

  const handleClick = (e, type) => {
    e.preventDefault();
    history.push(`/reports?report=${type}`);
  };

  const handleDropDown = (e, data) => {
    e.preventDefault();
    setDropValue(data);
  };

  useEffect(() => {
    if (reportSlug && reportSlug !== "" && Object.keys(filter).length == 0) {
      setShowGenerateModal(true);
    }
    if (Object.keys(filter).length > 0 && reportSlug !== "") {
      getReports(filter.startDate, filter.endDate, reportSlug).then((res) => {
        if (res.data.statusCode === 200) {
          setReportData(res.data.data);
        }
      });
    }
  }, [reportSlug, filter]);

  useEffect(() => {
    if (reportSlug && reportSlug == "media-report") {
      setReportType("Media Report");
    }
    if (reportSlug && reportSlug == "uptime-report") {
      setReportType("Uptime Report");
    }
    if (reportSlug && reportSlug == "audit-logs") {
      setReportType("Audit Logs");
    }
  }, [reportData]);

  const redirectBack = (e) => {
    e.preventDefault();
    setReportData([]);
    setFilter({});
    setReportType("");
    history.push("/reports");
  };

  return (
    <>
      {reportSlug && reportSlug !== "" ? (
        ""
      ) : (
        <>
          <div className="custom-content-heading d-flex flex-wrap ">
            <div>
              <h1 className="mb-1">Reports</h1>
              <p className="three-layout-paragrapgh">
                Which report would you like to generate?
              </p>
            </div>
          </div>
          <Row>
            <Col
              lg="4"
              md="4"
              sm="12"
              xs="12"
              onClick={(e) => {
                handleClick(e, "media-report");
              }}
            >
              <div className="push-column text-center">
                <div className="push-column-icon d-flex align-items-center justify-content-center">
                  <img
                    className="layout-select-img"
                    src={scheduleIcon}
                    alt="menu-icon"
                  />
                </div>
                <h6> Media Report</h6>
                <p>Shows for how much time Media file is played</p>
              </div>
            </Col>
            <Col
              lg="4"
              md="4"
              sm="12"
              xs="12"
              onClick={(e) => {
                handleClick(e, "uptime-report");
              }}
            >
              <div className="push-column text-center">
                <div className="push-column-icon d-flex align-items-center justify-content-center">
                  <img
                    className="layout-select-img"
                    src={computer}
                    alt="menu-icon"
                  />
                </div>
                <h6>Uptime Report</h6>
                <p>Shows for how much time screen was displaying content</p>
              </div>
            </Col>
            <Col
              lg="4"
              md="4"
              sm="12"
              xs="12"
              onClick={(e) => {
                handleClick(e, "audit-logs");
              }}
            >
              <div className="push-column text-center">
                <div className="push-column-icon d-flex align-items-center justify-content-center">
                  <img
                    className="layout-select-img"
                    src={logs}
                    alt="menu-icon"
                  />
                </div>
                <h6>Audit Logs</h6>
                <p>Shows data about users and their activity</p>
              </div>
            </Col>
          </Row>
        </>
      )}
      {reportData && reportSlug ? (
        <>
          <div className="custom-content-heading d-flex align-items-center">
            <div>
              <button
                onClick={(e) => {
                  redirectBack(e);
                }}
              >
                Back
              </button>
              <h1 className="mb-4">{reportType}</h1>
            </div>
            <div className=" ml-auto d-flex flex-wrap align-items-center">
              <Dropdown>
                <Dropdown.Toggle
                  variant="outline-primary"
                  size="sm"
                  className="mt-1 mb-2"
                >
                  {dropValue}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={(e) => {
                      handleDropDown(e, "Monthly");
                      setShowGenerateModal(true);
                    }}
                  >
                    Monthly
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => {
                      handleDropDown(e, "Daily");
                      setShowGenerateModal(true);
                    }}
                  >
                    Daily
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={(e) => {
                      handleDropDown(e, "Custom");
                      setShowGenerateModal(true);
                    }}
                  >
                    Custom
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          {reportSlug && reportSlug == "uptime-report" ? (
            <Uptime reportData={reportData} />
          ) : (
            ""
          )}
          {reportSlug && reportSlug == "media-report" ? (
            <Media reportData={reportData} />
          ) : (
            ""
          )}
          {reportSlug && reportSlug == "audit-logs" ? (
            <Audit reportData={reportData} />
          ) : (
            ""
          )}
        </>
      ) : (
        ""
      )}
      <GenerateReportModal
        close={() => setShowGenerateModal(false)}
        show={showGenerateModal}
        setReportType={reportType}
        setFilter={setFilter}
        filter={filter}
      />
    </>
  );
};
export default Reports;
