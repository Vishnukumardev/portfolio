import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vite-plus/test";
import ContactMe from "./ContactMe";

describe("ContactMe Component", () => {
  it("renders form inputs and labels correctly", () => {
    render(<ContactMe screenName="Contact Me" id="ContactMe" />);

    // Verify fields appear on the screen
    expect(screen.getByLabelText(/name/i)).toBeTruthy();
    expect(screen.getByLabelText(/email/i)).toBeTruthy();
    expect(screen.getByLabelText(/message/i)).toBeTruthy();
  });

  it("allows user to type into the form fields", () => {
    render(<ContactMe screenName="Contact Me" id="ContactMe" />);

    const nameInput = screen.getByLabelText(/name/i) as HTMLInputElement;
    const emailInput = screen.getByLabelText(/email/i) as HTMLInputElement;

    // Simulate typing
    fireEvent.change(nameInput, { target: { value: "Vishnu Kumar" } });
    fireEvent.change(emailInput, { target: { value: "vishnu@example.com" } });

    expect(nameInput.value).toBe("Vishnu Kumar");
    expect(emailInput.value).toBe("vishnu@example.com");
  });
});
