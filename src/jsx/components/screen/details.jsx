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

import { useParams, useHistory } from "react-router-dom";
import assignIcon from "../../../img/path1299.png";
import secndIcon from "../../../img/Group626051.png";
import editIcon from "../../../img/edit-icon.png";
import powerIcon from "../../../img/power-icon.png";
import screenShotIcon from "../../../img/screenshot-icon.png";
import locationIcon from "../../../img/location-icon.png";
import accordionImg from "../../../img/screen-accordion-img.png";
import editComposition from "../../../img/edit-composition.png";
import clockIcon from "../../../img/clock-icon.png";
import tagAddIcon from "../../../img/icon-tag-add.png";

import { deleteScreen, getAllScreens } from "../../../utils/api";
import DeleteConfirmation from "../../modals/DeleteConfirmation";

const ScreenDetails = () => {
  const history = useHistory();
  const { id } = useParams();
  const [screen, setScreen] = useState("");
  const [activeDefault, setActiveDefault] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  // use effect
  useEffect(() => {
    callAllScreenApi();
  }, []);
  const callAllScreenApi = async () => {
    const list = await getAllScreens();
    setScreen(
      list.find((item) => {
        return item._id === id;
      })
    );
  };

  const handleDelete = async () => {
    setDeleteModal(false);
    await deleteScreen(id);
    history.push("/display");
  };
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
                  src={accordionImg}
                  alt="menu-icon"
                />
              </div>
              <div className="accordion-custom-content flex-1">
                <h6>Currently Playing</h6>
                <p>Default Composition</p>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-4 col-sm-6 col-12">
            <div className="accordion-custom-body d-flex align-items-center w-100">
              <div className="accordion-custom-img">
                <img
                  className="accordion-img"
                  src={accordionImg}
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
                <p>Default Composition 1</p>
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
                  From 02 Apr, 23 ,04:00PM - To 05 Apr,23, 05:00Pm
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
            <Badge
              className="badge-common-light badge-tag mr-2"
              variant="outline-light"
            >
              Test Devices
            </Badge>
            <Badge
              className="badge-common-light badge-tag mr-2"
              variant="outline-light"
            >
              Test Devices
            </Badge>
            <Badge
              className="badge-common-light badge-tag mr-2"
              variant="outline-light"
            >
              Test Devices
            </Badge>
            <span className="tag-added">
              {" "}
              <img className="tag-add-icon" src={tagAddIcon} alt="menu-icon" />
            </span>
          </div>
        </div>
      ),

      bg: "success",
    },
  ];
  if (!screen) return <></>;
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap align-items-center">
        <h1 className="mr-auto">Screen Details</h1>
        <Button
          className="edit-screen-btn d-flex align-items-center"
          variant="outline-light"
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
            <a className=" btn btn-primary" variant="primary"
                          href={`/web-player?id=${screen.device.deviceToken}`}
                          target="_blank"
                          rel="noreferrer"
                        >
                        Launch Web Player
                        </a>

            <Button
              className="ml-2 screen-icon-btn btn btn-primary"
              variant="primary"
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
      </div>
    </>
  );
};

export default ScreenDetails;
