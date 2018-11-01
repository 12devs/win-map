import L from 'leaflet';
import markerBlue from '../../assets/img/point_blue.png';
import markerRed from '../../assets/img/point_red.png';

export const redIcon = L.icon({
  iconUrl: markerRed,
  iconSize: [29, 40],
  iconAnchor: [14.5, 40],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

export const blueIcon = L.icon({
  iconUrl: markerBlue,
  iconSize: [29, 41],
  iconAnchor: [14.5, 40],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});