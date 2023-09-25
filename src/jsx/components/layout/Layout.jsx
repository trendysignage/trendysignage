import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import searchIcon from "../../../img/search.png";
import listIcon from "../../../img/list-icon.png";
import emptyMediaImg from "../../../img/layout-img.png";
import { Link } from "react-router-dom";
import useSWR from "swr";
import { connect } from "react-redux";
import { getAllComposition } from "../../../utils/api";
import ListComposition from "./Composition/listComposition";
import LockScreen from "../../pages/LockScreen";
const Layout = ({ permission }) => {
  const [filterData, setFilterData] = useState([]);
  const [allComposition, setAllComposition] = useState([]);
  const [isRefresh, setIsRefresh] = useState(false);

  // const { data: allComposition, mutate } = useSWR(
  //   "/vendor/layouts/compositions",
  //   getAllComposition
  // );
  const callAllCompApi = async () => {
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
    const list = await getAllComposition(str);
<<<<<<< HEAD
    console.log("list", list);
=======

>>>>>>> bb60d19e2d5cdacdf84a4f6abcf7da37850c6d3a
    setAllComposition(list);
  };

  useEffect(() => {
    setIsRefresh(false);
    callAllCompApi();
  }, [isRefresh]);

  return (
    <div>
      <div className="custom-content-heading d-flex flex-wrap">
        <h1>Layouts</h1>
      </div>
      <div style={{ position: "relative" }}>
        <div className="form-head d-flex mb-3 align-items-start">
          {permission && !permission.permission.COMPOSITION.add ? (
            <Button className="mb-2 d-flex align-items-center justify-content-center add-media-btn">
              Add Composition{" "}
              <span className="btn-icon-right">
                <div class="glyph-icon flaticon-381-lock-1"></div>
              </span>
            </Button>
          ) : (
            <Link
              to={{
                pathname: `/chooselayout`,
              }}
              className="mr-2 add-composition-btn"
            >
              Add Composition{" "}
              <span className="btn-icon-right">
                <div class="glyph-icon flaticon-381-add-1"></div>
              </span>
            </Link>
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
          <Button className="ml-2 icon-btn" variant="primary">
            <img className="icon-icon" src={listIcon} alt="list-icon" />
          </Button>
        </div> */}
        </div>
        {permission && permission.permission.COMPOSITION.view ? (
          <>
            {!allComposition && (
              <div className="empty-media text-center">
                <div class="empty-media-img layout-empty-img mx-auto">
                  <img
                    className="media-img img-fluid"
                    src={emptyMediaImg}
                    alt="media-img"
                  />
                </div>
                <h3>Add Composition</h3>
                <p>
                  Add Media files to composition, Lorem ipsum dolor is a dummy{" "}
                  <br /> text. Dummy text.
                </p>
              </div>
            )}

            {allComposition && (
              <ListComposition
                allComposition={allComposition}
                //mutate={mutate}
                setIsRefresh={setIsRefresh}
                permission={permission}
                setFilterData={setFilterData}
              />
            )}
          </>
        ) : (
          <LockScreen
            message={"You don't have permission to access this !!!"}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    permission: state.auth.permission,
  };
};
export default connect(mapStateToProps)(Layout);
