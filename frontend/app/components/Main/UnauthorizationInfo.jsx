import React from 'react';

class UnauthorizationInfo extends React.Component {

  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <div>
        <div className="unauth_info" >
          <button className="point__data-btn-close" onClick={this.props.close}/>
          <div onClick={()=>{
            this.props.history.push('/register');
          }}>If you want to save markers and receive wind notifications you need to register</div>
        </div>
      </div>
    );
  }
}

export default UnauthorizationInfo;