import React, { Component } from 'react';
import services from "./../services";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
    this.login = this.login.bind(this);
  }

  login() {
    const { login, password } = this.state;
    return services.login(login, password)
      .then(res => {
        localStorage.setItem('windToken', res.token);
        location.assign('/main');
      })
  }

  render() {
    const { login, password } = this.state;

    return (
      <div className="login">
        <div className="login__form">
          <div>
            <label className="login__label" htmlFor="login">
              <input placeholder="Login" className="login__input" type="text" onChange={(event) => this.setState({ login: event.target.value })} value={login}/>
            </label>
          </div>
          <div>
            <label className="login__label" htmlFor="password">
              <input placeholder="Password" className="login__input" type="text" onChange={(event) => this.setState({ password: event.target.value })} value={password}/>
            </label>
          </div>
          <div>
            <button className="login__btn-submit" onClick={this.login}>Login</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;
