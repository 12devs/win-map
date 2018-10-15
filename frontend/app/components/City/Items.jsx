import React, { Component } from 'react';
import figure from "./../../assets/img/figure.svg";

export default props => {
  if (!props.value && props.value !== 0) {
    return null
  }
  return (
    <div className="l-charts__item">
      <div className="l-charts__title">{props.title}</div>
      <img className="l-charts__title-figure" src={figure} alt=""/>
      <div className="l-charts__data"><img className="l-charts__data-ico" src={props.img} alt=""/>
        <div className="l-charts__data-number">{Math.round(props.value * 100) / 100}{props.unit}</div>
      </div>
    </div>
  );
};

