import React from 'react';
import WindRoseChart from './WindRoseChart';
import connect from 'react-redux/es/connect/connect';
import actions from '../../actions';

class UnauthorizationInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dangerRadius: '',
      editName: false,
      editDangerRadius: false,
      component: 'WindRoseChart',
      validDistance: true,
    };
  }

  render() {
    if (!this.props.open) {
      return null;
    }
    return (
      <div>
        <div className="unauth_info">
          <button className="point__data-btn-close" onClick={this.props.close}/>
          <div>If you want to save markers and receive wind notifications you need to register</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    info: state.get('info'),
  };
}

export default connect(mapStateToProps, actions)(UnauthorizationInfo);