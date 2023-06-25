// import React, { useState } from 'react'
// import { Button, Dropdown, Table } from "react-bootstrap";
// import searchIcon from "../../../img/search.png";
// import listIcon from "../../../img/list-icon.png";
// import layoutSelected from "../../../img/layout-select-img.png";
// import downArrow from "../../../img/down-arrow.png";
// import menuIcon from "../../../img/menu-icon.png";
// import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
// import deleteIcon from "../../../img/delete-icon.png";
// const SelectComparison = () => {
//   const [allScreens, setAllScreens] = useState("");

//   const [checkedItems, setCheckedItems] = useState({});
//   const [checkedValues, setCheckedValues] = useState([]);

//   const handleCheckboxChange = (event) => {
//     const newCheckedItems = {
//       ...checkedItems,
//       [event.target.name]: event.target.checked,
//     };
//     const selectedScreens = [];
//     for (const key in newCheckedItems) {
//       if (newCheckedItems[key] === true) {
//         selectedScreens.push(key);
//       }
//     }
//     setCheckedValues(selectedScreens);
//     setCheckedItems(newCheckedItems);
//   };

//   const handleSelectAllChange = (event) => {
//     const newCheckedItems = {};
//     allScreens.forEach((item) => {
//       newCheckedItems[item._id] = event.target.checked;
//     });
//     const selectedScreens = [];
//     for (const key in newCheckedItems) {
//       if (newCheckedItems[key] === true) {
//         selectedScreens.push(key);
//       }
//     }
//     setCheckedValues(selectedScreens);
//     setCheckedItems(newCheckedItems);
//   };

//   return (
//     <>
//           <div className="custom-content-heading selected-heading d-flex flex-wrap">
//         <h1>Select Composition</h1>

//         <div className="search-textfield search-selected ml-auto d-flex flex-wrap align-items-center">
//           <div className="form-group mb-0">
//             <input
//               type="text"
//               className="form-control input-default "
//               placeholder="Search..."
//             />
//             <img className="search-icon" src={searchIcon} alt="search" />
//           </div>
//           <Button
//             className="ml-2 icon-btn"
//             variant="primary"
//           >
//             <img className="icon-icon" src={listIcon} alt="list-icon" />
//           </Button>
//         </div>
//       </div>
// {/*
//       <Table responsive className="custom-table mt-3">
//           <thead>
//             <tr>
//               <th>Composition</th>
//               <th>Date Added</th>
//               <th>Associated Schedule</th>
//               <th>Tags</th>
//             </tr>
//           </thead>
//           <tbody>

//                 <tr>
//                   <td>
//                     <span className="td-content d-flex name-td-content">
//                       <span className="name-img mr-2">
//                       <img
//                   className="layout-select-img"
//                   src={layoutSelected}
//                   alt="menu-icon"
//                 />
//                       </span>
//                       <span className="name-content d-flex flex-column flex-grow-1">
//                         <strong>C-c02Nov 21 12:03</strong>
//                         <span>Added by Gauri Batra</span>
//                       </span>
//                     </span>
//                   </td>
//                   <td>
//                   <span className="name-content d-flex flex-column flex-grow-1">
//                         <strong>2 Nov, 2021</strong>
//                         <span>12:02 PM</span>
//                       </span>
//                   </td>
//                   <td>
//                    0
//                   </td>
//                   <td>
//                       <span className="my-phone-tag text-truncate ml-1">My Phone is</span>

//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <span className="td-content d-flex name-td-content">
//                       <span className="name-img mr-2">
//                       <img
//                   className="layout-select-img"
//                   src={layoutSelected}
//                   alt="menu-icon"
//                 />
//                       </span>
//                       <span className="name-content d-flex flex-column flex-grow-1">
//                         <strong>C-c02Nov 21 12:03</strong>
//                         <span>Added by Gauri Batra</span>
//                       </span>
//                     </span>
//                   </td>
//                   <td>
//                   <span className="name-content d-flex flex-column flex-grow-1">
//                         <strong>2 Nov, 2021</strong>
//                         <span>12:02 PM</span>
//                       </span>
//                   </td>
//                   <td>
//                    0
//                   </td>
//                   <td>
//                       <span className="my-phone-tag text-truncate ml-1">My Phone is</span>

//                   </td>
//                 </tr>
//           </tbody>
//         </Table> */}

//     </>
//   )
// }

// export default SelectComparison

import { useEffect, useState } from "react";
import TableLoader from "../TableLoader";
import "../Table.css";
import { getAllScreens, pushAddSchedule } from "../../../utils/api";
import { Button, Dropdown, Table } from "react-bootstrap";
import searchIcon from "../../../img/search.png";
import listIcon from "../../../img/list-icon.png";
// import tagCloseIcon from "../../img/tag-close-icon.png";
import { useParams, useHistory } from "react-router-dom";

const SelectComparison = () => {
  const history = useHistory();

  const [allScreens, setAllScreens] = useState("");
  const [checkedItems, setCheckedItems] = useState({});
  const [checkedValues, setCheckedValues] = useState([]);
  const [published, setPublished] = useState(false);
  const [loading, setLoading] = useState(false);
  const [scheduleName, setScheduleName] = useState("");
  // use effect
  console.log(checkedItems, "SelectCompariso checkedItemsn");
  console.log(checkedValues, "SelectCompariso checkedValues");

  useEffect(() => {
    callAllScreenApi();
  }, []);

  const callAllScreenApi = async () => {
    setLoading(true);
    const list = await getAllScreens();
    setLoading(false);
    setAllScreens(list);
  };

  const handleCheckboxChange = (event) => {
    const newCheckedItems = {
      ...checkedItems,
      [event.target.name]: event.target.checked,
    };
    const selectedScreens = [];
    for (const key in newCheckedItems) {
      if (newCheckedItems[key] === true) {
        selectedScreens.push(key);
      }
    }
    setCheckedValues(selectedScreens);
    setCheckedItems(newCheckedItems);
  };

  const handleSelectAllChange = (event) => {
    const newCheckedItems = {};
    allScreens.forEach((item) => {
      newCheckedItems[item._id] = event.target.checked;
    });
    const selectedScreens = [];
    for (const key in newCheckedItems) {
      if (newCheckedItems[key] === true) {
        selectedScreens.push(key);
      }
    }
    setCheckedValues(selectedScreens);
    setCheckedItems(newCheckedItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("kkkkk");
    await pushAddSchedule({
      name: scheduleName,
      screens: checkedValues,
    }).then((res) => {
      console.log(res, "res schedule name");
      if (res.data.statusCode === 200) {
        console.log(res.data.data.name);
        history.push(`/testday/${res.data.data._id}/${res.data.data.name}`);
      }
    });
  };
  return (
    <>
      <div className="custom-content-heading selected-heading d-flex flex-wrap">
        <h1>Select Composition</h1>

        <div className="search-textfield search-selected ml-auto d-flex flex-wrap align-items-center">
          <div className="form-group mb-0">
            <input
              type="text"
              className="form-control input-default "
              placeholder="Search..."
            />
            <img className="search-icon" src={searchIcon} alt="search" />
          </div>
          <Button className="ml-2 icon-btn" variant="primary">
            <img className="icon-icon" src={listIcon} alt="list-icon" />
          </Button>
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="d-flex justify-content-between align-items-center my-4"
      >
        <input
          type="text"
          className=" schedule-name-input-feild form-control input-default "
          placeholder="Schedule Name"
          value={scheduleName}
          onChange={(e) => setScheduleName(e.target.value)}
          required
        />
        <Button className="con-btn " variant="primary" type="submit">
          Save
        </Button>
      </form>

      <Table responsive>
        <thead>
          <tr>
            <th className="width50">
              <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="checkbox1_exam_all"
                  onChange={handleSelectAllChange}
                  required=""
                />
                <label
                  className="custom-control-label"
                  htmlFor="checkbox1_exam_all"
                ></label>
              </div>
            </th>
            <th>Screen</th>
            <th>Last Seen</th>
            <th>Default Composition</th>
            <th>Current Schedule</th>
          </tr>
        </thead>
        {loading ? (
          <TableLoader colSpan={5} />
        ) : (
          <tbody>
            {allScreens !== "" &&
              allScreens.map((screen) => {
                return (
                  <tr>
                    <td>
                      <div className="custom-control custom-checkbox checkbox-success check-lg mr-3">
                        <input
                          type="checkbox"
                          className="custom-control-input"
                          id={screen._id}
                          name={screen._id}
                          checked={checkedItems[screen._id]}
                          onChange={handleCheckboxChange}
                        />
                        <label
                          className="custom-control-label"
                          htmlFor={screen._id}
                        ></label>
                      </div>
                    </td>

                    <td>
                      <span className="td-content">
                        <strong>{screen.name}</strong>
                        <span>{screen.screenLocation}</span>
                      </span>
                    </td>
                    <td>
                      <span className="d-flex align-items-center">
                        <span className="status status-green"></span>
                        <span className="td-content">
                          <strong>{screen.name}</strong>
                          <span>{screen.screenLocation}</span>
                        </span>
                      </span>
                    </td>
                    <td>Default Compo. </td>
                    <td>No Schedule</td>
                  </tr>
                );
              })}
          </tbody>
        )}
      </Table>
    </>
  );
};

export default SelectComparison;
