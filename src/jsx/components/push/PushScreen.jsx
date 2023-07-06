import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import scheduleIcon from "../../../img/schedule-icon.png";
import quickPlayIcon from "../../../img/quickplay-icon.png";
import defaultComparisonIcon from "../../../img/comparison-icon.png";
import { Link } from "react-router-dom";
import { Button, Table, Dropdown } from "react-bootstrap";
import { deleteSchedule, getAllSchedule } from "../../../utils/api";
import { useEffect } from "react";
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../../utils/UtilsService";
import moment from "moment";
import menuIcon from "../../../img/menu-icon.png";
import deleteIcon from "../../../img/delete-icon.png";
import edit from "../../../img/edit-composition.png";
import { useHistory } from "react-router-dom";

const PushScreen = () => {
  const history = useHistory();
  const [scheduleData, setScheduleData] = useState([]);
  const [showPublishBtn, setShowPublishBtn] = useState(false);
  const [loading, setLoading] = useState(false);

  async function getSchedule() {
    setLoading(true);
    await getAllSchedule().then((res) => {
      console.log(res, "res push screen");
      setScheduleData(res.data.data);
      setLoading(false);
    });
  }
  useEffect(() => {
    getSchedule();
  }, []);
  const handleDeleteSchedule = async (id) => {
    await deleteSchedule(id).then((res) => {
      if (res.data.statusCode === 200) {
        getSchedule();
      }
    });
  };

  const handleEditSchedule = (e, id) => {
    e.preventDefault();
    history.push(`/design-month-schedule/${id}`);
  }

  function convertTimestampTo12HourFormat(timestamp) {
    if (!timestamp) {
      return "Invalid timestamp";
    }
    if (timestamp === "time not find") {
      return "Invalid timestamp";
    }

    const timeParts = timestamp.split("T")[1].split(".")[0].split(":");
    let hours = 0;
    const minutes = timeParts[1];

    if (timeParts.length >= 1) {
      hours = parseInt(timeParts[0]);

      let amPm;
      if (hours >= 12) {
        amPm = "PM";
        if (hours > 12) {
          hours -= 12;
        }
      } else {
        amPm = "AM";
        if (hours === 0) {
          hours = 12;
        }
      }

      const convertedTime = `${hours}:${minutes} ${amPm}`;
      return convertedTime;
    } else {
      return "Invalid timestamp format";
    }
  }

  function findEndTime(value) {
    // console.log(value, "valurrrrrr");
    if (!value || value === undefined) {
      return "time not find";
    }
    if (value != undefined) {
      return value.timings[value.timings.length - 1].endTime;
    }
  }
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap flex-row align-items-center justify-content-between">
        <div>
          <h1 className="mb-1">Push</h1>
          <p className="three-layout-paragrapgh">
            How would you like to publish your content?
          </p>
        </div>
        {scheduleData.length !== 0 && (
          <Button
            className=""
            variant="info add-screen-btn"
            type="button"
            onClick={() => setShowPublishBtn(true)}
          >
            Publish
          </Button>
        )}
      </div>

      <div className="layout-row push-row mb-4">
        {showPublishBtn && (
          <div className="d-flex mb-2 mt-3">
            <Link
              to={{
                pathname: `/SelectComparison`,
              }}
            >
              <Button
                className="mr-3 push-screen-btn"
                variant="info "
                type="button"
              >
                Schedule
              </Button>
            </Link>

            <Button
              className="mr-3 push-screen-btn"
              variant="info "
              type="button"
            >
              Quickplay
            </Button>
            <Button className="push-screen-btn" variant="info " type="button">
              Default Composition
            </Button>
          </div>
        )}
        {scheduleData.length === 0 && !loading && (
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
                  <p>
                    Scheduled content gets displayed only for time you choose
                  </p>
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
        )}
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
            <th>Start Date</th>
            <th>End Date</th>
            <th>more</th>
          </tr>
        </thead>

        <tbody>
          {scheduleData &&
            scheduleData.map((composition) => {
              console.log(composition, "yyyyyy");

              const maxDates = composition.sequence.reduce((max, obj) => {
                const parseDts = obj.dates.map((dt) => new Date(dt));
                const objMax =
                  obj.dates.length > 0 ? Math.max(...parseDts) : null;
                return objMax ? (max ? Math.max(max, objMax) : objMax) : max;
              }, null);
              const formatedDt = moment(new Date(maxDates)).format(
                "YYYY-MM-DD"
              );

              const minDates = composition.sequence.reduce((min, obj) => {
                const parseDt = obj.dates.map((dt) => new Date(dt));
                const objMin = parseDt.length > 0 ? Math.min(...parseDt) : null;
                return objMin ? (min ? Math.min(min, objMin) : objMin) : min;
              }, null);

              const formatedDtMin = moment(new Date(minDates)).format(
                "YYYY-MM-DD"
              );

              const maxTime = composition.sequence.reduce((max, obj) => {
                const parseDts = obj.dates.map((dt) => new Date(dt));
                const objMax =
                  obj.dates.length > 0 ? Math.max(...parseDts) : null;
                return objMax ? (max ? Math.max(max, objMax) : objMax) : max;
              }, null);
              const endTime = findEndTime(
                composition?.sequence[composition?.sequence.length - 1]
              );

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

                  <td>
                    <div>
                      <span className="td-content">
                        <strong> {formatedDtMin}</strong>
                        <span>
                          {convertTimestampTo12HourFormat(
                            composition?.sequence[0]?.timings[0]?.startTime
                          )}
                        </span>
                      </span>
                    </div>
                  </td>

                  <td>
                    <spam className="td-content">
                      <strong>{formatedDt}</strong>

                      <span>{convertTimestampTo12HourFormat(endTime)}</span>
                    </spam>
                  </td>
                  <td>
                    <Dropdown className="dropdown-toggle-menu">
                      <Dropdown.Toggle variant="" className="p-0  mb-2">
                        <span className="table-menu-icon">
                          <img
                            className="menu-img img-fluid"
                            src={menuIcon}
                            alt="menu-icon"
                          />
                        </span>
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                      <Dropdown.Item
                          href={`/design-month-schedule/${composition._id}`}
                          className="dropdown-list-item"
                        >
                          <div className="d-flex">
                            <div className="dropdown-list-icon">
                              <img
                                className="dropdown-list-img img-fluid"
                                src={edit}
                                alt="menu-icon"
                              />
                            </div>
                            <div className="dropdown-menu-list">
                              <span className="menu-heading">Edit</span>
                              <span className="menu-description">
                                Get to know more about screen info
                              </span>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          className="dropdown-list-item"
                          onClick={(e) => {
                            handleDeleteSchedule(e,composition._id);
                          }}
                        >
                          <div className="d-flex">
                            <div className="dropdown-list-icon">
                              <img
                                className="dropdown-list-img img-fluid"
                                src={deleteIcon}
                                alt="menu-icon"
                              />
                            </div>
                            <div className="dropdown-menu-list">
                              <span className="menu-heading">Delete</span>
                              <span className="menu-description">
                                Get to know more about screen info
                              </span>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item
                          href="#"
                          className="dropdown-list-item"
                          onClick={() => {
                            history.push(`/push/view/${composition._id}`);
                          }}
                        >
                          <div className="d-flex">
                            <div className="dropdown-list-icon">
                              <img
                                className="dropdown-list-img img-fluid"
                                src={deleteIcon}
                                alt="menu-icon"
                              />
                            </div>
                            <div className="dropdown-menu-list">
                              <span className="menu-heading">
                                View Schedule
                              </span>
                              <span className="menu-description">
                                Get to know more about screen info
                              </span>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </>
  );
};

export default PushScreen;
