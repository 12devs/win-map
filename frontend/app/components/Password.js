import React, { Component } from 'react';

const options = {
  true: {
    inputType: 'password',
    buttonClass: 'image__hide'
  },
  false: {
    inputType: 'input',
    buttonClass: 'image__show'
  },
};

class Password extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: true,
    };
    this.selectForm = this.selectForm.bind(this);

  }

  selectForm = (parent) => {
    switch (parent.props.match.url) {
      case '/login':
        return parent.login()
      case '/register':
        return parent.register()
      case '/ChangePassword':
        return parent.changePassword()
    }
  }

  render() {
    const { value, parentStateKey, parent, placeholder } = this.props;
    const { hide } = this.state;
    const {inputType, buttonClass} = options[hide];

    return (
      <div>
        <label className="login__label" htmlFor="password">
            <input placeholder={placeholder} className="login__input" type={inputType}
                   style={{ color: value ? 'white' : null }}
                   onChange={(event) => parent.setState({ [parentStateKey]: event.target.value })} value={value}
                   onKeyUp={(e) => e.keyCode === 13 && this.selectForm(parent)}>
            </input>
            <span className={`login__input__password__button ${buttonClass}`} onClick={()=>this.setState({hide: !this.state.hide})}/>
        </label>
      </div>
    )
  }
}

export default Password;
