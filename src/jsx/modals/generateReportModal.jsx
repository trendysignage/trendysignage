import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import icon from "../../img/link-alt 1.svg";
import { Table } from "react-bootstrap";
import downArrow from "../../img/down-arrow.png";

import { Link } from "react-router-dom";
import Select from "react-select";
import { useEffect, useState } from "react";
import { assignDefaultComposition, BASE_URL } from "../../utils/api";

const GenerateReportModal = ({
  close,
  show,

  reportType,
}) => {
  console.log(reportType, "kkmkmkk");

  const monthOptions = [
    { value: "Jan", label: "January" },
    { value: "Feb", label: "February" },
    { value: "Mar", label: "March" },
    { value: "Apr", label: "April" },
    { value: "May", label: "May" },
    { value: "Jun", label: "June" },
    { value: "Jul", label: "July" },
    { value: "Aug", label: "August" },
    { value: "Sep", label: "September" },
    { value: "Oct", label: "October" },
    { value: "Nov", label: "November" },
    { value: "Dec", label: "December" },
  ];
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedOptionaa, setSelectedOptionaa] = useState(null);

  console.log(selectedOption?.value, "iiiioo");
  const yearOptions = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear - 5; i <= currentYear; i++) {
    yearOptions.push({ value: String(i), label: String(i) });
  }

  // Output the year options

  const colourStyles = {
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        backgroundColor: isFocused ? "#ed9bc7" : null,
        color: "#333333",
      };
    },
  };
  //   const numberOfDays = new Date(
  //     yearOptions?.value,
  //     new Date(monthOptions?.value + " 1," + yearOptions?.value).getMonth() + 1,
  //     0
  //   ).getDate();

  //   // Create the start date
  //   const startDate = new Date(
  //     yearOptions?.value,
  //     new Date(monthOptions?.value + " 1," + yearOptions?.value).getMonth(),
  //     2
  //   )
  //     .toISOString()
  //     .split("T")[0];

  //   // Create the end date
  //   const endDate = new Date(
  //     yearOptions?.value,
  //     new Date(
  //       monthOptions?.value + " " + numberOfDays + "," + yearOptions?.value
  //     ).getMonth(),
  //     numberOfDays + 1
  //   )
  //     .toISOString()
  //     .split("T")[0];
  //   useEffect(()=>{})

  //   console.log(yearOptions, "yearOptionsyearOptions");
  //   console.log(selectedOption, "selectedOptionselectedOption");
  return (
    <>
      <Modal
        className="fade bd-example-modal-lg mt-4 app-modal"
        show={show}
        size="md"
      >
        <Modal.Header className="border-0 d-flex justify-content-between align-items-center">
          <div>
            <Modal.Title className="mr-auto">Report</Modal.Title>

            <p>How would you like to generate your report?</p>
          </div>

          <Button variant="" className="close" onClick={() => close(false)}>
            <img
              className="cancel-icon"
              src={cancelIcon}
              alt="cancel-icon"
              height="25px"
              width="25px"
            />
          </Button>
        </Modal.Header>
        <Modal.Body>
          <form
            // onSubmit={handleSubmit}
            className="row"
          >
            <div className="form-group col-12 mb-0  url-app-form border-0">
              <label>Daily</label>
              <input
                type="date"
                className="  form-control "
                placeholder="App Name"
                required
              />

              <label className="mt-3">Monthly</label>
              <div className="row">
                <div className="col-6">
                  <Select
                    defaultValue={selectedOption}
                    onChange={setSelectedOption}
                    options={monthOptions}
                    styles={colourStyles}
                    placeholder="month"
                    className="app-option"
                  />
                </div>
                <div className="col-6">
                  <Select
                    defaultValue={selectedOptionaa}
                    onChange={setSelectedOptionaa}
                    options={yearOptions}
                    styles={colourStyles}
                    placeholder="year"
                    className="app-option"
                  />
                </div>
              </div>

              <label className="mt-3">Custom</label>
              <div className="row">
                <div className="col-6">
                  <input type="date" className="  form-control " required />
                </div>
                <div className="col-6">
                  <input type="date" className="form-control " required />
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer className="border-0 mb-2">
          <Row className="w-100 m-0">
            <Col lg={12} md={12} sm={12} xs={12} className="pl-2 pr-0">
              <Button
                variant=""
                type="button"
                className="btn btn-primary btn-block primary-btn"
                //   onClick={() => setNewTagModal(false)}
              >
                Continue
              </Button>
            </Col>
          </Row>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GenerateReportModal;
