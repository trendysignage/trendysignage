/// Menu
import MetisMenu from "metismenujs";
import React, { Component } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";

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
        "", "screen",
      ], media = ['media'];
    return (
      <div className="deznav">
        <PerfectScrollbar className="deznav-scroll">
          <MM className="metismenu" id="menu">    
            <li className={`${screen.includes(path) ? "mm-active" : ""}`}>
              <Link to="screen" className="ai-icon" >
                <i className="flaticon-381-television"></i>
                <span className="nav-text">Screen</span>
              </Link>
            </li>
            <li className={`${media.includes(path) ? "mm-active" : ""}`}>
              <Link to="media" className="ai-icon" >
                <i className="flaticon-381-film-strip-1"></i>
                <span className="nav-text">Media</span>
              </Link>
            </li>
            <li className={`${media.includes(path) ? "mm-active" : ""}`}>
              <Link to="composition" className="ai-icon" >
                <i className="flaticon-381-edit"></i>
                <span className="nav-text">Composition</span>
              </Link>
            </li>
            <li className={`${media.includes(path) ? "mm-active" : ""}`}>
              <Link to="publish" className="ai-icon" >
                <i className="flaticon-381-fast-forward-1"></i>
                <span className="nav-text">Publish</span>
              </Link>
            </li>
            <li className={`${media.includes(path) ? "mm-active" : ""}`}>
              <Link to="apps" className="ai-icon" >
                <i className="flaticon-381-app"></i>
                <span className="nav-text">Apps</span>
              </Link>
            </li>
            <li className={`${media.includes(path) ? "mm-active" : ""}`}>
              <Link to="reports" className="ai-icon" >
                <i className="flaticon-381-equal"></i>
                <span className="nav-text">Reports</span>
              </Link>
            </li>
            <li className={`${media.includes(path) ? "mm-active" : ""}`}>
              <Link to="plan" className="ai-icon" >
                <i className="flaticon-381-database"></i>
                <span className="nav-text">My Plan</span>
              </Link>
            </li>
            <li className={`${media.includes(path) ? "mm-active" : ""}`}>
              <Link to="settings" className="ai-icon" >
                <i className="flaticon-381-settings-5"></i>
                <span className="nav-text">Settings</span>
              </Link>
            </li>
          </MM>

			</PerfectScrollbar>
      </div>
    );
  }
}

export default SideBar;
