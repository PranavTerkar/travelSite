// src/components/Recommendations.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Recommendations = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [weather, setWeather] = useState(null);
  const [season, setSeason] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Get user's location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by your browser');
    }
  }, []);

  // Get weather information and update recommendations when userLocation changes
  useEffect(() => {
    if (userLocation) {
      // Simulate weather based on season (you may replace this with an actual API)
      const simulatedWeather = season === 'Summer' ? 'Sunny' : 'Snowy';
      setWeather(simulatedWeather);
    }
  }, [userLocation, season]);

  // Determine season based on weather
  useEffect(() => {
    if (weather) {
      // Simple example: Determine season based on weather
      const seasons = {
        Winter: ['Snowy'],
        Spring: ['Rainy'],
        Summer: ['Sunny'],
        Autumn: ['Cloudy'],
      };

      const currentSeason = Object.keys(seasons).find((s) => seasons[s].includes(weather));
      setSeason(currentSeason);
    }
  }, [weather]);

  // Get destination recommendations based on userLocation, season, and weather
  useEffect(() => {
    const getRecommendations = async () => {
      if (userLocation && season && weather) {
        try {
          const openTripMapApiKey = '5ae2e3f221c38a28845f05b677b67f62091a8d363b061decb85caaa9';
          const recommendationsUrl = `https://api.opentripmap.com/0.1/en/places/radius?radius=5000&lon=${userLocation.longitude}&lat=${userLocation.latitude}&kinds=natural&apikey=${openTripMapApiKey}`;

          const response = await axios.get(recommendationsUrl);
          const destinations = response.data.features;

          // Fetch additional details for each destination
          const destinationsWithDetails = await Promise.all(
            destinations.map(async (destination) => {
              try {
                const detailsUrl = `https://api.opentripmap.com/0.1/en/places/xid/${destination.properties.xid}?apikey=${openTripMapApiKey}`;
                const detailsResponse = await axios.get(detailsUrl);

                // Extract additional information, such as images
                const additionalDetails = detailsResponse.data;
                const images = additionalDetails?.preview?.source;

                // Merge the destination details with additional information
                return { ...destination, images, additionalDetails };
              } catch (detailsError) {
                console.error('Error getting destination details:', detailsError);
                return destination; // Continue with the original destination if details fetching fails
              }
            })
          );

          setRecommendations(destinationsWithDetails);
        } catch (error) {
            console.error('Error getting destination recommendations:', error);
            console.log('Response:', error.response?.data); // Log the response data for debugging
          }
          
      }
    };

    getRecommendations();
  }, [userLocation, season, weather]);

  return (
    <div>
      <h2>Travel Recommendations</h2>
      <p>Season: {season}</p>
      <p>Weather: {weather}</p>
      <ul>
        {recommendations.map((destination) => (
          <li key={destination.properties.xid}>
            <h3>{destination.properties.name}</h3>
            {destination.images && (
              <img src={destination.images} alt={`${destination.properties.name} preview`} />
            )}
            {/* Render other destination details as needed */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Recommendations;
