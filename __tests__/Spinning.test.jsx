import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Spinning } from "../components/Spinning";

describe("Spinning", () => {
  it("should render without crashing", () => {
    render(<Spinning message="Loading...please wait" />);
    expect(screen.getByTestId("spinning")).toBeInTheDocument();
  });
});
