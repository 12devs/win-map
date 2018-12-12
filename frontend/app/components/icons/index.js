import L from 'leaflet';
import markerRed from '../../assets/img/red.svg';
import markerBlue from '../../assets/img/blue.svg';

export const redIcon = L.icon({
  iconUrl: markerRed,
  iconRetinaUrl: markerRed,
  iconSize: [29, 40],
  iconAnchor: [14.5, 40],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

export const blueIcon = L.icon({
  iconUrl: markerBlue,
  iconRetinaUrl: markerBlue,
  iconSize: [29, 41],
  iconAnchor: [14.5, 40],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});