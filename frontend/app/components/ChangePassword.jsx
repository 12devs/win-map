import React, { Component } from 'react';
import services from "./../services";
import Loader from './Loader';

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
      repeatPassword: '',
      error: '',
      changePasswordCode: '',
      showCode: false,
      isLoader: false
    };
    this.changePassword = this.changePassword.bind(this);
  }

  changePassword = () => {
    const { login, password, repeatPassword, changePasswordCode } = this.state;
    if (password === repeatPassword) {
      services.changePassword({ login, password, changePasswordCode })
        .then((res) => {
          const { error, message, email } = res;
          if (message === 'code') {
            this.setState({ isLoader: false });
            return this.setState({ email, showCode: true });
          }
          if (message !== 'OK') {
            this.setState({ isLoader: false });
            error ? this.setState({ error }) : this.setState({ error: message });
          } else {
            this.setState({ isLoader: false });
            return location.assign('/login');
          }
        })
        .catch((error) => {
          this.setState({ error: error.toString() });
        });
    }
    else {
      this.setState({ error: 'Passwords do not match' });
    }
  };

  render() {
    const { login, password, showCode, email, changePasswordCode, error, repeatPassword, isLoader } = this.state;
    if (showCode) {
      return (
        <div className="login">
          {isLoader ? <Loader/> :
            <div className="login__form">
              <div>
                <label className="login__label" htmlFor="code">
                  <input placeholder={`code from ${email}`} className="login__input" type="text"
                         onChange={(event) => this.setState({ changePasswordCode: event.target.value })}
                         value={changePasswordCode}/>
                </label>
              </div>
              {error ? <div className="login__label" style={{ color: 'red' }}> {error}</div> : null}
              <div>
                <button className="login__btn-submit" onClick={() => {
                  this.setState({ isLoader: true });
                  this.changePassword();
                }}>Send
                </button>
              </div>
            </div>}
        </div>
      );
    } else {
      return (
        <div className="login">
          {isLoader ? <Loader/> :
            <div className="login__form">
              <div className={"form_name"}>
                Change password form
              </div>
              <div>
                <label className="login__label" htmlFor="login">
                  <input placeholder="Login" className="login__input" type="text"
                         style={{ color: login ? 'white' : null }}
                         onChange={(event) => this.setState({ login: event.target.value })} value={login}/>
                </label>
              </div>
              <div>
                <label className="login__label" htmlFor="password">
                  <input placeholder="New password" className="login__input" type="text"
                         style={{ color: password ? 'white' : null }}
                         onChange={(event) => this.setState({ password: event.target.value })} value={password}/>
                </label>
              </div>
              <div>
                <label className="login__label" htmlFor="repeatPassword">
                  <input placeholder="Repeat Password" className="login__input" type="text"
                         style={{ color: repeatPassword ? 'white' : null }}
                         onChange={(event) => this.setState({ repeatPassword: event.target.value })}
                         value={repeatPassword}/>
                </label>
              </div>
              {error ? <div className="login__label" style={{ color: 'red' }}> {error}</div> : null}
              <div>
                <button className="login__btn-submit" onClick={() => {
                  this.setState({ isLoader: true });
                  this.changePassword();
                }}>Change password
                </button>
              </div>

              <div className={"login__label"}>
                <br/>
                <div>Don't have an account?
                  <a style={{ color: 'white' }} href={'#'} onClick={() => {
                    this.setState({ isLoader: true });
                    location.assign('/register');
                  }}> You can register here.</a>
                </div>
                <br/>
                <div>
                  <a style={{ color: 'white' }} href={'#'} onClick={() => {
                    this.setState({ isLoader: true });
                    location.assign('/login');
                  }}> Come back</a>
                </div>
              </div>
            </div>}
        </div>
      );
    }
  }
}

export default ChangePassword;
