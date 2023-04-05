import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../../store/actions/AuthActions';
import {  Button } from 'react-bootstrap'
import googleIcon from '../../../img/google-icon.png'
import eyeOff from '../../../img/eye-off.svg'

const LoginPage = (props)=>{
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
			<h3 className="mb-1 font-w600">Welcome Back</h3>
			<p className="welcome-content-paragraph">Log in with your data that you entered during your registration</p>
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
				<input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)}/>
				{errors.email && <div className="text-danger fs-12">{errors.email}</div>}
			</div>
			<div className="form-group password-textfield">
				<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)}/>
			<span className='eye-off'><img src={eyeOff} alt="" className="eye-off"/> </span>
				{errors.password && <div className="text-danger fs-12">{errors.password}</div>}
			</div>
			<div className='recover-password d-flex justify-content-end'>
				<Link  className='revover-password'  to="./page-register">Recover Password ?</Link>
			</div>
			<div className="text-center">
				<button type="submit" className="btn btn-primary btn-block btn-pink">Sign In</button>
			</div>
		</form>
		<div className="new-account add-new-account  text-center mt-2">
			<p className="mb-0">Don't have an account?{" "}
				<Link className="signup-link" to="./page-register">Sign up</Link>
			</p>
		</div>

		<Button className='btn-google-signin' variant='outline-primary'>
		<img src={googleIcon} alt="" className="logo-icon mr-2"/> <span>Sign in with Google</span>
		</Button>
		</div>)
}

export default LoginPage;