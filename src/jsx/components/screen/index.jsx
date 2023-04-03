import React, { useState } from "react";
import { Button } from "react-bootstrap";

import ListScreen from "./listScreens";
import AddScreenModal from "../../modals/AddScreenModal";
const Screen = () => {
  const [showScreenModal,setShowScreenModal] = useState(false);
  return (
    <>
      <div className="form-head d-flex mb-3 align-items-start">

        <Button className="mr-2" variant="info btn-rounded" onClick={()=>{
          setShowScreenModal(true)
        }}>
          <span className="btn-icon-left text-info">
            <i className="fa fa-plus color-info" />
          </span>
          Add Screen
        </Button>
        <AddScreenModal showScreenModal={showScreenModal} setShowScreenModal={setShowScreenModal} />
      </div>
      <ListScreen />
    </>
  );
};

export default Screen;
