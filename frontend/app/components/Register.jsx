import React, { Component } from 'react';
import services from "./../services";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
    };
    this.register = this.register.bind(this);

  }

  register() {
    const { login, password } = this.state;
    return services.register(login, password)
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
          <button className="login__btn-submit" onClick={this.register}>Register</button>
        </div>
      </div>
      </div>
    )
  }
}

export default Register;
