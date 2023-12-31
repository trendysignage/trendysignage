import React, { useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import { connect } from "react-redux";
import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.png";
import menuIcon from "../../../img/menu-icon.svg";
import veiwDetailIcon from "../../../img/view-detail-icon.png";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import assignIcon from "../../../img/assign-icon.png";
import takeScreenshotIcon from "../../../img/tack-screenshot-icon.png";
import { Link } from "react-router-dom";
import CompositionListModel from "../../modals/CompolistionListModel";
import { permission } from "../../../utils/api";

const ListScreen = ({ allScreens, userPermission }) => {
  console.log("userPermission", userPermission);
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [selectedScreen, setSelectedScreen] = useState("");
  const [showPublishPopUp, setShowPublishPopUp] = useState(false);

  return (
    <>
      <Table responsive className="custom-table screen-table mb-5">
        <thead>
          <tr>
            <th>Screen</th>
            <th>Last Seen</th>
            <th>Default Composition</th>
            <th>Current Schedule</th>
            {/* <th>Tags</th>
            <th>Groups</th> */}
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {allScreens !== "" &&
            allScreens.map((screen) => {
              return (
                <tr id={screen._id}>
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
                  {/* <td style={{ width: "180px" }}>
                    <span className="tag-container">
                      {screen.tags.map((tag) => {
                        return (
                          <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                            {tag}
                          </span>
                        );
                      })}
                    </span>

                    <span
                      className="down-arrow"
                      onClick={() => {
                        setSelectedScreen(screen);
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
                    {screen.groups.map((group) => {
                      return (
                        <span className="my-phone-tag text-truncate ml-1">
                          {group}
                        </span>
                      );
                    })}
                  </td> */}
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
                        <Dropdown.Item
                          href="#"
                          className="dropdown-list-item"
                          disabled={
                            userPermission &&
                            !userPermission.permission.SCREEN.view
                          }
                        >
                          <Link
                            to={{
                              pathname: `/display/${screen._id}`,
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
                                <span className="menu-heading">
                                  View Details
                                </span>
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
                            setSelectedScreen(screen._id);
                          }}
                          disabled={
                            userPermission &&
                            !userPermission.permission.SCREEN.edit
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
                            userPermission &&
                            !userPermission.permission.SCREEN.add
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
                              <span className="menu-heading">
                                Assign Quickplay
                              </span>
                              <span className="menu-description">
                                Publish on Screen as Quick Play
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
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
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
