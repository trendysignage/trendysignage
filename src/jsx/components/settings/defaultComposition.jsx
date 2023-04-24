import React from "react";
import {  Col, } from "react-bootstrap";
import emptyMediaImg from "../../../images/card/1.png";
import {BASE_URL}  from "../../../utils/api"

const DefaultComposition = () => {
  const defaultMediaUrl = `${BASE_URL}/default/file_1681896290177.png`;
  return (
    <>
      <div className="row settings-default">
        <Col xl="6">
          <div className="default-composition-preview">
            <div className="thumbnail">
              <img className="imgContent" src={defaultMediaUrl} alt="Card cap" />
            </div>
          </div>
        </Col>
        <Col xl="6">
          <div className="mb-4">
            <h4 className="card-title card-intro-title">
              Organisation default composition
            </h4>
            <p>
              The composition will be applied to all newly added displays in the
              organization
            </p>
            <p className="font-weight-bold">
            Default Composition:
            Screenshot 2 - Composition 
            <span className='btn-icon-right text-info'>
                    <i className='fa fa-pencil' />
                  </span>
            </p>
            <p className="font-weight-bold">
            Duration:
            10 seconds
            </p>
            
          </div>
        </Col>
      </div>
    </>
  );
};

export default DefaultComposition;
