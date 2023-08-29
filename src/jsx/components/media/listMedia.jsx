import React, { useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.png";
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

const ListMedia = ({ allMedia, callAllMediaApi }) => {
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState("");
  const [showPublishPopUp, setShowPublishPopUp] = useState(false);
  const [preview, setPreview] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgType, setImgType] = useState(null);

  // use effect

  const handleDelete = async () => {
    setDeleteModal(false);
    await deleteMedia(selectedMedia._id);
    callAllMediaApi();
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
  return (
    <>
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
      {allMedia && allMedia.length !== 0 ? (
        <Table responsive className="custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Uploaded Date</th>
              <th>Properties</th>
              <th>Tags</th>
              <th>More</th>
            </tr>
          </thead>
          <tbody>
            {allMedia.map((media) => {
              return (
                <tr key={media._id}>
                  <td>
                    <span className="td-content d-flex name-td-content">
                      <span
                        className={`name-img mr-2  ${
                          media?.type === "video" && "videotableName"
                        }`}
                      >
                        {media?.type === "image" && (
                          <div
                            onClick={() => {
                              showPreview(media.title, media.type);
                            }}
                            className="media-list-img-zoom"
                          >
                            <span className="media-list-img-zoom-plus">+</span>
                            <img
                              className="media-img img-fluid"
                              src={`${BASE_URL}${media?.title}`}
                              alt="media-img"
                            />
                          </div>
                        )}
                        {media?.type === "video" && (
                          <button
                            onClick={() => {
                              showPreview(media.title, media.type);
                            }}
                          >
                            {videoMetaDuration(media)}
                          </button>
                        )}
                      </span>
                      <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>
                          {
                            media.title.split("/")[
                              media.title.split("/").length - 1
                            ]
                          }
                        </strong>
                        <span>{media.createdBy.name}</span>
                      </span>
                    </span>
                  </td>
                  <td>
                    {media.type.slice(0, 1).toUpperCase() + media.type.slice(1)}
                  </td>
                  <td>
                    <span className="td-content">
                      <strong>
                        {humanReadableFormattedDateString(media.createdAt)}
                      </strong>
                      <span>{getDatetimeIn12Hours(media.createdAt)}</span>
                    </span>
                  </td>
                  <td>{parseMeta(media)}</td>
                  <td>
                    {media.tags.map((tag) => {
                      return (
                        <span className="my-phone-tag text-truncate ml-1">
                          {tag}
                        </span>
                      );
                    })}
                    <span
                      className="down-arrow"
                      onClick={() => {
                        setSelectedMedia(media);
                        setNewTagModal(true);
                      }}
                    >
                      <img
                        className="down-arrow-img img-fluid"
                        src={downArrow}
                        alt="arrow"
                      />
                    </span>
                  </td>
                  <td>
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
                        {(media && media.type == "image") ||
                        media.type == "video" ? (
                          <Dropdown.Item
                            href="#"
                            className="dropdown-list-item"
                          >
                            <div
                              className="d-flex"
                              onClick={() => {
                                handlePublishcOpen(media);
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
                                <span className="menu-heading">
                                  Publish on Screen
                                </span>
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
                            setSelectedMedia(media);
                            setDeleteModal(true);
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
                              <span className="menu-heading">Delete</span>
                              <span className="menu-description">
                                Get to know more about screen info
                              </span>
                            </div>
                          </div>
                        </Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div className="empty-media text-center">
          <div class="empty-media-img mx-auto">
            <img
              className="media-img img-fluid"
              src={emptyMediaImg}
              alt="media-img"
            />
          </div>
          <h3>Add Media</h3>
          <p>
            Upload your favourite images and videos from the local storage
            <br /> of your device
          </p>
        </div>
      )}

      {showNewTagModal && (
        <AddNewTagModal
          selected={selectedMedia}
          setNewTagModal={setNewTagModal}
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
