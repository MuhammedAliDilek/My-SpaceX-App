import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSelect from "react-select";

const SpaceXLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [filter, setFilter] = useState("latest");
  const [search, setSearch] = useState("");

  // Check the type of the launches variable before calling the filter() method.
  const filteredLaunches =
    launches && Array.isArray(launches)
      ? launches.filter((launch) => {
          return launch.name.includes(search) && launch.status === filter;
        })
      : [];

  useEffect(() => {
    const fetchLaunches = async () => {
      let url = "https://api.spacexdata.com/v5/launches";
      if (filter === "latest") {
        url += "/latest";
      } else if (filter === "upcoming") {
        url += "/upcoming";
      } else if (filter === "success") {
        url += "?filter=status:success";
      } else if (filter === "failed") {
        url += "?filter=status:failed";
      }

      const response = await axios.get(url);
      console.log(response.data);
      setLaunches(response.data);
    };

    fetchLaunches();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.value);
  };

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <div>
      <h1>SpaceX Launches</h1>
      <input
        type="text"
        placeholder="Search launches..."
        value={search}
        onChange={handleInputChange}
      />
      <ReactSelect
        options={[
          { value: "latest", label: "Latest" },
          { value: "upcoming", label: "Upcoming" },
          { value: "success", label: "Success" },
          { value: "failed", label: "Failed" },
        ]}
        onChange={handleFilterChange}
        value={filter}
      />
      <ul>
        {/* Only render the list of launches if the launches variable is an array. */}
        {launches && Array.isArray(launches) ? (
          filteredLaunches.map((launch) => (
            <li key={launch.id}>
              <h3>{launch.name}</h3>
              <p>Launch Date: {launch.date_local}</p>
              <p>Rocket: {launch.rocket.name}</p>
              <p>Mission: {launch.details}</p>
            </li>
          ))
        ) : (
          <p>No launches found.</p>
        )}
      </ul>
    </div>
  );
};

export default SpaceXLaunches;
