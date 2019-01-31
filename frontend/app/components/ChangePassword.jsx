import React, { Component } from 'react'
import services from "./../services"
import Loader from './Loader'
import Password from "./Password"

class ChangePassword extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      email: '',
      repeatPassword: '',
      error: '',
      changePasswordCode: '',
      showCode: false,
      isLoader: false
    }
    this.changePassword = this.changePassword.bind(this)
  }

  changePassword = () => {
    const { login, password, repeatPassword, changePasswordCode } = this.state
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const validPassword = password.match(passwordRegex)

    if (!password || !login || !repeatPassword) {
      return this.setState({ error: 'Missing params' })
    }

    if (!validPassword) {
      return this.setState({
        error: 'Please, enter a password that meets all of the requirements:\n\t' +
          '* at least 8 characters\n\t' +
          '* at least 1 number\n\t' +
          '* at least 1 upper-case character\n\t' +
          '* at  least 1 lower-case character'
      })
    }

    if (password !== repeatPassword) {
      return this.setState({ error: 'Passwords do not match' })
    }

    this.setState({ isLoader: true })

    services.changePassword({ login, password, changePasswordCode })
      .then((res) => {
        const { error, message, email } = res

        if (message === 'code') {
          return this.setState({ email, showCode: true, error: '', isLoader: false })
        }

        if (message === 'OK') {
          this.setState({ isLoader: false })
          return this.props.history.push('/login')
        }

        this.setState({ error: error || message, isLoader: false })
      })
      .catch((error) => {
        this.setState({ error: error.toString() })
      })

  }

  render() {
    const { login, password, showCode, email, changePasswordCode, error, repeatPassword, isLoader } = this.state
    if (showCode) {
      return (
        <div className="login">
          {isLoader ? <Loader/> :
            <div className="login__form">
              <div>
                <label className="login__label" htmlFor="code">
                  <input placeholder={`code from ${email}`} className="login__input" type="text"
                         onChange={(event) => this.setState({ changePasswordCode: event.target.value })}
                         value={changePasswordCode}
                         onKeyUp={e => e.keyCode === 13 && this.changePassword()}/>
                </label>
              </div>
              {error ? <div className="login__label" style={{ color: 'red' }}> {error}</div> : null}
              <div>
                <button className="login__btn-submit" onClick={() => {
                  this.setState({ isLoader: true })
                  this.changePassword()
                }}>Send
                </button>
              </div>
            </div>}
        </div>
      )
    } else {
      return (
        <div className="login">
          {isLoader ? <Loader/> :
            <div className="login__form">
              <div className={"form_name"}>Change password</div>
              <div>
                <label className="login__label" htmlFor="login">
                  <input placeholder="Login" className="login__input" type="text"
                         style={{ color: login ? 'white' : null }}
                         onChange={(event) => this.setState({ login: event.target.value })}
                         value={login}
                         onKeyUp={e => e.keyCode === 13 && this.changePassword()}
                  />
                </label>
              </div>
              <Password value={password} parentStateKey={'password'} parent={this} placeholder={'Password'}/>
              <Password value={repeatPassword} parentStateKey={'repeatPassword'} parent={this}
                        placeholder={'Repeat Password'}/>

              {error ? <div className="login__label error" style={{ color: 'red' }}> {error}</div> : null}
              <div>
                <button className="login__btn-submit" onClick={() => {
                  this.changePassword()
                }}>Change password
                </button>
              </div>

              <div className={"login__label"}>
                <div className="auth__link" onClick={() => {
                  this.setState({ isLoader: true })
                  this.props.history.push('/register')
                }}>Don't have an account?
                </div>
                <div className="auth__link" onClick={() => {
                  this.setState({ isLoader: true })
                  this.props.history.push('/login')
                }}>Already have an account?
                </div>
              </div>
            </div>}
        </div>
      )
    }
  }
}

export default ChangePassword
