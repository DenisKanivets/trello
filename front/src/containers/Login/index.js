import React, { Component } from 'react';
import { connect } from 'react-redux';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';
import { login, getUser } from '../../store/auth/thunk';
import './login.scss';

class Login extends Component {
  componentDidMount() {
    const userIdFromLS = localStorage.getItem('userId');
    if (userIdFromLS) {
      const userId = userIdFromLS.substring(userIdFromLS.indexOf('-') + 1, userIdFromLS.length);
      this.props.onGetUser(userId);
    }
  }

  responseFacebook = response => {
    const user = {
      type: 'facebook',
      userId: response.userID,
      name: response.name,
      image: response.picture.data.url,
    };
    this.props.onLogin(user);
  };

  responseGoogle = response => {
    const user = {
      type: 'google',
      userId: response.googleId,
      name: response.profileObj.name,
      image: response.profileObj.imageUrl,
    };
    this.props.onLogin(user);
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    const { loggedIn, history, userInfo } = this.props;
    if (loggedIn) {
      localStorage.setItem('userId', `${userInfo.type}-${userInfo.userId}`);
      history.push('boards');
    }
  }

  render() {
    return (
      <div>
        {!this.props.loggedIn && <div className='login-content'>
          <h4>LOGIN</h4>
          <div>
            <FacebookLogin
              appId="731205570639241"
              size={'small'}
              fields="name,email,picture"
              callback={this.responseFacebook}
            />
            <br/>
            <br/>
            <GoogleLogin
              clientId="816686919963-lbn6q2to8stafamcc7pjn225mgpndqdl.apps.googleusercontent.com"
              buttonText="LOGIN WITH GOOGLE"
              onSuccess={this.responseGoogle}
              onFailure={this.responseGoogle}
            />
          </div>
        </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state.auth;
};

const mapDispatchToProps = dispatch => {
  return {
    onLogin: payload => dispatch(login(payload)),
    onGetUser: payload => dispatch(getUser(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);