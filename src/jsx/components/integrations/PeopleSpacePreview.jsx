import React, { useState, useEffect } from "react";
import { Button, Modal, Row, Col, Badge, Table } from "react-bootstrap";
import person from "../../../img/Ellipse 154.png";
import cancelIcon from "../../../img/cancel-icon.png";
import { useHistory } from "react-router-dom";
import { handlePeopleSpace } from '../../../utils/UtilsService'

export default function PeopleSpacePreview({setShowPreview, showPreview, data}) {
    console.log("sdsdada", showPreview, data)
    const history = useHistory();
    const [previewData,setPreviewData] = useState(null)
    useEffect(() => {
        setPreviewData(handlePeopleSpace(data))
    },[data])
  return (
    <>
        <Modal
        className={`fade bd-example-modal-lg mt-4 custom-modal custom-modal-large`}
        show={showPreview}
        size="md"
    >
            <Modal.Header>
            <Modal.Title>Preview</Modal.Title>
            <Button
            variant=""
            className="close"
            onClick={() => setShowPreview(false)}
            >
            <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
            </Button>
            </Modal.Header>
            <Modal.Body>
                {previewData ? previewData : 'No Data Found'}
                {/* <div className="row people-space text-center">
                    <div className="col-12 col-md-4">
                        <h2>Work Anniversery</h2>
                        <div className="d-flex">
                            <div className="text-center">
                                <img src={person} alt="person" />
                                <h3>Jennifer Winget</h3>
                                <p>
                                We are proud to have someone like you We are proud to have
                                someone like you.
                                </p>
                            </div>
                            <div className="text-center">
                                <img src={person} alt="person" />
                                <h3>Jennifer Winget</h3>
                                <p>
                                We are proud to have someone like you We are proud to have
                                someone like you.
                                </p>
                            </div>
                            <div className="text-center">
                                <img src={person} alt="person" />
                                <h3>Jennifer Winget</h3>
                                <p>
                                We are proud to have someone like you We are proud to have
                                someone like you.
                                </p>
                            </div>
                        </div>
                    </div>
                </div> */}
            </Modal.Body>
        </Modal>
    </>
  );
}
