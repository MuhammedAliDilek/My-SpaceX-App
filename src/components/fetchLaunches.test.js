import axios from "axios";
import fetchLaunches from "./api/fetch-launches";

describe("fetchLaunches function", () => {
  it("should fetch a list of launches from the SpaceX API", async () => {
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

    axios.get.mockResolvedValue({ data: launches });

    const fetchedLaunches = await fetchLaunches();

    expect(fetchedLaunches).toEqual(launches);
  });

  it("should handle errors gracefully", async () => {
    axios.get.mockRejectedValue(new Error("Something went wrong"));

    const fetchedLaunches = await fetchLaunches();

    expect(fetchedLaunches).toBeNull();
  });
});
