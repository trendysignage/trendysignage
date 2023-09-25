import { Button, Modal, Row, Col, Badge, Table } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import { useEffect, useState } from "react";
import { getAllMediaFilter, BASE_URL } from "../../utils/api";
import TableLoader from "../components/TableLoader";
import '../components/Table.css';
import { toast } from "react-toastify";

const SelectMedia = ({ setImageModalShow, imageModalShow,setSelectedImage, selectedImage, setSlides, slides,editImage, setEditImage}) => {
  const [allMedias, setAllMedias] = useState("");
  const [checkedItems, setCheckedItems] = useState(selectedImage);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  // use effect
  useEffect(() => {
    if(selectedImage){
        setCheckedItems(selectedImage)
    }
    callAllMediaApi();
  }, [selectedImage]);


  const callAllMediaApi = async () => {
    setLoading(true);
    const list = await getAllMediaFilter();
    setLoading(false);
    setAllMedias(list);
  };

  const handleSubmit = async () => {

    const newArr = slides;
    if(editImage){
      console.log("dsdsd");
      console.log(editImage)
      newArr[editImage.id].image    = checkedItems;
      setSlides(newArr);
      console.log("Hiiii")
      setEditImage(null);
    }else{
      setSelectedImage(checkedItems)
    }
    setImageModalShow(false);
    setCheckedItems(null)
  };

  const videoMetaDuration = (media) => {
      const properties = JSON.parse(media?.properties);
      if (properties && properties.length) {
          return (properties.length.toFixed(0) / 60).toFixed(0);
      }
      return null;
  };
  return (
<>
    
    <Modal
        className={`fade bd-example-modal-lg mt-4 custom-modal ${
            published ? "custom-modal-medium" : "custom-modal-large"
        }`}
        show={imageModalShow}
        size="md"
    >
      <Modal.Header>
        <Modal.Title>{"Assign Screen"}</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setImageModalShow(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>

      <Modal.Body>
          <Table responsive>
            <thead>
              <tr>
                <th className="width50">
                  <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="checkbox1_exam_all"
                      //onChange={handleSelectAllChange}
                      disabled
                      required=""
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="checkbox1_exam_all"
                    ></label>
                  </div>
                </th>
                <th>Name</th>
                <th>Type</th>
              </tr>
            </thead>
            {loading  ? (
          <TableLoader colSpan={5}/>
        ) : (
            <tbody>
              {allMedias !== "" &&
                allMedias.map((media) => {
                  return (
                    media.type == 'image' &&
                    <tr>
                      <td>
                        <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                          <input
                            type="checkbox"
                            className="custom-control-input"
                            id={media.title}
                            name={media.title}
                            checked={media.title === checkedItems}
                            onChange={(e) => {setCheckedItems(e.target.name);}}
                          />
                          <label
                            className="custom-control-label"
                            htmlFor={media.title}
                          ></label>
                        </div>
                      </td>

                      <td>
                        <span className="td-content d-flex name-td-content">
                        <span
                            className={`name-img mr-2  ${
                            media?.type === "video" && "videotableName"
                            }`}
                        >
                            {media?.type === "image" && (
                            <div
                                onClick={() => {
                                //showPreview(media.title, media.type);
                                }}
                                className="media-list-img-zoom"
                            >
                                <span className="media-list-img-zoom-plus">+</span>
                                <img
                                className="media-img img-fluid"
                                src={`${BASE_URL}${media?.title}`}
                                alt="media-img"
                                />
                            </div>
                            )}
                            {media?.type === "video" && (
                            <button
                                onClick={() => {
                                //showPreview(media.title, media.type);
                                }}
                            >
                                {videoMetaDuration(media)}
                            </button>
                            )}
                        </span>
                        <span className="name-content d-flex flex-column flex-grow-1">
                            <strong>
                            {
                                media.title.split("/")[
                                media.title.split("/").length - 1
                                ]
                            }
                            </strong>
                            <span>{media.createdBy.name}</span>
                        </span>
                        </span>
                    </td>
                    <td>
                        {media.type.slice(0, 1).toUpperCase() + media.type.slice(1)}
                    </td>
                    </tr>
                  );
                })}
            </tbody>
            )}
          </Table>
        </Modal.Body>

      <Modal.Footer>
        <Row className="w-100 m-0">
            <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
              <Button className="cancel-btn w-100" variant="outline-light" onClick={(e) => {setImageModalShow(false)}}>
                Cancel
              </Button>
            </Col>
            <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
              <Button
                disabled={checkedItems === ""}
                variant=""
                type="button"
                className="btn btn-primary btn-block primary-btn"
                onClick={handleSubmit}
              >
                Publish
              </Button>
            </Col>
          </Row>
      </Modal.Footer>
    </Modal>
      

    </>
  );
};

export default SelectMedia;
