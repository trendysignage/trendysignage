import React, { useState } from "react";
import { Table } from "react-bootstrap";
import AddNewTagModal from "../../../modals/AddNewTagModal";
import downArrow from "../../../../img/down-arrow.png";
import listIcon from "../../../../img/list-icon.png";
import { Button } from "react-bootstrap";
import { deleteCompositionById, BASE_URL } from "../../../../utils/api";
import DeleteConfirmation from "../../../modals/DeleteConfirmation";
import CompositionActions from "./CompositionActions";
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../../../utils/UtilsService";

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
import CustomNoRowsOverlay from "../../CustomNoRowsOverlay";
import QuickSearchToolbar from "../../QuickSearchToolbar";
import { GridToolbarContainer } from "@mui/x-data-grid";
import FilterModal from "../../../modals/FilterModal";

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

const ListComposition = ({
  allComposition,
  permission,
  setIsRefresh,
  setFilterData,
}) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [selected, setSelected] = useState("");
  const [selectedScreen, setSelectedScreen] = useState("");
  const [showFilterModal, setFilterModal] = useState(false);

  const handleDelete = async () => {
    setDeleteModal(false);
    await deleteCompositionById(selected._id);
    // mutate();
    setIsRefresh(true);
  };

  const rows = [];
  if (allComposition && allComposition.length > 0) {
    allComposition.forEach((item) => {
      rows.push({
        id: item._id,
        composition: item,
        duration: item.duration,
        schedule: item,
        createdAt: item.createdAt,
        tags: item,
        action: item,
      });
    });
  }

  const renderAction = (params) => {
    const { value } = params;
    return (
      <CompositionActions
        composition={value}
        //mutate={mutate}
        setSelected={setSelected}
        setDeleteModal={setDeleteModal}
        permission={permission}
        setIsRefresh={setIsRefresh}
      />
    );
  };
  const renderName = (params) => {
    const { value } = params;
    const content = value.zones[0].content[0];
    return (
      <span className="td-content d-flex name-td-content">
        <span
          className={`name-img mr-2  ${
            content.type === "video" && "videotableName"
          }`}
        >
          {content.type === "image" && (
            <img
              className="media-img img-fluid"
              src={`${BASE_URL}${content.url}`}
              alt="media-img"
            />
          )}
          {content.type === "video" && content.duration.toFixed(0) / 60}
        </span>
        <span className="name-content d-flex flex-column flex-grow-1">
          <strong>{value.name}</strong>
          <span>{value.createdBy}</span>
        </span>
      </span>
    );
  };
  const renderSchedule = (params) => {
    const { value } = params;
    return <span className="td-content d-flex name-td-content">Name</span>;
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

  const renderDuration = (params) => {
    const { value } = params;
    return <span>{value} sec</span>;
  };

  const columns = [
    {
      field: "composition",
      headerName: "Composition",
      flex: 1,
      renderCell: renderName,
    },
    {
      field: "createdAt",
      headerName: "Dated At",
      flex: 1,
      renderCell: renderDate,
      disableExport: true,
    },
    {
      field: "duration",
      headerName: "Duration",
      renderCell: renderDuration,
      flex: 1,
    },
    // {
    //   field: "schedule",
    //   headerName: "Associated Schedule",
    //   renderCell:renderSchedule,
    //   flex: 1,
    // },
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
        selectedType={"composition"}
      />
      <div className="d-flex justify-content-end ">
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
          allScreens={allComposition}
          selected={selectedScreen}
          setIsRefresh={setIsRefresh}
          type={"composition"}
        />
      )}

      {deleteModal && (
        <DeleteConfirmation
          setDeleteModal={setDeleteModal}
          callbackFunction={handleDelete}
          text="Are you sure you want to delete?"
          yes={"Yes Delete"}
        />
      )}
    </>
  );
};

export default ListComposition;
