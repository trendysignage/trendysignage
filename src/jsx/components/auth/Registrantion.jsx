import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../../store/actions/AuthActions';
import eyeOff from '../../../img/eye-off.svg'


const RegisterPage = (props)=>{
	const [email, setEmail] = useState('demo@example.com');
    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    const [password, setPassword] = useState('123456');
    const dispatch = useDispatch();

    function onLogin(e) {
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) {
			return ;
		}
		dispatch(loadingToggleAction(true));	
        dispatch(loginAction(email, password, props.history));
    }
	return (<div>
		<div className="mb-4">
			<h3 className="mb-1 font-w600">Let’s get Started</h3>
			<p className="welcome-content-paragraph">Enter your basic information to create new account on Trendyy</p>
		</div>
		{props.errorMessage && (
			<div className='bg-red-300 text-red-900 border border-red-900 p-1 my-2'>
				{props.errorMessage}
			</div>
		)}
		{props.successMessage && (
			<div className='bg-green-300 text-green-900 border border-green-900 p-1 my-2'>
				{props.successMessage}
			</div>
		)}
		<form onSubmit={onLogin}>
		<div className="form-group">
				<input type="text" className="form-control" placeholder='Enter Name' value='Enter Name'/>
				{/* {errors.email && <div className="text-danger fs-12">{errors.email}</div>} */}
			</div>
			<div className="form-group">
				<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
				{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
			</div>
			<div className="form-group">
				<input type="phone" className="form-control" placeholder='Phone Number' value='Phone Number'/>
				{/* {errors.email && <div className="text-danger fs-12">{errors.email}</div>} */}
			</div>
			<div className="form-group password-textfield">
				<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<span className='eye-off'><img src={eyeOff} alt="" className="eye-off"/> </span>
				{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
			</div>
			<div className="text-center">
				<button type="submit" className="btn btn-primary btn-block btn-pink">Register</button>
			</div>
		</form>
		<div className="new-account add-new-account  text-center mt-2">
			<p className="mb-0">Already have an account?{" "}
				<Link className="signup-link" to="./page-register">Sign in</Link>
			</p>
		</div>
		</div>)
}
export default withRouter(RegisterPage);