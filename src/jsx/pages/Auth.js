import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Tab, Nav,  } from 'react-bootstrap'
import logo from '../../img/logo.png'
import RegisterPage from '../components/auth/Registrantion';
import LoginPage from '../components/auth/Login';

function Auth (props) {



	const tabData = [
		{
		  name: 'Sign in',
		  content:	<LoginPage props={props} />
		},
		{
		  name: 'Register',
		  content: <RegisterPage props={props} />
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
							<h2 className="m-b10 text-white">Sign In to <br/> Trendyy Website</h2>
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
export default connect(mapStateToProps)(Auth);