// import React, { Component } from "react";
// import { UIEvent, PhotoEditorSDKUI, ImageFormat, ExportFormat } from "photoeditorsdk";
// import { addMedia } from '../../utils/api'

// export default class PhotoEditorSDK extends Component {
//   componentDidMount() {
//     this.initEditor();
//   }
//   async initEditor() {
//     const editor = await PhotoEditorSDKUI.init({
//       container: "#editor",
//       image: "../example.jpg", // Image url or Image path relative to assets folder
//       // Please replace this with your license: https://img.ly/dashboard
//       license: '',
//       library: {
//         enableWebcam: true, // Enable the webcam
//         enableUpload: true, // Enable the upload
//       },
//       mainCanvasActions: ['undo', 'redo', 'export'],
//       export: {
//         image: {
//           enableDownload: false,
//           format: ImageFormat.JPEG,
//           exportType: ExportFormat.IMAGE,
//         },
//       },
//     });
//     console.log("PhotoEditorSDK for Web is ready!");
//     editor.on(UIEvent.EXPORT, async (imageSrc) => {
//       console.log("Exported ", imageSrc);
//       // const formData = new FormData();
//       // formData.append("file", imageSrc);
//       // formData.append("properties", JSON.stringify({
//       //   height:200,
//       //   width:200,
//       //   size:2
//       // }));
//       // formData.append("type", "image");
//       // await addMedia(formData);
//     });
//   }

//   render() {
//     return (
//       <div
//         id="editor"
//         style={{width: "100vw", height: "100vh" }}
//       />
//     );
//   }
// }

import "./creative.css";

import CreativeEditorSDK from "@cesdk/cesdk-js";

import { useEffect, useRef, useState } from "react";

const config = {
  // Enable local uploads in Asset Library
  callbacks: { onUpload: "local" },
  callbacks: {
    onUnsupportedBrowser: () => {
      /* This is the default window alert which will be shown in case an unsupported
       * browser tries to run CE.SDK */
      window.alert(
        "Your current browser is not supported.\nPlease use one of the following:\n\n- Mozilla Firefox 86 or newer\n- Apple Safari 14.1 or newer\n- Microsoft Edge 88 or newer\n- Google Chrome 88 or newer"
      );
    },
    onBack: () => {
      window.alert("Back callback!");
    },
    onClose: () => {
      window.alert("Close callback!");
    },
    onSave: (scene) => {
      window.alert("Save callback!");
      console.info(scene);
    },
    onLoad: () => {
      window.alert("Load callback!");
      const scene = "..."; // Fill with sene
      return Promise.resolve(scene);
    },
    onExport: (blobs, options) => {
      window.alert("Export callback!");
      console.info(options.mimeType);
      console.info(options.jpegQuality);
      console.info(options.pages);
      return Promise.resolve();
    },
    onUpload: (file, onProgress) => {
      window.alert("Upload callback!");
      const newImage = {
        id: "exampleImageIdentifier",
        meta: {
          uri: "https://YOURSERVER/images/file.jpg",
          thumbUri: "https://YOURSERVER/images/thumb.jpg",
        },
      };
      return Promise.resolve(newImage);
    },
  },
  ui: {
    elements: {
      view: "default", // 'default' or 'advanced'
      navigation: {
        show: true, // 'false' to hide the navigation completely
        position: "top", // 'top' or 'bottom'
        action: {
          close: true, // true or false
          back: true, // true or false
          load: true, // true or false
          save: true, // true or false
          export: {
            show: true,
            format: ["image/png"],
          },
          download: true, // true  or false
          custom: [
            {
              label: "common.custom", // string or i18n key
              iconName: "default", // one of 'default', 'download', 'upload', or 'save'
              callback: () => {
                // callback signature is `() => void | Promise<void>`
                // place custom functionality here
              },
            },
          ],
        },
      },
    },
  },
};

export default function PhotoEditorSDK() {
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
  useEffect(() => {
    if (!cesdk_container.current) return;

    let cleanedUp = false;
    let instance;
    CreativeEditorSDK.create(cesdk_container.current, config).then(
      async (_instance) => {
        instance = _instance;
        if (cleanedUp) {
          instance.dispose();
          return;
        }

        // Do something with the instance of CreativeEditor SDK, for example:
        // Populate the asset library with default / demo asset sources.
        await Promise.all([
          //instance.addDefaultAssetSources(),
          instance.addDemoAssetSources({ sceneMode: "Design" }),
        ]);
        await instance.createDesignScene();

        setCesdk(instance);
      }
    );
    const cleanup = () => {
      cleanedUp = true;
      instance?.dispose();
      setCesdk(null);
    };
    return cleanup;
  }, [cesdk_container]);
  return (
    <div
      ref={cesdk_container}
      // style={{ width: '100vw', height: '100vh' }}
    ></div>
  );
}
