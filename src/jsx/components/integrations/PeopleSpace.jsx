import React from "react";

import person from "../../../img/Ellipse 154.png";

import layout from "../../../img/Frame758532303.svg";

import layout1 from "../../../img/Group 626063.svg";
import layout2 from "../../../img/Frame 758532294.svg";
import layout3 from "../../../img/Group 626068.svg";
import layout4 from "../../../img/Group 626054.svg";
import layout5 from "../../../img/Frame 758532309.svg";

export default function PeopleSpace() {
  return (
    <>
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
          <img src={layout} alt="img" />
          <p className="text-left mt-2 mb-0 title">Work Anniversary Multi</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout1} alt="img" />
          <p className="text-left mt-2 mb-0 title">Work Anniversary Single</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout2} alt="img" />
          <p className="text-left mt-2 mb-0 title">Wall of Fame Single</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout3} alt="img" />
          <p className="text-left mt-2 mb-0 title">Wall of fame multi</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout4} alt="img" />
          <p className="text-left mt-2 mb-0 title">Wall of Fame</p>
        </div>
        <div className="col-12 col-md-4">
          <img src={layout5} alt="img" />
          <p className="text-left mt-2 mb-0 title">Happy Birthday Single</p>
        </div>
      </div>
    </>
  );
}
