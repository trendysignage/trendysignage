import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import { connect } from "react-redux";
import scheduleIcon from "../../../img/schedule-icon.png";
import quickPlayIcon from "../../../img/quickplay-icon.png";
import defaultComparisonIcon from "../../../img/comparison-icon.png";
import { Link } from "react-router-dom";
import { Button, Table, Dropdown } from "react-bootstrap";
import {
  deleteSchedule,
  getAllSchedule,
  getQuickPlay,
  deleteQuickPlay,
  getDefaultComposition,
  getAllScreens,
  getAllComposition,
  setDefaultComposition,
} from "../../../utils/api";
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
import TableLoader from "../../components/TableLoader";
import LockScreen from "../../pages/LockScreen";
import SelectScreenModal from "../../modals/SelectScreenModal";
import ScheduleList from "./ScheduleList";
import QuickPlayList from "./QuickPlayList";
import DefComplist from "./DefComplist";

const PushScreen = ({ permission }) => {
  const history = useHistory();
  const [scheduleData, setScheduleData] = useState([]);
  const [quickPlayData, setQuickPlayData] = useState([]);
  const [defaultData, setDefaultData] = useState([]);
  const [showPublishBtn, setShowPublishBtn] = useState(false);
  const [publishType, setPublishType] = useState("schedule");
  const [loading, setLoading] = useState(false);
  const [showDefaultScreen, setShowDefaultScreen] = useState(false);
  const [showDefaultComp, setShowDefaultComp] = useState(false);
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedValues, setCheckedValues] = useState([]);
  const [checkedValuesComp, setCheckedValuesComp] = useState(null);
  const [allComposition, setAllComposition] = useState([]);
  const [allScreens, setAllScreens] = useState("");
  const [showPublishPopUp, setShowPublishPopUp] = useState(false);
  const [selectedSchdule, setSelectedSchdule] = useState(null);
  const [isRefresh, setIsRefresh] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [filterData, setFilterData] = useState([]);

  const callAllScreenApi = async () => {
    const list = await getAllScreens();
    setAllScreens(list);
  };

  const getAllCompositionList = async () => {
    setLoading(true);
    const list = await getAllComposition();
    console.log("lsit", list);
    setAllComposition(list);
    setLoading(false);
  };

  async function getSchedule() {
    setLoading(true);
    let str = "";
    if (filterData.tags && filterData.tags.length > 0) {
      filterData.tags.map((tg, i) => {
        return (str += `tags[${i}]=${tg}&`);
      });
    }
    await getAllSchedule(str).then((res) => {
      setScheduleData(res.data.data);
      setLoading(false);
    });
  }
  async function getQuickplay() {
    setLoading(true);
    await getQuickPlay().then((res) => {
      console.log(res, "res Quickplay");
      setQuickPlayData(res.data.data);
      setLoading(false);
    });
  }
  async function getDefault() {
    setLoading(true);
    await getDefaultComposition().then((res) => {
      console.log(res.data, "res Default");
      setDefaultData(res.data.data);
      setLoading(false);
    });
  }
  useEffect(() => {
    setIsRefresh(false);
    getSchedule();
    callAllScreenApi();
    getAllCompositionList();
    if (publishType && publishType === "schedule") {
      getSchedule();
    }
    if (publishType && publishType === "quickplay") {
      getQuickplay();
    }
    if (publishType && publishType === "defaultComposition") {
      getDefault();
    }
  }, [publishType, isRefresh]);

  function handleDeleteSchedule(id) {
    deleteSchedule(id).then((res) => {
      if (res.data.statusCode === 200) {
        getSchedule();
      }
    });
  }

  const handleDeleteQuickPlay = (e, id) => {
    e.preventDefault();
    deleteQuickPlay(id).then((res) => {
      if (res.data.statusCode === 200) {
        getQuickplay();
      }
    });
  };

  const handleEditSchedule = (e, id) => {
    e.preventDefault();
    history.push(`/design-month-schedule/${id}`);
  };

  const handleDefaultScreen = (e) => {
    e.preventDefault();
    setShowDefaultScreen(true);
  };

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
    if (!value || value === undefined) {
      return "time not find";
    }
    if (value !== undefined) {
      return value?.timings[value.timings.length - 1]?.endTime;
    }
  }

  const handleCheckboxChange = (event, type) => {
    if (type == "screen") {
      const newCheckedItems = {
        ...checkedItems,
        [event.target.name]: event.target.checked,
      };
      const selectedScreens = [];
      for (const key in newCheckedItems) {
        if (newCheckedItems[key] === true) {
          selectedScreens.push(key);
        }
      }
      setCheckedValues(selectedScreens);
      setCheckedItems(newCheckedItems);
    } else {
      setCheckedValuesComp(event.target.name);
    }
  };

  const handleSelectAllChange = (event) => {
    const newCheckedItems = {};
    allScreens.forEach((item) => {
      newCheckedItems[item._id] = event.target.checked;
    });
    const selectedScreens = [];
    for (const key in newCheckedItems) {
      if (newCheckedItems[key] === true) {
        selectedScreens.push(key);
      }
    }
    setCheckedValues(selectedScreens);
    setCheckedItems(newCheckedItems);
  };

  const handleProceed = (e, type) => {
    if (type == "screen") {
      e.preventDefault();
      setShowDefaultComp(true);
      setShowDefaultScreen(false);
    }
  };

  const handleProceedComp = async (e, type) => {
    e.preventDefault();
    console.log(checkedValues, checkedItems, checkedValuesComp);
    await setDefaultComposition({
      screens: checkedValues,
      compositionId: checkedValuesComp,
    });
    setShowDefaultComp(false);
    setShowDefaultScreen(false);
    setShowPublishBtn(!showPublishBtn);
    setCheckedItems([]);
    setCheckedValues([]);
    setCheckedValuesComp(null);
    setPublishType("defaultComposition");
  };

  const handlePublish = (e) => {
    e.preventDefault();
    if (showPublishBtn === true) {
      setShowDefaultComp(false);
      setShowDefaultScreen(false);
      setCheckedItems([]);
      setCheckedValues([]);
      setCheckedValuesComp(null);
      setPublishType("schedule");
    }
    setShowPublishBtn(!showPublishBtn);
  };

  // const handleSubmit = async () => {
  //  await publishMedia({
  //     id: selected._id,
  //     screenIds: checkedValues,
  //     duration: 600,
  //     type:type
  //   });
  //   await setQuickplay({
  //     name,
  //     compositionId: selected._id,
  //     screens: checkedValues,
  //     duration: 600
  //   });
  //   setPublished(true);
  //   // setShowPublishPopUp(false);
  // };
  return (
    <>
      <SelectScreenModal
        setShowPublishPopUp={setShowPublishPopUp}
        showPublishPopUp={showPublishPopUp}
        selectedSchdule={selectedSchdule}
        setSelectedSchdule={setSelectedSchdule}
        setIsRefresh={setIsRefresh}
      />
      <div className="custom-content-heading d-flex flex-wrap flex-row align-items-center justify-content-between">
        <div>
          <h1 className="mb-1">Push</h1>
          <p className="three-layout-paragrapgh">
            How would you like to publish your content?
          </p>
        </div>

        <Button
          className=""
          variant="info add-screen-btn"
          type="button"
          onClick={(e) => handlePublish(e)}
        >
          Publish
        </Button>
      </div>
      <div style={{ position: "relative" }}>
        <div className="layout-row push-row mb-4">
          {showPublishBtn && !showDefaultScreen && !showDefaultComp ? (
            <Row>
              <Col lg="4" md="4" sm="12" xs="12">
                {permission && permission.permission.SCHEDULE.add ? (
                  <Link to={{ pathname: `/SelectComparison` }}>
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
                        Scheduled content gets displayed only for time you
                        choose
                      </p>
                    </div>
                  </Link>
                ) : (
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
                )}
              </Col>
              {/* <Col lg="4" md="4" sm="12" xs="12">
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
                <button
                  onClick={(e) => {
                    handleDefaultScreen(e);
                  }}
                >
                  Add Content
                </button>
              </div>
            </Col> */}
            </Row>
          ) : (
            <></>
          )}
          {!showPublishBtn && (
            <div className="d-flex mb-2 mt-3">
              <Button
                className={
                  publishType === "schedule"
                    ? "mr-3 activeType"
                    : "mr-3 push-screen-btn"
                }
                variant="info "
                type="button"
                onClick={(e) => {
                  setPublishType("schedule");
                }}
              >
                Schedule
              </Button>
              <Button
                className={
                  publishType === "quickplay"
                    ? "mr-3 activeType"
                    : "mr-3 push-screen-btn"
                }
                variant="info "
                type="button"
                onClick={(e) => {
                  setPublishType("quickplay");
                }}
              >
                Quickplay
              </Button>
              <Button
                className={
                  publishType === "defaultComposition"
                    ? "mr-3 activeType"
                    : "mr-3 push-screen-btn"
                }
                variant="info "
                type="button"
                onClick={(e) => {
                  setPublishType("defaultComposition");
                }}
              >
                Default Composition
              </Button>
            </div>
          )}
        </div>
        {!showPublishBtn &&
          publishType &&
          publishType === "quickplay" &&
          (permission && permission.permission.QUICKPLAY.view ? (
            <QuickPlayList
              setIsRefresh={setIsRefresh}
              data={quickPlayData}
              handleDeleteQuickPlay={handleDeleteQuickPlay}
              setFilterData={setFilterData}
            />
          ) : (
            <LockScreen
              message={"You don't have permssion to access this !!!"}
            />
          ))}

        {!showPublishBtn &&
          publishType &&
          publishType === "defaultComposition" && (
            <>
              <DefComplist
                setIsRefresh={setIsRefresh}
                data={defaultData}
                setFilterData={setFilterData}
              />
            </>
          )}
        {!showPublishBtn &&
          publishType &&
          publishType === "schedule" &&
          (permission && permission.permission.SCHEDULE.view ? (
            <>
              <ScheduleList
                setIsRefresh={setIsRefresh}
                data={scheduleData}
                setSelectedSchdule={setSelectedSchdule}
                setShowPublishPopUp={setShowPublishPopUp}
                handleDeleteSchedule={handleDeleteSchedule}
                setFilterData={setFilterData}
              />
            </>
          ) : (
            <LockScreen
              message={"You don't have permssion to access this !!!"}
            />
          ))}
      </div>
      {showPublishBtn &&
        checkedValues &&
        checkedValues.length > 0 &&
        checkedValuesComp == null && (
          <button
            className="btn btn-sm btn-primary"
            onClick={(e) => {
              handleProceed(e, "screen");
            }}
          >
            Proceed
          </button>
        )}
      {showDefaultScreen && (
        <>
          <h4>Plesae Select Screen</h4>
          <Table responsive>
            <thead>
              <tr>
                <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkbox1_exam_all"
                      onChange={handleSelectAllChange}
                      required=""
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkbox1_exam_all"
                    ></label>
                  </div>
                </th>
                <th>Screen</th>
                <th>Last Seen</th>
                <th>Default Composition</th>
                <th>Current Schedule</th>
              </tr>
            </thead>
            {loading ? (
              <TableLoader colSpan={5} />
            ) : (
              <tbody>
                {allScreens !== "" &&
                  allScreens.map((screen) => {
                    return (
                      <tr>
                        <td>
                          <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={screen._id}
                              name={screen._id}
                              checked={checkedItems[screen._id]}
                              onChange={(e) => {
                                handleCheckboxChange(e, "screen");
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={screen._id}
                            ></label>
                          </div>
                        </td>

                        <td>
                          <span className="td-content">
                            <strong>{screen.name}</strong>
                            <span>{screen.screenLocation}</span>
                          </span>
                        </td>
                        <td>
                          <span className="d-flex align-items-center">
                            <span className="status status-green"></span>
                            <span className="td-content">
                              <strong>{screen.name}</strong>
                              <span>{screen.screenLocation}</span>
                            </span>
                          </span>
                        </td>
                        <td>Default Compo. </td>
                        <td>No Schedule</td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </Table>
        </>
      )}
      {showPublishBtn && checkedValuesComp != null && (
        <button
          className="btn btn-sm btn-primary"
          onClick={(e) => {
            handleProceedComp(e, "composition");
          }}
        >
          Submit
        </button>
      )}
      {checkedValues && checkedValues.length > 0 && showDefaultComp && (
        <>
          <h4>Please select composition</h4>
          <Table responsive>
            <thead>
              <tr>
                <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkbox1_exam_all"
                      disabled
                      // onChange={handleSelectAllChange}
                      required=""
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkbox1_exam_all"
                    ></label>
                  </div>
                </th>
                <th>Name</th>
                <th>Date Added</th>
                <th>Duration</th>
                <th>Associated Schedule</th>
              </tr>
            </thead>
            {loading ? (
              <TableLoader colSpan={5} />
            ) : (
              <tbody>
                {allComposition !== "" &&
                  allComposition.map((composition) => {
                    return (
                      <tr>
                        <td>
                          <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={composition._id}
                              name={composition._id}
                              checked={checkedValuesComp === composition._id}
                              onChange={(e) => {
                                handleCheckboxChange(e, "composition");
                              }}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={composition._id}
                            ></label>
                          </div>
                        </td>
                        <td>
                          <span className="td-content d-flex name-td-content">
                            <span className="name-content d-flex flex-column flex-grow-1">
                              <strong>{composition.name}</strong>
                              <span>{composition.createdBy}</span>
                            </span>
                          </span>
                        </td>

                        <td>
                          <span className="td-content">
                            <strong>
                              {humanReadableFormattedDateString(
                                composition.createdAt
                              )}
                            </strong>
                            <span>
                              {getDatetimeIn12Hours(composition.createdAt)}
                            </span>
                          </span>
                        </td>
                        <td> {composition.duration} Sec</td>
                        <td>No Composition</td>
                      </tr>
                    );
                  })}
              </tbody>
            )}
          </Table>
        </>
      )}
    </>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    permission: state.auth.permission,
  };
};
export default connect(mapStateToProps)(PushScreen);
