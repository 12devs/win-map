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
        console.log(res.token);
        localStorage.setItem('windToken', res.token)
      })
  }

  render() {
    const { login, password } = this.state;

    return (
      <div>
        <h1>login</h1>
        <div>
          <span>login </span>
          <input type="text" onChange={(event) => this.setState({ login: event.target.value })} value={login}/>
        </div>
        <div>
          <span>password </span>
          <input type="text" onChange={(event) => this.setState({ password: event.target.value })} value={password}/>
        </div>
        <div>
          <button onClick={this.login}>login</button>
        </div>
      </div>
    )
  }
}

export default Login;
