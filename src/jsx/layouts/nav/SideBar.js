/// Menu
import MetisMenu from "metismenujs";
import React, { Component } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import monitorIcon from "../../../img/monitor.png";
import assetsIcon from "../../../img/assets.png";
import layoutIcon from "../../../img/layouts.png";
import pushIcon from "../../../img/calendar.png";
import integrationIcon from "../../../img/integration.png";
import reportIcon from "../../../img/report.png";
import subscriptionIcon from "../../../img/subscription.png";
import settingIcon from "../../../img/setting.png";

import Logout from "./Logout";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new MetisMenu(this.$el);
  }
  componentWillUnmount() {
  }
    render() {
        return (
            <div className="mm-wrapper">
                <ul className="metismenu" ref={(el) => (this.el = el)}>
                    {this.props.children}
                </ul>
            </div>
        );
    }
}

class SideBar extends Component {
  /// Open menu
  componentDidMount() {
    // sidebar open/close
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
  }
  state = {
    loveEmoji: false,
  };
  render() {
    /// Path
    let path = window.location.pathname;
    path = path.split("/");
    path = path[path.length - 1];
    /// Active menu
    let screen = [
        "", "display",
      ], media = ['assets'],
      layouts = ['layouts'],
      push = ['push'],
      integrations = ['integrations'],
      reports = ['reports'],
      subscriptions = ['subscriptions'],
      settings = ['settings'];
    return (
      <div className="deznav sidebar-nav-common">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">    
            <li className={`${screen.includes(path) ? "mm-active" : ""}`}>
              <Link to="/display" className="ai-icon" >
                <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={monitorIcon} alt="menu-icon" /></span>
                <span className="nav-text">Display</span>
              </Link>
            </li>
            <li className={`${media.includes(path) ? "mm-active" : ""}`}>
              <Link to="/assets" className="ai-icon" >
                <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={assetsIcon} alt="menu-icon" /></span>
                <span className="nav-text">Assets</span>
              </Link>
            </li>
            <li className={`${layouts.includes(path) ? "mm-active" : ""}`}>
              <Link to="/layouts" className="ai-icon" >
                <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={layoutIcon} alt="menu-icon" /></span>
                <span className="nav-text">Layouts</span>
              </Link>
            </li>
            <li className={`${push.includes(path) ? "mm-active" : ""}`}>
              <Link to="/push" className="ai-icon" >
                <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={pushIcon} alt="menu-icon" /></span>
                <span className="nav-text">Push</span>
              </Link>
            </li>
            <li className={`${integrations.includes(path) ? "mm-active" : ""}`}>
              <Link to="/integrations" className="ai-icon" >
                <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={integrationIcon} alt="menu-icon" /></span>
                <span className="nav-text">Integrations</span>
              </Link>
            </li>
            <li className={`${reports.includes(path) ? "mm-active" : ""}`}>
              <Link to="/reports" className="ai-icon" >
                <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={reportIcon} alt="menu-icon" /></span>
                <span className="nav-text">Reports</span>
              </Link>
            </li>
            <li className={`${subscriptions.includes(path) ? "mm-active" : ""}`}>
              <Link to="/subscriptions" className="ai-icon" >
                <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={subscriptionIcon} alt="menu-icon" /></span>
                <span className="nav-text">My Subscriptions</span>
              </Link>
            </li>
            <li className={`${settings.includes(path) ? "mm-active" : ""}`}>
              <Link to="/settings" className="ai-icon" >
                <span className="nav-menu-icon"> <img className="sidebar-menu-icon" src={settingIcon} alt="menu-icon" /></span>
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </MM>
          <Logout />
      
			</PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
