import { useState } from "react";
import { Dropdown } from "react-bootstrap";
import menuIcon from "../../../../img/menu-icon.svg";
import veiwDetailIcon from "../../../../img/view-detail-icon.png";
import defaultComparisonIcon from "../../../../img/default-comparison-icon.png";
import assignIcon from "../../../../img/assign-icon.png";
import takeScreenshotIcon from "../../../../img/tack-screenshot-icon.png";
import edit from "../../../../img/edit-composition.svg";
import deleteIcon from "../../../../img/delete-icon.png";

import { Link } from "react-router-dom";
import DuplicateComposition from "../../../modals/duplicateComposition";
import { postComposition } from "../../../../utils/api";
import ViewDetails from "../../../modals/layouts/viewDetails";
import PublishMediaModal from "../../../modals/PublishMediaModal";

const CompositionActions = ({
  composition,
  //mutate,
  setDeleteModal,
  setSelected,
  permission,
  setIsRefresh,
}) => {
  console.log(permission, "permission");
  const [duplicateModal, setDuplicateModal] = useState(false);
  const [viewDetailsModal, setViewDetailsModal] = useState(false);
  const [showPublishPopUp, setShowPublishPopUp] = useState(false);
  const createComposition = async (name) => {
    let setZone = [];

    composition.zones.forEach((zone) => {
      const setContent = [];

      zone.content.forEach((content) => {
        setContent.push({
          url: content.url,
          type: content.type,
          maintainAspectRatio: content.maintainAspectRatio,
          fitToScreen: content.fitToScreen,
          crop: content.crop,
          duration: content.duration,
          // createdBy: composition.createdBy,
        });
      });

      const data = {
        name: zone.name,
        zoneId: zone.zoneId,
        content: setContent,
      };
      setZone.push(data);
    });

    const data = {
      name: name,
      layoutId: composition.layout._id,

      zones: setZone,
      duration: composition.duration,
      referenceUrl: composition.referenceUrl,
    };
    //  console.log(data)
    await postComposition(data);
    //mutate();
    setDuplicateModal(false);
    setIsRefresh(true);
  };
  return (
    <>
      {" "}
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
          {/* View Detail */}
          <Dropdown.Item
            href="#"
            disabled={permission && !permission.permission.ASSETS.view}
            className="dropdown-list-item"
            onClick={() => {
              setViewDetailsModal(true);
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
          </Dropdown.Item>
          {/* Assign Quickplay */}
          <Dropdown.Item
            href="#"
            className="dropdown-list-item"
            disabled={permission && !permission.permission.QUICKPLAY.add}
            onClick={() => {
              setShowPublishPopUp(true);
            }}
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
                  Publish on Screen as Quick Play
                </span>
              </div>
            </div>
          </Dropdown.Item>
          {/* Edit */}
          <Dropdown.Item
            href="#"
            disabled={permission && !permission.permission.ASSETS.edit}
            className="dropdown-list-item"
          >
            <Link to={`/composition/edit?id=${composition._id}`}>
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
                    Make changes to this composition
                  </span>
                </div>
              </div>
            </Link>
          </Dropdown.Item>
          {/* Duplicate */}
          <Dropdown.Item
            href="#"
            className="dropdown-list-item"
            disabled={permission && !permission.permission.ASSETS.add}
          >
            <div
              className="d-flex"
              onClick={() => {
                console.log("herer");
                setDuplicateModal(true);
              }}
            >
              <div className="dropdown-list-icon">
                <img
                  className="dropdown-list-img img-fluid"
                  src={takeScreenshotIcon}
                  alt="menu-icon"
                />
              </div>
              <div className="dropdown-menu-list">
                <span className="menu-heading">Duplicate</span>
                <span className="menu-description">
                  Create duplicate of your composition
                </span>
              </div>
            </div>
          </Dropdown.Item>
          {/* Delete */}
          <Dropdown.Item
            href="#"
            className="dropdown-list-item"
            onClick={() => {
              setSelected(composition);
              setDeleteModal(true);
            }}
            disabled={permission && !permission.permission.ASSETS.delete}
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
                  Permanently delete this composition
                </span>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      {duplicateModal && (
        <DuplicateComposition
          setDuplicateModal={setDuplicateModal}
          createComposition={createComposition}
        />
      )}
      {viewDetailsModal && (
        <ViewDetails
          setViewDetailsModal={setViewDetailsModal}
          composition={composition}
        />
      )}
      {showPublishPopUp && (
        <PublishMediaModal
          selected={composition}
          setShowPublishPopUp={setShowPublishPopUp}
          type="composition"
        />
      )}
    </>
  );
};
export default CompositionActions;
