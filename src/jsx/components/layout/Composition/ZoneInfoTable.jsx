import React, { useState } from "react";
import { Table } from "react-bootstrap";

import editBtnImg from "../../../../img/edit-btn.png";
import deleteBtnImg from "../../../../img/delete-btn.png";
import { BASE_URL } from "../../../../utils/api";
import EditSelectedComposition from "../../../modals/editSelectedComposition";


const ZoneInfoTable = ({ content,setContent,setReferenceUrl }) => {

  const [editSelected, setEditSelected] = useState(null);
  const handleChange = (event,index) => {
    const newValue = event.target.value.replace(/[^\d]/g, '');
    setContent((prev) => {      
        const updateMedia = prev.map((val,key)=>{
            if(key === index){
              val.duration = newValue;
            }
            return val;
        });
        return [...updateMedia];
      });
  };

  const Duration = (composition,index)=>{
    return(  <div className="tag-container mediaDUrationTag"> <input onChange={(event)=>{ handleChange(event,index)}}  value={Number(composition.duration).toFixed(0)} disabled={composition.type === 'video'}/><span>sec</span></div>)
  }
  const TotalDuration = ()=>{
    let total  =  0;
    content.forEach(composition => {
      total += Number(composition.duration);
    });
    return total.toFixed(0);
  }
  const removeComposition =(index)=>{
    setContent((prev) => {      
      const updateMedia = prev.filter((val,key)=> key !== index);
      return [...updateMedia];
    });

    setReferenceUrl((prev) => {      
      const updateUrl = prev.filter((val,key)=> key !== index);
      return [...updateUrl];
    })
  }

  const editComposition = (index)=>{
    setEditSelected(index);

  }

  const updateViewType = (data,viewImage, ImgUrl) => {
 
   setContent((prev) => {      
        const updateMedia = prev.map((val,key)=>{
            if(key === editSelected){
              val.fitToScreen = viewImage==="fitScreen";
              val.maintainAspectRatio = viewImage==="aspectRation";
              val.crop = viewImage==="crop" ? true : false;
            }
            return val;
        });
        return [...updateMedia];
      });

      setReferenceUrl((prev) => {      
        const updateMedia = prev.map((val,key)=>{
          if(key === editSelected){
            return ImgUrl;
          } else {
            return val;
          }
        });
        return [...updateMedia];
      })


  };


  return (
    <>
      <Table
        responsive
        className="custom-table screen-table layout-table h-100"
      >
        <thead>
          <tr>
            <th colSpan={4}>
              <span className="d-flex flex-wrap">
                <span className="yellow-box"></span>
                <span className="zone-section d-flex flex-column">
                  <span className="zone">Zone 1</span>
                  <span className="duration">Duration : {TotalDuration()} sec</span>
                </span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {content.map((composition, index) => {
            return (
              <tr key={composition.id}>
                <td>{index + 1}.</td>
                <td>
                    <span className="td-content d-flex name-td-content">
                      <span className={`name-img mr-2  ${composition.type === "video" && "videotableName"}`}>
                      {composition.type === "image" && <img
                          className="media-img img-fluid"
                          src={`${BASE_URL}${composition.url}`}
                          alt="media-img"
                        />}
                         {composition.type === "video" && composition.duration.toFixed(0)/60}
                      </span>
                      <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>{composition.url.split("/")[composition.url.split("/").length -1]}</strong>
                        <span>{composition.createdBy}</span>
                      </span>
                    </span>
                  </td>
                <td style={{ width: "180px" }}>
                { Duration(composition,index)}
                </td>
                <td>
                  <span className="layout-edit-btn mr-2 ">
                    <img className="edit-icon cursorPointer" src={editBtnImg} alt="search" onClick={()=>{
                      // if(composition.type === "image"){
                        editComposition(index)
                      // }
                    }}/>
                  </span>
                  <span className="layout-edit-btn" onClick={()=>{removeComposition(index)}}>
                    <img
                      className="edit-icon cursorPointer"
                      src={deleteBtnImg}
                      alt="search"
                    />
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    
      {editSelected !== null && <EditSelectedComposition composition={content[editSelected]}  setEditSelected={setEditSelected} updateViewType={updateViewType} />}
    </>
  );
};

export default ZoneInfoTable;
