import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Timer from "../Timer";

const renderOutput = (address) => {
  return render(
    <MemoryRouter initialEntries={[address]}>
      <Timer></Timer>
    </MemoryRouter>
  );
};

test("Timer renders successfully", () => {
  expect(renderOutput("/timer").getByTestId("timer-main")).toBeInTheDocument();
});

test("Timer render when fizz and buzz are passed", () => {
  expect(
    renderOutput("/time?fizz=5&buzz=7").getByTestId("timer-main")
  ).toBeInTheDocument();
});
