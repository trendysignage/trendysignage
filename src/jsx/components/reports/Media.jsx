import React, { useState } from "react";
import { Button, Table, Dropdown } from "react-bootstrap";
import {
    humanReadableFormattedDateString,
  } from "../../../utils/UtilsService";
import Datatable from "react-data-table-component";
export default function Media({reportData}) {

    const columns = [
        {
            name : "Media",
            selector : (row) => row?.mediaObject?._id
        },
        {
            name : "Loop Count",
            selector : (row) => row.loop
        },
        {
            name : "Duration",
            selector : (row) => row.duration
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
            <th>Media</th>
            <th>Loop Count</th>
            <th>Duration</th>
          </tr>
        </thead>

        <tbody>
          {reportData.length > 0 &&
            reportData.map((data) => {
              return (
                <tr key={data?._id}>
                  <td>{data?.media}</td>
                  <td>{data.loop} </td>
                  <td>{data.duration} </td>
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
