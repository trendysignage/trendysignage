import React, { useState } from "react";
import { Button, Table, Dropdown } from "react-bootstrap";
import {
    humanReadableFormattedDateString,
  } from "../../../utils/UtilsService";

export default function Audit({reportData}) {


  return (
    <>
      <span>Hello</span>
      <Table
        responsive
        className="custom-table screen-table"
        style={{ height: "100%" }}
        id="external-events"
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Vendor</th>
            <th>CreatedAt</th>
          </tr>
        </thead>

        <tbody>
          {reportData.length > 0 &&
            reportData.map((data) => {

              return (
                <tr key={data?._id}>
                  <td>{data?.title}</td>
                  <td>{data.vendor.name} </td>
                  <td>{humanReadableFormattedDateString(data.createdAt)} </td>
                </tr>
              );
            })}
        </tbody>
        {reportData?.length === 0 && <h3 className="mt-5">No Report Found</h3>}
      </Table>
    </>
  );
}
