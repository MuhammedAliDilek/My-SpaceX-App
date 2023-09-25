# Documentation

Documentation for launch-data.js

This file contains the SpaceXLaunches component, which fetches a list of SpaceX launches from the SpaceX API and displays them to the user. The component also allows the user to filter the launches by search term and by filter option.

Props:

launches: An array of SpaceX launch objects.
Methods:

fetchLaunches: This method fetches a list of SpaceX launches from the SpaceX API.
handleFilterChange: This method handles changes to the filter selection.
handleInputChange: This method handles changes to the search input.
render: This method renders the component.
Usage:

JavaScript
import SpaceXLaunches from "./components/launch-data";

function App() {
return (

<div>
<SpaceXLaunches />
</div>
);
}

export default App;

Example:

JavaScript
const launches = [
{
id: "1",
name: "Falcon Heavy Test Flight",
},
{
id: "2",
name: "Starlink 1",
},
];

<SpaceXLaunches launches={launches} />

Documentation for fetchLaunches.test.js

This file contains tests for the fetchLaunches function.

## Tests

The SpaceXLaunches component and the fetchLaunches function have been tested to ensure that they work as expected.

The tests for the SpaceXLaunches component cover the following functionality:

- Rendering a list of launches
- Filtering the launches by search term
- Filtering the launches by filter option

The tests for the fetchLaunches function cover the following functionality:

- Fetching a list of launches from the SpaceX API
- Handling errors gracefully
