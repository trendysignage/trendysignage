import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReports } from "../../../utils/api";
import { Button, Table, Dropdown } from "react-bootstrap";
import GenerateReportModal from "../../modals/generateReportModal";

export default function ReportsList() {
  const history = useHistory();
  const [dropValue, setDropValue] = useState("Select");
  const [showGenerateModal, setShowGenerateModal] = useState(false);

  let params = new URLSearchParams(history.location.search);
  let startDate = params.get("startDate");
  let endDate = params.get("endDate");
  let type = params.get("type");
  const [reportData, setReportData] = useState([]);
  const handleDropDown = (e, data) => {
    e.preventDefault();
    setDropValue(data);
  };
  useEffect(() => {
    console.log(startDate, endDate, "semnd api");
    getReports(startDate, endDate).then((res) => {
      console.log(res, "res schedule getReports");
      if (res.data.statusCode === 200) {
        setReportData(res.data.data);
        // history.push(`/reports-list/${res.data.data}`);
        // <ReportsList data={res.data.data} />;
      }
    });
  }, [startDate, endDate]);

  return (
    <>
      {" "}
      <div className="custom-content-heading d-flex align-items-center">
        <div>
          <h1 className="mb-4">{type}</h1>
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
      <Table
        responsive
        className="custom-table screen-table"
        style={{ height: "100%" }}
        id="external-events"
      >
        <thead>
          <tr>
            <th>Screen</th>
            <th>Total Uptime</th>
            <th>Daily Average Uptime</th>
          </tr>
        </thead>

        <tbody>
          {reportData.length > 0 &&
            reportData.map((data) => {
              const sumOfTime = data?.uptimeReport?.reduce(
                (total, obj) => total + obj?.time,
                0
              );

              // Convert the sum to hours
              const sumInHours = sumOfTime;
              const hours = Math.floor(sumOfTime / 60);
              const minutes = sumOfTime % 60;

              const formattedSum = `${hours} hr ${
                minutes < 10 ? "0" : ""
              }${Math.floor(minutes)} min`;

              const average = sumInHours / data?.uptimeReport?.length;
              const aveHours = Math.floor(average / 60);
              const aveMinutes = average % 60;

              const aveFormattedSum = `${aveHours} hr ${
                aveMinutes < 10 ? "0" : ""
              }${Math.floor(aveMinutes)} min`;

              return (
                <tr key={data?._id}>
                  <td>{data?.name}</td>
                  <td>{formattedSum} </td>
                  <td>{aveFormattedSum} </td>
                </tr>
              );
            })}
        </tbody>
        {reportData?.length === 0 && <h3 className="mt-5">No Report Found</h3>}
      </Table>
      <GenerateReportModal
        close={() => setShowGenerateModal(false)}
        show={showGenerateModal}
        reportType=""
        type={type}
      />
    </>
  );
}
