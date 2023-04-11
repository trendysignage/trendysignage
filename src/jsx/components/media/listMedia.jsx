import React, { useEffect, useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.png";
import menuIcon from "../../../img/menu-icon.png";
import veiwDetailIcon from "../../../img/view-detail-icon.png";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import assignIcon from "../../../img/assign-icon.png";
import takeScreenshotIcon from "../../../img/tack-screenshot-icon.png";
import emptyMediaImg from "../../../img/addmedia-empty-img.png";
import nameAvatar from "../../../img/assets-avatar-img.png";
import deleteIcon from "../../../img/delete-icon.png";

const ListMedia = () => {
  const [test, settest] = useState(false);
  const [showNewTagModal, setNewTagModal] = useState(false);
  // use effect
  useEffect(() => {
    setTimeout(() => {
      settest(true);
    }, 2000);
  }, [test]);
  const chackbox = document.querySelectorAll(".custom-checkbox input");
  const motherChackBox = document.querySelector("#checkbox1_exam_all");
  const chackboxFun = (type) => {
    for (let i = 0; i < chackbox.length; i++) {
      const element = chackbox[i];
      if (type === "all") {
        if (motherChackBox.checked) {
          element.checked = true;
        } else {
          element.checked = false;
        }
      } else {
        if (!element.checked) {
          motherChackBox.checked = false;
          break;
        } else {
          motherChackBox.checked = true;
        }
      }
    }
  };

  return (
    <>
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

      {/* <Table responsive className="custom-table">
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
          <tr>
            <td>
              <span className="td-content d-flex name-td-content">
                <span className="name-img mr-2">
                  <img
                    className="media-img img-fluid"
                    src={nameAvatar}
                    alt="media-img"
                  />
                </span>
                <span className="name-content d-flex flex-column flex-grow-1">
                  <strong>My_image_name</strong>
                  <span>Added by Gauri Batra</span>
                </span>
              </span>
            </td>
            <td>Image</td>
            <td>
              <span className="td-content">
                <strong>2 Apr,2023</strong>
                <span>12:54 PM</span>
              </span>
            </td>
            <td>
              <span className="td-content">
                <strong>700*610px</strong>
                <span>0.04 MB</span>
              </span>
            </td>
            <td>
              <span className="my-phone-tag">My Phone is..</span>
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
                  <Dropdown.Item href="#" className="dropdown-list-item">
                    <div className="d-flex">
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
                  <Dropdown.Item href="#" className="dropdown-list-item">
                    <div className="d-flex">
                      <div className="dropdown-list-icon">
                        <img
                          className="dropdown-list-img img-fluid"
                          src={deleteIcon}
                          alt="menu-icon"
                        />
                      </div>
                      <div className="dropdown-menu-list">
                        <span className="menu-heading">
                        Delete
                        </span>
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
          <tr>
            <td>
              <span className="td-content d-flex name-td-content">
                <span className="name-img mr-2">
                  <img
                    className="media-img img-fluid"
                    src={nameAvatar}
                    alt="media-img"
                  />
                </span>
                <span className="name-content d-flex flex-column flex-grow-1">
                  <strong>My_image_name</strong>
                  <span>Added by Gauri Batra</span>
                </span>
              </span>
            </td>
            <td>Image</td>
            <td>
              <span className="td-content">
                <strong>2 Apr,2023</strong>
                <span>12:54 PM</span>
              </span>
            </td>
            <td>
              <span className="td-content">
                <strong>700*610px</strong>
                <span>0.04 MB</span>
              </span>
            </td>
            <td>
              <span className="my-phone-tag">My Phone is..</span>
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
                  <Dropdown.Item href="#" className="dropdown-list-item">
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
                  <Dropdown.Item href="#" className="dropdown-list-item">
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
                  <Dropdown.Item href="#" className="dropdown-list-item">
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
                  <Dropdown.Item href="#" className="dropdown-list-item">
                    <div className="d-flex">
                      <div className="dropdown-list-icon">
                        <img
                          className="dropdown-list-img img-fluid"
                          src={takeScreenshotIcon}
                          alt="menu-icon"
                        />
                      </div>
                      <div className="dropdown-menu-list">
                        <span className="menu-heading">Take Screenshot</span>
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
        </tbody>
      </Table> */}
      <AddNewTagModal
        showNewTagModal={showNewTagModal}
        setNewTagModal={setNewTagModal}
      />
    </>
  );
};

export default ListMedia;
