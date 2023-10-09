// import React from 'react'
// import { useParams, useHistory } from "react-router-dom";

// export default function DaySchedule() {
//     const history = useHistory();
//     const { id } = useParams();
//     console.log(id, "DaySchedule page id")
//     return (
//         <div>DaySchedule</div>
//     )
// }




import React, { useState } from "react";
import { Table, Dropdown } from "react-bootstrap";
import AddNewTagModal from "../../modals/AddNewTagModal";
import downArrow from "../../../img/down-arrow.png";
import menuIcon from "../../../img/menu-icon.png";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import emptyMediaImg from "../../../img/addmedia-empty-img.png";
import nameAvatar from "../../../img/assets-avatar-img.png";
import deleteIcon from "../../../img/delete-icon.png";
import { useParams, useHistory } from "react-router-dom";
import { getAllMedia } from "../../../utils/api";
import useSWR from 'swr'

import {
    getDatetimeIn12Hours,
    humanReadableFormattedDateString,
} from "../../../utils/UtilsService";
import DeleteConfirmation from "../../modals/DeleteConfirmation";
import { deleteMedia, BASE_URL } from "../../../utils/api";
import PublishMediaModal from "../../modals/PublishMediaModal";

const DaySchedule = () => {
    const history = useHistory();
    const { id } = useParams();
    const { data: allMedia, mutate } = useSWR('/vendor/display/media', getAllMedia);
    console.log(allMedia, "day schedule")

    const [showNewTagModal, setNewTagModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState("");
    const [showPublishPopUp, setShowPublishPopUp] = useState(false);

    // use effect


    const handleDelete = async () => {
        setDeleteModal(false)
        await deleteMedia(selectedMedia._id)
        mutate()
    };

    const handlePublishcOpen = (media) => {
        setShowPublishPopUp(media);
    }
    // const parseMeta = (media) => {
    //     const meta = JSON.parse(media.properties)
    //     return (
    //         <span className="td-content">
    //             {media?.type === "image" && <strong>{meta.height} x  {meta.width}</strong>}
    //             {media?.type === "video" && <strong>{meta.length.toFixed(0) / 60} Sec</strong>}
    //             <span>{meta.size} MB</span>
    //         </span>
    //     )
    // }

    const parseMeta = (media) => {
        const meta = JSON.parse(media.properties);
        return (
            <span className="td-content">
                {media?.type === "image" && <strong>{meta?.height} x {meta?.width}</strong>}
                {media?.type === "video" && meta?.length && (
                    <strong>{(meta.length / 60).toFixed(0)} Sec</strong>
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
            <div className=" d-flex">


                <div className="col-7">


                    {allMedia && allMedia.length !== 0 ? (
                        <Table responsive className="custom-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Uploaded Date</th>
                                    <th>Properties</th>
                                    <th>Tags</th>

                                </tr>
                            </thead>
                            <tbody>
                                {allMedia.map((media) => {
                                    return (
                                        <tr key={media._id}>
                                            <td>
                                                <span className="td-content d-flex name-td-content">
                                                    <span className={`name-img mr-2  ${media.type === "video" && "videotableName"}`}>
                                                        {media.type === "image" && <img
                                                            className="media-img img-fluid"
                                                            src={`${BASE_URL}${media.title}`}
                                                            alt="media-img"
                                                        />}
                                                        {media.type === "video" && videoMetaDuration(media)}
                                                    </span>
                                                    <span className="name-content d-flex flex-column flex-grow-1">
                                                        <strong>{media.title.split("/")[media.title.split("/").length - 1]}</strong>
                                                        <span>{media.createdBy.name}</span>
                                                    </span>
                                                </span>
                                            </td>
                                            <td>{media.type.slice(0, 1).toUpperCase() + media.type.slice(1)}</td>
                                            <td>
                                                <span className="td-content">
                                                    <strong>
                                                        {humanReadableFormattedDateString(media.createdAt)}
                                                    </strong>
                                                    <span>{getDatetimeIn12Hours(media.createdAt)}</span>
                                                </span>
                                            </td>
                                            <td>
                                                {parseMeta(media)}
                                            </td>
                                            <td>
                                                {media.tags.map((tag) => {
                                                    return <span className="my-phone-tag text-truncate ml-1">{tag}</span>;
                                                })}
                                                <span
                                                    className="down-arrow"
                                                    onClick={() => {
                                                        setSelectedMedia(media)
                                                        setNewTagModal(true);
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
                                    );
                                })}
                            </tbody>
                        </Table>
                    ) : (
                        <div className="empty-media text-center">
                            <div className="empty-media-img mx-auto">
                                <img
                                    className="media-img img-fluid"
                                    src={emptyMediaImg}
                                    alt="media-img"
                                />
                            </div>
                            <h3>Add Media</h3>
                            <p>
                                Upload your favourite images and videos from the local storage
                                <br /> of your device
                            </p>
                        </div>
                    )}

                    {showNewTagModal && (
                        <AddNewTagModal
                            selected={selectedMedia}
                            setNewTagModal={setNewTagModal}

                        />
                    )}
                    {showPublishPopUp && (
                        <PublishMediaModal
                            selected={showPublishPopUp}
                            setShowPublishPopUp={setShowPublishPopUp}
                            type="media"
                        />
                    )}
                    {deleteModal && <DeleteConfirmation setDeleteModal={setDeleteModal} callbackFunction={handleDelete} text="Are you sure you want to delete?" yes={"Yes Deactivate"} />}
                </div>
                <div className="col-6">
                    <h4>jjjj</h4>
                </div>
            </div>
        </>
    );
};
export default DaySchedule;

