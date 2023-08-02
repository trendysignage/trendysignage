import React, {useState} from "react";
import { Table } from "react-bootstrap";
import { BASE_URL } from "../../../../utils/api";
import UrlAppModal from "../../../modals/UrlAppModal";
import YoutubeAppModal from "../../../modals/YoutubeAppModal";

const CompositionTable = ({allMedia,addComposition}) => {

  const [showUrlApp, setShowUrlApp] = useState(false);
  const [showYoutubeApp, setShowYoutubeApp] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState(null);
  
   const videoMetaDuration = (media) => {
    const properties = JSON.parse(media?.properties);
    if (properties && properties.length) {
        return (properties.length.toFixed(0) / 60).toFixed(0);
    }
    return null;
  };

  const handleEdit = (e, data) => {
    e.preventDefault();
    setSelectedMedia(data);
    if(data.type == 'url-apps'){
      setShowUrlApp(true)
    }else if(data.type == 'youtube-apps'){
      setShowYoutubeApp(true)
    }
    console.log("type",data);
  }

  return (
    <>
      <UrlAppModal
        setShowUrlApp={() => setShowUrlApp(false)}
        show={showUrlApp}
        actionType={"edit"}
      />
      <YoutubeAppModal
        setShowUrlApp={() => setShowYoutubeApp(false)}
        show={showYoutubeApp}
        mediaData={selectedMedia}
        actionType={"edit"}
      />
      <Table responsive className="custom-table screen-table layout-table h-100">
        <thead>
          <tr>
            <th>Media</th>
            <th>Type</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>

          { allMedia && allMedia.map((media) => {
              return (
                <tr key={media._id} onClick={()=>{
                  addComposition(media);
                }}>
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
                        <strong>{media.title.split("/")[media.title.split("/").length -1]}</strong>
                        <span>{media.createdBy.name}</span>
                      </span>
                    </span>
                  </td>
                

                  <td>{media.type.slice(0, 1).toUpperCase() + media.type.slice(1)}
                  {media.type=='youtube-apps' || media.type == 'url-apps' ? <button onClick={(e) => {handleEdit(e,media)}}>Edit</button> : ""}
                  </td>
                  <td>
                    {media.tags.map((tag) => {
                      return <span className="my-phone-tag text-truncate ml-1">{tag}</span>;
                    })}

                  </td>

                </tr>
              );
            })} 
        </tbody>
      </Table>
    </>
  );
};

export default CompositionTable;
