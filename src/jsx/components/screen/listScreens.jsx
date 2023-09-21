import React, { useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.png";
import menuIcon from "../../../img/menu-icon.png";
import veiwDetailIcon from "../../../img/view-detail-icon.png";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import assignIcon from "../../../img/assign-icon.png";
import takeScreenshotIcon from "../../../img/tack-screenshot-icon.png";
import { Link } from "react-router-dom";
import CompositionListModel from "../../modals/CompolistionListModel";
import Box from "@mui/material/Box";

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

const ListScreen = ({ allScreens, userPermission }) => {
  console.log("userPermission", userPermission);
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [showPublishPopUp, setShowPublishPopUp] = useState(false);

  const renderAction = (params) => {
    const { value } = params;
    return (
      <div style={{ zIndex: "100" }}>
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
              />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Menu style={{ zIndex: 10000 }}>
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
            <Dropdown.Item
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
            </Dropdown.Item>
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

  const tagsRender = (params) => {
    const { value } = params;
    return (
      <span className="tag-container">
        {value.map((tag) => {
          return (
            <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
              {tag}
            </span>
          );
        })}
      </span>
    );
  };

  const groupRender = (params) => {
    const { value } = params;
    return (
      <span className="tag-container">
        {value.map((tag) => {
          return (
            <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
              {tag}
            </span>
          );
        })}
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
        last_seen: "online",
        tags: item.tags,
        groups: item.groups,
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
        <strong>{value.name}</strong>
        <br />
        <span>{value.location}</span>
      </span>
    );
  };

  const columns1 = [
    { field: "screen", headerName: "Screen", flex: 1, renderCell: renderName },
    {
      field: "last_seen",
      headerName: "Last Seen",
      flex: 1,
      disableExport: true,
    },
    {
      field: "default_composition",
      headerName: "Default Composition",
      flex: 1,
    },
    { field: "tags", headerName: "Tags", flex: 1, renderCell: tagsRender },
    { field: "groups", headerName: "Groups", flex: 1, renderCell: groupRender },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: renderAction,
      disableExport: true,
    },
  ];

  return (
    <>
      <Box sx={{ height: "100%", width: "100%" }}>
        <DataGrid
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
      </Box>
      {showNewTagModal && (
        <AddNewTagModal
          setNewTagModal={setNewTagModal}
          allScreens={allScreens}
          selected={selectedScreen}
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
