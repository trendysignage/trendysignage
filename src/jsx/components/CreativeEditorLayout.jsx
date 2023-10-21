import "./creative.css";
import CreativeEditorSDK from "@cesdk/cesdk-js";
import { addMedia } from '../../utils/api'
import { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";

import { createApplyLayoutAsset } from './lib/createApplyLayoutAsset';
import loadAssetSourceFromContentJSON from './lib/loadJson';
import LAYOUT_ASSETS from './CustomLayouts.json';

const caseAssetPath = (path, caseId = 'layouts') =>`${window.location.protocol + "//" + window.location.host}/cases/${caseId}${path}`;

console.log("case", caseAssetPath('/custom-layouts.scene'))

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


export default function CreativeEditorLayoutSDK({setOpenEditor, setIsRefresh}) {
  const cesdkContainer = useRef(null);
  const engine = useRef(null);
  useEffect(() => {
    let config = {
      role: 'Adopter',
      theme: 'light',
      license: process.env.REACT_APP_LICENSE,
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
          console.log('blob', blobs)
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
        onUpload: "local"
      },
      ui: {
        elements: {
          navigation: {
            action: {
              export: {
                show: true,
                format: ["image/png"],
              },
            }
          },
          dock: {
            groups: [
              {
                id: 'ly.img.layouts',
                entryIds: ['ly.img.layouts']
              },
              {
                id: 'ly.img.defaultGroup',
                showOverview: true
              }
            ],
            defaultGroupId: 'ly.img.defaultGroup'
          },
          panels: {
            settings: true
          },
          libraries: {
            replace: {
              floating: false,
              autoClose: false
            },
            insert: {
              autoClose: false,
              floating: false,
              entries: (defaultEntries) => {
                return [
                  {
                    id: 'ly.img.layouts',
                    sourceIds: ['ly.img.layouts'],
                    previewLength: 2,
                    gridColumns: 2,
                    gridItemHeight: 'square',

                    previewBackgroundType: 'contain',
                    gridBackgroundType: 'contain',
                    icon: ({ theme, iconSize }) => {
                      return iconSize === 'normal'
                        ? caseAssetPath('/collage-small.svg')
                        : caseAssetPath('/collage-large.svg');
                    }
                  },
                  ...defaultEntries.filter(({ id }) => id !== 'ly.img.template')
                ];
              }
            }
          }
        }
      },
      i18n: {
        en: {
          'libraries.ly.img.layouts.label': 'Layouts'
        }
      }
    };
    let cesdk;
    if (cesdkContainer.current) {
      CreativeEditorSDK.create(cesdkContainer.current, config).then(
        async (instance) => {
          //instance.addDefaultAssetSources();
          instance.addDemoAssetSources({sceneMode: 'Design'});

          loadAssetSourceFromContentJSON(
            instance.engine,
            LAYOUT_ASSETS,
            caseAssetPath(''),
            createApplyLayoutAsset(instance.engine)
          );
          cesdk = instance;
          engine.current = instance.engine;
         await cesdk.loadFromURL(caseAssetPath('/custom-layouts.scene'));
        }
      );
    }
    return () => {
      if (cesdk) {
        cesdk.dispose();
      }
    };
  }, [cesdkContainer]);

  return (
    <div style={cesdkWrapperStyle}>
      <div ref={cesdkContainer} style={cesdkStyle}></div>
    </div>
  );
  
}

const cesdkStyle = {
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0
};
const cesdkWrapperStyle = {
  position: 'relative',
  minHeight: '640px',
  overflow: 'hidden',
  flexGrow: 1,
  display: 'flex',
  borderRadius: '0.75rem',
  boxShadow:
    '0px 0px 2px rgba(22, 22, 23, 0.25), 0px 4px 6px -2px rgba(22, 22, 23, 0.12), 0px 2px 2.5px -2px rgba(22, 22, 23, 0.12), 0px 1px 1.75px -2px rgba(22, 22, 23, 0.12)'
};
