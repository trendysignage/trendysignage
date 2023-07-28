import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReports } from "../../../utils/api";
import { Button, Table, Dropdown } from "react-bootstrap";
import GenerateReportModal from "../../modals/generateReportModal";
import Uptime from './Uptime';
import Media from './Media';
import Audit from './Audit';

export default function ReportsList() {
  const history = useHistory();
  const [dropValue, setDropValue] = useState("Select");
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  let params = new URLSearchParams(history.location.search);
  let startDate = params.get("startDate");
  let endDate = params.get("endDate");
  let type = params.get("type");
  let reportSlug = params.get("report");
  const [reportData, setReportData] = useState([]);
  const handleDropDown = (e, data) => {
    e.preventDefault();
    setDropValue(data);
  };
  useEffect(() => {
    console.log(startDate, endDate, "semnd api");
    getReports(startDate, endDate, reportSlug).then((res) => {
      console.log(res, "res schedule getReports");
      if (res.data.statusCode === 200) {
        setReportData(res.data.data);
        // history.push(`/reports-list/${res.data.data}`);
        // <ReportsList data={res.data.data} />;
      }
    });
  }, [startDate, endDate, reportSlug]);

  return (
    <>
      {" "}
      <div className="custom-content-heading d-flex align-items-center">
        <div>
          <h1 className="mb-4">{reportSlug}</h1>
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
      {reportSlug && reportSlug == 'uptime-report' ? <Uptime reportData={reportData}/> : ''}
      {reportSlug && reportSlug == 'media-report' ? <Media reportData={reportData}/> : ''}
      {reportSlug && reportSlug == 'audit-logs' ? <Audit reportData={reportData}/> : ''}
      
      <GenerateReportModal
        close={() => setShowGenerateModal(false)}
        show={showGenerateModal}
        reportType={reportSlug}
        type={type}
      />
    </>
  );
}
