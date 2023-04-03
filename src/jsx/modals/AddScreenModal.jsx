import {  Button, Modal } from "react-bootstrap";
const AddScreenModal = ({
   showScreenModal,
   setShowScreenModal
 })=>{
    return (                    <Modal
        className="fade bd-example-modal-lg"
        show={showScreenModal}
        size="lg"
     >
        <Modal.Header>
           <Modal.Title>Don't have a display screen that is ready to use?</Modal.Title>
           <Button
              variant=""
              className="close"
              onClick={() => setShowScreenModal(false)}
           >
              <span>&times;</span>
           </Button>
        </Modal.Header>
        <Modal.Body>       
         <div className='col-xl-6 col-lg-6 flex justify-start'>
          <div className='card'>
            <div className='card-header'>
              <h4 className='card-title'>Register your screen</h4>
            </div>
           
              <div className='basic-form'>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='form-group'>
                    <input
                      type='text'
                      className='form-control input-default '
                      placeholder='Enter registration code'
                    />
                  </div>
                </form>
             
            </div>
          </div>
        </div></Modal.Body>
        <Modal.Footer>
           <Button
              variant="danger light"
              onClick={() => setShowScreenModal(false)}
           >
              Close
           </Button>
           <Button
              variant=""
              type="button"
              className="btn btn-primary"
           >
              Save changes
           </Button>
        </Modal.Footer>
     </Modal>)
}

export default AddScreenModal;