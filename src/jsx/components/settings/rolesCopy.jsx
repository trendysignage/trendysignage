import React, { useState, useEffect } from "react";
import { Table, Dropdown, Button, Modal, Row, Col, Badge } from "react-bootstrap";

const Roles = ({ roles, setIsRefresh, isRefresh }) => {

const [rolesData, setRolesData] = useState(roles.roles);
const [rolesType, setRolesType] = useState('OPERATOR');
const [makeRefresh, setMakeRefresh] = useState(false);

useEffect(() => {
    setMakeRefresh(false)
    if(roles){
        setRolesData(roles.roles)
    }
},[makeRefresh, rolesData])


const handleChange = (e, set, section, type, val) => {
    
  e.preventDefault();
  console.log(set, section, type, val,rolesData[set][section][type])
  rolesData[set][section][type] = val;
  setRolesData(rolesData);
  setMakeRefresh(true);
}


  return (
    <>
        <Row className="w-100 m-0">
          <Col lg={3} md={3} sm={3} xs={3} className="pl-0 pr-2">
            <div>
                <button 
                    className="btn btn-sm btn-info"
                    onClick={(e) => {setRolesType("OPERATOR")}}
                >Operator</button>
            </div>
            <div>
                <button 
                    className="btn btn-sm btn-info"
                    onClick={(e) => {setRolesType("MANAGER")}}
                >Manager</button>
            </div>
            <div>
                <button
                    className="btn btn-sm btn-info"
                    onClick={(e) => {setRolesType("EDITOR")}}
                >Editorial</button>
            </div>
            
          </Col>
          <Col lg={9} md={9} sm={9} xs={9} className="pl-2 pr-0">
            <Table responsive className="custom-table screen-table">
                <thead>
                    <tr>
                        <th>Permission</th>
                        <th>View</th>
                        <th>Add</th>
                        <th>edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                
                {
                    rolesType && rolesType == 'OPERATOR' && 
                    <tbody>
                        <tr>
                            <td>APPS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-apps-view`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-apps-view`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'APPS', 'view', !rolesData.OPERATOR.APPS.view)}
                                    checked={rolesData.OPERATOR.APPS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-apps-add`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-apps-add`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'APPS', 'add', !rolesData.OPERATOR.APPS.add)}
                                    checked={rolesData.OPERATOR.APPS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-apps-edit`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-apps-edit`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'APPS', 'edit', !rolesData.OPERATOR.APPS.edit)}
                                    checked={rolesData.OPERATOR.APPS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-apps-delete`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-apps-delete`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'APPS', 'delete', !rolesData.OPERATOR.APPS.delete)}
                                    checked={rolesData.OPERATOR.APPS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>ASSETS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-ASSETS-view`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-ASSETS-view`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'ASSETS', 'view', !rolesData.OPERATOR.ASSETS.view)}
                                    checked={rolesData.OPERATOR.ASSETS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-ASSETS-add`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-ASSETS-add`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'ASSETS', 'add', !rolesData.OPERATOR.ASSETS.add)}
                                    checked={rolesData.OPERATOR.ASSETS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-ASSETS-edit`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-ASSETS-edit`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'ASSETS', 'edit', !rolesData.OPERATOR.ASSETS.edit)}
                                    checked={rolesData.OPERATOR.ASSETS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-ASSETS-delete`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-ASSETS-delete`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'ASSETS', 'delete', !rolesData.OPERATOR.ASSETS.delete)}
                                    checked={rolesData.OPERATOR.ASSETS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>COMPOSITION</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-COMPOSITION-view`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-COMPOSITION-view`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'COMPOSITION', 'view', !rolesData.OPERATOR.COMPOSITION.view)}
                                    checked={rolesData.OPERATOR.COMPOSITION.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-COMPOSITION-add`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-COMPOSITION-add`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'COMPOSITION', 'add', !rolesData.OPERATOR.COMPOSITION.add)}
                                    checked={rolesData.OPERATOR.COMPOSITION.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-COMPOSITION-edit`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-COMPOSITION-edit`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'COMPOSITION', 'edit', !rolesData.OPERATOR.COMPOSITION.edit)}
                                    checked={rolesData.OPERATOR.COMPOSITION.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-COMPOSITION-delete`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-COMPOSITION-delete`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'COMPOSITION', 'delete', !rolesData.OPERATOR.COMPOSITION.delete)}
                                    checked={rolesData.OPERATOR.COMPOSITION.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>QUICKPLAY</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-QUICKPLAY-view`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-QUICKPLAY-view`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'QUICKPLAY', 'view', !rolesData.OPERATOR.QUICKPLAY.view)}
                                    checked={rolesData.OPERATOR.QUICKPLAY.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-QUICKPLAY-add`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-QUICKPLAY-add`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'QUICKPLAY', 'add', !rolesData.OPERATOR.QUICKPLAY.add)}
                                    checked={rolesData.OPERATOR.QUICKPLAY.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-QUICKPLAY-edit`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-QUICKPLAY-edit`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'QUICKPLAY', 'edit', !rolesData.OPERATOR.QUICKPLAY.edit)}
                                    checked={rolesData.OPERATOR.QUICKPLAY.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-QUICKPLAY-delete`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-QUICKPLAY-delete`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'QUICKPLAY', 'delete', !rolesData.OPERATOR.QUICKPLAY.delete)}
                                    checked={rolesData.OPERATOR.QUICKPLAY.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>REPORTS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-REPORTS-view`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-REPORTS-view`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'REPORTS', 'view', !rolesData.OPERATOR.REPORTS.view)}
                                    checked={rolesData.OPERATOR.REPORTS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-REPORTS-add`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-REPORTS-add`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'REPORTS', 'add', !rolesData.OPERATOR.REPORTS.add)}
                                    checked={rolesData.OPERATOR.REPORTS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-REPORTS-edit`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-REPORTS-edit`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'REPORTS', 'edit', !rolesData.OPERATOR.REPORTS.edit)}
                                    checked={rolesData.OPERATOR.REPORTS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-REPORTS-delete`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-REPORTS-delete`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'REPORTS', 'delete', !rolesData.OPERATOR.REPORTS.delete)}
                                    checked={rolesData.OPERATOR.REPORTS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SCHEDULE</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-SCHEDULE-view`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-SCHEDULE-view`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'SCHEDULE', 'view', !rolesData.OPERATOR.SCHEDULE.view)}
                                    checked={rolesData.OPERATOR.SCHEDULE.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-SCHEDULE-add`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-SCHEDULE-add`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'SCHEDULE', 'add', !rolesData.OPERATOR.SCHEDULE.add)}
                                    checked={rolesData.OPERATOR.SCHEDULE.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-SCHEDULE-edit`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-SCHEDULE-edit`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'SCHEDULE', 'edit', !rolesData.OPERATOR.SCHEDULE.edit)}
                                    checked={rolesData.OPERATOR.SCHEDULE.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-SCHEDULE-delete`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-SCHEDULE-delete`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'SCHEDULE', 'delete', !rolesData.OPERATOR.SCHEDULE.delete)}
                                    checked={rolesData.OPERATOR.SCHEDULE.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SCREEN</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-SCREEN-view`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-SCREEN-view`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'SCREEN', 'view', !rolesData.OPERATOR.SCREEN.view)}
                                    checked={rolesData.OPERATOR.SCREEN.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-SCREEN-add`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-SCREEN-add`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'SCREEN', 'add', !rolesData.OPERATOR.SCREEN.add)}
                                    checked={rolesData.OPERATOR.SCREEN.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-SCREEN-edit`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-SCREEN-edit`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'SCREEN', 'edit', !rolesData.OPERATOR.SCREEN.edit)}
                                    checked={rolesData.OPERATOR.SCREEN.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-OPERATOR-SCREEN-delete`}
                                    type="checkbox"
                                    id={`checkbox-OPERATOR-SCREEN-delete`}
                                    onChange={(e) => handleChange(e, 'OPERATOR', 'SCREEN', 'delete', !rolesData.OPERATOR.SCREEN.delete)}
                                    checked={rolesData.OPERATOR.SCREEN.delete}
                                />
                            </td>
                        </tr>
                    </tbody>
                }
                {
                    rolesType && rolesType == 'MANAGER' && 
                    <tbody>
                        <tr>
                            <td>APPS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-apps-view`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-apps-view`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'APPS', 'view', !rolesData.MANAGER.APPS.view)}
                                    checked={rolesData.MANAGER.APPS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-apps-add`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-apps-add`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'APPS', 'add', !rolesData.MANAGER.APPS.add)}
                                    checked={rolesData.MANAGER.APPS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-apps-edit`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-apps-edit`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'APPS', 'edit', !rolesData.MANAGER.APPS.edit)}
                                    checked={rolesData.MANAGER.APPS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-apps-delete`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-apps-delete`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'APPS', 'delete', !rolesData.MANAGER.APPS.delete)}
                                    checked={rolesData.MANAGER.APPS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>ASSETS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-ASSETS-view`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-ASSETS-view`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'ASSETS', 'view', !rolesData.MANAGER.ASSETS.view)}
                                    checked={rolesData.MANAGER.ASSETS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-ASSETS-add`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-ASSETS-add`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'ASSETS', 'add', !rolesData.MANAGER.ASSETS.add)}
                                    checked={rolesData.MANAGER.ASSETS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-ASSETS-edit`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-ASSETS-edit`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'ASSETS', 'edit', !rolesData.MANAGER.ASSETS.edit)}
                                    checked={rolesData.MANAGER.ASSETS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-ASSETS-delete`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-ASSETS-delete`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'ASSETS', 'delete', !rolesData.MANAGER.ASSETS.delete)}
                                    checked={rolesData.MANAGER.ASSETS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>COMPOSITION</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-COMPOSITION-view`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-COMPOSITION-view`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'COMPOSITION', 'view', !rolesData.MANAGER.COMPOSITION.view)}
                                    checked={rolesData.MANAGER.COMPOSITION.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-COMPOSITION-add`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-COMPOSITION-add`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'COMPOSITION', 'add', !rolesData.MANAGER.COMPOSITION.add)}
                                    checked={rolesData.MANAGER.COMPOSITION.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-COMPOSITION-edit`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-COMPOSITION-edit`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'COMPOSITION', 'edit', !rolesData.MANAGER.COMPOSITION.edit)}
                                    checked={rolesData.MANAGER.COMPOSITION.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-COMPOSITION-delete`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-COMPOSITION-delete`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'COMPOSITION', 'delete', !rolesData.MANAGER.COMPOSITION.delete)}
                                    checked={rolesData.MANAGER.COMPOSITION.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>QUICKPLAY</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-QUICKPLAY-view`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-QUICKPLAY-view`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'QUICKPLAY', 'view', !rolesData.MANAGER.QUICKPLAY.view)}
                                    checked={rolesData.MANAGER.QUICKPLAY.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-QUICKPLAY-add`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-QUICKPLAY-add`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'QUICKPLAY', 'add', !rolesData.MANAGER.QUICKPLAY.add)}
                                    checked={rolesData.MANAGER.QUICKPLAY.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-QUICKPLAY-edit`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-QUICKPLAY-edit`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'QUICKPLAY', 'edit', !rolesData.MANAGER.QUICKPLAY.edit)}
                                    checked={rolesData.MANAGER.QUICKPLAY.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-QUICKPLAY-delete`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-QUICKPLAY-delete`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'QUICKPLAY', 'delete', !rolesData.MANAGER.QUICKPLAY.delete)}
                                    checked={rolesData.MANAGER.QUICKPLAY.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>REPORTS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-REPORTS-view`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-REPORTS-view`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'REPORTS', 'view', !rolesData.MANAGER.REPORTS.view)}
                                    checked={rolesData.MANAGER.REPORTS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-REPORTS-add`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-REPORTS-add`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'REPORTS', 'add', !rolesData.MANAGER.REPORTS.add)}
                                    checked={rolesData.MANAGER.REPORTS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-REPORTS-edit`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-REPORTS-edit`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'REPORTS', 'edit', !rolesData.MANAGER.REPORTS.edit)}
                                    checked={rolesData.MANAGER.REPORTS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-REPORTS-delete`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-REPORTS-delete`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'REPORTS', 'delete', !rolesData.MANAGER.REPORTS.delete)}
                                    checked={rolesData.MANAGER.REPORTS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SCHEDULE</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-SCHEDULE-view`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-SCHEDULE-view`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'SCHEDULE', 'view', !rolesData.MANAGER.SCHEDULE.view)}
                                    checked={rolesData.MANAGER.SCHEDULE.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-SCHEDULE-add`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-SCHEDULE-add`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'SCHEDULE', 'add', !rolesData.MANAGER.SCHEDULE.add)}
                                    checked={rolesData.MANAGER.SCHEDULE.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-SCHEDULE-edit`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-SCHEDULE-edit`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'SCHEDULE', 'edit', !rolesData.MANAGER.SCHEDULE.edit)}
                                    checked={rolesData.MANAGER.SCHEDULE.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-SCHEDULE-delete`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-SCHEDULE-delete`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'SCHEDULE', 'delete', !rolesData.MANAGER.SCHEDULE.delete)}
                                    checked={rolesData.MANAGER.SCHEDULE.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SCREEN</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-SCREEN-view`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-SCREEN-view`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'SCREEN', 'view', !rolesData.MANAGER.SCREEN.view)}
                                    checked={rolesData.MANAGER.SCREEN.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-SCREEN-add`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-SCREEN-add`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'SCREEN', 'add', !rolesData.MANAGER.SCREEN.add)}
                                    checked={rolesData.MANAGER.SCREEN.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-SCREEN-edit`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-SCREEN-edit`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'SCREEN', 'edit', !rolesData.MANAGER.SCREEN.edit)}
                                    checked={rolesData.MANAGER.SCREEN.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-MANAGER-SCREEN-delete`}
                                    type="checkbox"
                                    id={`checkbox-MANAGER-SCREEN-delete`}
                                    onChange={(e) => handleChange(e, 'MANAGER', 'SCREEN', 'delete', !rolesData.MANAGER.SCREEN.delete)}
                                    checked={rolesData.MANAGER.SCREEN.delete}
                                />
                            </td>
                        </tr>
                    </tbody>
                }
                {
                    rolesType && rolesType == 'EDITOR' && 
                    <tbody>
                        <tr>
                            <td>APPS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-apps-view`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-apps-view`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'APPS', 'view', !rolesData.EDITOR.APPS.view)}
                                    checked={rolesData.EDITOR.APPS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-apps-add`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-apps-add`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'APPS', 'add', !rolesData.EDITOR.APPS.add)}
                                    checked={rolesData.EDITOR.APPS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-apps-edit`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-apps-edit`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'APPS', 'edit', !rolesData.EDITOR.APPS.edit)}
                                    checked={rolesData.EDITOR.APPS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-apps-delete`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-apps-delete`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'APPS', 'delete', !rolesData.EDITOR.APPS.delete)}
                                    checked={rolesData.EDITOR.APPS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>ASSETS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-ASSETS-view`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-ASSETS-view`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'ASSETS', 'view', !rolesData.EDITOR.ASSETS.view)}
                                    checked={rolesData.EDITOR.ASSETS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-ASSETS-add`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-ASSETS-add`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'ASSETS', 'add', !rolesData.EDITOR.ASSETS.add)}
                                    checked={rolesData.EDITOR.ASSETS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-ASSETS-edit`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-ASSETS-edit`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'ASSETS', 'edit', !rolesData.EDITOR.ASSETS.edit)}
                                    checked={rolesData.EDITOR.ASSETS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-ASSETS-delete`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-ASSETS-delete`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'ASSETS', 'delete', !rolesData.EDITOR.ASSETS.delete)}
                                    checked={rolesData.EDITOR.ASSETS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>COMPOSITION</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-COMPOSITION-view`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-COMPOSITION-view`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'COMPOSITION', 'view', !rolesData.EDITOR.COMPOSITION.view)}
                                    checked={rolesData.EDITOR.COMPOSITION.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-COMPOSITION-add`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-COMPOSITION-add`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'COMPOSITION', 'add', !rolesData.EDITOR.COMPOSITION.add)}
                                    checked={rolesData.EDITOR.COMPOSITION.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-COMPOSITION-edit`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-COMPOSITION-edit`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'COMPOSITION', 'edit', !rolesData.EDITOR.COMPOSITION.edit)}
                                    checked={rolesData.EDITOR.COMPOSITION.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-COMPOSITION-delete`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-COMPOSITION-delete`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'COMPOSITION', 'delete', !rolesData.EDITOR.COMPOSITION.delete)}
                                    checked={rolesData.EDITOR.COMPOSITION.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>QUICKPLAY</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-QUICKPLAY-view`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-QUICKPLAY-view`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'QUICKPLAY', 'view', !rolesData.EDITOR.QUICKPLAY.view)}
                                    checked={rolesData.EDITOR.QUICKPLAY.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-QUICKPLAY-add`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-QUICKPLAY-add`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'QUICKPLAY', 'add', !rolesData.EDITOR.QUICKPLAY.add)}
                                    checked={rolesData.EDITOR.QUICKPLAY.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-QUICKPLAY-edit`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-QUICKPLAY-edit`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'QUICKPLAY', 'edit', !rolesData.EDITOR.QUICKPLAY.edit)}
                                    checked={rolesData.EDITOR.QUICKPLAY.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-QUICKPLAY-delete`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-QUICKPLAY-delete`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'QUICKPLAY', 'delete', !rolesData.EDITOR.QUICKPLAY.delete)}
                                    checked={rolesData.EDITOR.QUICKPLAY.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>REPORTS</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-REPORTS-view`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-REPORTS-view`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'REPORTS', 'view', !rolesData.EDITOR.REPORTS.view)}
                                    checked={rolesData.EDITOR.REPORTS.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-REPORTS-add`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-REPORTS-add`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'REPORTS', 'add', !rolesData.EDITOR.REPORTS.add)}
                                    checked={rolesData.EDITOR.REPORTS.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-REPORTS-edit`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-REPORTS-edit`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'REPORTS', 'edit', !rolesData.EDITOR.REPORTS.edit)}
                                    checked={rolesData.EDITOR.REPORTS.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-REPORTS-delete`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-REPORTS-delete`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'REPORTS', 'delete', !rolesData.EDITOR.REPORTS.delete)}
                                    checked={rolesData.EDITOR.REPORTS.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SCHEDULE</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-SCHEDULE-view`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-SCHEDULE-view`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'SCHEDULE', 'view', !rolesData.EDITOR.SCHEDULE.view)}
                                    checked={rolesData.EDITOR.SCHEDULE.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-SCHEDULE-add`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-SCHEDULE-add`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'SCHEDULE', 'add', !rolesData.EDITOR.SCHEDULE.add)}
                                    checked={rolesData.EDITOR.SCHEDULE.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-SCHEDULE-edit`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-SCHEDULE-edit`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'SCHEDULE', 'edit', !rolesData.EDITOR.SCHEDULE.edit)}
                                    checked={rolesData.EDITOR.SCHEDULE.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-SCHEDULE-delete`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-SCHEDULE-delete`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'SCHEDULE', 'delete', !rolesData.EDITOR.SCHEDULE.delete)}
                                    checked={rolesData.EDITOR.SCHEDULE.delete}
                                />
                            </td>
                        </tr>
                        <tr>
                            <td>SCREEN</td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-SCREEN-view`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-SCREEN-view`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'SCREEN', 'view', !rolesData.EDITOR.SCREEN.view)}
                                    checked={rolesData.EDITOR.SCREEN.view}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-SCREEN-add`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-SCREEN-add`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'SCREEN', 'add', !rolesData.EDITOR.SCREEN.add)}
                                    checked={rolesData.EDITOR.SCREEN.add}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-SCREEN-edit`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-SCREEN-edit`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'SCREEN', 'edit', !rolesData.EDITOR.SCREEN.edit)}
                                    checked={rolesData.EDITOR.SCREEN.edit}
                                />
                            </td>
                            <td>
                                <input
                                    className={`day-checkbox`}
                                    name={`checkbox-EDITOR-SCREEN-delete`}
                                    type="checkbox"
                                    id={`checkbox-EDITOR-SCREEN-delete`}
                                    onChange={(e) => handleChange(e, 'EDITOR', 'SCREEN', 'delete', !rolesData.EDITOR.SCREEN.delete)}
                                    checked={rolesData.EDITOR.SCREEN.delete}
                                />
                            </td>
                        </tr>
                    </tbody>
                }
                
            </Table>
          </Col>
        </Row>
      
    </>
  );
};

export default Roles;
