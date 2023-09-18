import React from "react";
import layout from "../../../img/Frame758532303.svg";
import layout1 from "../../../img/Group 626063.svg";
import layout2 from "../../../img/Frame 758532294.svg";
import layout3 from "../../../img/Group 626068 1.svg";
import layout4 from "../../../img/Group 626054.svg";
import layout5 from "../../../img/Frame 758532309.svg";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

export default function PeopleSpace() {
  const history = useHistory();
  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap flex-row align-items-center justify-content-between mb-5">
        <h1 className="mb-0">Select a Template</h1>

        <Button
          className=""
          variant="info add-screen-btn"
          type="button"
          onClick={() => history.push("/create-template?type=default")}
        >
          Create your own +
        </Button>
      </div>

      <div className="row people-space text-center">
        <div className="col-12 col-md-4">
          {/* <h2>Work Anniversery</h2>
            <div className="d-flex">
              <div className="text-center">
                <img src={person} alt="person" />
                <h3>Jennifer Winget</h3>
                <p>
                  We are proud to have someone like you We are proud to have
                  someone like you.
                </p>
              </div>
              <div className="text-center">
                <img src={person} alt="person" />
                <h3>Jennifer Winget</h3>
                <p>
                  We are proud to have someone like you We are proud to have
                  someone like you.
                </p>
              </div>
              <div className="text-center">
                <img src={person} alt="person" />
                <h3>Jennifer Winget</h3>
                <p>
                  We are proud to have someone like you We are proud to have
                  someone like you.
                </p>
              </div>
            </div> */}
          <img src={layout} className="w-100" alt="img" 
            onClick={() => history.push("/create-template?type=temp1")}
          />
          <p className="text-left mt-2 mb-0 title">Work Anniversary Multi</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout1} className="w-100" alt="img"
            onClick={() => history.push("/create-template?type=temp2")}
          />
          <p className="text-left mt-2 mb-0 title">Work Anniversary Single</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout2} className="w-100"
            onClick={() => history.push("/create-template?type=temp3")} 
            alt="img" 
          />
          <p className="text-left mt-2 mb-0 title">Wall of Fame Single</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout3} className="w-100"
            onClick={() => history.push("/create-template?type=temp4")}
            alt="img" 
          />
          <p className="text-left mt-2 mb-0 title">Wall of fame multi</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout4} className="w-100"
            alt="img" 
            onClick={() => history.push("/create-template?type=temp5")}
          />
          <p className="text-left mt-2 mb-0 title">Wall of Fame</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout5} className="w-100"
            onClick={() => history.push("/create-template?type=temp6")}
            alt="img" 
          />
          <p className="text-left mt-2 mb-0 title">Happy Birthday Single</p>
        </div>
      </div>
    </>
  );
}
