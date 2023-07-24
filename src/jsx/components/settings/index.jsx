import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import ListMedia from "./defaultComposition";
import { roles } from "aria-query";
import {
  getUsers,
  getGroups,
  getRoles,
  getDeviceProfile,
} from "../../../utils/api";
import User from "./User";
import AddUserModal from "../../modals/AddUserModal";
import AddGroup from "../../modals/AddGroup";
import Group from "./group";
import Roles from "./roles";
import Profile from "./profile";
import AddDeviceProfile from "../../modals/AddDeviceProfile";

const Settings = () => {
  const [dropValue, setDropValue] = useState("Default Content");
  const [allUsers, setAllUsers] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [allDeviceProfile, setAllDeviceProfile] = useState([]);
  const [showGroupModel, setShowGroupModel] = useState(false);
  const [showProfileModel, setShowProfileModel] = useState(false);
  const [showAddUserModel, setShowAddUserModel] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);

  const handleDropDown = (e, data) => {
    e.preventDefault();
    setDropValue(data);
  };

  const callUsersApi = async () => {
    const list = await getUsers();
    console.log("users", list);
    setAllUsers(list);
  };

  const callGroupsApi = async () => {
    const list = await getGroups();
    console.log("groups", list);
    setAllGroups(list);
  };

  const callRolesApi = async () => {
    const list = await getRoles();
    console.log("roles", list);
    setAllRoles(list);
  };

  const callDeviceProfileApi = async () => {
    const list = await getDeviceProfile();
    console.log("deviceProfile", list);
    setAllDeviceProfile(list);
  };

  useEffect(() => {
    callUsersApi();
    callGroupsApi();
    callRolesApi();
    callDeviceProfileApi();
    setIsRefresh(false);
    // if(publishType && publishType === 'schedule'){
    //   getSchedule();
    // }
    // if(publishType && publishType === 'quickplay'){
    //   getQuickplay();
    // }
    // if(publishType && publishType === 'defaultComposition'){
    //   getDefault();
    // }
  }, [dropValue, isRefresh]);

  const handleUser = (e) => {
    e.preventDefault();
    setShowAddUserModel(true);
    console.log("Add User");
  };

  const handleGroup = (e) => {
    e.preventDefault();
    setShowGroupModel(true);
    console.log("Add User");
  };

  const handleDevice = (e) => {
    e.preventDefault();
    setShowProfileModel(true);
    console.log("Add User");
  };

  return (
    <>
      <AddUserModal
        open={showAddUserModel}
        setShowAddUserModel={setShowAddUserModel}
        setIsRefresh={setIsRefresh}
      />
      <AddGroup
        open={showGroupModel}
        setShowGroupModel={setShowGroupModel}
        setIsRefresh={setIsRefresh}
      />
      <AddDeviceProfile
        open={showProfileModel}
        setShowProfileModel={setShowProfileModel}
        setIsRefresh={setIsRefresh}
      />
      <div
        className="custom-content-heading d-flex flex-wrap"
        style={{ minHeight: "600px !important" }}
      >
        <h1>Settings</h1>
        <div className=" ml-auto d-flex flex-wrap align-items-center">
          <Dropdown>
            <Dropdown.Toggle
              variant="outline-primary"
              size="sm"
              className="mt-1 mb-2"
            >
              {dropValue}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item
                onClick={(e) => {
                  handleDropDown(e, "Default Content");
                }}
              >
                Default Content
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  handleDropDown(e, "Groups");
                }}
              >
                Groups
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  handleDropDown(e, "Users");
                }}
              >
                Users
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  handleDropDown(e, "Roles");
                }}
              >
                Roles
              </Dropdown.Item>
              <Dropdown.Item
                onClick={(e) => {
                  handleDropDown(e, "Device Profile");
                }}
              >
                Device Profile
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>

      <h4>{dropValue}</h4>
      {dropValue && dropValue === "Default Content" && <ListMedia />}
      {dropValue && dropValue === "Users" && (
        <>
          <div className="d-flex mb-4">
            <button
              className="btn  btn-success btn btn-primary  primary-btn "
              onClick={(e) => {
                handleUser(e);
              }}
            >
              Add User
            </button>
          </div>
          <User
            setIsRefresh={setIsRefresh}
            isRefresh={isRefresh}
            users={allUsers}
          />{" "}
        </>
      )}
      {dropValue && dropValue === "Groups" && (
        <>
          <div className="d-flex mb-4">
            <button
              className="btn  btn-success btn btn-primary  primary-btn "
              onClick={(e) => {
                handleGroup(e);
              }}
            >
              Add Groups
            </button>
          </div>
          <Group
            setIsRefresh={setIsRefresh}
            isRefresh={isRefresh}
            groups={allGroups}
          />{" "}
        </>
      )}
      {dropValue && dropValue === "Roles" && (
        <>
          <Roles
            setIsRefresh={setIsRefresh}
            isRefresh={isRefresh}
            roles={allRoles}
          />{" "}
        </>
      )}
      {dropValue && dropValue === "Device Profile" && (
        <>
          <div className="d-flex mb-4">
            <button
              className="btn  btn-success btn btn-primary  primary-btn "
              onClick={(e) => {
                handleDevice(e);
              }}
            >
              Add Device Profile
            </button>
          </div>
          <Profile
            allDeviceProfile={allDeviceProfile}
            setIsRefresh={setIsRefresh}
            isRefresh={isRefresh}
          />{" "}
        </>
      )}
    </>
  );
};

export default Settings;
