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
      .then(res => {
        console.log(res);
      })
  }

  render() {
    const { login, password } = this.state;

    return (
      <div>
        <h1>register</h1>
        <div>
          <span>login </span>

          <input type="text" onChange={(event) => this.setState({ login: event.target.value })} value={login}/>
        </div>
        <div>
          <span>password </span>
          <input type="text" onChange={(event) => this.setState({ password: event.target.value })} value={password}/>
        </div>
        <div>
          <button onClick={this.register} >register</button>
        </div>
      </div>
    )
  }
}

export default Register;
