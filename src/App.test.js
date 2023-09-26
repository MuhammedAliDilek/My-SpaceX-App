import { render, screen } from "@testing-library/react";
import App from "./App";

test("App should render SpaceXLaunches component", () => {
  render(<App />);
  const spaceXLaunchesComponent = screen.getByText("SpaceX Launches");
  expect(spaceXLaunchesComponent).toBeInTheDocument();
});
