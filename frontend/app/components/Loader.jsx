import React from 'react';

class Loader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='loader__container'>
        <div className="lds-ring">
          <div/>
          <div/>
          <div/>
          <div/>
        </div>
      </div>
    );
  }
}

export default Loader;
