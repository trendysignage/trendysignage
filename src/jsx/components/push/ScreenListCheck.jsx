import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import scheduleIcon from "../../../img/schedule-icon.png";
import quickPlayIcon from "../../../img/quickplay-icon.png";
import defaultComparisonIcon from "../../../img/comparison-icon.png";
import { Link } from "react-router-dom";
import { Button, Table, Dropdown } from "react-bootstrap";
import { deleteSchedule, getAllSchedule, getQuickPlay, deleteQuickPlay, getDefaultComposition, getAllScreens, getAllComposition } from "../../../utils/api";
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

const ScreenListCheck = ({screens}) => {
  const history = useHistory();






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
    if(type == 'screen'){
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
    }
    else{
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
          <button className="btn btn-sm btn-primary" onClick={(e) => {console.log(checkedItems, checkedValues)}}>Proceed</button>
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
            {loading  ? (
          <TableLoader colSpan={5}/>
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
                            onChange={(e) =>{handleCheckboxChange(e,"screen")}}
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
  );
};

export default ScreenListCheck;
