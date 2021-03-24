import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';

const LocationDetails = () => {
  const { slug } = useParams();
  const [location, setLocation] = useState({});

  useEffect(() => {
    (async () => {
      const locationData = await fetch(
        `http://127.0.0.1:3333/location/${slug}`
      ).then((response) => response.json());
      console.log('made it to location details!', locationData)
      setLocation(locationData);
    })();
  }, [setLocation, slug]);

  return (
      <h1>{location.location}</h1>
  );
};

export default LocationDetails;