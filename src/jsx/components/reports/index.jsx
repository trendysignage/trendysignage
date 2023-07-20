import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import scheduleIcon from "../../../img/Vector.png";
import computer from "../../../img/computer.png";
import logs from "../../../img/logs.png";
import GenerateReportModal from "../../modals/generateReportModal";

const Reports = () => {
  const [showGenerateModal, setShowGenerateModal] = useState(false);
  const [reportType, setReportType] = useState("");
  const [type, setType] = useState("");

  return (
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
          onClick={() => {
            setReportType("media-report");
            setShowGenerateModal(true);
            setType("Media Report");
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
          onClick={() => {
            setReportType("uptime-report");
            setShowGenerateModal(true);
            setType("Uptime Report");
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
          onClick={() => {
            setReportType("audit-logs");
            setShowGenerateModal(true);
            setType("Audit Logs");
          }}
        >
          <div className="push-column text-center">
            <div className="push-column-icon d-flex align-items-center justify-content-center">
              <img className="layout-select-img" src={logs} alt="menu-icon" />
            </div>
            <h6>Audit Logs</h6>
            <p>Shows data about users and their activity</p>
          </div>
        </Col>
      </Row>
      <GenerateReportModal
        close={() => setShowGenerateModal(false)}
        show={showGenerateModal}
        reportType={reportType}
        type={type}
      />
    </>
  );
};
export default Reports;
