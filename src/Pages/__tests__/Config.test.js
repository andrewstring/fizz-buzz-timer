import React from "react";
import { fireEvent, render } from "@testing-library/react";
import "@testing-library/jest-dom";
import Config from "../Config";

const getInputs = () => {
  const renderOutput = render(<Config />);
  return [
    renderOutput,
    renderOutput.getByTestId("fizz-input"),
    renderOutput.getByTestId("buzz-input"),
  ];
};

test("Config renders successfully", () => {
  const { getByText } = render(<Config />);
  expect(
    getByText("Please enter a fizz and buzz time in seconds.")
  ).toBeInTheDocument();
});

test("Config doesnt link to timer when both values are not in bounds", () => {
  const [output, fizzInput, buzzInput] = getInputs();
  fireEvent.change(fizzInput, { target: { value: "0" } });
  fireEvent.change(buzzInput, { target: { value: "23" } });
  expect(output.getByTestId("no-link")).toBeInTheDocument();
});

test("Config doesnt link to timer when fizz is valid but buzz is invalid", () => {
  const [output, fizzInput, buzzInput] = getInputs();
  fireEvent.change(fizzInput, { target: { value: "3" } });
  fireEvent.change(buzzInput, { target: { value: "23" } });
  expect(output.getByTestId("no-link")).toBeInTheDocument();
});

test("Config doesnt link to timer when buzz is valid but fizz is invalid", () => {
  const [output, fizzInput, buzzInput] = getInputs();
  fireEvent.change(fizzInput, { target: { value: "asd" } });
  fireEvent.change(buzzInput, { target: { value: "3" } });
  expect(output.getByTestId("no-link")).toBeInTheDocument();
});
