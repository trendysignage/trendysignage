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
const QuickPlayList = ({
  history,
  permission,
  setIsRefresh,
  data,
  handleDeleteQuickPlay,
}) => {
  const [filterData, setFilterData] = useState([]);
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [showFilterModal, setFilterModal] = useState(false);

  const rows = [];
  if (data && data.length > 0) {
    data.forEach((item) => {
      rows.push({
        id: item._id,
        name: item.name,
        createdAt: humanReadableFormattedDateString(item.createdAt),
        screens: item.screens.length,
        startDate: item.startTime,
        endDate: item.endTime,
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
            />
          </span>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
            href="#"
            className="dropdown-list-item"
            onClick={(e) => {
              handleDeleteQuickPlay(e, value._id);
            }}
            disabled={permission && !permission.permission.QUICKPLAY.delete}
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
        </Dropdown.Menu>
      </Dropdown>
    );
  };
  const tagsRender = (params) => {
    const { value } = params;
    return (
      <div>
        <span className="tag-container">
          {value.tags.map((tag) => {
            return (
              <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                {tag}
              </span>
            );
          })}
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
      renderCell: renderDate,
      flex: 1,
    },
    {
      field: "endDate",
      headerName: "End Date",
      renderCell: renderDate,
      flex: 1,
    },
    //   {
    //     field: "tags",
    //     headerName: "Tags",
    //     renderCell:tagsRender,
    //     flex: 1,
    //   },
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
      {/* <FilterModal
          showFilterModal={showFilterModal}
          setFilterModal={setFilterModal}
          setFilterData={setFilterData}
          setIsRefresh={setIsRefresh}
          type={["tags"]}
          selectedType={'composition'}
        />
        <Button
          className="ml-2 icon-btn"
          variant="primary"
          onClick={() => {
            setFilterModal(true);
          }}
        >
          <img className="icon-icon" src={listIcon} alt="list-icon" />
        </Button> */}
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
export default QuickPlayList;
