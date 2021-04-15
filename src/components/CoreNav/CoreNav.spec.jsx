import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CoreNav from "./CoreNav";

describe("CoreNav", () => {
  it("should have a Home button", () => {
    render(
      <MemoryRouter>
        <CoreNav />
      </MemoryRouter>,
    );
    expect(screen.getByText("Home")).toBeInTheDocument();
  });
});
