import React, { Component } from 'react'
import services from "./../services"
import Loader from './Loader'
import Password from "./Password"
import connect from 'react-redux/es/connect/connect'
import actions from '../actions'

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      login: '',
      password: '',
      email: '',
      repeatPassword: '',
      error: '',
      isLoader: false
    }
    this.register = this.register.bind(this)
  }

  register = () => {
    const { login, password, repeatPassword, email } = this.state
    const { places, dangers } = this.props
    const loginRegex = /^[a-zA-Z0-9]{3,}$/
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/
    const validLogin = login.match(loginRegex)
    const validPassword = password.match(passwordRegex)

    if (!password || !login || !repeatPassword || !email) {
      return this.setState({ error: 'Missing params' })
    }

    if (!validLogin) {
      return this.setState({
        error: 'Please, enter a login that meets all of the requirements:\n\t' +
          '* at least 2 characters\n\t' +
          '* only letters and numbers'
      })
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
      return this.setState({ error: 'Passwords do not match', isLoader: false })
    }

    this.setState({ isLoader: true })

    services.register({ login, password, email, places, dangers })
      .then(res => {
        const { message, error } = res

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
    const { login, password, repeatPassword, email, isLoader, error } = this.state

    return (
      <div className="login">
        {isLoader ? <Loader/> :
          <div className="login__form">
            <div className={"form_name"}> Sign up</div>
            <div>
              <label className="login__label" htmlFor="login">
                <input placeholder="Login" className="login__input" type="text"
                       style={{ color: login ? 'white' : null }}
                       onChange={(event) => this.setState({ login: event.target.value })}
                       value={login}
                       onKeyUp={e => e.keyCode === 13 && this.register()}/>
              </label>
            </div>

            <Password value={password} parentStateKey={'password'} parent={this} placeholder={'Password'}/>
            <Password value={repeatPassword} parentStateKey={'repeatPassword'} parent={this}
                      placeholder={'Repeat Password'}/>

            <div>
              <label className="login__label" htmlFor="email">
                <input placeholder="Email" className="login__input" type="text"
                       style={{ color: email ? 'white' : null }}
                       onChange={(event) => this.setState({ email: event.target.value })}
                       value={email}
                       onKeyUp={e => e.keyCode === 13 && this.register()}/>
              </label>
            </div>
            {error ?
              <div className="login__label error">
                {error}
              </div> : null}
            <div>
              <button className="login__btn-submit" onClick={() => {
                this.register()
              }}>Register
              </button>
            </div>
            <div className={"login__label"}>
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

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
  }
}

export default connect(mapStateToProps, actions)(Register)
