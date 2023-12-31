import { lazy, Suspense, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
/// Components
import Index from './jsx/index';
import { connect, useDispatch } from 'react-redux';
import { Route, Switch, withRouter } from 'react-router-dom';
// action
import { checkAutoLogin, checkAutoPermission } from './services/AuthService';
import { isAuthenticated, isVerified } from './store/selectors/AuthSelectors';
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";
import Webplayer from './jsx/components/web-player';
import Layout from './jsx/components/layout/Layout';
import PushScreen from './jsx/components/push/PushScreen';
import Error404 from './jsx/pages/Error404';
import Verification from './jsx/pages/VerificationBkp';
// import { socket } from './utils/socket';


const SignUp = lazy(() => import('./jsx/pages/Registration'));
const ForgotPassword = lazy(() => import('./jsx/pages/ForgotPassword'));
const Login = lazy(() => {
    return new Promise(resolve => {
        setTimeout(() => resolve(import('./jsx/pages/Login')), 500);
    });
});
function App(props) {
    console.log("sdsad",props)
    let path = window.location.pathname
    path = path.split('/')
    path = path[path.length - 1]
    // const [isConnected, setIsConnected] = useState(socket.connected);
    const dispatch = useDispatch();
    useEffect(() => {
        if (path !== 'web-player') {
            checkAutoLogin(dispatch, props.history);
            checkAutoPermission(dispatch, props.history)
        }

    }, [dispatch, props.history]);
    let routes = (
        <Switch>
            <Route path='/login' component={Login} />
            <Route path='/page-register' component={SignUp} />
            <Route path='/page-forgot-password' component={ForgotPassword} />
            <Route path='/layout' component={Layout} />
            <Route path='/push' component={PushScreen} />
        </Switch>
    );
    if (path === 'web-player') {
        return (
            <Switch>
                <Route path='/web-player' component={Webplayer} />
            </Switch>
        )
    }
    else if (props.isAuthenticated) {
        if(props.isVerified){
            return (
                <>
                    <Suspense fallback={
                        <div id="preloader">
                            <div className="sk-three-bounce">
                                <div className="sk-child sk-bounce1"></div>
                                <div className="sk-child sk-bounce2"></div>
                                <div className="sk-child sk-bounce3"></div>
                            </div>
                        </div>
                    }
                    >
                        <Index />
                    </Suspense>
                </>
            );

        }else{
            return  <div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    <Switch>
                        <Route path='/verification' component={Verification} />
                    </Switch>
                </Suspense>
            </div>

        }

    } else {
        
        return (
            <div className="vh-100">
                <Suspense fallback={
                    <div id="preloader">
                        <div className="sk-three-bounce">
                            <div className="sk-child sk-bounce1"></div>
                            <div className="sk-child sk-bounce2"></div>
                            <div className="sk-child sk-bounce3"></div>
                        </div>
                    </div>
                }
                >
                    {routes}
                </Suspense>
            </div>
        );
    }
};

const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
        isVerified: isVerified(state),
    };
};

export default withRouter(connect(mapStateToProps)(App)); 
