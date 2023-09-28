import React, { useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.png";
import menuIcon from "../../../img/menu-icon.svg";
import veiwDetailIcon from "../../../img/view-detail-icon.png";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import assignIcon from "../../../img/assign-icon.png";
import takeScreenshotIcon from "../../../img/tack-screenshot-icon.png";
import { deleteGroups, updateGroups } from "../../../utils/api";
import { toast } from "react-toastify";
import AddUserModal from "../../modals/AddUserModal";

const Group = ({ groups, setIsRefresh, isRefresh }) => {
  const [showAddUserModel, setShowAddUserModel] = useState(false);
  const [user, setUser] = useState(null);

  const deleteuserRecord = async (e, id) => {
    e.preventDefault();
    await deleteGroups(id);
    toast.success("Group has been deleted successfully !!!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setIsRefresh(!isRefresh);
  };

  return (
    <>
      <AddUserModal
        open={showAddUserModel}
        setShowAddUserModel={setShowAddUserModel}
        setIsRefresh={setIsRefresh}
        user={user}
        setUser={setUser}
        type={"edit"}
      />
      <Table responsive className="custom-table screen-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {groups &&
            groups.groups !== "" &&
            groups.groups.map((item) => {
              return (
                <tr id={item._id}>
                  <td>
                    <span className="td-content">
                      <strong>{item.name}</strong>
                    </span>
                  </td>
                  <td>
                    <span className="d-flex align-items-center">
                      <span className="td-content">
                        <strong>{item.description}</strong>
                      </span>
                    </span>
                  </td>
                  <td>{item.createdAt}</td>
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
                          onClick={(e) => {
                            deleteuserRecord(e, item._id);
                          }}
                          className="dropdown-list-item"
                        >
                          <div className="d-flex">
                            <div className="dropdown-list-icon">
                              <img
                                className="dropdown-list-img img-fluid"
                                src={takeScreenshotIcon}
                                alt="menu-icon"
                              />
                            </div>
                            <div className="dropdown-menu-list">
                              <span className="menu-heading">Delete Group</span>
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
    </>
  );
};

export default Group;
