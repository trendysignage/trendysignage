import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import TemplateAddContent from "../../modals/TemplateAddContent";
import { toast } from "react-toastify";
import userimg from "../../../img/Ellipse 151.svg";
import edit from "../../../img/edit-btn.png";
import deleteicon from "../../../img/delete-btn.png";
import EditTemplate from "../../modals/EditTemplate";
import { updateApps, addApps, BASE_URL } from "../../../utils/api";
import SelectMedia from "../../modals/SelecteMedia";



export default function Createtemplate({history, actionType, mediaId}) {
  let params = new URLSearchParams(history.location.search);
  let tempType = params.get("type");
  console.log("temp", tempType)
  const [showAddContent, setShowAddContent] = useState(false);
  const [showEditTemplate, setShowEditTemplate] = useState(false);
  const [slides, setSlides] = useState(
    tempType && tempType == 'temp1' || tempType == 'temp4' ? 
      [
        {
          name:"Jennifer Winget1",
          message:"We are proud to have someone like you We are proud to have someone like you."
        },
        {
          name:"Jennifer Winget2",
          message:"We are proud to have someone like you We are proud to have someone like you."
        },
        {
          name:"Jennifer Winget3",
          message:"We are proud to have someone like you We are proud to have someone like you."
        }
      ]
    : tempType && tempType == 'temp2' || tempType == 'temp3' || tempType == 'temp5' || tempType == 'temp6' ? 
    [
      {
        name:"Jennifer Winget3",
        message:"We are proud to have someone like you We are proud to have someone like you."
      }
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


  useEffect(() => {
    console.log("slide", slides)

    setIsRefresh(false)
  },[editItem, slides, isRefresh]);

  const handleEdit = (e, item, index) => {
    e.preventDefault();
    item.id = index
    setEditItem(item);
    setShowAddContent(true)
  }

  const handleCreateApp = async (e) => {
    e.preventDefault();
    console.log("slide", slides);
    if(appName == '' || appName == null){
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
    }
    else if(appTitle == '' || appTitle == null){
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
    }
    else if(slides.length == 0){
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
    }
    else{
      console.log("app", appName, appTitle, slides)
      const dataString = {
        url: appName,
        appTitle,
        slides,
        tempType
      };

      if (actionType && actionType == "edit") {
        // await updateApps({
        //   name,
        //   appId: mediaId,
        //   data: JSON.stringify(dataString),
        // });
        // setShowUrlApp(false);
        } else {
          await addApps({
            name:appName,
            type: "people-apps",
            data: JSON.stringify(dataString),
          }).then((res) => {
            console.log("response",res)
            if(res && res.data.message === 'Success');{
              history.push(`/create-template/`+res.data.data.media[res.data.data.media.length - 1]._id)
            }
          });
          //setShowUrlApp(false);
          //setShowUrlRedirectApp(true);
          return toast.success("You can proceed to create app", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      
    }
  }

  const addSlide = (e, i) => {
    e.preventDefault();
    setSlideIndex(i);
    setShowAddContent(true);
  }

  const handleImage = (e, item, index) => {
    e.preventDefault();
    item.id = index
    setEditImage(item);
    setImageModalShow(true);
  }

  const handleDelete = (e, i) => {
    e.preventDefault();
    console.log("index",i)
    const newArra = slides.filter((item, index) => {
      return index !== i
    })
    setSlides(newArra);
    setIsRefresh(true)
  }
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
      />
      <div className="custom-content-heading d-flex flex-wrap flex-row align-items-center justify-content-between mb-5">
        <h1 className="mb-0">Template</h1>
        <div className="d-flex align-items-center">
          <Button className="mr-2" variant="info add-screen-btn" type="button">
            Preview
          </Button>
          <Button className="" variant="info add-screen-btn"
           type="button"
           onClick={(e) => handleCreateApp(e)}
           >
            Save
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
            type="text" className="form-control" placeholder="Title" />
        </div>
      </div>
      {
        slides && slides.length > 0 && slides.map((item, i) => {
          return (
            <div className="d-flex align-items-center mt-5 template-card" 
              key={i}
              draggable
              onDragStart={(e) => (dragItem.current = i)}
              onDragEnter={(e) => (dragOverItem.current = i)}
              onDragEnd={handleSort}
              onDragOver={(e) => e.preventDefault()}
            >
              <img
                src={item.image ? BASE_URL+item.image : userimg}
                alt="user-image"
                className="mr-3 template-person-image"
                onClick={(e) => handleImage(e, item, i)}
                style={{width:"100px"}}
              />
              <div>
                <h3>{item.name}</h3>
                <div className="d-flex align-items-center">
                  <p className="mb-0 pr-5">{item.message}</p>
                  <div className="d-flex align-items-center add-template">
                    <div className="mr-2" 
                      //onClick={() => setShowEditTemplate(true)}
                      onClick={(e) => handleEdit(e, item, i)}
                    >
                      <img src={edit} alt="edit" height="15px" />
                    </div>
                    <div className="mr-2">
                      <img src={deleteicon} alt="img" 
                        height="15px" 
                        onClick={(e) => handleDelete(e, i)}
                      />
                    </div>

                    <div
                      className="add-btn-template"
                      style={{ fontSize: "20px" }}
                      onClick={(e) => addSlide(e,i)}
                    >
                      +
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
      }
      <div className="d-flex justify-content-center align-items-center h-100 template-add-content text-center">
        <div>
          <p className="mb-1">Click on the below button to get started</p>
          <Button
            className="btn-block"
            variant="info add-screen-btn"
            type="button"
            onClick={(e) => addSlide(e,slides.length)}
          >
            + Add Content
          </Button>
        </div>
      </div>
    </>
  );
}
