import React, {useEffect, useState} from 'react';
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";


const TemplateAddContent = ({ setShowUrlApp, show, setSlides, slides,editItem, setEditItem, slideIndex }) => {
  const [name, setName] = useState(null);
  const [message, setMessage] = useState(null);
  const [err, setErr] = useState(false);
  const [errMessage, setErrorMessage] = useState("");
  const [slideId, setSlideId] = useState(null);

  useEffect(() => {
    console.log("eeee", editItem)
    if(editItem && editItem !== null){
      console.log("editIte", editItem)
      setSlideId(editItem.id);
      setName(editItem.name);
      setMessage(editItem.message);
    }
  },[editItem, slideId])

  const addSlides = (e) => {
    e.preventDefault();
    console.log("title",name, message)
    setErr(false);
    setErrorMessage("");
    if (name == "" || name == null) {
      setErr(true);
      setErrorMessage("Name is required");
      return;
    }
    if (message == "" || message == null) {
      setErr(true);
      setErrorMessage("Message is required");
      return;
    }
    var newArr = slides;
    if(editItem){
      console.log(slideId)
      newArr[slideId].name    = name;
      newArr[slideId].message = message
    }else{
      newArr = [
          ...slides.slice(0, slideIndex+1),
          {name,message},
          ...slides.slice(slideIndex+1)
      ];
    }
    setSlides(newArr);
    setEditItem(null)
    setShowUrlApp(false);
    setMessage("");
    setName("");
  }
  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="md"
        centered
      >
        <Modal.Header className="border-0">
          <Modal.Title className="mr-auto app-modal-heading">
            Add Content
          </Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => setShowUrlApp(false)}
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
        <Modal.Body className="pt-0">
          <p>Enter content you need to add in your template</p>
          {
            err && errMessage ? <h6 className="alert alert-danger">{errMessage}</h6> : ''
          }
          <form
          // onSubmit={handleSubmit}
          >
            <div>
              <strong>
                <label>Name</label>
              </strong>

              <input
                type="text"
                name="name"
                value={name}
                id="name"
                onChange={(e) => setName(e.target.value)}
                className="  form-control "
                placeholder="Give a name"
                required
              />
              <strong>
                <label className="mt-3">Message</label>
              </strong>

              <textarea
                type="text"
                name="message"
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="form-control"
                rows={5}
                placeholder="Eg. Hope this year be full of colors"
              ></textarea>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2">
          <Button
            variant=""
            type="button"
            className="btn btn-primary btn-block primary-btn"
            onClick={(e) => {addSlides(e)}}
          >
            Add Content
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TemplateAddContent;
