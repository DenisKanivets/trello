import React, { Component } from "react";
import { connect } from "react-redux";
import { FaHome, FaTrello } from "react-icons/fa";
import { Link, withRouter } from "react-router-dom";
import { GoogleLogout } from "react-google-login";
import { logout } from "../../store/auth/thunk";
import "./header.scss";

class Header extends Component {
  logout = () => {
    const { onLogout, history } = this.props;
    onLogout();
    localStorage.removeItem("userId");
    history.push("");
  };

  render() {
    const { loggedIn, userInfo: { name, image, type } } = this.props;
    return (
      <div className='header'>
        {loggedIn ? <Link className='home' to='/boards'><FaHome/></Link> : <div className='home'/>}
        <div className='title'>
          <FaTrello/>
          <h1>SIMPLE TRELLO</h1>
        </div>
        {loggedIn && (
          <div className='user-content'>
            <img src={image} alt="avatar"/>
            <h5>{name}</h5>
            {type === "facebook" ? (
              <button className='logout-btn' onClick={(e) => {
                e.preventDefault();
                (window.FB && window.FB.logout());
                this.logout();
              }}>Log Out
              </button>
            ) : (
              <GoogleLogout
                clientId="816686919963-lbn6q2to8stafamcc7pjn225mgpndqdl.apps.googleusercontent.com"
                onLogoutSuccess={this.logout}
                onFailure={this.logout}
                render={renderProps => <button className='logout-btn' onClick={renderProps.onClick}>Log Out</button>}
              />
            )}
          </div>
        )}
        <div className='home'/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.auth;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(logout())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));
