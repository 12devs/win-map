import L from 'leaflet';
import markerBlue from '../../assets/img/map_blue.png';
import markerRed from '../../assets/img/map_red.png';

export const redIcon = L.icon({
  iconUrl: markerRed,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});

export const blueIcon = L.icon({
  iconUrl: markerBlue,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41]
});