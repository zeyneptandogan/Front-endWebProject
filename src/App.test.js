import { render, screen } from '@testing-library/react';
import App from './App';
import React from 'react';
import ReactDom from 'react-dom';
import Button from "./controls/Button";
import CheckoutPage from "./Payment/CheckoutPage";
import Register from "./Login-SignUp/signup";
import userEvent from '@testing-library/user-event';
import {convert} from "./Components_foradmin/main_salesmanager/Table_Analytics/Analyticspage.js";

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

it("renders without crashing",()=>{    //first for button usage
  const div =document.createElement("div");
  ReactDom.render(<Button></Button>,div)
})

it("renders correctly",()=>{//second, add data id to checkout submit button
  const {queryByTestId}= render(<CheckoutPage/>)
  expect (queryByTestId("submit")).toBeTruthy();
})


describe("<Register />", () => {  //third, for register e mail input add data-testid

  test('render email input', () => {
    render(<Register />);

    const inputEl = screen.getByTestId("email");
    expect(inputEl).toBeInTheDocument();
    expect(inputEl).toHaveAttribute("type", "email");
  });

  test('pass valid email to test email input field', () => {
    render(<Register />);

    const inputEl = screen.getByTestId("email-input");
    userEvent.type(inputEl, "test@mail.com");

    expect(screen.getByTestId("email")).toHaveValue("test@mail.com");
  });
});

test("convert",()=>{    //this is for date conversion in analytics page
  expect(convert("Wed May 12 2021 00:00:00 GMT+0300")).toBe("2021-05-12");
  expect(convert("Wed May 26 2021 00:00:00 GMT+0300")).toBe("2021-05-26");
})