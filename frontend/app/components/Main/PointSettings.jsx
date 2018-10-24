import React from 'react';
import { connect } from 'react-redux';
import actions from './../../actions';
import services from "./../../services";

class PointSettings extends React.Component {
  constructor(props) {
    super(props);
    this.delMarker = this.delMarker.bind(this);
  }

  delMarker() {
    const {point, type} = this.props.info.toJS();
    const {id} = point;
    return services.deletePoint({
      [type]: { id },
    })
      .then(res => {
        if (type === 'place'){
          const places = this.props.places.toJS().filter(el => !(el.id === id));
          this.props.updateMainData({ places });
        }
        if (type === 'danger') {
          const dangers = this.props.dangers.toJS().filter(el => !(el.id === id));
          this.props.updateMainData({ dangers });
        }
      });
  };

  render() {
    const {point, type} = this.props.info.toJS();

    if (!(point && type)) {
      return null
    }

    return (
      <div style={{
        whiteSpace: "pre",
        position: "absolute",
        left: "100px",
        top: "300px",
        zIndex: 1000,
        padding: '50px',
        backgroundColor: 'white',
        margin: "auto",
        width: "60%"
      }}>
        <button onClick={() => {
          this.props.changeInfo({point: null, type: null});
        }}>close
        </button>
        <button onClick={() => {
          this.delMarker()
            .then(()=>{
              this.props.changeInfo({point: null, type: null});
            });
          return false
        }}>delete
        </button>
        {JSON.stringify(point, null, 2)}
        {type}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    places: state.get('places'),
    dangers: state.get('dangers'),
    info: state.get('info'),
    notificationSettings: state.get('notificationSettings')
  };
}

export default connect(mapStateToProps, actions)(PointSettings);
