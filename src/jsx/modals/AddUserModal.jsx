import React, {useState, useEffect} from "react";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";
import Select from "react-select";
import {addUsers, updateUsers} from "../../utils/api";
import { toast } from "react-toastify";

const AddUser = ({ open, setShowAddUserModel , setIsRefresh, user, type}) => {
    console.log("user",user)
    const [name, setName] = useState(user ? user.name : "");
    const [email, setEmail] = useState(user ? user.email : "");
    const [password, setPassword] = useState(user ? user.password : "");
    const [role, setRole] = useState(user ? {value:user.role.toUpperCase(),label:user.role} : "");
    const [error, setError] = useState('');
    useEffect(() => {
        if(user){   
            setName(user.name);
            setEmail(user.email);
            setPassword(user.password);
            setRole({value:user.role.toUpperCase(),label:user.role});
        }
    },[user])
    const options = [
        { value: "MANAGER", label: "Manager" },
        { value: "EDITOR", label: "Editor" },
      ];
    const handleSubmit = async(e, type) => {
        e.preventDefault();
        let err = '';
        if(name == ''){
            err = 'Name is required';
        }
        else if(password == '' && type == null){
            err = 'password is required';
        }
        else if(email == ''){
            err = 'Email is required';
        }
        else if(role == null){
            err = 'Role is required';
        } 
        if(err){
            setError(err);
            return false;
        }
        console.log("error",err)
        
        if(err == ''){
            if(!type){
                const postData = {
                    name, email, password, role:role.value
                }
                await addUsers(postData)
                  .then(response => {
                    console.log(response);
                    setError(null);
                    setShowAddUserModel(false);
                    toast.success("User has been added successfully !!!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      setIsRefresh(true)
                  }).catch(function (error) {
                    setError(error.response.data.message)
                  });
            }else{
                console.log("Update");
                const postData = {
                    name,role:role.value,userId:user._id
                }
                await updateUsers(postData)
                  .then(response => {
                    console.log(response);
                    setError(null);
                    setShowAddUserModel(false);
                    toast.success("User has been updated successfully !!!", {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                      });
                      setIsRefresh(true)
                  }).catch(function (error) {
                    setError(error.response.data.message)
                  });
            }
            console.log("Submit",name, email, password,role);
            
            
        }
        
    }
  return (
    <Modal
      className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
      show={open}
      size="md"
    >
      <Modal.Header>
        <Modal.Title>{type && type=='edit' ?'Update ' : 'Add New '}User</Modal.Title>
        <Button
          variant=""
          className="close"
          onClick={() => setShowAddUserModel(false)}
        >
          <img className="cancel-icon" src={cancelIcon} alt="cancel-icon" />
        </Button>
      </Modal.Header>
      <Modal.Body>
        <Row>
            {error && <h5 class="alert alert-danger text-center">{error}</h5>}
          <Col lg={12} md={12} sm={12} xs={12}>
          <label className="mt-3">Enter Name</label>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={name}
                className="form-control input-default form-field"
                placeholder="Enter Name"
                onChange={(e) => {setName(e.target.value)}}
              />
            </div>
          </Col>

          {!type && <><Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
            <label className="mt-3">Enter Email</label>
              <input
                type="email"
                name="email"
                value={email}
                className="form-control input-default form-field"
                placeholder="Enter Email"
                onChange={(e) => {setEmail(e.target.value)}}
              />
            </div>
          </Col><Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
            <label className="mt-3">Enter Password</label>
              <input
                type="password"
                name="password"
                value={password}
                className="form-control input-default form-field"
                placeholder="Enter Password"
                onChange={(e) => {setPassword(e.target.value)}}
                autoComplete={false}
              />
            </div>
          </Col></>}
          <Col lg={12} md={12} sm={12} xs={12}>
            <div className="form-group">
            <label className="mt-3">Select Role</label>
              <Select
              value={role}
              onChange={setRole}
              placeholder="Select Role"
              options={options}
              className="app-option"
            />
            </div>
          </Col>
          
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <Row className="w-100 m-0">
          <Col lg={6} md={6} sm={6} xs={6} className="pl-0 pr-2">
            <Button 
                className="cancel-btn w-100"
                variant="outline-light"
                onClick={() => setShowAddUserModel(false)}
            >
              Cancel
            </Button>
          </Col>
          <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
            <Button
              variant=""
              type="button"
              className="btn btn-primary btn-block primary-btn"
              onClick={(e) => handleSubmit(e, type)}
            >
              {type && type === 'edit' ? 'Update User' : 'Add User'}
            </Button>
          </Col>
        </Row>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUser;
