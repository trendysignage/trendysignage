import React  from 'react';
import {connect, useDispatch } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

import { logout } from '../../../store/actions/AuthActions';
import { isAuthenticated } from '../../../store/selectors/AuthSelectors';
import logoutIcon from "../../../img/logout.png";
function LogoutPage(props){
    const dispatch = useDispatch();

    function onLogout() {
       dispatch(logout(props.history));
       // window.location.reload();
    }
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];
    let  media = ['media'];
    return(
        <ul className="logout-link">
        <li className={`${media.includes(path) ? "mm-active" : ""}`}>
            <Link onClick={onLogout} className="ai-icon" >
              <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={logoutIcon} alt="menu-icon" /></span>
              <span className="nav-text">Log out </span>
            </Link>
          </li>
        </ul>
    )
} 
const mapStateToProps = (state) => {
    return {
        isAuthenticated: isAuthenticated(state),
    };
};

export default withRouter(connect(mapStateToProps)(LogoutPage));