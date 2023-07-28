import { Button, Modal, Row, Col, Badge, Table } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import { useEffect, useState } from "react";
import {getAllMedia, BASE_URL } from "../../utils/api";
import TableLoader from "../components/TableLoader";
import downArrow from "../../img/down-arrow.png";
import '../components/Table.css';
import {
  getDatetimeIn12Hours,
  humanReadableFormattedDateString,
} from "../../utils/UtilsService";
// import tagCloseIcon from "../../img/tag-close-icon.png";

const PublishMediaModal = ({openMedia, setOpenMedia, selectedImage, setSelectedImage, setSelectedMedia, setHeight, setWidth}) => {
  const [allMedia, setAllMedia] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sMedia, setSMedia] = useState(null);
  // use effect
  useEffect(() => {
    getAllMediaList();
  }, []);

  const getAllMediaList = async () => {
    setLoading(true);
    const list = await getAllMedia();
    console.log("list",list)
    setLoading(false);
    setAllMedia(list);
  };

  const handleCheckboxChange = (event, media) => {
    setSelectedImage(event.target.name);
    setSMedia(media);

  };


  const handleSubmit = async () => {
    console.log(sMedia)
    setSelectedMedia(sMedia)
    const prp = JSON.parse(sMedia.properties)
    setOpenMedia(false);
    setHeight(prp.height);
    setWidth(prp.width);
  };

    const parseMeta = (media) => {
        const meta = JSON.parse(media.properties);
        return (
        <span className="td-content">
            {media?.type === "image" && (
            <strong>
                {meta.height} x {meta.width}
            </strong>
            )}
            {media?.type === "video" && meta?.length && (
            <strong>{parseInt((meta.length / 60) * 100) / 100} Min.</strong>
            )}
            {meta?.size && <span>{meta.size} MB</span>}
        </span>
        );
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
        className={`fade bd-example-modal-lg mt-4 custom-modal custom-modal-large`}
        show={openMedia}
        size="lg"
      >
        <Modal.Header>
          <Modal.Title>Add Media</Modal.Title>
          <Button
            variant=""
            className="close"
            onClick={() => setOpenMedia(false)}
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
                  <th>Uploaded Date</th>
                  <th>Properties</th>
                  <th>Tags</th>
                </tr>
              </thead>
              {loading  ? (
            <TableLoader colSpan={5}/>
          ) : (
              <tbody>
                {allMedia  && allMedia.length > 0 && 
                  allMedia.map((media) => {
                    return (media.type === 'image' ?
                    <tr>
                        <td>
                          <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                            <input
                              type="checkbox"
                              className="custom-control-input"
                              id={media._id}
                              name={media._id}
                              checked={selectedImage === media._id}
                              onChange={(e) => {handleCheckboxChange(e, media)}}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor={media._id}
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
                        <td>
                            <span className="td-content">
                            <strong>
                                {humanReadableFormattedDateString(media.createdAt)}
                            </strong>
                            <span>{getDatetimeIn12Hours(media.createdAt)}</span>
                            </span>
                        </td>
                        <td>{parseMeta(media)}</td>
                        <td>
                            {media.tags.map((tag) => {
                            return (
                                <span className="my-phone-tag text-truncate ml-1">
                                {tag}
                                </span>
                            );
                            })}
                            <span
                            className="down-arrow"
                            onClick={() => {
                                //setSelectedMedia(media);
                                //setNewTagModal(true);
                            }}
                            >
                            <img
                                className="down-arrow-img img-fluid"
                                src={downArrow}
                                alt="arrow"
                            />
                            </span>
                        </td>
                      </tr>
                    : ''
                      
                    )
                  })}
              </tbody>
              )}
            </Table>
          </Modal.Body>

        <Modal.Footer>
            <Row className="w-100 m-0">
              <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
                <Button className="cancel-btn w-100"
                    onClick={(e) => setOpenMedia(false)}
                 variant="outline-light">
                  Cancel
                </Button>
              </Col>
              <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
                <Button
                  disabled={selectedImage === null}
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

export default PublishMediaModal;
