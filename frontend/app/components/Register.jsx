import React, { Component } from 'react';
import services from "./../services";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
      repeatPassword: '',
      error: ''
    };
    this.register = this.register.bind(this);
  }

  register = () => {
    const { login, password, repeatPassword, email } = this.state;

    if (password === repeatPassword) {
      services.register({ login, password, email })
        .then(res => {
          const { message, error } = res;
          if (message !== 'OK') {
            this.setState({ error });
          } else {
            location.assign('/login');
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
    const { login, password, repeatPassword, email } = this.state;

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
                     onChange={(event) => this.setState({ repeatPassword: event.target.value })}
                     value={repeatPassword}/>
            </label>
          </div>
          <div>
            <label className="login__label" htmlFor="email">
              <input placeholder="email" className="login__input" type="text"
                     onChange={(event) => this.setState({ email: event.target.value })} value={email}/>
            </label>
          </div>
          {this.state.error ? <div className="login__label"> {this.state.error}</div> : null}
          <div>
            <button className="login__btn-submit" onClick={this.register}>Register</button>
          </div>
        </div>
      </div>
    )
  }
}

export default Register;
