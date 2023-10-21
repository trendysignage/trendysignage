import "./creative.css";
import CreativeEditorSDK from "@cesdk/cesdk-js";
import { addMedia } from '../../utils/api'
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

export default function CreativeEditor({setOpenEditor, setIsRefresh}) {
  const cesdk_container = useRef(null);
  const [cesdk, setCesdk] = useState(null);
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
      onExport: async (blobs, options) => {
        //window.alert("Export callback!");
        
        const fileName = "imgLy-"+makeid(16)
        const data = new File([blobs[0]], fileName);
        const formData = new FormData();
        formData.append("file", data);
        formData.append("properties", JSON.stringify({
          height:200,
          width:200,
          size:2
        }));
        formData.append("type", "image");
        await addMedia(formData)
        .then((res) => {
          console.log("response", res);
          if (res && res.data.message === "Success")
          {
            setOpenEditor(false);
            setIsRefresh(true);
            toast.success("Image has been downloaded successfully !!!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
          }else{
            console.log("else", res)
          }
        });
        return Promise.resolve();
      },
      // onUpload: (file, onProgress) => {
      //   window.alert("Upload callback!");
      //   const newImage = {
      //     id: "exampleImageIdentifier",
      //     meta: {
      //       uri: "https://YOURSERVER/images/file.jpg",
      //       thumbUri: "https://YOURSERVER/images/thumb.jpg",
      //     },
      //   };
      //   return Promise.resolve(newImage);
      // },
      onUpload: "local"
    },
    ui: {
      elements: {
        view: "default", // 'default' or 'advanced'
        navigation: {
          show: true, // 'false' to hide the navigation completely
          position: "top", // 'top' or 'bottom'
          action: {
            //close: true, // true or false
            //back: true, // true or false
            //load: true, // true or false
            //save: true, // true or false
            export: {
              show: true,
              format: ["image/png"],
            },
            //download: true, // true  or false
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
    ></div>
  );
  
}


