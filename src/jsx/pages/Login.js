import React, { useState } from 'react'
import { connect, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import { loadingToggleAction,loginAction,
} from '../../store/actions/AuthActions';
import { Row, Col, Card,  Tab, Nav, Button } from 'react-bootstrap'
//
import logo from '../../img/logo.png'
import eyeOff from '../../img/eye-off.svg'
import googleIcon from '../../img/google-icon.png'

function Login (props) {
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


	const tabData = [
		{
		  name: 'Sign in',
		  content:	<div>
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
		  </div>

		},
		{
		  name: 'Register',
		  content:<div>
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
		  </div>
		},

	
	  ]
  return (
  
		<div className="login-form-bx auth-page">
			<div className="container">
				<div className="row">
				<div className="col-lg-8 col-md-7 d-flex box-skew1 relative login-leftpanel">
						<div className="inner-content align-self-center">
							<Link to="/dashboard" className="login-logo">
								<img src={logo} alt="" className="logo-icon mr-2"/>
							</Link>
							<h2 className="m-b10 text-white">Sign In to <br/> Trendy Website</h2>
							<p className="m-b40 text-white">Boost your engagement & productivity, streamline processes, and make faster communications.</p>
						</div>
						<div className='login-center-img'>

						</div>
					</div>
					<div className="col-lg-4 col-md-5 box-skew d-flex pl-0 pr-0 login-rightpanel">
						<div className="authincation-content">

							
						<Tab.Container defaultActiveKey={tabData[0].name.toLowerCase()}>
                <Nav as='ul' className='nav-pills light'>
				{tabData.map((data, i) => (
                      <Nav.Item as='li' key={i}>
                        <Nav.Link eventKey={data.name.toLowerCase()}>
                          <i className={`la la-${data.icon} mr-2`} />
                          {data.name}
                        </Nav.Link>
                      </Nav.Item>
                    ))}
                </Nav>
                <Tab.Content className='auth-tab-content'>
				{tabData.map((data, i) => (
                        <Tab.Pane eventKey={data.name.toLowerCase()} key={i}>
							<div>{data.content}</div>
						
                         
                        </Tab.Pane> 
                      )
                  )}
                </Tab.Content>
              </Tab.Container>
							
						</div>
					</div>
				
				</div>
			</div>
		</div>
		
    )
}

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        successMessage: state.auth.successMessage,
        showLoading: state.auth.showLoading,
    };
};
export default connect(mapStateToProps)(Login);