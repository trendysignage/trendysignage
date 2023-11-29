import React, { useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.svg";
import menuIcon from "../../../img/menu-icon.png";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import emptyMediaImg from "../../../img/addmedia-empty-img.png";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import deleteIcon from "../../../img/delete-icon.png";
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../../utils/UtilsService";
import cancelIcon from "../../../img/cancel-icon.png";
import DeleteConfirmation from "../../modals/DeleteConfirmation";
import { deleteMedia, BASE_URL } from "../../../utils/api";
import PublishMediaModal from "../../modals/PublishMediaModal";
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

import weather from "../../../img/weather.svg";
import urlapp from "../../../img/urlapp.svg";

import youtube from "../../../img/youtube.svg";
import scroller from "../../../img/Scroller.svg";
import text from "../../../img/text.svg";
import clock from "../../../img/clock.svg";
import news from "../../../img/news.svg";

import google from "../../../img/Google.svg";
import Stocks from "../../../img/Stocks.svg";
import qr from "../../../img/qr.svg";
import aqi from "../../../img/aqi.svg";
import rss from "../../../img/rss.svg";
import people from "../../../img/people.svg";

import quote from "../../../img/quote 1.svg";
import bulletin from "../../../img/Bulletin.svg";
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

const ListMedia = ({
  allMedia,
  auth,
  permission,
  setIsRefresh,
  setFilterData,
}) => {
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [showPublishPopUp, setShowPublishPopUp] = useState(false);
  const [preview, setPreview] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgType, setImgType] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [showFilterModal, setFilterModal] = useState(false);

  // use effect

  const handleDelete = async () => {
    setDeleteModal(false);
    await deleteMedia(selectedMedia._id);
    setIsRefresh(true);
  };

  const handlePublishcOpen = (media) => {
    setShowPublishPopUp(media);
  };

  const showPreview = (img, type) => {
    setImgType(type);
    setImgUrl(img);
    setPreview(true);
  };

  const parseMeta = (media) => {
    let meta = {};
    //const meta = JSON.parse(media.properties);
    if (media.type == "image" || media.type == "video") {
      meta = JSON.parse(media.properties);
    } else {
      const jsonData = JSON.parse(media.appData);
      meta = {
        length: 10,
        height: 10,
        duration: 0,
        size: 0,
      };
    }
    return (
      <span className="td-content">
        {media?.type === "image" && (
          <strong>
            {meta.height} x {meta.width}
          </strong>
        )}
        {media?.type === "video" && meta?.length && (
          <strong>{parseInt((meta.length / 60) * 100) / 100} Min.</strong>
        )}
        {meta?.size && <span>{meta.size} MB</span>}
      </span>
    );
  };

  const videoMetaDuration = (media) => {
    const properties = JSON.parse(media?.properties);
    if (properties && properties.length) {
      return (properties.length.toFixed(0) / 60).toFixed(0);
    }
    return null;
  };

  const rows = [];
  if (allMedia && allMedia.length > 0) {
    allMedia.forEach((item) => {
      rows.push({
        id: item._id,
        name: item,
        type: item.type,
        uploaded_date: item.createdAt,
        tags: item,
        property: item,
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
          {(value && value.type == "image") || value.type == "video" ? (
            <Dropdown.Item href="#" className="dropdown-list-item">
              <div
                className="d-flex"
                onClick={() => {
                  handlePublishcOpen(value);
                }}
              >
                <div className="dropdown-list-icon">
                  <img
                    className="dropdown-list-img img-fluid"
                    src={defaultComparisonIcon}
                    alt="menu-icon"
                  />
                </div>
                <div className="dropdown-menu-list">
                  <span className="menu-heading">Publish on Screen</span>
                  <span className="menu-description">
                    Get to know more about screen info
                  </span>
                </div>
              </div>
            </Dropdown.Item>
          ) : (
            <></>
          )}

          <Dropdown.Item
            href="#"
            className="dropdown-list-item"
            onClick={() => {
              setSelectedMedia(value);
              setDeleteModal(true);
            }}
            disabled={permission && !permission.permission.ASSETS.delete}
          >
            <div className="d-flex align-items-center">
              <div className="dropdown-list-icon">
                <img
                  className="dropdown-list-img img-fluid"
                  src={deleteIcon}
                  alt="menu-icon"
                />
              </div>
              <div className="dropdown-menu-list">
                <span className="menu-heading mb-0">Delete</span>
                <span className="menu-description">
                  Permanently delete this composition
                </span>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const renderName = (params) => {
    const { value } = params;

    return (
      <span className="td-content d-flex name-td-content">
        <span
          className={`name-img mr-2  ${
            value?.type === "video" && "videotableName"
          }`}
          style={{ width: "40px" }}
        >
          {value?.type === "image" && (
            <div
              onClick={() => {
                showPreview(value.title, value.type);
              }}
              className="media-list-img-zoom"
              style={{ width: "40px" }}
            >
              <span className="media-list-img-zoom-plus">+</span>
              <img
                className="media-img img-fluid"
                src={`${BASE_URL}${value?.title}`}
                alt="media-img"
              />
            </div>
          )}
          {value?.type === "video" && (
            <button
              onClick={() => {
                showPreview(value.title, value.type);
              }}
              style={{ width: "40px" }}
            >
              {videoMetaDuration(value)}
            </button>
          )}

          {value.type === "news-apps" && (
            <img src={news} className="media-img img-fluid" alt="news-app" />
          )}

          {value.type === "quote-apps" && (
            <img src={quote} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "qrcode-apps" && (
            <img src={qr} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "clock-apps" && (
            <img src={clock} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "youtube-apps" && (
            <img src={youtube} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "url-apps" && (
            <img src={urlapp} className="media-img img-fluid" alt="news-app" />
          )}

          {value.type === "scroller" && (
            <img
              src={scroller}
              className="media-img img-fluid"
              alt="news-app"
            />
          )}
          {value.type === "text-apps" && (
            <img src={text} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "weather-apps" && (
            <img src={weather} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "stocks-apps" && (
            <img src={Stocks} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "aqi-apps" && (
            <img src={aqi} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "weather-apps" && (
            <img src={weather} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "weather-apps" && (
            <img src={weather} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "rss-apps" && (
            <img src={rss} className="media-img img-fluid" alt="news-app" />
          )}
          {value.type === "people-apps" && (
            <img src={people} className="media-img img-fluid" alt="news-app" />
          )}

          {value.type === "bulletin-apps" && (
            <img
              src={bulletin}
              className="media-img img-fluid"
              alt="news-app"
            />
          )}

          {value.type === "google-apps" && (
            <img src={google} className="media-img img-fluid" alt="news-app" />
          )}
        </span>
        <span
          className="name-content d-flex flex-column flex-grow-1"
          style={{ wordWrap: "break-word", wordBreak: "break-all" }}
        >
          <strong>
            {value.title.split("/")[value.title.split("/").length - 1]}
          </strong>
          <span>{value.createdBy.name}</span>
        </span>
      </span>
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
        <strong>{humanReadableFormattedDateString(value)}</strong>
        <span>{getDatetimeIn12Hours(value)}</span>
      </span>
    );
  };

  const renderProperties = (params) => {
    const { value } = params;
    const prp = value.properties ? JSON.parse(value.properties) : null;
    if (prp && (prp.height || prp.width || prp.length || prp.size)) {
      return (
        <span className="td-content">
          <strong>{prp.height ? "Height : " + prp.height : ""}</strong>
          <br />
          <strong>{prp.width ? "Width : " + prp.width : ""}</strong>
          <br />
          <strong>{prp.size ? "Size : " + prp.size + " MB" : ""}</strong>
        </span>
      );
    } else {
      return (
        <span className="td-content">
          <strong>{value.type.split("-")[0].toUpperCase()} </strong>
        </span>
      );
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 200, renderCell: renderName },
    {
      field: "type",
      headerName: "Type",
      flex: 1,
      disableExport: true,
    },
    {
      field: "uploaded_date",
      headerName: "Uploaded Date",
      renderCell: renderDate,
      flex: 1,
    },
    {
      field: "tags",
      headerName: "Tags",
      renderCell: tagsRender,
      flex: 1,
    },
    {
      field: "property",
      headerName: "Properties",
      renderCell: renderProperties,
      flex: 1,
    },
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
        type={["tags"]}
        selectedType={"media"}
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

      <Modal
        className="fade bd-example-modal-lg mt-4 custom-modal quick-modal custom-modal-medium"
        show={preview}
        size="md"
      >
        <Modal.Header>
          <Modal.Title className="mr-auto">Image Preview</Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => setPreview(false)}
          >
            <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="flex-wrap align-items-center">
            {imgType && imgType === "image" && (
              <img
                src={`${BASE_URL}${imgUrl}`}
                style={{ width: "100%", height: "500px", objectFit: "fill" }}
              />
            )}
            {imgType && imgType === "video" && (
              <video
                className="video-js"
                autoPlay
                muted
                loop
                style={{ width: "100%", height: "500px" }}
              >
                <source src={`${BASE_URL}${imgUrl}`} type="video/mp4" />
              </video>
            )}
          </div>
        </Modal.Body>
      </Modal>

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
          allScreens={allMedia}
          selected={selectedScreen}
          setIsRefresh={setIsRefresh}
          type={"media"}
        />
      )}
      {showPublishPopUp && (
        <PublishMediaModal
          selected={showPublishPopUp}
          setShowPublishPopUp={setShowPublishPopUp}
          type="media"
        />
      )}
      {deleteModal && (
        <DeleteConfirmation
          setDeleteModal={setDeleteModal}
          callbackFunction={handleDelete}
          text="Are you sure you want to delete?"
          yes={"Delete"}
        />
      )}
    </>
  );
};
export default ListMedia;
