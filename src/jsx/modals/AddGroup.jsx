import React, {useState, useEffect} from "react";
import { Button, Modal, Row, Col, Badge } from "react-bootstrap";
import cancelIcon from "../../img/cancel-icon.png";
import tagCloseIcon from "../../img/tag-close-icon.png";
import Select from "react-select";
import {addGroups, updateGroups} from "../../utils/api";
import { toast } from "react-toastify";

const AddGroup = ({ open, setShowGroupModel , setIsRefresh, group, type}) => {
    const [name, setName] = useState(group ? group.name : "");
    const [description, setDescription] = useState(group ? group.description : "");
    const [error, setError] = useState('');
    const [isDisable, setIsDisable] = useState(false)
    useEffect(() => {
        if(group){   
            setName(group.name);
            setDescription(group.descripiton);
        }
    },[group])
    const options = [
        { value: "MANAGER", label: "Manager" },
        { value: "EDITOR", label: "Editor" },
      ];
    const handleSubmit = async(e, type) => {
        e.preventDefault();
        setIsDisable(true)
        let err = '';
        if(name.trim() == ''){
            err = 'Name is required';
        }
        else if(description == ''){
            err = 'Description is required';
        }
        if(err){
            setError(err);
            setIsDisable(false)
            return;
        }
        
        if(err == ''){
            if(!type){
                const postData = {
                    name,description
                }
                await addGroups(postData)
                  .then(response => {
                    setError(null);
                    //setShowGroupModel(false);
                    handleCloseForm();
                    setIsDisable(false)
                    toast.success("Group has been added successfully !!!", {
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
                    name,groupId:group._id,description
                }
                await updateGroups(postData)
                  .then(response => {
                    console.log(response);
                    setError(null);
                    handleCloseForm();
                    setIsDisable(false)
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

            setIsDisable(false);
        }
        
    }

    const handleCloseForm = () => {
        setName("");
        setDescription("");
        setError('');
        setShowGroupModel(false)
    }
    return (
        <Modal
        className="fade bd-example-modal-lg mt-4 custom-modal custom-modal-medium"
        show={open}
        size="md"
        >
        <Modal.Header>
            <Modal.Title>{type && type=='edit' ?'Update ' : 'Add New '}Group</Modal.Title>
            <Button
                variant=""
                className="close"
                onClick={() => handleCloseForm()}
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
                <Col lg={12} md={12} sm={12} xs={12}>
                    <div className="form-group">
                        <label className="mt-3">Enter Description</label>
                        <textarea
                            name="description"
                            value={description}
                            className="form-control input-default form-field"
                            placeholder="Enter Description"
                            onChange={(e) => {setDescription(e.target.value)}}>
                        </textarea>
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
                        onClick={() => handleCloseForm()}
                    >
                    Cancel
                    </Button>
                </Col>
                <Col lg={6} md={6} sm={6} xs={6} className="pl-2 pr-0">
                    <Button
                    variant=""
                    type="button"
                    className="btn btn-primary btn-block primary-btn"
                    disabled={isDisable}
                    onClick={(e) => handleSubmit(e, type)}
                    >
                    Add Group
                    </Button>
                </Col>
            </Row>
        </Modal.Footer>
        </Modal>
    );
};

export default AddGroup;
