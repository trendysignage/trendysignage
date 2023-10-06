import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from 'react-easy-crop'

import getCroppedImg from "./cropImage";
import { BASE_URL } from "../../../utils/api";

const ImageCroper = ({
  imgSrc,
  zoom,
  rotation,
  setRotation,
  setZoom,
  setCroppedAreaPixels,
  croppedAreaPixels,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  return (
    <Cropper
      image={`${BASE_URL}${imgSrc}`}
      crop={crop}
      zoom={zoom}
      rotation={rotation}
      aspect={16 / 9}
      onCropChange={setCrop}
      onCropComplete={onCropComplete}
      onZoomChange={setZoom}
    />
  );
};

export default ImageCroper;
