import React, { useEffect, useState } from 'react';
import Map from './Map';

const VehicleTracker = () => {
  const [vehiclePosition, setVehiclePosition] = useState(null); // Start with no position
  const [path, setPath] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPosition = { lat: latitude, lng: longitude };
          console.log("New position: ", newPosition); // Debugging info
          setVehiclePosition(newPosition);
          setPath((prevPath) => [...prevPath, newPosition]);
        },
        (err) => {
          console.error("Geolocation error: ", err);
          setError("Unable to retrieve your location. Make sure location services are enabled.");
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        }
      );

      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {vehiclePosition ? (
        <Map vehiclePosition={vehiclePosition} path={path} />
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
};

export default VehicleTracker;