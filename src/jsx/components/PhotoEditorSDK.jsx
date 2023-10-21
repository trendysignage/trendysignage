import React, { Component } from "react";
import { UIEvent, PhotoEditorSDKUI, ImageFormat, ExportFormat } from "photoeditorsdk";
import { addMedia } from '../../utils/api'

export default class PhotoEditorSDK extends Component {
  componentDidMount() {
    this.initEditor();
  }
  async initEditor() {
    const editor = await PhotoEditorSDKUI.init({
      container: "#editor",
      image: "../example.jpg", // Image url or Image path relative to assets folder
      // Please replace this with your license: https://img.ly/dashboard
      license: '',
      library: {
        enableWebcam: true, // Enable the webcam
        enableUpload: true, // Enable the upload
      },
      mainCanvasActions: ['undo', 'redo', 'export'],
      export: {
        image: {
          enableDownload: false,
          format: ImageFormat.JPEG,
          exportType: ExportFormat.IMAGE,
        },
      },
    });
    console.log("PhotoEditorSDK for Web is ready!");
    editor.on(UIEvent.EXPORT, async (imageSrc) => {
      console.log("Exported ", imageSrc);
      // const formData = new FormData();
      // formData.append("file", imageSrc);
      // formData.append("properties", JSON.stringify({
      //   height:200,
      //   width:200,
      //   size:2
      // }));
      // formData.append("type", "image");
      // await addMedia(formData);
    });
  }

  render() {
    return (
      <div
        id="editor"
        style={{width: "100vw", height: "100vh" }}
      />
    );
  }
}


