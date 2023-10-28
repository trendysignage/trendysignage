import React, { useState } from "react";

import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../../utils/UtilsService";
import moment from "moment";

import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.svg";

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
const DefComplist = ({
  history,
  permission,
  setIsRefresh,
  data,
  setShowPublishPopUp,
  setSelectedSchdule,
  handleDeleteSchedule,
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
        name: item._id,
        createdAt: humanReadableFormattedDateString(item.createdAt),
        screens: item.screens.length,
        startDate: item.createdAt,
        endDate: item.createdAt,
        tags: item,
        action: item,
      });
    });
  }

  // const renderAction = (params) => {
  //   const {value} = params;
  //   return (
  //     <Dropdown
  //     className="dropdown-toggle-menu"
  //     >
  //     <Dropdown.Toggle variant="" className="p-0  mb-2">
  //         <span className="table-menu-icon">
  //         <img
  //             className="menu-img img-fluid"
  //             src={menuIcon}
  //             alt="menu-icon"
  //         />
  //         </span>
  //     </Dropdown.Toggle>
  //     <Dropdown.Menu>
  //         <Dropdown.Item
  //         href={`/design-month-schedule/${value._id}`}
  //         disabled={permission && !permission.permission.SCHEDULE.edit}
  //         className="dropdown-list-item"
  //         >
  //         <div className="d-flex">
  //             <div className="dropdown-list-icon">
  //             <img
  //                 className="dropdown-list-img img-fluid"
  //                 src={edit}
  //                 alt="menu-icon"
  //             />
  //             </div>
  //             <div className="dropdown-menu-list">
  //             <span className="menu-heading">Edit</span>
  //             <span className="menu-description">
  //                 Get to know more about screen info
  //             </span>
  //             </div>
  //         </div>
  //         </Dropdown.Item>
  //         <Dropdown.Item
  //         onClick={() => {
  //             setShowPublishPopUp(true);
  //             setSelectedSchdule(value)
  //             //setSelectedScreen(screen._id);
  //         }}
  //         //disabled={permission && !permission.permission.SCHEDULE.edit}
  //         className="dropdown-list-item"
  //         >
  //         <div className="d-flex">
  //             <div className="dropdown-list-icon">
  //             <img
  //                 className="dropdown-list-img img-fluid"
  //                 src={edit}
  //                 alt="menu-icon"
  //             />
  //             </div>
  //             <div className="dropdown-menu-list">
  //             <span className="menu-heading">Assign Screen</span>
  //             <span className="menu-description">
  //                 Get to know more about screen info
  //             </span>
  //             </div>
  //         </div>
  //         </Dropdown.Item>
  //         <Dropdown.Item
  //         href="#"
  //         className="dropdown-list-item"
  //         onClick={() => {
  //             handleDeleteSchedule(value._id);
  //             console.log("oooo");
  //         }}
  //         disabled={permission && !permission.permission.SCHEDULE.delete}
  //         >
  //         <div className="d-flex">
  //             <div className="dropdown-list-icon">
  //             <img
  //                 className="dropdown-list-img img-fluid"
  //                 src={deleteIcon}
  //                 alt="menu-icon"
  //             />
  //             </div>
  //             <div className="dropdown-menu-list">
  //             <span className="menu-heading">Delete</span>
  //             <span className="menu-description">
  //                 Get to know more about screen info
  //             </span>
  //             </div>
  //         </div>
  //         </Dropdown.Item>
  //         <Dropdown.Item
  //         href="#"
  //         className="dropdown-list-item"
  //         disabled={permission && !permission.permission.SCHEDULE.view}
  //         onClick={() => {
  //             history.push(`/push/view/${value._id}`);
  //         }}
  //         >
  //         <div className="d-flex">
  //             <div className="dropdown-list-icon">
  //             <img
  //                 className="dropdown-list-img img-fluid"
  //                 src={deleteIcon}
  //                 alt="menu-icon"
  //             />
  //             </div>
  //             <div className="dropdown-menu-list">
  //             <span className="menu-heading">
  //                 View Schedule
  //             </span>
  //             <span className="menu-description">
  //                 Get to know more about screen info
  //             </span>
  //             </div>
  //         </div>
  //         </Dropdown.Item>
  //     </Dropdown.Menu>
  //     </Dropdown>
  //   )
  // }

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
      <span
        className="td-content"
        style={{ marginTop: "20px", marginBottom: "20px" }}
      >
        <strong>{humanReadableFormattedDateString(value)}</strong>{" "}
        <span>{getDatetimeIn12Hours(value)}</span>
      </span>
    );
  };

  const renderEndDate = (params) => {
    const { value } = params;
    return (
      <span className="td-content">
        <strong>{humanReadableFormattedDateString(value)}</strong>{" "}
        <span>{moment(value).add(10, "minutes").format("hh:mm A")}</span>
      </span>
    );
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
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
      renderCell: renderEndDate,
      flex: 1,
    },
    //   {
    //     field: "tags",
    //     headerName: "Tags",
    //     renderCell:tagsRender,
    //     flex: 1,
    //   },
    //   {
    //     field: "action",
    //     headerName: "More",
    //     flex: 1,
    //     renderCell: renderAction,
    //     disableExport: true,
    //   },
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
export default DefComplist;
