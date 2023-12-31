import React, { useState } from "react";
import { Table } from "react-bootstrap";
import Datatable from "react-data-table-component";

export default function Uptime({reportData}) {

    const getUptimeData = (data) => {
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

          return [formattedSum, aveFormattedSum];
    }

    const columns = [
        {
            name : "Screen",
            selector : (row) => row?.name
        },
        {
            name : "Total Uptime",
            selector : (row) => getUptimeData(row)[0]
        },
        {
            name : "Total Avg Time",
            selector : (row) => getUptimeData(row)[1]
        },
    ];


  return (
    <>
      {/* <Table
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
      </Table> */}
      <Datatable columns={columns} data={reportData} pagination />
    </>
  );
}
