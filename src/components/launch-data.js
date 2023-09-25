import React, { useState, useEffect } from "react";
import axios from "axios";

const SpaceXLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [filter, setFilter] = useState("latest");

  useEffect(() => {
    const fetchLaunches = async () => {
      let url = "https://api.spacexdata.com/v5/launches/latest";
      if (filter === "upcoming") {
        url = "https://api.spacexdata.com/v5/launches/upcoming";
      }

      const response = await axios.get(url);
      console.log(response.data);
      setLaunches(response.data);
    };

    fetchLaunches();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <select value={filter} onChange={handleFilterChange}>
        <option value="latest">Latest</option>
        <option value="upcoming">Upcoming</option>
      </select>
      <ul>
        {Array.isArray(launches) &&
          launches.map((launch) => (
            <li key={launch.id}>
              <h3>{launch.name}</h3>
              <p>Launch Date: {launch.date_local}</p>
              <p>Rocket: {launch.rocket.name}</p>
              <p>Mission: {launch.details}</p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SpaceXLaunches;
