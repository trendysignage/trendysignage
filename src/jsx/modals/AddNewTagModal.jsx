import React, { useState } from "react";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";
import { addTags } from "../../utils/api";

const AddNewTagModal = ({ setNewTagModal, selected, setIsRefresh, type }) => {
  const [tag, setTag] = useState(null);
  const [tagArr, setTagArr] = useState(selected.tags);

  const handleTagsSubmit = async (e) => {
    e.preventDefault();
    const newArr = tagArr;
    console.log(newArr);
    if (tag && tag != "") {
      newArr.push(tag.trim());
    }
    console.log(newArr);
    if (type && type == "media") {
      await addTags({ type: "media", id: selected._id, tags: newArr });
    } else if (type && type == "schedule") {
      await addTags({ type: "schedule", id: selected._id, tags: newArr });
    } else if (type && type == "composition") {
      await addTags({ type: "composition", id: selected._id, tags: newArr });
    } else {
      await addTags({ type: "screen", id: selected._id, tags: newArr });
    }

    setTagArr(newArr);
    setTag("");
    console.log("OK");
  };

  const handleTagsDelete = async (e, index, item) => {
    e.preventDefault();
    const newArr = tagArr.filter((i, indx) => {
      return indx != index;
    });
    setTagArr(newArr);
    if (type && type == "media") {
      await addTags({ type: "media", id: selected._id, tags: newArr });
    } else if (type && type == "schedule") {
      await addTags({ type: "schedule", id: selected._id, tags: newArr });
    } else if (type && type == "composition") {
      await addTags({ type: "composition", id: selected._id, tags: newArr });
    } else {
      await addTags({ type: "screen", id: selected._id, tags: newArr });
    }
    setTagArr(newArr);
    setIsRefresh(true);
    setTag("");
    console.log("OK");
  };

  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={true}
      size="md"
    >
      <Modal.Header>
        <Modal.Title>Add New Tag</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setNewTagModal(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <div className="add-screen-paragraph">
          <p>Type in new name to create your tag</p>
        </div>
        <div className="tag-name-row d-flex flex-wrap">
          {tagArr &&
            tagArr.map((tag, index) => {
              return (
                <Badge className="tag-name" variant="outline-primary">
                  <span className="tag-name-content">{tag}</span>
                  <span className="tag-close">
                    <img
                      className="tag-close-icon"
                      src={tagCloseIcon}
                      alt="tag-icon"
                      style={{ cursor: "pointer" }}
                      onClick={(e) => handleTagsDelete(e, index, tag)}
                    />
                  </span>
                </Badge>
              );
            })}
        </div>
        <Row>
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
              <input
                type="text"
                name="tag"
                id="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value.trim())}
                className="form-control input-default form-field"
                placeholder="Enter Name"
              />
            </div>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="w-100 m-0">
          <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
            <Button
              className="cancel-btn w-100"
              onClick={() => setNewTagModal(false)}
              variant="outline-light"
            >
              Cancel
            </Button>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
            <Button
              variant=""
              type="button"
              className="btn btn-primary btn-block primary-btn"
              onClick={(e) => handleTagsSubmit(e)}
            >
              Save
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNewTagModal;
