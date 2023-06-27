import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import scheduleIcon from "../../../img/schedule-icon.png";
import quickPlayIcon from "../../../img/quickplay-icon.png";
import defaultComparisonIcon from "../../../img/comparison-icon.png";
import { Link } from "react-router-dom";
import { Table, Dropdown } from "react-bootstrap";
import { getAllSchedule } from "../../../utils/api";
import { useEffect } from "react";
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../../utils/UtilsService";
import moment from "moment";

const PushScreen = () => {
  const [scheduleData, setScheduleData] = useState([]);
  async function getSchedule() {
    await getAllSchedule().then((res) => {
      console.log(res, "res push screen");
      setScheduleData(res.data.data);
    });
  }
  console.log(scheduleData, "ooooooooo");
  useEffect(() => {
    getSchedule();
  }, []);

  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap flex-column">
        <h1 className="mb-1">Push</h1>
        <p className="three-layout-paragrapgh">
          How would you like to publish your content?
        </p>
      </div>
      <div className="layout-row push-row mb-5">
        <Row>
          <Col lg="4" md="4" sm="12" xs="12">
            <Link
              to={{
                pathname: `/SelectComparison`,
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
                <h6>Schedule</h6>
                <p>Scheduled content gets displayed only for time you choose</p>
              </div>
            </Link>
          </Col>
          <Col lg="4" md="4" sm="12" xs="12">
            <div className="push-column text-center">
              <div className="push-column-icon d-flex align-items-center justify-content-center">
                <img
                  className="layout-select-img"
                  src={quickPlayIcon}
                  alt="menu-icon"
                />
              </div>
              <h6>Quickplay</h6>
              <p>
                Quickplay let's you display content instantly. Can be used
                Emergency cases
              </p>
            </div>
          </Col>
          <Col lg="4" md="4" sm="12" xs="12">
            <div className="push-column text-center">
              <div className="push-column-icon d-flex align-items-center justify-content-center">
                <img
                  className="layout-select-img"
                  src={defaultComparisonIcon}
                  alt="menu-icon"
                />
              </div>
              <h6>Default Composition</h6>
              <p>
                Default content keeps on playing irrespective of the time when
                there is no active
              </p>
            </div>
          </Col>
        </Row>
      </div>

      <Table
        responsive
        className="custom-table screen-table"
        style={{ height: "100%" }}
        id="external-events"
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Date Added</th>
            <th>Screens Assigned</th>
            {/* <th>Start Date</th>
            <th>End Date</th> */}
          </tr>
        </thead>

        <tbody>
          {scheduleData &&
            scheduleData.map((composition) => {
              console.log(composition, "yyyyyy");
              // const length = composition?.sequence?.length - 1;
              // const maxDt =
              //   Math.max(
              //     ...composition.sequence[length].dates.map((el) => {
              //       if (el) return new Date(el);
              //     })
              //   ) ?? "";
              // const beforeDt = moment(new Date(maxDt)).format("YYYY-MM-DD");
              // const formatDt = moment(beforeDt).format("YYYY-MM-DD");
              // console.log(formatDt, "jjjjjjjjj");
              return (
                <tr key={composition._id}>
                  <td>{composition.name}</td>
                  <td>
                    <span className="td-content">
                      <strong>
                        {humanReadableFormattedDateString(
                          composition.createdAt
                        )}
                      </strong>
                      <span>{getDatetimeIn12Hours(composition.createdAt)}</span>
                    </span>
                  </td>
                  <td> {composition.screens?.length}</td>
                  {/* <td>
                    {
                      composition?.sequence[0]?.timings[0]?.startTime?.split(
                        "T"
                      )[0]
                    }
                  </td> */}
                  {/* <td>{formatDt}</td> */}
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default PushScreen;
