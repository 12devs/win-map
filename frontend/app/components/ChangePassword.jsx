import React, { Component } from 'react';
import services from "./../services";

class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
      repeatPassword: '',
      error: '',
      changePasswordCode:'',
      showCode: false,
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
            return this.setState({ email, showCode: true });
          }
          if (message !== 'OK') {
            this.setState({ error });
          } else {
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
    const { login, password, showCode, email, changePasswordCode, error, repeatPassword } = this.state;
    console.log(showCode);
    if (showCode) {
      return (
        <div className="login">
          <div className="login__form">
            <div>
              <label className="login__label" htmlFor="code">
                <input placeholder={`code from ${email}`} className="login__input" type="text"
                       onChange={(event) => this.setState({ changePasswordCode: event.target.value })} value={changePasswordCode}/>
              </label>
            </div>
            {error ? <div className="login__label"> {error}</div> : null}
            <div>
              <button className="login__btn-submit" onClick={this.changePassword}>Send</button>
            </div>
          </div>
        </div>
      )
    } else {
      return (
        <div className="login">
          <div className="login__form">
            <div>
              <label className="login__label" htmlFor="login">
                <input placeholder="Login" className="login__input" type="text"
                       onChange={(event) => this.setState({ login: event.target.value })} value={login}/>
              </label>
            </div>
            <div>
              <label className="login__label" htmlFor="password">
                <input placeholder="Password" className="login__input" type="text"
                       onChange={(event) => this.setState({ password: event.target.value })} value={password}/>
              </label>
            </div>
            <div>
              <label className="login__label" htmlFor="repeatPassword">
                <input placeholder="Repeat Password" className="login__input" type="text"
                       onChange={(event) => this.setState({ repeatPassword: event.target.value })} value={repeatPassword}/>
              </label>
            </div>
            {error ? <div className="login__label"> {error}</div> : null}
            <div>
              <button className="login__btn-submit" onClick={this.changePassword}>changePassword</button>
            </div>
          </div>
        </div>
      )
    }


  }
}

export default ChangePassword;
