// This component fetches a list of SpaceX launches from the SpaceX API
// and displays them to the user. It also allows the user to filter the
// launches by search term and by filter option.

import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactSelect from "react-select";

// This component renders a list of SpaceX launches and allows the user to
// filter them by search term and by filter option.
const SpaceXLaunches = () => {
  const [launches, setLaunches] = useState([]);
  const [FilteredLaunches, setFilteredLaunches] = useState([]);
  const [filter, setFilter] = useState("latest");
  const [search, setSearch] = useState("");
  const [chosenFilterText, setChosenFilterText] = useState("Latest");

  useEffect(() => {
    // This function fetches a list of SpaceX launches from the SpaceX API.
    const fetchLaunches = async () => {
      let url = `https://api.spacexdata.com/v5/launches/${filter}`;

      const response = await axios.get(url);
      console.log(response.data);
      setLaunches(response.data);
      setFilteredLaunches(response.data);
    };

    fetchLaunches();
  }, [filter]);

  const handleFilterChange = (event) => {
    setFilter(event.value);
    setChosenFilterText(event.label);
  };

  const handleInputChange = (event) => {
    console.log(event);
    const filtered = launches.filter((datum) => {
      return datum.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    console.log("filtered", filtered);
    setFilteredLaunches(filtered);
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
          { value: "past", label: "Past launches" },
          { value: "next", label: "Next launch" },
        ]}
        onChange={handleFilterChange}
        value={filter}
        placeholder="Filter Launches"
      />

      <ul className="filtered-launches">
        <h2>{chosenFilterText}</h2>
        {FilteredLaunches ? (
          Array.isArray(FilteredLaunches) ? (
            FilteredLaunches.map((launch) => (
              <li key={launch.id}>
                <h3>{launch.name}</h3>
                <p>Launch Date: {launch.date_local}</p>
                <p>Rocket: {launch.rocket.name}</p>
                <p>Mission: {launch.details}</p>
                <p ngClass="launch.success ? 'success'  fail  null">
                  Mission status is successful or failed or unknown yet:{" "}
                  {launch.success}
                </p>
              </li>
            ))
          ) : (
            <li key={FilteredLaunches.id}>
              <h3>{FilteredLaunches.name}</h3>
              <p>Launch Date: {FilteredLaunches.date_local}</p>
              <p>Rocket: {FilteredLaunches.rocket.name}</p>
              <p>Mission: {FilteredLaunches.details}</p>
            </li>
          )
        ) : (
          <p>No launches found.</p>
        )}
      </ul>
    </div>
  );
};

export default SpaceXLaunches;
