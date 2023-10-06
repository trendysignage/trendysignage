import { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";
import { Link } from "react-router-dom";
import { getGroups, getAllTags } from "../../utils/api";

const FilterModal = ({
  showFilterModal,
  setFilterModal,
  setFilterData,
  setIsRefresh,
  type,
  selectedType,
}) => {
  const [screenShow, setScreenShow] = useState([]);
  const [tags, setTags] = useState([]);
  const [groups, setGroups] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    callAllGroupsApi();
    callAllTagsApi();
  }, []);
  const callAllGroupsApi = async () => {
    const list = await getGroups();
    console.log("Groups", list);
    setAllGroups(list.groups);
  };

  const callAllTagsApi = async () => {
    const list = await getAllTags(selectedType ? selectedType : "screens");
    console.log("tags", list);
    setAllTags(list);
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const selectedGrp = groups;
    const groupsData = Object.keys(selectedGrp).filter((i) => {
      if (selectedGrp[i] == false) {
        delete selectedGrp[i];
      }
      return selectedGrp[i] && selectedGrp[i] == true;
    });
    const selectedTag = tags;
    const tagsData = Object.keys(selectedTag).filter((i) => {
      if (selectedTag[i] == false) {
        delete selectedTag[i];
      }
      return selectedTag[i] && selectedTag[i] == true;
    });

    const selectedshows = screenShow;
    const showsData = Object.keys(selectedshows).filter((i) => {
      if (selectedshows[i] == false) {
        delete selectedshows[i];
      }
      return selectedshows[i] && selectedshows[i] == true;
    });
    setFilterData({
      groups: groupsData,
      tags: tagsData,
      shows: showsData,
    });
    setIsRefresh(true);
    setFilterModal(false);
  };

  const resetFilter = (e) => {
    e.preventDefault();
    setFilterData({
      groups: [],
      tags: [],
      shows: [],
    });
    setTags([]);
    setGroups([]);
    setScreenShow([]);
    setFilterModal(false);
    setIsRefresh(true);
  };
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={showFilterModal}
      size="md"
    >
      <Modal.Header>
        <Modal.Title className="mr-auto">Filter</Modal.Title>
        <span
          className="clear-filter-link"
          onClick={(e) => resetFilter(e)}
          style={{ cursor: "pointer" }}
        >
          Clear Filter
        </span>
        <Button
          variant=""
          className="close"
          onClick={() => setFilterModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        {type && type.includes("shows") ? (
          <div className="filter-row mb-3">
            <h6 className="mb-3">Show</h6>
            <div className="d-flex flex-wrap">
              <div className="custom-control custom-checkbox common-checkbox mr-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="live"
                  id="live"
                  checked={screenShow["live"]}
                  onChange={(e) => {
                    console.log(e);
                    setScreenShow({
                      ...screenShow,
                      ["live"]: e.target.checked,
                    });
                  }}
                />
                <label className="custom-control-label" htmlFor="live">
                  Live
                </label>
              </div>
              <div className="custom-control custom-checkbox common-checkbox mr-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="offline"
                  id="offline"
                  checked={screenShow["offline"]}
                  onChange={(e) => {
                    setScreenShow({
                      ...screenShow,
                      ["offline"]: e.target.checked,
                    });
                  }}
                />
                <label className="custom-control-label" htmlFor="offline">
                  Offline
                </label>
              </div>
              <div className="custom-control custom-checkbox common-checkbox mr-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  name="deactivated"
                  id="deactivated"
                  checked={screenShow["deactivated"]}
                  onChange={(e) => {
                    setScreenShow({
                      ...screenShow,
                      ["deactivated"]: e.target.checked,
                    });
                  }}
                />
                <label className="custom-control-label" htmlFor="deactivated">
                  Deactivated
                </label>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
        {type && type.includes("tags") ? (
          <div className="filter-row mb-3">
            <h6 className="mb-3">Tags</h6>
            <div className="tag-content-row d-flex flex-wrap align-items-center">
              {allTags && allTags.length > 0 ? (
                <>
                  {allTags.map((item) => {
                    return (
                      <div className="d-flex align-items-center mr-3 mb-3">
                        <input
                          id={"check-" + item}
                          type="checkbox"
                          className=" mr-2 "
                          required
                          name={item._id}
                          checked={tags && tags[item]}
                          onChange={(e) =>
                            setTags({ ...tags, [item]: e.target.checked })
                          }
                        />

                        <label className="mb-0" style={{ color: "#333" }}>
                          {item}
                        </label>
                      </div>
                    );
                  })}
                </>
              ) : (
                "NO Groups Found"
              )}
            </div>
          </div>
        ) : (
          <></>
        )}
        {type && type.includes("groups") ? (
          <div className="filter-row mb-3">
            <h6>Groups</h6>
            <div className="d-flex flex-wrap">
              {/* {
                allGroups && allGroups.map((item) => {
                  {console.log("dsds");}
                  return (
                    <Badge 
                      className={`badge-common-light mr-2 ${groups.includes(item._id) ? 'active' : 'non-active'}`}
                      variant="outline-light"
                      onClick = {(e) => {handleGroups(e,item)}}
                    >
                      {item.name}
                    </Badge>
                  );
                })
              } */}
              <div className="tag-content-row d-flex flex-wrap align-items-center">
                {allGroups && allGroups.length > 0 ? (
                  <>
                    {allGroups.map((item) => {
                      return (
                        <div className="col-3">
                          <input
                            id={"check-" + item._id}
                            type="checkbox"
                            className="   "
                            required
                            name={item._id}
                            checked={groups && groups[item._id]}
                            onChange={(e) =>
                              setGroups({
                                ...groups,
                                [item._id]: e.target.checked,
                              })
                            }
                          />
                          <label className="mt-3 mr-3">{item.name}</label>
                        </div>
                      );
                    })}
                  </>
                ) : (
                  "NO Groups Found"
                )}
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant=""
          type="button"
          className="btn btn-primary btn-block primary-btn"
          onClick={(e) => handleFilter(e)}
        >
          Apply
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default FilterModal;
