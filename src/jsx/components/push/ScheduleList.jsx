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
  BASE_URL,
} from "../../../utils/api";
import { useEffect } from "react";
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../../utils/UtilsService";
import moment from "moment";
import menuIcon from "../../../img/menu-icon.svg";
import deleteIcon from "../../../img/delete-icon.png";
import edit from "../../../img/edit-composition.png";
import { useHistory } from "react-router-dom";
import TableLoader from "../../components/TableLoader";
import LockScreen from "../../pages/LockScreen";
import SelectScreenModal from "../../modals/SelectScreenModal";

import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.svg";
import listIcon from "../../../img/list-icon.png";

import {
  DataGrid,
  GridToolbarExport,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from "@mui/x-data-grid";
import Pagination from "@mui/material/Pagination";
import LinearProgress from "@mui/material/LinearProgress";
import CustomNoRowsOverlay from "../CustomNoRowsOverlay";
import QuickSearchToolbar from "../QuickSearchToolbar";
import { GridToolbarContainer } from "@mui/x-data-grid";
import FilterModal from "../../modals/FilterModal";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <QuickSearchToolbar />
    </GridToolbarContainer>
  );
}

function CustomPagination() {
  const apiRef = useGridApiContext();
  const page = useGridSelector(apiRef, gridPageSelector);
  const pageCount = useGridSelector(apiRef, gridPageCountSelector);

  return (
    <Pagination
      color="primary"
      count={pageCount}
      page={page + 1}
      onChange={(event, value) => apiRef.current.setPage(value - 1)}
    />
  );
}
const ScheduleList = ({
  history,
  permission,
  setIsRefresh,
  data,
  setShowPublishPopUp,
  setSelectedSchdule,
  setFilterData,
  handleDeleteSchedule,
}) => {
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [showFilterModal, setFilterModal] = useState(false);
  const findEndTime = (value) => {
    if (!value || value === undefined) {
      return "time not find";
    }
    if (value !== undefined) {
      return value?.timings[value.timings.length - 1]?.endTime;
    }
  };

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
  };

  const rows = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        createdAt: humanReadableFormattedDateString(item.createdAt),
        screens: item.screens.length,
        startDate: item,
        endDate: item,
        tags: item,
        action: item,
      });
    });
  }

  const renderAction = (params) => {
    const { value } = params;
    return (
      <Dropdown className="dropdown-toggle-menu">
        <Dropdown.Toggle variant="" className="p-0  mb-2">
          <span className="table-menu-icon">
            <img
              className="menu-img img-fluid"
              src={menuIcon}
              alt="menu-icon"
              style={{ height: "50px" }}
            />
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            href={`/design-month-schedule/${value._id}`}
            disabled={permission && !permission.permission.SCHEDULE.edit}
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
            onClick={() => {
              setShowPublishPopUp(true);
              setSelectedSchdule(value);
              //setSelectedScreen(screen._id);
            }}
            //disabled={permission && !permission.permission.SCHEDULE.edit}
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
                <span className="menu-heading">Assign Screen</span>
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
              handleDeleteSchedule(value._id);
              console.log("oooo");
            }}
            disabled={permission && !permission.permission.SCHEDULE.delete}
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
            disabled={permission && !permission.permission.SCHEDULE.view}
            onClick={() => {
              history.push(`/push/view/${value._id}`);
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
                <span className="menu-heading">View Schedule</span>
                <span className="menu-description">
                  Get to know more about screen info
                </span>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const tagsRender = (params) => {
    const { value } = params;
    return (
      <div>
        <span className="tag-container">
          {value.tags.length > 2 ? (
            <>
              <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                {value.tags[0]}
              </span>
              <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                {value.tags[1]}
              </span>
              <span>...</span>
            </>
          ) : (
            value.tags.map((tag, index) => (
              <span
                key={index}
                className="my-phone-tag text-truncate ml-1 mr-1 mb-1"
              >
                {tag}
              </span>
            ))
          )}
        </span>
        <span
          className="down-arrow"
          onClick={(e) => {
            handleTags(e, value);
          }}
        >
          <img
            className="down-arrow-img img-fluid"
            src={downArrow}
            alt="arrow"
          />
        </span>
      </div>
    );
  };

  const renderDate = (params) => {
    const { value } = params;
    return (
      <span className="td-content">
        <strong>{humanReadableFormattedDateString(value)}</strong>{" "}
        <span>{getDatetimeIn12Hours(value)}</span>
      </span>
    );
  };

  const renderStartDate = (params) => {
    const { value } = params;
    const maxDates = value.sequence.reduce((max, obj) => {
      const parseDts = obj.dates.map((dt) => new Date(dt));
      const objMax = obj.dates.length > 0 ? Math.max(...parseDts) : null;
      return objMax ? (max ? Math.max(max, objMax) : objMax) : max;
    }, null);
    const formatedDt = moment(new Date(maxDates)).format("YYYY-MM-DD");

    const minDates = value.sequence.reduce((min, obj) => {
      const parseDt = obj.dates.map((dt) => new Date(dt));
      const objMin = parseDt.length > 0 ? Math.min(...parseDt) : null;
      return objMin ? (min ? Math.min(min, objMin) : objMin) : min;
    }, null);

    const formatedDtMin = moment(new Date(minDates)).format("YYYY-MM-DD");

    const maxTime = value.sequence.reduce((max, obj) => {
      const parseDts = obj.dates.map((dt) => new Date(dt));
      const objMax = obj.dates.length > 0 ? Math.max(...parseDts) : null;
      return objMax ? (max ? Math.max(max, objMax) : objMax) : max;
    }, null);
    const endTime = findEndTime(value?.sequence[value?.sequence.length - 1]);
    return (
      <div>
        <span className="td-content">
          <strong> {formatedDtMin}</strong>{" "}
          <span>
            {convertTimestampTo12HourFormat(
              value?.sequence[0]?.timings[0]?.startTime
            )}
          </span>
        </span>
      </div>
    );
  };

  const renderEndDate = (params) => {
    const { value } = params;
    const maxDates = value.sequence.reduce((max, obj) => {
      const parseDts = obj.dates.map((dt) => new Date(dt));
      const objMax = obj.dates.length > 0 ? Math.max(...parseDts) : null;
      return objMax ? (max ? Math.max(max, objMax) : objMax) : max;
    }, null);
    const formatedDt = moment(new Date(maxDates)).format("YYYY-MM-DD");
    const endTime = findEndTime(value?.sequence[value?.sequence.length - 1]);
    return (
      <div>
        <span className="td-content">
          <strong> {formatedDt}</strong>{" "}
          <span>{convertTimestampTo12HourFormat(endTime)}</span>
        </span>
      </div>
    );
  };

  const columns = [
    { field: "name", headerName: "Name", flex: 1 },
    {
      field: "createdAt",
      headerName: "Created at",
      flex: 1,
      renderCell: renderDate,
      disableExport: true,
    },
    {
      field: "screens",
      headerName: "Assigned Screens",
      flex: 1,
    },
    {
      field: "startDate",
      headerName: "Start Date",
      renderCell: renderStartDate,
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      renderCell: renderEndDate,
      flex: 1,
    },
    {
      field: "tags",
      headerName: "Tags",
      renderCell: tagsRender,
      flex: 1,
    },
    {
      field: "action",
      headerName: "More",
      flex: 1,
      renderCell: renderAction,
      disableExport: true,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
    },
  ];

  const handleTags = (e, item) => {
    e.preventDefault();
    setSelectedScreen(item);
    setNewTagModal(!showNewTagModal);
  };
  return (
    <>
      <FilterModal
        showFilterModal={showFilterModal}
        setFilterModal={setFilterModal}
        setFilterData={setFilterData}
        setIsRefresh={setIsRefresh}
        type={["tags"]}
        selectedType={"schedule"}
      />
      <div className="d-flex justify-content-end">
        <Button
          className="ml-2 icon-btn"
          variant="primary"
          onClick={() => {
            setFilterModal(true);
          }}
          style={{ position: "absolute", top: "10px" }}
        >
          <img className="icon-icon" src={listIcon} alt="list-icon" />
        </Button>
      </div>

      <DataGrid
        getRowHeight={() => "auto"}
        components={{
          NoRowsOverlay: CustomNoRowsOverlay,
          Toolbar: CustomToolbar,
          LoadingOverlay: LinearProgress,
          Pagination: CustomPagination,
        }}
        rows={rows}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        pagination
        zIndex={-1}
      />
      {showNewTagModal && (
        <AddNewTagModal
          setNewTagModal={setNewTagModal}
          allScreens={data}
          selected={selectedScreen}
          setIsRefresh={setIsRefresh}
          type={"schedule"}
        />
      )}
    </>
  );
};
export default ScheduleList;
