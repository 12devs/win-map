import React from 'react';

export const LoaderComponent = (props) => {

  return (
    <div className="loader loader_active">
      <div className="loader__spinner">
        <div/>
        <div/>
        <div/>
        <div/>
      </div>
    </div>
  )
}

export default LoaderComponent;
