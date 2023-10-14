import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TemplateAddContent from "../../modals/TemplateAddContent";
import { toast } from "react-toastify";
import userimg from "../../../img/Ellipse 151.svg";
import edit from "../../../img/edit-btn.png";
import deleteicon from "../../../img/delete-btn.png";
import EditTemplate from "../../modals/EditTemplate";
import settingicon from "../../../img/setting-5.svg";
import {
  updateApps,
  addApps,
  BASE_URL,
  getAllMediaDetail,
} from "../../../utils/api";
import SelectMedia from "../../modals/SelecteMedia";
import { useParams } from "react-router-dom";
import PeopleSpacePreview from "./PeopleSpacePreview";

export default function Createtemplate({ history, actionType, mediaId }) {
  let params = new URLSearchParams(history.location.search);
  const { id } = useParams();
  console.log("params", id);
  let tempType = params.get("type");
  console.log("temp", tempType);
  const [showAddContent, setShowAddContent] = useState(false);
  const [showEditTemplate, setShowEditTemplate] = useState(false);
  const [slides, setSlides] = useState(
    (tempType && tempType == "temp1") || tempType == "temp4"
      ? [
          {
            name: "Jennifer Winget1",
            message:
              "We are proud to have someone like you We are proud to have someone like you.",
          },
          {
            name: "Jennifer Winget2",
            message:
              "We are proud to have someone like you We are proud to have someone like you.",
          },
          {
            name: "Jennifer Winget3",
            message:
              "We are proud to have someone like you We are proud to have someone like you.",
          },
        ]
      : (tempType && tempType == "temp2") ||
        tempType == "temp3" ||
        tempType == "temp5" ||
        tempType == "temp6"
      ? [
          {
            name: "Jennifer Winget3",
            message:
              "We are proud to have someone like you We are proud to have someone like you.",
          },
        ]
      : []
  );
  const [editItem, setEditItem] = useState(null);
  const [editImage, setEditImage] = useState(null);
  const [appName, setAppName] = useState(null);
  const [appTitle, setAppTitle] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageModalShow, setImageModalShow] = useState(false);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isRefresh, setIsRefresh] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [settingData, setSettingData] = useState(
    tempType
      ? tempType == "temp1"
        ? {
            bgOpacity: 100,
            bgColor: "#FAACC5",
            duration: "20",
            isTitle: true,
            messageColor: "#AA144C",
            messageStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
            nameColor: "#AA144C",
            nameStyle: { value: "'Fira Sans', sans-serif", label: "Fira Sans" },
            titleColor: "#AA144C",
            titleStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
          }
        : tempType == "temp2"
        ? {
            bgOpacity: 100,
            bgColor: "#78e176",

            duration: "20",
            isTitle: true,
            messageColor: "#076923",
            messageStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
            nameColor: "#076923",
            nameStyle: { value: "'Fira Sans', sans-serif", label: "Fira Sans" },
            titleColor: "#076923",
            titleStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
          }
        : tempType == "temp3"
        ? {
            bgOpacity: 100,
            bgColor: "#78e176b8",
            duration: "20",
            isTitle: true,
            messageColor: "#2512AD",
            messageStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
            nameColor: "#2512AD",
            nameStyle: { value: "'Fira Sans', sans-serif", label: "Fira Sans" },
            titleColor: "#2512AD",
            titleStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
          }
        : tempType == "temp4"
        ? {
            bgOpacity: 100,
            bgColor: "#9443b1b8",
            duration: "20",
            isTitle: true,
            messageColor: "#2512AD",
            messageStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
            nameColor: "#2512AD",
            nameStyle: { value: "'Fira Sans', sans-serif", label: "Fira Sans" },
            titleColor: "#2512AD",
            titleStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
          }
        : tempType == "temp5"
        ? {
            bgOpacity: 100,
            bgColor: "#ce5e1fc2",
            duration: "20",
            isTitle: true,
            messageColor: "#fff",
            messageStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
            nameColor: "#fff",
            nameStyle: { value: "'Fira Sans', sans-serif", label: "Fira Sans" },
            titleColor: "#fff",
            titleStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
          }
        : tempType == "temp6"
        ? {
            bgOpacity: 100,
            bgColor: "#bd2dbac2",
            duration: "20",
            isTitle: true,
            messageColor: "#AA144C",
            messageStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
            nameColor: "#AA144C",
            nameStyle: { value: "'Fira Sans', sans-serif", label: "Fira Sans" },
            titleColor: "#AA144C",
            titleStyle: {
              value: "'Fira Sans', sans-serif",
              label: "Fira Sans",
            },
          }
        : ""
      : {
          bgOpacity: 100,
          bgStyle: { value: "bree-sarif", label: "Bree Sarif" },
          duration: "20",
          isTitle: true,
          messageColor: "#000000",
          messageStyle: { value: "bree-sarif", label: "Bree Sarif" },
          nameColor: "#000000",
          nameStyle: { value: "bree-sarif", label: "Bree Sarif" },
          titleColor: "#f20d0d",
          titleStyle: { value: "permanent", label: "Permanent Maker" },
        }
  );
  const callMediaDetailApi = async (id) => {
    const list = await getAllMediaDetail(id);
    arrangMediaDetail(list);
  };

  const arrangMediaDetail = (list) => {
    if (list) {
      const prp = JSON.parse(list.appData);
      console.log(prp, list);
      setAppName(prp.url);
      setAppTitle(prp.appTitle);
      setSlides(prp.slides);
    }
  };

  useEffect(() => {
    console.log("slide", slides);
    if (id) {
      //callMediaDetailApi(id)
    }
    setIsRefresh(false);
  }, [editItem, slides, isRefresh]);

  useEffect(() => {
    if (id) {
      callMediaDetailApi(id);
    }
  }, [id]);

  const handleEdit = (e, item, index) => {
    e.preventDefault();
    item.id = index;
    setEditItem(item);
    setShowAddContent(true);
  };

  const handleCreateApp = async (e) => {
    e.preventDefault();
    console.log("slide", slides);
    if (appName == "" || appName == null) {
      return toast.error("App Name is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (appTitle == "" || appTitle == null) {
      return toast.error("App Title is Required", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else if (slides.length == 0) {
      return toast.error("Please add some content...", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      const dataString = {
        url: appName,
        appTitle,
        slides,
        tempType,
        settingData,
      };
      console.log(dataString);

      if (id) {
        await updateApps({
          name: appName,
          appId: id,
          data: JSON.stringify(dataString),
        }).then((res) => {
          console.log("response", res);
          if (res && res.data.message === "Success")
          {
            toast.success("App has been updated successfully !!!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            history.push(`/create-template/` + id + `?type=` + tempType);
            return;
          }
        });
      } else {
        await addApps({
          name: appName,
          type: "people-apps",
          data: JSON.stringify(dataString),
        }).then((res) => {
          console.log("response", res);
          if (res && res.data.message === "Success")
          {
            toast.success("App has been created successfully !!!", {
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            history.push(
              `/create-template/` + res.data.data._id + `?type=` + tempType
            );
          }
        });
      }
    }
  };

  const addSlide = (e, i) => {
    e.preventDefault();
    setEditItem(null);
    setSlideIndex(i);
    setShowAddContent(true);
  };

  const handleImage = (e, item, index) => {
    e.preventDefault();
    item.id = index;
    setEditImage(item);
    setImageModalShow(true);
  };

  const handleDelete = (e, i) => {
    e.preventDefault();
    console.log("index", i);
    const newArra = slides.filter((item, index) => {
      return index !== i;
    });
    setSlides(newArra);
    setIsRefresh(true);
  };

  //save reference for dragItem and dragOverItem
  const dragItem = React.useRef(null);
  const dragOverItem = React.useRef(null);

  //const handle drag sorting
  const handleSort = () => {
    //duplicate items
    let _fruitItems = [...slides];

    //remove and save the dragged item content
    const draggedItemContent = _fruitItems.splice(dragItem.current, 1)[0];

    //switch the position
    _fruitItems.splice(dragOverItem.current, 0, draggedItemContent);

    //reset the position ref
    dragItem.current = null;
    dragOverItem.current = null;

    //update the actual array
    setSlides(_fruitItems);
  };
  return (
    <>
      <TemplateAddContent
        setShowUrlApp={() => setShowAddContent(false)}
        show={showAddContent}
        setSlides={setSlides}
        slides={slides}
        action="add"
        editItem={editItem}
        setEditItem={setEditItem}
        slideIndex={slideIndex}
      />
      <SelectMedia
        imageModalShow={imageModalShow}
        setImageModalShow={setImageModalShow}
        selectedImage={selectedImage}
        setSelectedImage={setSelectedImage}
        setSlides={setSlides}
        slides={slides}
        action="edit"
        editImage={editImage}
        setEditImage={setEditImage}
      />
      <EditTemplate
        setShowUrlApp={() => setShowEditTemplate(false)}
        show={showEditTemplate}
        settingData={settingData}
        setSettingData={setSettingData}
      />
      {showPreview && (
        <PeopleSpacePreview
          showPreview={showPreview}
          setShowPreview={setShowPreview}
          data={JSON.stringify({
            slides,
            appTitle,
            appName,
            tempType,
            settingData,
          })}
        />
      )}

      <div className="custom-content-heading d-flex flex-wrap flex-row align-items-center justify-content-between mb-5">
        <h1 className="mb-0">Template</h1>
        <div className="d-flex align-items-center">
          {/* <Button
            className="mr-2"
            variant="info add-screen-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowEditTemplate(true);
            }}
            type="button"
          >
            Setting
          </Button> */}
          <div className="people-setting mr-3">
            <img
              src={settingicon}
              // className="mr-2"
              onClick={(e) => {
                e.preventDefault();
                setShowEditTemplate(true);
              }}
              style={{ height: "23px", cursor: "pointer" }}
              alt="icon"
            />
          </div>

          <Button
            className="mr-2"
            variant="info add-screen-btn"
            onClick={(e) => {
              e.preventDefault();
              setShowPreview(true);
            }}
            type="button"
          >
            Preview
          </Button>
          <Button
            className=""
            variant="info add-screen-btn"
            type="button"
            onClick={(e) => handleCreateApp(e)}
          >
            {id ? "Update" : "Save"}
          </Button>
        </div>
      </div>
      <div className="d-flex align-items-center gap-2 template-app-name">
        <div className="d-flex align-items-center">
          <label className="mb-0 mr-3">App Name</label>
          <div>
            <input
              name="appName"
              id="appName"
              onChange={(e) => setAppName(e.target.value)}
              value={appName}
              type="text"
              className="form-control"
              placeholder="App Name"
            />
          </div>
        </div>
        <div className="d-flex align-items-center">
          <label className="mb-0 mr-3">Title</label>
          <input
            name="appTitle"
            id="appTitle"
            onChange={(e) => setAppTitle(e.target.value)}
            value={appTitle}
            type="text"
            className="form-control"
            placeholder="Title"
          />
        </div>
      </div>
      {slides &&
        slides.length > 0 &&
        slides.map((item, i) => {
          return (
            <div
              className="d-flex align-items-center mt-5 template-card"
              key={i}
              draggable
              onDragStart={(e) => (dragItem.current = i)}
              onDragEnter={(e) => (dragOverItem.current = i)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <img
                src={item.image ? BASE_URL + item.image : userimg}
                alt="user-image"
                className="mr-3 template-person-image"
                onClick={(e) => handleImage(e, item, i)}
                style={{ width: "100px" }}
              />
              <div className="w-100">
                <h3>{item.name}</h3>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="mb-0 pr-5">{item.message}</p>
                  <div className="d-flex align-items-center add-template">
                    <div
                      className="mr-2"
                      //onClick={() => setShowEditTemplate(true)}
                      onClick={(e) => handleEdit(e, item, i)}
                    >
                      <img src={edit} alt="edit" height="15px" />
                    </div>
                    <div className="mr-2">
                      <img
                        src={deleteicon}
                        alt="img"
                        height="15px"
                        onClick={(e) => handleDelete(e, i)}
                      />
                    </div>

                    <div
                      className="add-btn-template"
                      style={{ fontSize: "20px" }}
                      onClick={(e) => addSlide(e, i)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      <div className="d-flex justify-content-center align-items-center h-100 template-add-content text-center">
        <div>
          <p className="mb-1">Click on the below button to get started</p>
          <Button
            className="btn-block"
            variant="info add-screen-btn"
            type="button"
            onClick={(e) => addSlide(e, slides.length)}
          >
            + Add Content
          </Button>
        </div>
      </div>
    </>
  );
}
