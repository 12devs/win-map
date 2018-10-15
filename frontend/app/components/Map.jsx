import React from 'react';
import ReactDOM from 'react-dom';
// import './index.css';

import {withScriptjs, withGoogleMap, GoogleMap, Marker, Circle, Polygon, Polyline} from "react-google-maps"
import MarkerWithLabel from "react-google-maps/lib/components/addons/MarkerWithLabel";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import SearchBox from "react-google-maps/lib/components/places/SearchBox";

const MyMapComponent = withScriptjs(withGoogleMap((props) =>
  <GoogleMap
    defaultZoom={10}
    defaultCenter={{lat: -34.397, lng: 150.644}}
    onClick={(e) => {
      console.log(e.latLng.lat(),e.latLng.lng() );
    }}
  >
    {'defdsfsfsdfsfsdf'}
    <Marker position={{lat: -34.397, lng: 150.644}}
            defaultLabel={'home'}
            defaultTitle={"defaultTitle"}
            editable
            draggable
            onDragStart={(e) => {
              console.log(e.latLng.lat(), e.latLng.lng())
            }}
            onRightClick={function (e) {
              console.log(this.getPosition(e))
            }}
    />
    <Polygon
      // defaultPath={[{lat: -34.397, lng: 150.644}, {lat: -34.0, lng: 150.0}]}
      path={[{lat: -34.397, lng: 150.644}, {lat: -34.0, lng: 150.0}, {lat: -34.10, lng: 150.10}]}
      options={{
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: '#FF0000',
        fillOpacity: 0.35,
      }}
      geodesic
      editable
      draggable
      onDblClick={function (e) {
        console.log(this.getPath());
      }}
    />
    <Polyline defaultPath={[{lat: -34.100, lng: 150.100}, {lat: -34.0, lng: 150.0}]}
              editable
              draggable
              onRightClick={(e) => {
                console.log(e)
              }}
    />
    <Circle defaultCenter={{lat: -34.000, lng: 150.000}}
            defaultRadius={100}
            center={{lat: -34.000, lng: 150.000}}
            draggable={true}
            editable={true}
            radius={10000}
    />
  </GoogleMap>
));

export default MyMapComponent
