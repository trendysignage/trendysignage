import { Button, Modal } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import PhotoEditorSDK from "../components/PhotoEditorSDK";
import CreativeEditor from "../components/CreativeEditor";

import { useState } from "react";
import CreativeEditorLayoutSDK from "../components/CreativeEditorLayout";
const PhotoEditorModal = ({
    openEditor, setOpenEditor, setIsRefresh, type
}) => {

  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={openEditor}
        size="xl"
      >
        <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
          <div>
            <Button
              variant=""
              className=""
              onClick={() => setOpenEditor(false)}
            >
              <img
                className="cancel-icon"
                src={cancelIcon}
                alt="cancel-icon"
                height="25px"
                width="25px"
              />
            </Button>
          </div>

          {/* <Button
            variant=""
            type="button"
            className="btn btn-primary btn-block primary-btn"
            style={{ width: "fit-content" }}
            //   onClick={() => setNewTagModal(false)}
          >
            Assign
          </Button> */}
        </Modal.Header>
        <Modal.Body>
            {/* <PhotoEditorSDK  setOpenEditor={setOpenEditor} setIsRefresh={setIsRefresh}/> */}
            {
              type && type == 'default' ? <CreativeEditor  setOpenEditor={setOpenEditor} setIsRefresh={setIsRefresh}/> : <></>
            }
            {
              type && type == 'custom' ? <CreativeEditorLayoutSDK  setOpenEditor={setOpenEditor} setIsRefresh={setIsRefresh}/> : <></>
            }
            
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PhotoEditorModal;
