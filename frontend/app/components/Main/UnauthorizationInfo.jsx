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

    return (
      <div>
        <div className='point__container' onClick={this.props.close}/>
        <div className="notification">
          dhcfigyueriufhgiurehfiurehfiherf
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