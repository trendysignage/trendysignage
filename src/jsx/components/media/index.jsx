import React, { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import ListMedia from "./listMedia";
import FilterModal from "../../modals/FilterModal";
import UploadMediaModal from "../../modals/UploadMediaFileModal";
import searchIcon from "../../../img/search.png";
import listIcon from "../../../img/list-icon.png";
import uploadIcon from "../../../img/upload-icon.png";
import canvaIcon from "../../../img/brush.svg";
import layout from "../../../img/layout.svg";

import { getAllMedia } from "../../../utils/api";
import { connect, useDispatch, useSelector } from "react-redux";
import LockScreen from "../../pages/LockScreen";
import useSWR from "swr";
import PhotoEditorSDK from "../PhotoEditorSDK";
import PhotoEditorModal from "../../modals/PhotoEditorModal";

const Media = ({ auth, permission }) => {
  const [showUploadMediaModal, setUploadMediaModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [filterData, setFilterData] = useState({
    groups: [],
    tags: [],
    shows: [],
  });
  const [allMedia, setAllMedia] = useState([]);
  const [openEditor, setOpenEditor] = useState(false);
  const [editorType, setEditorType] = useState(null);

  // const { data: allMedia, mutate } = useSWR(
  //   "/vendor/display/media",
  //   getAllMedia
  // );
  const callAllMedialApi = async () => {
    let str = "";
    // if(filterData.groups && filterData.groups.length > 0){
    //   filterData.groups.map((grp, i) => {
    //     return str += `groups[${i}]=${grp}&`
    //   })
    // }
    if (filterData.tags && filterData.tags.length > 0) {
      filterData.tags.map((tg, i) => {
        return (str += `tags[${i}]=${tg}&`);
      });
    }
    // if(filterData.shows && filterData.shows.length > 0){
    //   filterData.shows.map((tg, i) => {
    //     return str += `status[${i}]=${tg}&`
    //   })
    // }
    const list = await getAllMedia(str);
    console.log("list", list);
    setAllMedia(list);
  };

  useEffect(() => {
    setIsRefresh(false);
    callAllMedialApi();
  }, [isRefresh]);

  const handleEditor = (e, type) => {
    e.preventDefault();
    setEditorType(type);
    setOpenEditor(true);
  };

  return (
    <>
      <PhotoEditorModal
        openEditor={openEditor}
        setOpenEditor={setOpenEditor}
        setIsRefresh={setIsRefresh}
        type={editorType}
      />
      <div className="custom-content-heading d-flex flex-wrap">
        <h1>Assets</h1>
      </div>
      <div style={{ position: "relative" }}>
        {permission && !permission.permission.ASSETS.add && (
          <div className="form-head d-flex mb-3 align-items-start">
            <Button className="mr-2" variant="info add-screen-btn" disabled>
              Add Media
              <span className="btn-icon-right">
                <div className="glyph-icon flaticon-381-lock-1"></div>
              </span>
            </Button>
          </div>
        )}

        {permission && permission.permission.ASSETS.add && (
          <div className="form-head d-flex mb-3 align-items-start">
            <Dropdown className="dropdown-toggle-menu">
              <Dropdown.Toggle
                variant=""
                className="mb-2 d-flex align-items-center justify-content-center add-media-btn"
              >
                <span className="addmedia-btn-text">Add Media</span>
                <span className="btn-icon-right d-flex align-items-center justify-content-center">
                  <div className="glyph-icon flaticon-381-add-1"></div>
                </span>
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item
                  href="#"
                  className="dropdown-list-item"
                  onClick={() => {
                    setUploadMediaModal(true);
                  }}
                >
                  <div className="d-flex">
                    <div className="dropdown-list-icon">
                      <img
                        className="dropdown-list-img img-fluid"
                        src={uploadIcon}
                        alt="menu-icon"
                      />
                    </div>
                    <div className="dropdown-menu-list">
                      <span className="menu-heading">Upload Files</span>
                      <span className="menu-description">
                        Get to know more about screen info
                      </span>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    handleEditor(e, "default");
                  }}
                  className="dropdown-list-item"
                >
                  <div className="d-flex align-items-center">
                    <div className="dropdown-list-icon">
                      <img
                        className="dropdown-list-img img-fluid"
                        src={canvaIcon}
                        alt="menu-icon"
                      />
                    </div>
                    <div className="dropdown-menu-list">
                      <span className="menu-heading">Custom Design</span>
                      <span className="menu-description">
                        Create your custom design
                      </span>
                    </div>
                  </div>
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={(e) => {
                    handleEditor(e, "custom");
                  }}
                  className="dropdown-list-item"
                >
                  <div className="d-flex align-items-center">
                    <div className="dropdown-list-icon">
                      <img
                        className="dropdown-list-img img-fluid"
                        src={layout}
                        alt="menu-icon"
                      />
                    </div>
                    <div className="dropdown-menu-list">
                      <span className="menu-heading">Layouts</span>
                      <span className="menu-description">
                        Create your custom layouts
                      </span>
                    </div>
                  </div>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <UploadMediaModal
              showUploadMediaModal={showUploadMediaModal}
              setUploadMediaModal={setUploadMediaModal}
              //callAllMediaApi={mutate}
              setIsRefresh={setIsRefresh}
            />
          </div>
        )}

        {permission && permission.permission.ASSETS.view ? (
          <ListMedia
            allMedia={allMedia}
            auth={auth}
            //callAllMediaApi={mutate}
            permission={permission}
            setIsRefresh={setIsRefresh}
            setFilterData={setFilterData}
          />
        ) : (
          <LockScreen
            message={"You don't have permission to access this !!!"}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    // errorMessage: state.auth.errorMessage,
    // successMessage: state.auth.successMessage,
    auth: state.auth.auth,
    permission: state.auth.permission,
  };
};
export default connect(mapStateToProps)(Media);
