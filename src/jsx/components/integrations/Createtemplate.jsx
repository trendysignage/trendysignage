import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TemplateAddContent from "../../modals/TemplateAddContent";

import userimg from "../../../img/Ellipse 151.svg";
import edit from "../../../img/edit-btn.png";
import deleteicon from "../../../img/delete-btn.png";
import EditTemplate from "../../modals/EditTemplate";

export default function Createtemplate() {
  const [showAddContent, setShowAddContent] = useState(false);
  const [showEditTemplate, setShowEditTemplate] = useState(false);

  return (
    <>
      <TemplateAddContent
        setShowUrlApp={() => setShowAddContent(false)}
        show={showAddContent}
      />
      <EditTemplate
        setShowUrlApp={() => setShowEditTemplate(false)}
        show={showEditTemplate}
      />
      <div className="custom-content-heading d-flex flex-wrap flex-row align-items-center justify-content-between mb-5">
        <h1 className="mb-0">Template</h1>
        <div className="d-flex align-items-center">
          <Button className="mr-2" variant="info add-screen-btn" type="button">
            Preview
          </Button>
          <Button className="" variant="info add-screen-btn" type="button">
            Save
          </Button>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2 template-app-name">
        <div className="d-flex align-items-center">
          <label className="mb-0 mr-3">App Name</label>
          <div>
            <input
              type="text"
              className="form-control"
              placeholder="App Name"
            />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <label className="mb-0 mr-3">Title</label>
          <input type="text" className="form-control" placeholder="Title" />
        </div>
      </div>
      <div className="d-flex align-items-center mt-5 template-card">
        <img
          src={userimg}
          alt="user-image"
          className="mr-3 template-person-image"
        />
        <div>
          <h3>Jacob Robinson</h3>
          <div className="d-flex align-items-center">
            <p className="mb-0 pr-5">
              It had been a pleasure to see your professional development
              throughout your time with us. You have been a crucial part of our
              team, and your commitment to your role has been exceptional
            </p>
            <div className="d-flex align-items-center add-template">
              <div className="mr-2" onClick={() => setShowEditTemplate(true)}>
                <img src={edit} alt="edit" height="15px" />
              </div>
              <div className="mr-2">
                <img src={deleteicon} alt="img" height="15px" />
              </div>

              <div
                className="add-btn-template"
                style={{ fontSize: "20px" }}
                onClick={() => setShowAddContent(true)}
              >
                +
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-center align-items-center h-100 template-add-content text-center">
        <div>
          <p className="mb-1">Click on the below button to get started</p>
          <Button
            className="btn-block"
            variant="info add-screen-btn"
            type="button"
            onClick={() => setShowAddContent(true)}
          >
            + Add Content
          </Button>
        </div>
      </div>
    </>
  );
}
