import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from 'react-easy-crop'
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import getCroppedImg from "./cropImage";
import cancelIcon from "../../../img/cancel-icon.png";
import { BASE_URL } from "../../../utils/api";
import {
    Box,
    DialogActions,
    DialogContent,
    Slider,
    Typography,
  } from '@mui/material';

const ImageRotation = ({
  imgSrc,
  checkCrop,
  setCheckCrop,
  setFile,
//   zoom,
//   setZoom,
  setSelectedCroppedFile,
  selectedCroppedFile,
  selectedCroppedUrl,
  setSelectedCroppedUrl
}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);
//   const [crop, onCropChange] = React.useState({ x: 0, y: 0 })
    const [zoom, onZoomChange] = React.useState(1)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    const cropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

  const cropImage = async () => {
    //setLoading(true);
    try {
      const {file, url} = await getCroppedImg(
        imgSrc,
        croppedAreaPixels,
        rotation
      );
      //setPhotoURL(url);
      setFile((file) => [...file, file]);
      setSelectedCroppedFile(file);
      console.log(file);
      setCheckCrop(false);
    } catch (error) {
        console.log(error)
    //   setAlert({
    //     isAlert: true,
    //     severity: 'error',
    //     message: error.message,
    //     timeout: 5000,
    //     location: 'modal',
    //   });
      console.log(error);
    }

    //setLoading(false);
  };

  return (
    <>
    <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={checkCrop}
        size="xl"
        centered
      >
        <Modal.Header className="border-0">
          <Button
            variant=""
            className="close"
            onClick={() => setCheckCrop(false)}
          >
            <img
              className="cancel-icon"
              src={cancelIcon}
              alt="cancel-icon"
              height="25px"
              width="25px"
            />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <div className="row" style={{minHeight:'300px'}}>
          <DialogContent
        dividers
        sx={{
          background: '#333',
          position: 'relative',
          height: 400,
          width: 'auto',
          minWidth: { sm: 500 },
        }}
      >
        <Cropper
          image={imgSrc}
          crop={crop}
          //zoom={zoom}
          rotation={rotation}
          aspect={1}
          //onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
            <Box>
                <Typography>Rotation: {rotation + '°'}</Typography>
                <Slider
                valueLabelDisplay="auto"
                min={0}
                max={360}
                value={rotation}
                onChange={(e, rotation) => setRotation(rotation)}
                />
            </Box>
            <Box
            sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
            }}
            >
            <Button
                variant="outlined"
                //startIcon={<Cancel />}
                //onClick={() => setOpenCrop(false)}
            >
                Cancel
            </Button>
            <Button
                variant="contained"
                //startIcon={<CropIcon />}
                onClick={cropImage}
            >
                Crop
            </Button>
            </Box>
          </div>
        </Modal.Body>
      </Modal>
    </>
    
  );
};

export default ImageRotation;
