import React, { useState, useEffect } from "react";
import { Table, Dropdown } from "react-bootstrap";
import menuIcon from "../../../img/menu-icon.png";
import assignIcon from "../../../img/assign-icon.png";
import takeScreenshotIcon from "../../../img/tack-screenshot-icon.png";
import { deleteDeviceProfile } from "../../../utils/api";
import {
    humanReadableFormattedDateString,
  } from "../../../utils/UtilsService";
import { toast } from "react-toastify";
import AddDeviceProfile from '../../modals/AddDeviceProfile';
import SelectScreenModal from "../../modals/SelectScreenModal";

const Profile = ({ allDeviceProfile, setIsRefresh, isRefresh }) => {

const [showProfileModel, setShowProfileModel] = useState(false);
const [profileData, setProfileData] = useState(null);
const [showPublishPopUp, setShowPublishPopUp] = useState(false);
const [selected, setSelected] = useState(null);


const handleEditiUser = (e, item) => {
  e.preventDefault();
  setShowProfileModel(true);
  setProfileData(item)
  console.log("Update Profile")
}

const handleAssignScreen = (e, id) => {
    e.preventDefault();
    setShowPublishPopUp(true);
    setSelected(id)
    console.log("Assign Screen")
  }

const handleDelete = async(e, id) => {
    e.preventDefault();
    await deleteDeviceProfile(id);
    toast.success("Profile has been deleted successfully !!!", {
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
}


  return (
    <>
     <AddDeviceProfile
        open={showProfileModel}
        setShowProfileModel={setShowProfileModel}
        setIsRefresh={setIsRefresh}
        profileData={profileData}
        setProfileData={setProfileData}
        type="edit"
      />
      <SelectScreenModal 
        showPublishPopUp={showPublishPopUp}
        setShowPublishPopUp={setShowPublishPopUp}
        selected={selected}
      />
      <Table responsive className="custom-table screen-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Created ON</th>
            <th>Update On</th>
            <th>Assigned Screens</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {allDeviceProfile !== "" &&
            allDeviceProfile.map((item) => {
              return (
                <tr id={item._id}>
                  <td>
                    <span className="td-content">
                      <strong>{item.name}</strong>
                    </span>
                  </td>
                  <td>{humanReadableFormattedDateString(item.createdAt)}</td>
                  <td>{humanReadableFormattedDateString(item.updatedAt)}</td>
                  <td>0</td>
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
                         onClick={(e) => {handleEditiUser(e, item)}}
                           className="dropdown-list-item">
                          <div className="d-flex">
                            <div className="dropdown-list-icon">
                              <img
                                className="dropdown-list-img img-fluid"
                                src={assignIcon}
                                alt="menu-icon"
                              />
                            </div>
                            <div className="dropdown-menu-list">
                              <span className="menu-heading">Edit</span>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item 
                           onClick={(e)=>{handleAssignScreen(e, item._id)}}
                           className="dropdown-list-item">
                          <div className="d-flex">
                            <div className="dropdown-list-icon">
                              <img
                                className="dropdown-list-img img-fluid"
                                src={takeScreenshotIcon}
                                alt="menu-icon"
                              />
                            </div>
                            <div className="dropdown-menu-list">
                              <span className="menu-heading">Assigned Screen</span>
                            </div>
                          </div>
                        </Dropdown.Item>
                        <Dropdown.Item 
                           onClick={(e)=>{handleDelete(e, item._id)}}
                           className="dropdown-list-item">
                          <div className="d-flex">
                            <div className="dropdown-list-icon">
                              <img
                                className="dropdown-list-img img-fluid"
                                src={takeScreenshotIcon}
                                alt="menu-icon"
                              />
                            </div>
                            <div className="dropdown-menu-list">
                              <span className="menu-heading">Delete</span>
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

export default Profile;
