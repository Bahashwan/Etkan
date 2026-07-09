import { render } from "@testing-library/react";
import { axe } from "jest-axe";
import { describe, expect, it } from "vitest";

import { SaudiRiyal } from "./SaudiRiyal";

describe("SaudiRiyal", () => {
  it("is decorative (aria-hidden) by default", () => {
    const { container } = render(<SaudiRiyal />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("aria-hidden", "true");
    expect(svg).not.toHaveAttribute("role");
  });

  it("exposes an accessible label when a title is given", () => {
    const { container, getByTitle } = render(<SaudiRiyal title="Saudi Riyal" />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("role", "img");
    expect(svg).toHaveAttribute("aria-label", "Saudi Riyal");
    expect(getByTitle("Saudi Riyal")).toBeInTheDocument();
  });

  it("inherits currentColor and scales to text by default", () => {
    const { container } = render(<SaudiRiyal />);
    const svg = container.querySelector("svg")!;
    expect(svg).toHaveAttribute("fill", "currentColor");
    expect(svg).toHaveAttribute("width", "1em");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<SaudiRiyal title="Saudi Riyal" />);
    expect(await axe(container)).toHaveNoViolations();
  });
});
