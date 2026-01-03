import { fireEvent, render, screen } from "@testing-library/react";
import FeedbackForm from "./FeedbackForm";

describe("Feedback Form", () => {
  test("User is able to submit the form if the score is lower than 5 and additional feedback is provided", () => {
    const score = "3";
    const comment = "The pizza crust was too thick";
    const onSubmit = jest.fn();
    render(<FeedbackForm onSubmit={onSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
    const rangeInput = screen.getByLabelText(/Score:/);
    fireEvent.change(rangeInput, { target: { value: score } });
    const textField = screen.getByLabelText(/Comments:/);

    fireEvent.change(textField, { target: { value: comment } });

    const submitButton = screen.getByRole("button", { name: /Submit/i });
    fireEvent.click(submitButton);
    expect(onSubmit).toHaveBeenCalledTimes(1);

    expect(onSubmit).toHaveBeenCalledWith({
      score,
      comment,
    });
  });

  test("User is able to submit the form if the score is higher than 5, without additional feedback", () => {
    const score = "9";
    const onSubmit = jest.fn();
    render(<FeedbackForm onSubmit={onSubmit} />);

    // You have to write the rest of the test below to make the assertion pass
    const scoreChange = screen.getByLabelText(/Score:/);
    fireEvent.change(scoreChange, { target: { value: score } });
    
    const TextField = screen.getByLabelText(/Comments:/);
    fireEvent.change(TextField, { target: { value: '' } })
    
    const submitBtn = screen.getByRole('button');
    submitBtn.click();
    expect(onSubmit).toHaveBeenCalledTimes(1)

    expect(onSubmit).toHaveBeenCalledWith({
      score,
      comment: "",
    });
  });
});
