import React from 'react';
import { MapContainer, TileLayer, Marker, Polyline, Tooltip } from 'react-leaflet'; // Import Tooltip
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
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString();
  };

  return (
    <MapContainer center={[vehiclePosition.lat, vehiclePosition.lng]} zoom={13} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {vehiclePosition && (
        <Marker 
          position={[vehiclePosition.lat, vehiclePosition.lng]} 
          icon={carIcon}
          eventHandlers={{
            mouseover: (e) => {
              e.target.openTooltip();
            },
            mouseout: (e) => {
              e.target.closeTooltip();
            },
          }}
        >
          <Tooltip>
            <div>
              <h4>Car Information</h4>
              <p>Location: {`Lat: ${vehiclePosition.lat}, Lng: ${vehiclePosition.lng}`}</p>
              <p>Current Time: {getCurrentTime()}</p>
            </div>
          </Tooltip>
        </Marker>
      )}
      <Polyline positions={path} color="red" />
    </MapContainer>
  );
};

export default Map;
