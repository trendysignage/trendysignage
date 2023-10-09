import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import ListScreen from "./listScreens";
import AddScreenModal from "../../modals/AddScreenModal";
// import FilterModal from "../../modals/FilterModal";
import searchIcon from "../../../img/search.png";
import listIcon from "../../../img/list-icon.png";
import { getAllScreens } from "../../../utils/api";
import LockScreen from "../../pages/LockScreen";
import { connect } from "react-redux";
import { toast } from "react-toastify";

const Screen = ({ userPermission, auth }) => {
  console.log("userPermission", userPermission);
  const [showScreenModal, setShowScreenModal] = useState(false);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showFilterModal, setFilterModal] = useState(false);
  const [allScreens, setAllScreens] = useState("");
  const [filterData, setFilterData] = useState({
    groups: [],
    tags: [],
    shows: [],
  });
  // use effect
  useEffect(() => {
    console.log("Refrshing", filterData);
    setIsRefresh(false);
    callAllScreenApi();
  }, [isRefresh]);
  const callAllScreenApi = async () => {
    console.log(filterData);
    let str = "";
    if (filterData.groups && filterData.groups.length > 0) {
      filterData.groups.map((grp, i) => {
        return (str += `groups[${i}]=${grp}&`);
      });
    }
    if (filterData.tags && filterData.tags.length > 0) {
      filterData.tags.map((tg, i) => {
        return (str += `tags[${i}]=${tg}&`);
      });
    }
    if (filterData.shows && filterData.shows.length > 0) {
      filterData.shows.map((tg, i) => {
        //return (str += `status[${i}]=${tg}&`);
        return (str += `status=${tg}&`);
      });
    }
    const list = await getAllScreens(str);
    setAllScreens(list);
  };

  const handleShowScreens = (e) => {
    e.preventDefault();
    if (allScreens && allScreens.length >= auth.vendor.totalScreens) {
      return toast.error(
        "Please contact Trendy Administrator or email info@frontline.sa",
        {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        }
      );
    } else {
      setShowScreenModal(true);
    }
  };
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap">
        <h1>Screen</h1>
      </div>
      <div style={{ position: "relative" }}>
        <div className="form-head d-flex mb-3 align-items-start">
          {userPermission && userPermission.permission.SCREEN.add ? (
            <Button
              className="mr-2"
              variant="info add-screen-btn"
              onClick={(e) => {
                handleShowScreens(e);
              }}
            >
              Add New Screen
              <span className="btn-icon-right">
                <div className="glyph-icon flaticon-381-add-1"></div>
              </span>
            </Button>
          ) : (
            <Button className="mr-2" variant="info add-screen-btn" disabled>
              Add New Screen
              <span className="btn-icon-right">
                <div className="glyph-icon flaticon-381-lock-1"></div>
              </span>
            </Button>
          )}

          {/* <div className="search-textfield ml-auto d-flex flex-wrap align-items-center">
          <div className="form-group mb-0">
            <input
              type="text"
              className="form-control input-default "
              placeholder="Search..."
            />
            <img className="search-icon" src={searchIcon} alt="search" />
          </div>
          <Button
            className="ml-2 icon-btn"
            variant="primary"
            onClick={() => {
              setFilterModal(true);
            }}
          >
            <img className="icon-icon" src={listIcon} alt="list-icon" />
          </Button>
        </div> */}
          {showScreenModal && (
            <AddScreenModal
              setShowScreenModal={setShowScreenModal}
              callAllScreenApi={callAllScreenApi}
            />
          )}

          {/* <FilterModal
          showFilterModal={showFilterModal}
          setFilterModal={setFilterModal}
        /> */}
        </div>
        {userPermission && userPermission.permission.SCREEN.view ? (
          <ListScreen
            allScreens={allScreens}
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
    userPermission: state.auth.permission,
    auth: state.auth.auth,
  };
};
export default connect(mapStateToProps)(Screen);
