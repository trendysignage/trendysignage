import React, { useState } from "react";
import { Table } from "react-bootstrap";
import AddNewTagModal from "../../../modals/AddNewTagModal";
import downArrow from "../../../../img/down-arrow.png";

import { deleteCompositionById, BASE_URL } from "../../../../utils/api";
import DeleteConfirmation from "../../../modals/DeleteConfirmation";
import CompositionActions from "./CompositionActions";
import { getDatetimeIn12Hours, humanReadableFormattedDateString } from "../../../../utils/UtilsService";


const ListComposition = ({ allComposition, mutate }) => {
  const [deleteModal, setDeleteModal] = useState(false);
  const [showNewTagModal, setNewTagModal] = useState(false);
  const [selected, setSelected] = useState("");

  
  const handleDelete = async () => {
    setDeleteModal(false)
    await deleteCompositionById(selected._id);
    mutate();
   };
  return (
    <>
      <Table responsive className="custom-table screen-table">
        <thead>
          <tr>
            <th>Composition</th>
            <th>Date Added</th>
            <th>Duration</th>
            <th>Associated Schedule</th>
            <th>Tags</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          {allComposition &&
            allComposition.map((composition) => {
              const content = composition.zones[0].content[0];
              return (
                <tr id={composition._id}>
                <td>
                    <span className="td-content d-flex name-td-content">
                   
                      <span className={`name-img mr-2  ${content.type === "video" && "videotableName"}`}>
                      {content.type === "image" && <img
                          className="media-img img-fluid"
                          src={`${BASE_URL}${content.url}`}
                          alt="media-img"
                        />}
                         {content.type === "video" && content.duration.toFixed(0)/60}
                      </span>
                      <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>{composition.name}</strong>
                        <span>{composition.createdBy}</span>
                      </span>
                    </span>
                  </td>
                  <td>
                  <span className="td-content">
                      <strong>
                        {humanReadableFormattedDateString(composition.createdAt)}
                      </strong>
                      <span>{getDatetimeIn12Hours(composition.createdAt)}</span>
                    </span>
            
                  </td>
                  <td> {composition.duration} Sec</td>
                  <td>No Schedule</td>
                  <td style={{ width: "180px" }}>
                    <span className="tag-container">
                      {composition.tags &&
                        composition.tags.map((tag) => {
                          return (
                            <span className="my-phone-tag text-truncate ml-1 mr-1 mb-1">
                              {tag}
                            </span>
                          );
                        })}
                    </span>

                    <span
                      className="down-arrow"
                      onClick={() => {
                        setSelected(composition);
                        setNewTagModal(true);
                      }}
                    >
                      <img
                        className="down-arrow-img img-fluid"
                        src={downArrow}
                        alt="arrow"
                      />
                    </span>
                  </td>
                  <td>
                    <CompositionActions composition={composition} mutate={mutate} setSelected={setSelected} setDeleteModal={setDeleteModal}  />
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
      {showNewTagModal && (
        <AddNewTagModal
          setNewTagModal={setNewTagModal}
          allScreens={allComposition}
          selected={selected}
        />
      )}

      {deleteModal && <DeleteConfirmation setDeleteModal={setDeleteModal} callbackFunction={handleDelete} text="Are you sure you want to delete?" yes={"Yes Delete"}/>}
    </>
  );
};

export default ListComposition;
