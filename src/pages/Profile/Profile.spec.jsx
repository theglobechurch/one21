import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Profile from "./Profile";

describe("Profile", () => {
  describe("church section", () => {
    describe("when a church hasn't been selected", () => {
      jest.spyOn(window, "scrollTo");
      it("should show a link to select your church", () => {
        global.Storage.prototype.getItem = jest.fn().mockImplementation(() => null);
        render(<Profile setTitle={jest.fn()} setView={jest.fn()} />, { wrapper: MemoryRouter });
        const selectYourChurchLink = screen.getByText("Select your church");

        expect(selectYourChurchLink).toBeInTheDocument();
      });
    });

    describe("when a church has been selected", () => {
      it("should show the name of the church", () => {
        global.Storage.prototype.getItem = jest.fn().mockImplementation(() => "{\"name\":\"Test Church\"}");
        render(<Profile setTitle={jest.fn()} setView={jest.fn()} />, { wrapper: MemoryRouter });

        expect(screen.getByText("Test Church")).toBeInTheDocument();
      });
    });
  });
});
