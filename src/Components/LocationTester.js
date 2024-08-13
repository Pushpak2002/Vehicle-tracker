import React, { useEffect, useState } from 'react';

const LocationTester = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ latitude, longitude });
          console.log("Your location:", latitude, longitude);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Unable to retrieve your location.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <div>
      {error && <p>{error}</p>}
      {location ? (
        <p>Your location: {location.latitude}, {location.longitude}</p>
      ) : (
        <p>Loading your location...</p>
      )}
    </div>
  );
};

export default LocationTester;
