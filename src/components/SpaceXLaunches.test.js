import React from "react";
import SpaceXLaunches from "./components/launch-data";

describe("SpaceXLaunches component", () => {
  it("should render a list of launches", () => {
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
    const renderedComponent = <SpaceXLaunches launches={launches} />;

    expect(
      renderedComponent.querySelector("ul.filtered-launches").children.length
    ).toBe(2);
  });

  it("should filter the launches by search term", () => {
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
    const renderedComponent = <SpaceXLaunches launches={launches} />;

    const searchInput = renderedComponent.querySelector("input");
    searchInput.value = "Falcon";
    searchInput.dispatchEvent(new Event("change"));
    expect(
      renderedComponent.querySelector("ul.filtered-launches").children.length
    ).toBe(1);
  });

  it("should filter the launches by filter option", () => {
    const launches = [
      {
        id: "1",
        name: "Falcon Heavy Test Flight",
        success: true,
      },
      {
        id: "2",
        name: "Starlink 1",
        success: false,
      },
    ];
    const renderedComponent = <SpaceXLaunches launches={launches} />;

    const selectInput = renderedComponent.querySelector("ReactSelect");
    selectInput.value = "successful";
    selectInput.dispatchEvent(new Event("change"));
    expect(
      renderedComponent.querySelector("ul.filtered-launches").children.length
    ).toBe(1);
  });
});
