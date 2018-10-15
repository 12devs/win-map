import React, { Component } from 'react';
import services from '../../services';
import Mail from "./Mail";
import Cities from "./Cities";
import wynd from "./../../assets/img/wynd.png";
import wave_top from "./../../assets/img/wave_top.svg";
import wave_bottom from "./../../assets/img/wave_bottom.svg";
import about from "./../../assets/img/about.svg";
import Preloader from "../Preloader";

import Footer from "../footer";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cities: [],
      preloader: true,
    };
    this.getCities = this.getCities.bind(this);
    this.changeState = this.changeState.bind(this);
  }

  componentDidMount() {
    return this.getCities()
  }

  getCities() {
    return this.changeState('preloader', true)
      .then(() => {
        return services.getMainPageData()
      })
      .then(data => {
        this.setState({ cities: data, preloader: false })
      })
  }

  changeState(key, value) {
    return new Promise((resolve) => {
      this.setState({ [key]: value }, () => {
        resolve(true)
      })
    })
  }

  render() {
    const src = this.state;
    if (this.state.preloader) {
      return (<Preloader/>)
    }
    return (
      <div>
        <div className="l-hero">
          <a className="l-hero__logo" href="#"><img src={wynd} alt=""/></a>
          <nav>
            <button className="l-hero__hamburger hamburger hamburger--slider js-hamburger">
              <span className="hamburger-box"><span className="hamburger-inner"></span></span>
            </button>
            <div className="l-hero__navigation">
              <div className="l-hero__navigation-container"><a className="l-hero__navigation-url" href="#">Home</a>
                <a className="l-hero__navigation-url" href="#">Description</a>
              </div>
            </div>
          </nav>
          <Mail error={src.error} email={src.email} code={src.code} getCity={this.props.getCity}
                changeState={this.props.changeState}/>
        </div>
        <img className="l-hero__wave" src={wave_top} alt=""/>
        <Cities cities={src.cities} getCity={this.props.getCity} changeState={this.props.changeState}/>

        <div className="l-learn"><img className="l-learn__wave" src={wave_bottom} alt=""/>
          <div className="l-learn__description">
            <div className="l-learn__quote"><img className="l-learn__description-img" src={about} alt="" srcSet=""/>
              <div className="l-learn__quote-text">If you don't like what you see and want to learn more visit us at
              </div>
              <a className="l-learn__quote-site" href="#">hellowynd.com</a>
            </div>
          </div>
        </div>
        <Footer/>

      </div>
    )
  }
}

export default Main;
