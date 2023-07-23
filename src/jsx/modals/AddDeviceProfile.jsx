import React, {useState, useEffect} from "react";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";
import Select from "react-select";
import {BASE_URL, addDeviceProfile} from "../../utils/api";
import { toast } from "react-toastify";
import AddMedia from '../modals/AddMedia';
import DragMove from "./DragMove";

const AddDeviceProfile = ({ open, setShowProfileModel , setIsRefresh}) => {
    const [name, setName] = useState("");
    const [error, setError] = useState('');
    const [openMedia, setOpenMedia] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedMedia, setSelectedMedia] = useState(null);
    const [height, setHeight] = useState(0);
    const [width, setWidth] = useState(0)
    const [healthIndicator, setHealthIndicator] = useState(false)
    const [viewPort, setViewPort] = useState('portrait');
    const [translate, setTranslate] = useState({
        x: 0,
        y: 0
      });

    const handleDragMove = (e) => {
        setTranslate({
          x: translate.x + e.movementX,
          y: translate.y + e.movementY
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        let err = "";
        if(name === ''){
            err = 'Name is Required';
        }
        if(err !== ''){
            setError(err);
            return false;
        }else{
            setError("")
        }

        const payLoad = {
            name,
            screenHealthIndicator:healthIndicator,
            orientation:viewPort,
            width,
            height,
            x:translate.x,
            y:translate.y,
            title:selectedMedia ? selectedMedia.title : '', 
            type:selectedMedia ? selectedMedia.type : ""
        }

        await addDeviceProfile(payLoad)
        .then(response => {
            //setError(null);
        toast.success("Device Profile has been added successfully !!!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setIsRefresh(true);
            setShowProfileModel(false)
        }).catch(function (error) {
            setError(error.response.data.message)
        });
        console.log("payLoad",payLoad)

    }

    const videoMetaDuration = (media) => {
    const properties = JSON.parse(media?.properties);
    if (properties && properties.length) {
        return (properties.length.toFixed(0) / 60).toFixed(0);
    }
    return null;
    };

    return (
        <>
        <AddMedia setOpenMedia={setOpenMedia} openMedia={openMedia} selectedImage={selectedImage} setSelectedImage={setSelectedImage} setSelectedMedia={setSelectedMedia} setHeight={setHeight} setWidth={setWidth} />
        <Modal
        className=""
        show={open}
        size="xl"
        >
        <Modal.Header>
            <Modal.Title>Add Profile</Modal.Title>
            <Button
                variant=""
                className="close"
                onClick={() => setShowProfileModel(false)}
            >
            <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
            </Button>
        </Modal.Header>
        <Modal.Body>
            <Row>
                {error && error !== '' && <h5 className="alert alert-danger">{error}</h5>}
                <Col lg={12} md={12} sm={12} xs={12}>
                    <label className="mt-3">Enter Name</label>
                    <div className="form-group">
                        <input
                            type="text"
                            name="name"
                            value={name}
                            className="form-control input-default form-field"
                            placeholder="Enter Name"
                            onChange={(e) => {setName(e.target.value)}}
                        />
                    </div>
                    <div className="form-group">
                    <Form.Check // prettier-ignore
                        type="switch"
                        id="custom-switch"
                        label="Health Indicator"
                        defaultValue={healthIndicator}
                        onChange={(e) => {setHealthIndicator(e.target.checked)}}
                    />
                    </div>
                    <div className="form-group">
                        <button onClick={(e) => {setOpenMedia(true)}}>Add Image</button>
                    </div>
                    <div>
                        {selectedMedia && 
                            <div>
                                <span className="td-content d-flex name-td-content">
                                    <span
                                        className={`name-img mr-2  ${
                                        selectedMedia?.type === "video" && "videotableName"
                                        }`}
                                    >
                                        {selectedMedia?.type === "image" && (
                                        <div
                                            onClick={() => {
                                                //showPreview(selectedMedia.title, selectedMedia.type);
                                            }}
                                            className="media-list-img-zoom"
                                        >
                                            <span className="media-list-img-zoom-plus">+</span>
                                            <img
                                            className="media-img img-fluid"
                                            src={`${BASE_URL}${selectedMedia?.title}`}
                                            alt="media-img"
                                            />
                                        </div>
                                        )}
                                        {selectedMedia?.type === "video" && (
                                        <button
                                            onClick={() => {
                                                //showPreview(media.title, media.type);
                                            }}
                                        >
                                            {videoMetaDuration(selectedMedia)}
                                        </button>
                                        )}
                                    </span>
                                    <span className="name-content d-flex flex-column flex-grow-1">
                                        <strong>
                                        {
                                            selectedMedia.title.split("/")[
                                            selectedMedia.title.split("/").length - 1
                                            ]
                                        }
                                        </strong>
                                        <span>{selectedMedia.createdBy.name}</span>
                                    </span>
                                </span>
                                <button 
                                    onClick={(e) => {setViewPort('portrait')}}
                                    className={`btn btn-sm ${viewPort == 'portrait' ? 'btn-success': ''}`}>Potrait
                                </button>
                                <button 
                                    onClick={(e) => {setViewPort('landscape')}}
                                    className={`btn btn-sm ${viewPort == 'landscape' ? 'btn-success': ''}`}>Landscape
                                </button>
                                <div className="form-controle">
                                    <label className="mt-3">X</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={translate.x}
                                            className="form-control input-default form-field"
                                            placeholder="Enter Name"
                                            onChange={(e) => {setTranslate({...translate,['x']:e.target.value})}}
                                        />
                                    </div>
                                </div>
                                <div className="form-controle">
                                    <label className="mt-3">Y</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={translate.y}
                                            className="form-control input-default form-field"
                                            placeholder="Enter Name"
                                            onChange={(e) => {setTranslate({...translate,['y']:e.target.value})}}
                                        />
                                    </div>
                                </div>
                                <div className="form-controle">
                                    <label className="mt-3">Width</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={width}
                                            className="form-control input-default form-field"
                                            placeholder="Enter Name"
                                            onChange={(e) => {setWidth(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div className="form-controle">
                                    <label className="mt-3">Height</label>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            name="name"
                                            value={height}
                                            className="form-control input-default form-field"
                                            placeholder="Enter Name"
                                            onChange={(e) => {setHeight(e.target.value)}}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <header className="App-header">
                                        <DragMove onDragMove={handleDragMove}>
                                        <div
                                            style={{
                                            transform: `translateX(${translate.x}px) translateY(${translate.y}px)`
                                            }}
                                        >
                                            <img style={{width,height}} src={`${BASE_URL}${selectedMedia?.title}`} className="App-logo" alt="logo" />
                                        </div>
                                        </DragMove>
                                    </header>
                                </div>
                            </div>
                        }
                    </div>

                </Col>
            </Row>
        </Modal.Body>
        <Modal.Footer>
            <Row className="w-100 m-0">
                <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
                    <Button 
                        className="cancel-btn w-100"
                        variant="outline-light"
                        onClick={() => setShowProfileModel(false)}
                    >
                    Cancel
                    </Button>
                </Col>
                <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
                    <Button
                        variant=""
                        type="button"
                        className="btn btn-primary btn-block primary-btn"
                        onClick={(e) => handleSubmit(e)}
                    >
                    Save
                    </Button>
                </Col>
            </Row>
        </Modal.Footer>
        </Modal>
        </>
    );
};

export default AddDeviceProfile;
