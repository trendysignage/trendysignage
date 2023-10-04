import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Card,
  Dropdown,
  DropdownButton,
  Badge,
} from "react-bootstrap";
import { BASE_URL } from "../../../utils/api";
import moment from "moment";
import AddNewTagModal from "../../modals/AddNewTagModal";
import { useParams, useHistory } from "react-router-dom";
import editIcon from "../../../img/edit-icon.png";
import powerIcon from "../../../img/power-icon.png";
import screenShotIcon from "../../../img/screenshot-icon.png";
import locationIcon from "../../../img/location-icon.png";
import accordionImg from "../../../img/screen-accordion-img.png";
import editComposition from "../../../img/edit-composition.png";
import clockIcon from "../../../img/clock-icon.png";
import tagAddIcon from "../../../img/icon-tag-add.png";

import { deleteScreen, getAllScreens, getGroups, assignScreenGroups } from "../../../utils/api";
import DeleteConfirmation from "../../modals/DeleteConfirmation";
import QuickPlayModal from "../../modals/QuickPlayModal";
import WindowsModal from "../../modals/WindowsModal";
import UpdateModal from "../../modals/UpdateModal";
import { toast } from "react-toastify";

const ScreenDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [screen, setScreen] = useState("");

  const [activeDefault, setActiveDefault] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const [showQuickPlayModal, setQuickPlayModal] = useState(false);
  const [showWindowsModal, setWindowsModal] = useState(false);
  const [showUpdateModal, setUpdateModal] = useState(false);
  const [allGroups, setAllGroups] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);
  const [isEdit, setIsEdit] = useState(false)
  const [showNewTagModal, setNewTagModal] = useState(false);

  // use effect
  useEffect(() => {
    setIsRefresh(false)
    callAllScreenApi();
    callAllGroupsApi();
  }, [isRefresh]);
  useEffect(() => {
    if(screen){
      screen.groups.map((i) => {
        setSelectedGroups({...selectedGroups, [i._id] : true})
      })

      console.log("selectedGroups",selectedGroups, screen)
    }
  }, [screen]);
  const callAllScreenApi = async () => {
    const list = await getAllScreens();
    setScreen(
      list.find((item) => {
        return item._id === id;
      })
    );
  };
  const callAllGroupsApi = async () => {
    const list = await getGroups();
    console.log("Groups",list)
    setAllGroups(list.groups);
  };
  const handleDelete = async () => {
    setDeleteModal(false);
    await deleteScreen(id);
    history.push("/display");
  };

  const handleQuickPlay = async () => {
    setDeleteModal(false);
  };

  const handleWindows = async () => {
    setWindowsModal(false);
  };

  const handleUpdate = async () => {
    setWindowsModal(false);
  };

  const submitChangeGroups = async(e) => {
    e.preventDefault();
    //console.log("selectedGroups",selectedGroups, Object.keys(selectedGroups));
    const selectedGrp = selectedGroups;
    const groupsData = Object.keys(selectedGrp).filter((i) => {
      if(selectedGrp[i] == false){
        delete selectedGrp[i];
      }
      return selectedGrp[i] && selectedGrp[i] == true
    });
    console.log(selectedGrp)
    setSelectedGroups(selectedGrp)
    if(groupsData.length <= 0){
      return toast.error("Please add some content...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    if(!id){
      return toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    console.log('gp',groupsData, selectedGroups)
    await assignScreenGroups({
      screenId:id,
      groupIds:groupsData
    })
    setIsRefresh(true)
    setIsEdit(false)
    return toast.success("Groups has been assigned...", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
  }
  // const handleChangeGroups = async(e) => {
  //   e.preventDefault();
  //   console.log()
  //   if(e.target.checked){
  //     setSelectedGroups({...selectedGroups, [e.target.name] : true})
  //   }else{
  //     const newData = selectedGroups;
  //     delete newData[e.target.name];
  //     setSelectedGroups(newData);
  //   }
  // }
  const findEndTime = (value) => {
    if (!value || value === undefined) {
      return "time not find";
    }
    if (value !== undefined) {
      return value?.timings[value.timings.length - 1]?.endTime;
    }
}

const convertTimestampTo12HourFormat = (timestamp) => {
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
  const renderStartDate = (value) => {
    const maxDates = value.sequence.reduce((max, obj) => {
      const parseDts = obj.dates.map((dt) => new Date(dt));
      const objMax =
        obj.dates.length > 0 ? Math.max(...parseDts) : null;
      return objMax ? (max ? Math.max(max, objMax) : objMax) : max;
    }, null);
    const formatedDt = moment(new Date(maxDates)).format(
      "YYYY-MM-DD"
    );

    const minDates = value.sequence.reduce((min, obj) => {
      const parseDt = obj.dates.map((dt) => new Date(dt));
      const objMin =
        parseDt.length > 0 ? Math.min(...parseDt) : null;
      return objMin ? (min ? Math.min(min, objMin) : objMin) : min;
    }, null);

    const formatedDtMin = moment(new Date(minDates)).format(
      "YYYY-MM-DD"
    );

    const maxTime = value.sequence.reduce((max, obj) => {
      const parseDts = obj.dates.map((dt) => new Date(dt));
      const objMax =
        obj.dates.length > 0 ? Math.max(...parseDts) : null;
      return objMax ? (max ? Math.max(max, objMax) : objMax) : max;
    }, null);
    const endTime = findEndTime(
      value?.sequence[value?.sequence.length - 1]
    );
    return (
      <div>
          <span className="td-content">
              <strong> {formatedDtMin}</strong>
              {" "}
              <span>
              {convertTimestampTo12HourFormat(
                  value?.sequence[0]?.timings[0]?.startTime
              )}
              </span>
          </span>
      </div>
    )
  }

  const renderEndDate = (value) => {
      const maxDates = value.sequence.reduce((max, obj) => {
        const parseDts = obj.dates.map((dt) => new Date(dt));
        const objMax =
          obj.dates.length > 0 ? Math.max(...parseDts) : null;
        return objMax ? (max ? Math.max(max, objMax) : objMax) : max;
      }, null);
      const formatedDt = moment(new Date(maxDates)).format(
        "YYYY-MM-DD"
      );
      const endTime = findEndTime(
        value?.sequence[value?.sequence.length - 1]
      );
      return (
        <div>
            <span className="td-content">
                <strong> {formatedDt}</strong>
                {" "}
                <span>
                {convertTimestampTo12HourFormat(endTime)}
                </span>
            </span>
        </div>
      )
  }
  const defaultAccordion = [
    {
      title: "Content",
      text: (
        <div className="row">
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="accordion-custom-body d-flex align-items-center w-100">
              <div className="accordion-custom-img">
                <img
                  className="accordion-img"
                  src={screen.contentPlaying && screen.contentPlaying[0] && screen.contentPlaying[0].media && screen.contentPlaying[0].media.referenceUrl ? BASE_URL+screen.contentPlaying[0].media.referenceUrl[0].split("**")[0] : accordionImg}
                  alt="menu-icon"
                />
              </div>
              <div className="accordion-custom-content flex-1">
                <h6>Currently Playing</h6>
                <p>{screen.contentPlaying && screen.contentPlaying[0] && screen.contentPlaying[0].media ? screen.contentPlaying[0].media.name : "--" }</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="accordion-custom-body d-flex align-items-center w-100">
              <div className="accordion-custom-img">
                <img
                  className="accordion-img"
                  src={screen.defaultComposition && screen.defaultComposition.media && screen.defaultComposition.media.referenceUrl ? BASE_URL+screen.defaultComposition.media.referenceUrl[0].split("**")[0] : accordionImg}
                  alt="menu-icon"
                />
              </div>
              <div className="accordion-custom-content flex-1">
                <h6>
                  Default Composition{" "}
                  <span className="edit-compostion">
                    {" "}
                    <img
                      className="accordion-img"
                      src={editComposition}
                      alt="menu-icon"
                    />
                  </span>
                </h6>
                <p>{screen.defaultComposition && screen.defaultComposition.media ? screen.defaultComposition.media.name : "--"}</p>
              </div>
            </div>
          </div>

          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="accordion-custom-body d-flex align-items-center w-100">
              <div className="schedule-custom-img">
                <img className="schedule-img" src={clockIcon} alt="menu-icon" />
              </div>
              <div className="accordion-custom-content active-schedule flex-1">
                <h6>Active Schedule</h6>
                <h5>Schedule 1</h5>
                <p className="date-schedule">
                  From {screen.schedule ? renderStartDate(screen.schedule) : '--'} - To {screen.schedule ? renderEndDate(screen.schedule) : '--'}
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
      bg: "primary",
    },
    {
      title: "Device",
      text: (
        <div className="device-accordion-content">
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <h6>Private IP</h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <p>10.10.1.10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <h6>Device OS</h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <p>Windows</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <h6>Public IP</h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <p>17.12.13.10</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <h6>APK Version</h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <p>NA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <h6>MAC Address</h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <p>NA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <h6>SDK Version</h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <p>NA</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <h6>Device ID</h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <p>509373783ASDH766</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-6 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <h6>Javascript Version</h6>
                  </div>
                </div>
                <div className="col-lg-6 col-md-6 col-sm-6 col-12">
                  <div className="device-content">
                    <p>5.3.0.0</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),

      bg: "info",
    },
    {
      title: "Tag",
      text: (
        <div className="tag-accordion-content">
          <div className="tag-content-row d-flex flex-wrap align-items-center">
            {
              screen && screen.tags && screen.tags.map((item, i) => {
                return (
                  <Badge
                    className="badge-common-light badge-tag mr-2"
                    variant="outline-light"
                    id={i}
                  >{item}</Badge>
                )
              })
            }
            <span className="tag-added" style={{cursor:'pointer'}} onClick={(e) => {setNewTagModal(true);}}>
              {" "}
              <img className="tag-add-icon" src={tagAddIcon} alt="menu-icon" />
            </span>
          </div>
        </div>
      ),

      bg: "success",
    },
    {
      title: "Groups",
      text: (
        <div className="tag-accordion-content">
          {
            
            !isEdit && <div className="tag-content-row d-flex flex-wrap align-items-center">
            {
              screen && screen.groups.map((item) => {
               return (
                 <Badge
                   className="badge-common-light badge-tag mr-2"
                   variant="outline-light"
                 >
                   {item.name}
                 </Badge>
               )
             })
            }
              <span className="tag-added" style={{cursor:'pointer'}} onClick={(e) => setIsEdit(true)}>
                {" "}
                <img className="tag-add-icon" src={tagAddIcon} alt="menu-icon" />
              </span>
            </div>
            
          }
          {
            isEdit && <div className="tag-content-row d-flex flex-wrap align-items-center">
            {
              allGroups && allGroups.length > 0 
              ?
                <>
                {allGroups.map((item) => {
                  return (
                    <div className="col-3">
                    <input
                      id={"check-"+item._id}
                      type="checkbox"
                      className="   "
                      required
                      name={item._id}
                      checked={selectedGroups && selectedGroups[item._id]}
                      onChange={(e) => setSelectedGroups({...selectedGroups, [item._id] : e.target.checked})}
                    />
                    <label className="mt-3 mr-3">{item.name}</label>
                  </div>
                  )
                })}
                </>
              : 'NO Groups Found'
            }
            <span className="tag-added" onClick = {(e) =>submitChangeGroups(e)}>
              <Button className="btn btn-sm btn-primary">Save</Button>
            </span>
            <span className="tag-added mr-2 ml-2" onClick = {(e) =>setIsEdit(false)}>
              <Button className="btn btn-sm btn-danger">Cancel</Button>
            </span>
            </div>
          }
          

        </div>
      ),

      bg: "success",
    },
  ];
  if (!screen) return <></>;
  return (
    <>
      {showNewTagModal && (
        <AddNewTagModal
          setNewTagModal={setNewTagModal}
          selected={screen}
          setIsRefresh={setIsRefresh}
        />
      )}
      <div className="custom-content-heading d-flex flex-wrap align-items-center">
        <h1 className="mr-auto">Screen Details</h1>
        <Button
          className="edit-screen-btn d-flex align-items-center"
          variant="outline-light"
          onClick={() => {
            setUpdateModal(true);
          }}
        >
          Edit Screen{" "}
          <span className="btn-icon-right">
            <img className="edit-icon" src={editIcon} alt="menu-icon" />
          </span>
        </Button>
      </div>
      <div className="accordion-overflow">
        <div className="form-head d-flex mb-3 align-items-start mt-2 pr-3">
          <span className="screen-subheading">{screen.name}</span>

          <div className="ml-auto d-flex flex-wrap align-items-center">
            <a
              className=" btn btn-primary btn-xs"
              variant="primary"
              href={`/web-player?id=${screen.device.deviceToken}`}
              target="_blank"
              rel="noreferrer"
            >
              Launch Web Player
            </a>

            <Button
              className="ml-2 screen-icon-btn btn btn-primary"
              variant="primary"
              onClick={() => {
                setQuickPlayModal(true);
              }}
            >
              <img
                className="dropdown-list-img-icon img-fluid"
                src={powerIcon}
                alt="menu-icon"
              />
            </Button>
            <Button
              className="ml-2 screen-icon-btn btn btn-primary"
              variant="primary"
              onClick={() => {
                setWindowsModal(true);
              }}
            >
              <img
                className="dropdown-list-img-icon img-fluid screenshot-icon"
                src={screenShotIcon}
                alt="menu-icon"
              />
            </Button>
            <DropdownButton
              as={ButtonGroup}
              title=""
              id="bg-nested-dropdown"
              className="ml-2  more-icon-dropdown"
            >
              <Dropdown.Item eventKey="1">Reload Screen</Dropdown.Item>
              <Dropdown.Item eventKey="2">Clear Cache</Dropdown.Item>
              <Dropdown.Item eventKey="3">Clear Data</Dropdown.Item>
              <Dropdown.Item eventKey="4">Reboot display</Dropdown.Item>

              <Dropdown.Item
                eventKey="5"
                onClick={() => {
                  setDeleteModal(true);
                }}
              >
                Deactivate Screen
              </Dropdown.Item>
            </DropdownButton>
          </div>
        </div>

        <div className="row location-row mx-0">
          <div className="col-sm-6 p-md-0">
            <div className="location-col">
              <h4>
                <img
                  className="locationt-icon-img"
                  src={locationIcon}
                  alt="menu-icon"
                />
                {screen.googleLocation}
              </h4>
              <p className="active-row d-flex align-items-center">
                <span className="active-status"></span> Active Now
              </p>
            </div>
          </div>
        </div>

        <div className="row accordion-overflow-scroll">
          <div className="col-md-12 ">
            <Accordion
              className="accordion accordion-primary custom-accordion"
              defaultActiveKey=""
            >
              {defaultAccordion.map((d, i) => (
                <div className="accordion__item details-accordian" key={i}>
                  <Accordion.Toggle
                    as={Card.Text}
                    eventKey={`${i}`}
                    className={`accordion__header rounded-lg ${
                      activeDefault === i ? "" : "collapsed"
                    }`}
                    onClick={() =>
                      setActiveDefault(activeDefault === i ? -1 : i)
                    }
                  >
                    <span className="accordion__header--text">{d.title}</span>
                    <span className="accordion__header--indicator"></span>
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={`${i}`}>
                    <div className="accordion__body--text">{d.text}</div>
                  </Accordion.Collapse>
                </div>
              ))}
            </Accordion>
          </div>
          {deleteModal && (
            <DeleteConfirmation
              setDeleteModal={setDeleteModal}
              callbackFunction={handleDelete}
              text="Are you sure you want to deactivate?"
              yes={"Yes Deactivate"}
            />
          )}
        </div>

        <QuickPlayModal
          showQuickPlayModal={showQuickPlayModal}
          setQuickPlayModal={setQuickPlayModal}
          handleQuickPlay={handleQuickPlay}
        />

        <WindowsModal
          showWindowsModal={showWindowsModal}
          setWindowsModal={setWindowsModal}
          handleWindows={handleWindows}
        />

        <UpdateModal
          showUpdateModal={showUpdateModal}
          setUpdateModal={setUpdateModal}
          handleUpdate={handleUpdate}
        />
      </div>
    </>
  );
};

export default ScreenDetails;
