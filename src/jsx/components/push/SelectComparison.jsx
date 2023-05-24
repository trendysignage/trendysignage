import React from 'react'
import { Button, Dropdown, Table } from "react-bootstrap";
import searchIcon from "../../../img/search.png";
import listIcon from "../../../img/list-icon.png";
import layoutSelected from "../../../img/layout-select-img.png";
import downArrow from "../../../img/down-arrow.png";
import menuIcon from "../../../img/menu-icon.png";
import defaultComparisonIcon from "../../../img/default-comparison-icon.png";
import deleteIcon from "../../../img/delete-icon.png";
const SelectComparison = () => {
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
          <Button
            className="ml-2 icon-btn"
            variant="primary"
          >
            <img className="icon-icon" src={listIcon} alt="list-icon" />
          </Button>
        </div>
      </div>

      <Table responsive className="custom-table mt-3">
          <thead>
            <tr>
              <th>Composition</th>
              <th>Date Added</th>
              <th>Associated Schedule</th>
              <th>Tags</th>
            </tr>
          </thead>
          <tbody>

                <tr>
                  <td>
                    <span className="td-content d-flex name-td-content">
                      <span className="name-img mr-2">
                      <img
                  className="layout-select-img"
                  src={layoutSelected}
                  alt="menu-icon"
                />
                      </span>
                      <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>C-c02Nov 21 12:03</strong>
                        <span>Added by Gauri Batra</span>
                      </span>
                    </span>
                  </td>
                  <td>
                  <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>2 Nov, 2021</strong>
                        <span>12:02 PM</span>
                      </span>
                  </td>
                  <td>
                   0
                  </td>
                  <td>
                      <span className="my-phone-tag text-truncate ml-1">My Phone is</span>

                    {/* <span
                      className="down-arrow"
                    >
                      <img
                        className="down-arrow-img img-fluid"
                        src={downArrow}
                        alt="arrow"
                      />
                    </span> */}
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="td-content d-flex name-td-content">
                      <span className="name-img mr-2">
                      <img
                  className="layout-select-img"
                  src={layoutSelected}
                  alt="menu-icon"
                />
                      </span>
                      <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>C-c02Nov 21 12:03</strong>
                        <span>Added by Gauri Batra</span>
                      </span>
                    </span>
                  </td>
                  <td>
                  <span className="name-content d-flex flex-column flex-grow-1">
                        <strong>2 Nov, 2021</strong>
                        <span>12:02 PM</span>
                      </span>
                  </td>
                  <td>
                   0
                  </td>
                  <td>
                      <span className="my-phone-tag text-truncate ml-1">My Phone is</span>

                    {/* <span
                      className="down-arrow"
                    >
                      <img
                        className="down-arrow-img img-fluid"
                        src={downArrow}
                        alt="arrow"
                      />
                    </span> */}
                  </td>
                </tr>
          </tbody>
        </Table>
    </>
  )
}

export default SelectComparison