import React from "react";
import {  Dropdown } from "react-bootstrap";
import ListMedia from "./defaultComposition";


const Settings = () => {


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
                      Default Content
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item href='#'>Default Content</Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
      </div>
      
      <ListMedia />
    </>
  );
};

export default Settings;
