import React from "react";

const LockScreen = ({ history, message }) => {
   const submitHandler = (e) => {
      e.preventDefault();
      history.push("/");
   };
   return (
      <div className="row justify-content-center h-100 align-items-center">
         <div className="col-md-6">
            <div className="authincation-content">
               <div className="row no-gutters">
                  <div className="col-xl-12">
                     <div className="auth-form">
                        <h4 className="text-center mb-4">{message}</h4>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default LockScreen;
