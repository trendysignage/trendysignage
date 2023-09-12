import React, { useState, useEffect } from "react";
import { Table, Dropdown, Card, Button } from "react-bootstrap";
import menuIcon from "../../../img/menu-icon.png";
import assignIcon from "../../../img/assign-icon.png";
import takeScreenshotIcon from "../../../img/tack-screenshot-icon.png";
import { addDeviceProfile, deleteDeviceProfile } from "../../../utils/api";
import { humanReadableFormattedDateString } from "../../../utils/UtilsService";
import { toast } from "react-toastify";
import AddDeviceProfile from "../../modals/AddDeviceProfile";
import SelectScreenModal from "../../modals/SelectScreenModal";
import Datatable from "react-data-table-component";
import Box from '@mui/material/Box';

import { DataGrid, GridToolbarExport,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector} from '@mui/x-data-grid';
  import Pagination from '@mui/material/Pagination';
import LinearProgress from '@mui/material/LinearProgress';
import CustomNoRowsOverlay from '../CustomNoRowsOverlay';
import QuickSearchToolbar from '../QuickSearchToolbar';
import { GridToolbarContainer } from '@mui/x-data-grid';

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      {/* <GridToolbarColumnsButton  color='success' title="ABC" label={'ds'} startIcon={<Avatar />}  /> */}
      {/* <GridToolbarExport color='success' csvOptions={
        {
          fileName: 'customerList',
          utf8WithBom: true,
        }} /> */}
      <QuickSearchToolbar/>
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


const Profile = ({ allDeviceProfile, setIsRefresh, isRefresh, loading }) => {
  const [showProfileModel, setShowProfileModel] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [showPublishPopUp, setShowPublishPopUp] = useState(false);
  const [selected, setSelected] = useState(null);
  const [selectedScreen, setSelectedScreen] = useState([]);

  const handleEditiUser = (e, item) => {
    e.preventDefault();
    setShowProfileModel(true);
    setProfileData(item);
    console.log("Update Profile");
  };

  const handleAssignScreen = (e, id, item) => {
    e.preventDefault();
    setShowPublishPopUp(true);
    setSelected(id);
    setSelectedScreen(item.screens);
    console.log("Assign Screen");
  };

  const handleDelete = async (e, id) => {
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
  };

  const renderAction = (params) => {
    const {value} = params;
    return (
      <Dropdown className="dropdown-toggle profile-dropdown">
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
              handleEditiUser(e, value);
            }}
            className="dropdown-list-item"
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
                <span className="menu-heading">Edit</span>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              handleAssignScreen(e, value._id, value);
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
                <span className="menu-heading">Assigned Screen</span>
              </div>
            </div>
          </Dropdown.Item>
          <Dropdown.Item
            onClick={(e) => {
              handleDelete(e, value._id);
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
                <span className="menu-heading">Delete</span>
              </div>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  };

  const columns = [
    {
      name: "Name",
      selector: (row) => row?.name,
      sortable: true,
    },
    {
      name: "Created",
      selector: (row) => humanReadableFormattedDateString(row.createdAt),
      sortable: true,
    },
    {
      name: "Updated",
      selector: (row) => humanReadableFormattedDateString(row.createdAt),
      sortable: true,
    },
    {
      name: " ",
      selector: (row) => renderAction(row),
      sortable: false,
    },
  ];
  const rows1 = [];
  if(allDeviceProfile){
    allDeviceProfile.forEach((item) => {
        rows1.push({
              id:item._id,
              name:item.name,
              created: humanReadableFormattedDateString(item.createdAt),
              updated: humanReadableFormattedDateString(item.createdAt),
              assignedScreen:item.screens.length,
              action:item
          });
      });
  }

  const columns1 = [
    { field: 'id', headerName: 'ID', flex: 1  },
    { field: 'name', headerName: 'Name',  flex: 1, disableExport: true },
    { field: 'created', headerName: 'Created At', flex: 1  },
    { field: 'updated', headerName: 'Updated At', flex: 1  },
    { field: 'assignedScreen', headerName: 'Assigned Screen', flex: 1 },
    {field: 'action', headerName:'Action', flex:1,renderCell:renderAction, disableExport: true},
  ];
  

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
        setIsRefresh={setIsRefresh}
        selectedScreen={selectedScreen}
        setSelectedScreen={setSelectedScreen}
      />
      {/* <Datatable
        className="profile"
        columns={columns}
        data={allDeviceProfile}
        pagination
        sorting
      /> */}
      <Box sx={{ height: 400, width: '100%' }}>
        <DataGrid
          components={{
              NoRowsOverlay: CustomNoRowsOverlay,
              Toolbar: CustomToolbar,
              LoadingOverlay: LinearProgress,
              Pagination: CustomPagination,
          }}
          rows={rows1}
          columns={columns1}
          pageSize={10}
          rowsPerPageOptions={[5]}
          //checkboxSelection
          disableSelectionOnClick
          experimentalFeatures={{ newEditingApi: true }}
          loading={loading}
          pagination
        />
      </Box>

      {/* <Table responsive className="custom-table screen-table">
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
                  <td>{item.screens.length}</td>
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
                           onClick={(e)=>{handleAssignScreen(e, item._id, item)}}
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
      </Table> */}
    </>
  );
};

export default Profile;
