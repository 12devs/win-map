import React, { Component } from 'react';
import services from "./../services";
import Loader from './Loader';
import connect from 'react-redux/es/connect/connect';
import actions from '../actions';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: '',
      password: '',
      code: '',
      email: '',
      error: '',
      showCode: false,
      isLoader: false
    };
    this.login = this.login.bind(this);
  }

  login = () => {
    const { login, password, code } = this.state;
    const { places, dangers } = this.props;
    return services.login({ login, password, code })
      .then(res => {
        const { message, email, error, token } = res;
        this.setState({ code: '' });
        if (message === 'code') {
          this.setState({ error: '' });
          this.setState({ isLoader: false });
          return this.setState({ showCode: true, email });
        }
        if (message !== 'OK') {
          this.setState({ isLoader: false });
          error ? this.setState({ error }) : this.setState({ error: message });
        }
        else {
          localStorage.setItem('windToken', token);
          return services.addPoints({ places, dangers }).then(res => {
            return this.props.history.push('/main');
          });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  render() {
    const { login, password, showCode, email, code, error, isLoader } = this.state;

    if (showCode) {
      return (
        <div className="login">
          {isLoader ? <Loader/> :
            <div className="login__form">
              <div>
                <label className="login__label" htmlFor="code">
                  <input placeholder={`code from ${email}`} className="login__input" type="text"
                         onChange={(event) => this.setState({ code: event.target.value })} value={code}/>
                </label>
              </div>
              {error ? <div className="login__label" style={{ color: 'red' }}>{error}</div> : null}
              <div>
                <button className="login__btn-submit" onClick={() => {
                  this.setState({ isLoader: true });
                  this.login();
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
              <div className="form_name">Sign in</div>
              <div>
                <label className="login__label" htmlFor="login">
                  <input placeholder="Login" className="login__input" type="text"
                         style={{ color: login ? 'white' : null }}
                         onChange={(event) => this.setState({ login: event.target.value })} value={login}/>
                </label>
              </div>
              <div>
                <label className="login__label" htmlFor="password">
                  <input placeholder="Password" className="login__input" type="password"
                         style={{ color: password ? 'white' : null }}
                         onChange={(event) => this.setState({ password: event.target.value })} value={password}/>
                </label>
              </div>
              {
                error && <div className="login__label" style={{ color: 'red' }}>{error}</div>
              }
              <div>
                <button className="login__btn-submit" onClick={() => {
                  this.setState({ isLoader: true });
                  this.login();
                }}>Login
                </button>
              </div>

              <div className="login__label">
                <div className="auth__link" onClick={() => {
                  this.setState({ isLoader: true });
                  this.props.history.push('/register');
                }}>Don't have an account?
                </div>
                <div className="auth__link" onClick={() => {
                  this.setState({ isLoader: true });
                  this.props.history.push('/ChangePassword');
                }}>Forgot your password?
                </div>
              </div>

            </div>}
        </div>
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
  };
}

export default connect(mapStateToProps, actions)(Login);

