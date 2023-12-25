// itineraryComponent.js
import React, { useState } from 'react';


const ItineraryComponent = () => {
    const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState('');

  const addActivity = () => {
    setActivities([...activities, newActivity]);
    setNewActivity('');
  };

  return (
    <div>
      <ul>
        {activities.map((activity, index) => (
          <li key={index}>{activity}</li>
        ))}
      </ul>
      <input
        type="text"
        placeholder="Add new activity"
        value={newActivity}
        onChange={(e) => setNewActivity(e.target.value)}
      />
      <button onClick={addActivity}>Add Activity</button>
    </div>
  );
};

export default ItineraryComponent;

