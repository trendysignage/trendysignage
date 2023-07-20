import React, { useState } from "react";
import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getReports } from "../../../utils/api";
import { Button, Table, Dropdown } from "react-bootstrap";

export default function ReportsList() {
  const history = useHistory();

  let params = new URLSearchParams(history.location.search);
  let startDate = params.get("startDate");
  let endDate = params.get("endDate");
  let type = params.get("type");
  const [reportData, setReportData] = useState([]);
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
      <div className="custom-content-heading ">
        <div>
          <h1 className="mb-4">{type}</h1>
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
    </>
  );
}
