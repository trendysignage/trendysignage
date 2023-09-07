import React, { useState } from "react";
import { Button } from "react-bootstrap";
import TemplateAddContent from "../../modals/TemplateAddContent";

export default function Createtemplate() {
  const [showAddContent, setShowAddContent] = useState(false);
  return (
    <>
      <TemplateAddContent
        setShowUrlApp={() => setShowAddContent(false)}
        show={showAddContent}
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
