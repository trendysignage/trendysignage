import React, { useState } from "react";
import { Button } from "react-bootstrap";
import ListMedia from "./listMedia";
import AddScreenModal from "../../modals/AddScreenModal";
import FilterModal from "../../modals/FilterModal";
import addImg from "../../../img/add-icon.png";
import searchIcon from "../../../img/search.png";
import listIcon from "../../../img/list-icon.png";

const Media = () => {
  const [showScreenModal, setShowScreenModal] = useState(false);
  const [showFilterModal, setFilterModal] = useState(false);

  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap">
        <h1>Media</h1>
      </div>
      <div className="form-head d-flex mb-3 align-items-start">
        <Button
          className="mr-2"
          variant="info add-screen-btn"
          onClick={() => {
            setShowScreenModal(true);
          }}
        >
          Add New Screen
          <span className="btn-icon-right">
            <div class="glyph-icon flaticon-381-add-1"></div>
          </span>
        </Button>
        <div className="search-textfield ml-auto d-flex flex-wrap align-items-center">
          <div className="form-group mb-0">
            <input
              type="text"
              className="form-control input-default "
              placeholder="Search..."
            />
            <img className="search-icon" src={searchIcon} alt="search" />
          </div>
          <Button className="ml-2 icon-btn" variant="primary" onClick={() => {
            setFilterModal(true);
          }}>
            <img className="icon-icon" src={listIcon} alt="list-icon" />
          </Button>
        </div>
        <AddScreenModal
          showScreenModal={showScreenModal}
          setShowScreenModal={setShowScreenModal}
        />
             <FilterModal
          showFilterModal={showFilterModal}
          setFilterModal={setFilterModal}
        />
      </div>
      <ListMedia />
    </>
  );
};

export default Media;
