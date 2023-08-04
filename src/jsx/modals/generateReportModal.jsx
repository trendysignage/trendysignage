import { Button, Modal } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";

import Select from "react-select";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";

const GenerateReportModal = ({
  close,
  show,
  reportType,
  type,
  setFilter,
  filter,
}) => {
  const history = useHistory();
  const monthOptions = [
    { value: "01", label: "January" },
    { value: "02", label: "February" },
    { value: "03", label: "March" },
    { value: "04", label: "April" },
    { value: "05", label: "May" },
    { value: "06", label: "June" },
    { value: "07", label: "July" },
    { value: "08", label: "August" },
    { value: "09", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [filterType, setFilterType] = useState("daily");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

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

  useEffect(() => {
    getCurrentDate();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    let sDate = startDate;
    let eDate = endDate;
    if (filterType == "monthly") {
      sDate = `${selectedYear.value}-${selectedMonth.value}-01`;
      eDate = `${selectedYear.value}-${selectedMonth.value}-31`;
    }
    setFilter({
      startDate: sDate,
      endDate: eDate,
      filterType,
      selectedMonth,
      selectedYear,
    });
    close();
  };

  const getCurrentDate = () => {
    let cDate = moment();
    setSelectedMonth({
      value: cDate.format("MM"),
      label: cDate.format("MMMM"),
    });
    setSelectedYear({
      value: cDate.format("YYYY"),
      label: cDate.format("YYYY"),
    });
    setStartDate(cDate.format("YYYY-MM-DD"));
    setEndDate(cDate.format("YYYY-MM-DD"));
  };

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
        <Modal.Body style={{ paddingBottom: "15px" }}>
          <form onSubmit={handleSubmit} className="row">
            <div className="form-group col-12 mb-0  url-app-form border-0">
              <div>
                <div className="d-flex align-items-center mb-2">
                  <input
                    type="radio"
                    //className="form-control "
                    checked={filterType == "daily"}
                    onChange={(e) => setFilterType("daily")}
                  />
                  <label className="mb-0 ml-3">Daily</label>
                </div>

                <input
                  type="date"
                  className="  form-control "
                  defaultValue={startDate}
                  placeholder="App Name"
                  onChange={(e) => setStartDate(e.target.value)}
                  required={filterType == "daily"}
                  readOnly={filterType !== "daily"}
                />
              </div>

              <div>
                <>
                  <div className="d-flex align-items-center mb-2 mt-3">
                    <input
                      type="radio"
                      //className="form-control "
                      checked={filterType == "monthly"}
                      onChange={(e) => setFilterType("monthly")}
                    />
                    <label className="mb-0 ml-3">Monthly</label>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      <Select
                        value={selectedMonth}
                        onChange={setSelectedMonth}
                        options={monthOptions}
                        styles={colourStyles}
                        placeholder="month"
                        className="app-option"
                        isDisabled={filterType !== "monthly"}
                        required={filterType == "monthly"}
                      />
                    </div>
                    <div className="col-6">
                      <Select
                        value={selectedYear}
                        onChange={setSelectedYear}
                        options={yearOptions}
                        styles={colourStyles}
                        placeholder="year"
                        className="app-option"
                        isDisabled={filterType !== "monthly"}
                        required={filterType == "monthly"}
                      />
                    </div>
                  </div>
                </>
              </div>
              <div>
                <div className="d-flex align-items-center mb-2 mt-3">
                  <input
                    type="radio"
                    //className="form-control "
                    checked={filterType == "custom"}
                    onChange={(e) => setFilterType("custom")}
                  />
                  <label className="mb-0 ml-3">Custom</label>
                </div>
                <div className="row">
                  <div className="col-6">
                    <input
                      type="date"
                      className="  form-control "
                      onChange={(e) => setStartDate(e.target.value)}
                      readOnly={filterType !== "custom"}
                      defaultValue={startDate}
                      required={filterType == "custom"}
                    />
                  </div>
                  <div className="col-6">
                    <input
                      type="date"
                      className="form-control "
                      onChange={(e) => setEndDate(e.target.value)}
                      readOnly={filterType !== "custom"}
                      required={filterType == "custom"}
                      defaultValue={endDate}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-100 mt-3">
              <Button
                variant=""
                type="submit"
                className="btn btn-primary btn-block primary-btn"
                //   onClick={() => setNewTagModal(false)}
              >
                Continue
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default GenerateReportModal;
