import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

const carIcon = new L.Icon({
  iconUrl: '/images/car.png', 
  iconSize: [32, 32], 
  iconAnchor: [16, 32], 
  popupAnchor: [0, -32], 
});

const Map = ({ vehiclePosition, path }) => {
  return (
    <MapContainer center={[vehiclePosition.lat, vehiclePosition.lng]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {vehiclePosition && (
        <Marker position={[vehiclePosition.lat, vehiclePosition.lng]} icon={carIcon} />
      )}
      <Polyline positions={path} color="red" />
    </MapContainer>
  );
};

export default Map;
