import React, {useState} from "react";
import {  Dropdown } from "react-bootstrap";
import ListMedia from "./defaultComposition";
import { roles } from "aria-query";


const Settings = () => {
const [dropValue, setDropValue] = useState('Default Content')

const handleDropDown = (e, data) => {
  e.preventDefault();
  setDropValue(data)
}

  return (
    <>
      <div className="custom-content-heading d-flex flex-wrap">
        <h1>Settings</h1>
        <div className=" ml-auto d-flex flex-wrap align-items-center">
            <Dropdown>
              <Dropdown.Toggle
                variant='outline-primary'
                size='sm'
                className='mt-1 mb-2'
              >
                {dropValue}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={(e) => {handleDropDown(e, 'Default Content')}}>Default Content</Dropdown.Item>
                <Dropdown.Item onClick={(e) => {handleDropDown(e, 'Groups')}}>Groups</Dropdown.Item>
                <Dropdown.Item onClick={(e) => {handleDropDown(e, 'Users')}}>Users</Dropdown.Item>
                <Dropdown.Item onClick={(e) => {handleDropDown(e, 'Roles')}}>Roles</Dropdown.Item>
                <Dropdown.Item onClick={(e) => {handleDropDown(e, 'Device Profile')}}>Device Profile</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        </div>
      </div>

     
    <h4>{dropValue}</h4>
    { dropValue && dropValue === 'Default Content' && <ListMedia /> }
      
    </>
  );
};

export default Settings;
