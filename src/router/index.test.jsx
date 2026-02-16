import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import App from "../App";
import Home from "../pages/Home";
import Contact from '../pages/Contact';
import Quiz from '../pages/Quiz';

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <div data-testid="home-page">Home</div> },
      { path: "contact", element: <div data-testid="contact-page">Contact</div> },
      { path: "quiz", element: <div data-testid="quiz-page">Quiz</div> },
    ],
  },
];

describe('Router Configuration', () => {
  
  it('should render Home page at root path "/"', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('home-page')).toBeTruthy();
  });

  it('should render Contact page at "/contact"', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/contact'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('contact-page')).toBeTruthy();
  });

  it('should render Quiz page at "/quiz"', () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/quiz'],
    });

    render(<RouterProvider router={router} />);
    expect(screen.getByTestId('quiz-page')).toBeTruthy();
  });
});