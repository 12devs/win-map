import React from 'react';
import connect from 'react-redux/es/connect/connect';
import actions from '../../actions';

class WindRoseChart extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let { point, statistic } = this.props;
    statistic = JSON.parse(JSON.stringify(statistic));
    if (!statistic[point.id]) {
      return null
    }
    return (
      <div style={{minHeight: '40rem', overflow: 'auto'}}>
        <div className={'notification__settings-item notification__settings-item--name'}
             style={{ display: 'flex', align: "center" }}>
          <div style={{ display: 'flex', margin: 'auto' }}><b>Statistics info</b></div>
        </div>
        <div className={'notification__settings-item notification__settings-item--name'} style={{ display: 'flex' }}>
          <div style={{ width: '33%', fontSize: '1.1rem' }}><b>Danger name</b></div>
          <div style={{ width: '33%', fontSize: '1.1rem' }}><b>'In danger' now</b></div>
          <div style={{ width: '33%', fontSize: '1.1rem' }}><b>'In danger' period</b></div>
        </div>
        {statistic[point.id].map((elem, i) => {
          const style = { width: '33%' }
          return <div className={'notification__settings-item notification__settings-item--name'}
                      style={{ display: 'flex' }} key={i}>
            <div style={style}>
              {elem.dangerName}
            </div>
            <div style={style}>
              {elem.currently ? "Yes" : "No"}
            </div>
            <div style={style}>
              {elem.period}
            </div>
          </div>
        })}
        {!statistic[point.id].length ?
           <div className={'notification__settings-item notification__settings-item--name'}>
             <div>You have not yet created a danger</div>
          </div> : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    stationsData: state.get('stationsData'),
    statistic: state.get('statistic'),
  };
}

export default connect(mapStateToProps, actions)(WindRoseChart);

