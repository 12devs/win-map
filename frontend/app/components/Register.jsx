import React, { Component } from 'react';
import services from "./../services";
import Loader from './Loader';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      email: '',
      repeatPassword: '',
      error: '',
      isLoader: false
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
            error ? this.setState({ error }) : this.setState({ error: message });
            this.setState({ isLoader: false });
          } else {
            location.assign('/login');
          }
        })
        .catch((error) => {
          this.setState({ error: error.toString() });
        });
    }
    else {
      this.setState({ isLoader: false });
      this.setState({ error: 'Passwords do not match' });
    }
  };

  render() {
    const { login, password, repeatPassword, email, isLoader } = this.state;

    return (
      <div className="login">
        {isLoader ? <Loader/> :
          <div className="login__form">
            <div className={"form_name"}>
              Register form
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
                <input placeholder="Password" className="login__input" type="text"
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
            <div>
              <label className="login__label" htmlFor="email">
                <input placeholder="email" className="login__input" type="text"
                       style={{ color: email ? 'white' : null }}
                       onChange={(event) => this.setState({ email: event.target.value })} value={email}/>
              </label>
            </div>
            {this.state.error ? <div className="login__label" style={{ color: 'red' }}> {this.state.error}</div> : null}
            <div>
              <button className="login__btn-submit" onClick={() => {
                this.setState({ isLoader: true });
                this.register();
              }}>Register
              </button>
            </div>
            <div className={"login__label"}>
              <br/>
              <div>Already have an account?
                <a style={{ color: 'white' }} href={'#'} onClick={() => {
                  this.setState({ isLoader: true });
                  location.assign('/login');
                }}> You can come in it
                  here.</a>
              </div>
            </div>
          </div>}
      </div>
    );
  }
}

export default Register;
