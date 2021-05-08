import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CoreNav from "./CoreNav";

describe("CoreNav", () => {
  const guide = {
    name: "Sermons",
    slug: "sermons",
    teaser: "Sermons from The Globe Church",
    description: "",
    copyright: "",
    highlight_first: false,
    image: "https://builder.one21.org/uploads/production/2018/08/16/168puab2l7_tgc_one21_bg.jpg",
    images: {
      320: "https://builder.one21.org/uploads/production/2018/08/16/4r7pe5e4g9_tgc_one21_bg.jpg",
      640: "https://builder.one21.org/uploads/production/2018/08/16/4e9a6adtii_tgc_one21_bg.jpg",
      960: "https://builder.one21.org/uploads/production/2018/08/16/168puab2l7_tgc_one21_bg.jpg",
      1280: "https://builder.one21.org/uploads/production/2018/08/16/843lfez1fs_tgc_one21_bg.jpg",
      1920: "https://builder.one21.org/uploads/production/2018/08/16/4ujywcbj60_tgc_one21_bg.jpg",
      2560: "https://builder.one21.org/uploads/production/2018/08/16/3jddglg8lc_tgc_one21_bg.jpg",
      thumbnail: "https://builder.one21.org/uploads/production/2018/08/16/8wuwsu1irs_tgc_one21_bg.jpg",
      thumbnail_2x: "https://builder.one21.org/uploads/production/2018/08/16/3d5f94s4c6_tgc_one21_bg.jpg",
    },
  };

  it("should have a Home button", () => {
    render(<CoreNav view="/" guides={[]} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("should have a Guide button when there is only one guide", () => {
    render(<CoreNav view="/" guides={[guide]} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Guide")).toBeInTheDocument();
  });

  it("should have a Guides button when there is more than one guide", () => {
    render(<CoreNav view="/" guides={[guide, guide]} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Guides")).toBeInTheDocument();
  });

  it("should have a Me button", () => {
    render(<CoreNav view="/" guides={[]} />, { wrapper: MemoryRouter });
    expect(screen.getByText("Me")).toBeInTheDocument();
  });
});
