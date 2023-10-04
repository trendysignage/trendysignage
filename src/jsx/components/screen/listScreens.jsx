import React, { useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.svg";
import menuIcon from "../../../img/menu-icon.svg";
import veiwDetailIcon from "../../../img/view-detail-icon.png";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import assignIcon from "../../../img/assign-icon.png";
import listIcon from "../../../img/list-icon.png";
import takeScreenshotIcon from "../../../img/tack-screenshot-icon.png";
import { Link } from "react-router-dom";
import CompositionListModel from "../../modals/CompolistionListModel";
import { Button } from "react-bootstrap";
import FilterModal from "../../modals/FilterModal";

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
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../../utils/UtilsService";

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton  color='success' title="ABC" label={'ds'} startIcon={<Avatar />}  /> */}
      {/* <GridToolbarExport color='success' csvOptions={
        {
          fileName: 'customerList',
          utf8WithBom: true,
        }} /> */}
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

const ListScreen = ({
  allScreens,
  userPermission,
  setIsRefresh,
  setFilterData,
}) => {
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [showPublishPopUp, setShowPublishPopUp] = useState(false);
  const [showFilterModal, setFilterModal] = useState(false);

  const renderAction = (params) => {
    const { value } = params;
    return (
      <div>
        <Dropdown
          className="dropdown-toggle-menu"

          // style={{ position: "relative", top: "100%" }}
        >
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
              href="#"
              className="dropdown-list-item"
              disabled={
                userPermission && !userPermission.permission.SCREEN.view
              }
            >
              <Link
                to={{
                  pathname: `/display/${value._id}`,
                }}
              >
                <div className="d-flex">
                  <div className="dropdown-list-icon">
                    <img
                      className="dropdown-list-img img-fluid"
                      src={veiwDetailIcon}
                      alt="menu-icon"
                    />
                  </div>
                  <div className="dropdown-menu-list">
                    <span className="menu-heading">View Details</span>
                    <span className="menu-description">
                      Get to know more about screen info
                    </span>
                  </div>
                </div>
              </Link>
            </Dropdown.Item>
            <Dropdown.Item
              onClick={() => {
                setShowPublishPopUp(true);
                setSelectedScreen(value._id);
              }}
              disabled={
                userPermission && !userPermission.permission.SCREEN.edit
              }
              className="dropdown-list-item"
            >
              <div className="d-flex">
                <div className="dropdown-list-icon">
                  <img
                    className="dropdown-list-img img-fluid"
                    src={defaultComparisonIcon}
                    alt="menu-icon"
                  />
                </div>
                <div className="dropdown-menu-list">
                  <span className="menu-heading">
                    Change Default Composition
                  </span>
                  <span className="menu-description">
                    Get to know more about screen info
                  </span>
                </div>
              </div>
            </Dropdown.Item>
            {/* <Dropdown.Item
              href="#"
              className="dropdown-list-item"
              disabled={
                userPermission && !userPermission.permission.SCREEN.edit
              }
            >
              <div className="d-flex">
                <div className="dropdown-list-icon">
                  <img
                    className="dropdown-list-img img-fluid"
                    src={assignIcon}
                    alt="menu-icon"
                  />
                </div>
                <div className="dropdown-menu-list">
                  <span className="menu-heading">Assign Quickplay</span>
                  <span className="menu-description">
                    Get to know more about screen info
                  </span>
                </div>
              </div>
            </Dropdown.Item> */}
            {/* <Dropdown.Item href="#" className="dropdown-list-item">
            <div className="d-flex">
              <div className="dropdown-list-icon">
                <img
                  className="dropdown-list-img img-fluid"
                  src={takeScreenshotIcon}
                  alt="menu-icon"
                />
              </div>
              <div className="dropdown-menu-list">
                <span className="menu-heading">
                  Take Screenshot
                </span>
                <span className="menu-description">
                  Get to know more about screen info
                </span>
              </div>
            </div>
          </Dropdown.Item> */}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  };

  const renderSchedule = (params) => {
    const { value } = params;
    let sch = '--';
    if(value && value[0]){
      sch = value[0].name
    }
    if(value && value.name){
      sch = value.name;
    }
    return (
      <span className="td-content">
        <strong>{sch}</strong>
      </span>
    );
  };

  const renderDefault = (params) => {
    const { value } = params;
    let def = "--";
    if (value.defaultComposition) {
      def = value.defaultComposition.media.name;
    }
    return (
      <span className="td-content">
        <strong>{def}</strong>
      </span>
    )
  }

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

  const groupRender = (params) => {
    const { value } = params;
    return Array.prototype.map.call(value, (s) => s.name).toString();
  };

  const lastSeenRender = (params) => {
    const { value } = params;
    console.log(value, "kkk");
    return (
      <span className="d-flex align-items-center">
        <span
          className={`status ${
            value.isConnected ? "status-green" : "status-red"
          }`}
        ></span>
        <span className="td-content">
          <span>{value.isConnected ? "ONLINE" : "OFFLINE"}</span>
          {/* <strong>{humanReadableFormattedDateString(value)}</strong>{" "}
          <span>{getDatetimeIn12Hours(value)}</span> */}
        </span>
      </span>
    );
  };
  const rows1 = [];
  if (allScreens && allScreens.length > 0) {
    allScreens.forEach((item) => {
      rows1.push({
        id: item._id,
        screen: {
          name: item.name,
          location: item.screenLocation,
        },
        last_seen: item,
        schedule: item.schedule,
        tags: item,
        groups: item.groups,
        defaultComposition: item,
        default_composition: item.defaultComposition
          ? item.defaultComposition.media.name
          : " -- ",
        action: item,
      });
    });
  }

  const renderName = (params) => {
    const { value } = params;
    return (
      <span className="td-content">
        <strong>
          {value.name.length > 11
            ? value.name.slice(0, 11) + "..."
            : value.name}
        </strong>
        <br />
        <span className="oooo">
          {value.location.length > 11
            ? value.location.slice(0, 11) + "..."
            : value.location}
        </span>
      </span>
    );
  };

  const columns1 = [
    { field: "screen", headerName: "Screen", flex: 1, renderCell: renderName },
    {
      field: "last_seen",
      headerName: "Last Seen",
      flex: 1,
      renderCell: lastSeenRender,
      disableExport: true,
    },
    {
      field: "default_composition",
      headerName: "Default Composition",
      flex: 1,
    },
    {
      field: "schedule",
      headerName: "Current Schedule",
      flex: 1,
      renderCell: renderSchedule,
    },

    { field: "tags", headerName: "Tags", flex: 1, renderCell: tagsRender },
    { field: "groups", headerName: "Groups", flex: 1, renderCell: groupRender },
    {
      field: "action",
      headerName: "Action",
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
        rows={rows1}
        columns={columns1}
        pageSize={10}
        rowsPerPageOptions={[5]}
        //checkboxSelection
        disableSelectionOnClick
        experimentalFeatures={{ newEditingApi: true }}
        //loading={loading}
        pagination
        zIndex={-1}
      />
      {showNewTagModal && (
        <AddNewTagModal
          setNewTagModal={setNewTagModal}
          allScreens={allScreens}
          selected={selectedScreen}
          setIsRefresh={setIsRefresh}
        />
      )}
      {showPublishPopUp && (
        <CompositionListModel
          selected={selectedScreen}
          setShowPublishPopUp={setShowPublishPopUp}
          type="composition"
        />
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth.auth,
    userPermission: state.auth.permission,
  };
};
export default connect(mapStateToProps)(ListScreen);
